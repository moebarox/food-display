'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FoodCard from '@/components/FoodCard';
import Button from '@/components/Button';
import { Food } from '@/types/food';
import { getFoods } from '@/lib/api';
import { FOOD_LIMIT } from '@/constants/api';
import styles from './Catalog.module.scss';

export default function Catalog({ initialFoods }: { initialFoods: Food[] }) {
  const searchParams = useSearchParams();
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const [hasMore, setHasMore] = useState(initialFoods.length === FOOD_LIMIT);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // if there are fewer foods than the limit, disable the "Show More" button
    if (initialFoods.length < FOOD_LIMIT) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

    setFoods(initialFoods);
    setIsLoading(false);
  }, [initialFoods]);

  const handleMore = async () => {
    // prevent multiple clicks
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const offset = foods.length;
    const keywords = searchParams.get('keywords') ?? '';
    const category = searchParams.get('category') ?? '';
    const moreFoods = await getFoods({ keywords, category, offset });

    // if there are no more foods, disable the "Show More" button
    if (moreFoods.length < FOOD_LIMIT) {
      setHasMore(false);
    }

    setFoods([...foods, ...moreFoods]);
    setIsLoading(false);
  };

  return (
    <>
      {foods.length === 0 ? (
        <section
          className={styles['catalog-empty']}
          data-testid="catalog-empty"
        >
          <h2>No food found :(</h2>
          <p>Try adjusting your search or filters.</p>
        </section>
      ) : (
        <>
          <section className={styles.catalog}>
            {foods.map((food, i) => (
              <FoodCard key={i} food={food} priority={i < FOOD_LIMIT} />
            ))}
          </section>
          {hasMore && (
            <section
              className={styles['catalog-more']}
              data-testid="catalog-more"
            >
              <Button onClick={handleMore} isLoading={isLoading}>
                + Show More
              </Button>
            </section>
          )}
        </>
      )}
    </>
  );
}

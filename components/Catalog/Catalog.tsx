'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CatalogItem from '@/components/CatalogItem';
import Button from '@/components/Button';
import { Food } from '@/types/food';
import { getFoods } from '@/lib/api';
import { FOOD_LIMIT } from '@/constants/api';
import styles from './Catalog.module.scss';

export default function Catalog({ initialFoods }: { initialFoods: Food[] }) {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const searchParams = useSearchParams();
  const [hasMore, setHasMore] = useState(initialFoods.length === FOOD_LIMIT);
  const [isLoading, setIsLoading] = useState(false);

  const keywords = searchParams.get('keywords') ?? '';
  const category = searchParams.get('category') ?? '';

  useEffect(() => {
    setIsLoading(true);
    if (initialFoods.length < FOOD_LIMIT) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setFoods(initialFoods);
    setIsLoading(false);
  }, [initialFoods]);

  const handleMore = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const offset = foods.length;
    const moreFoods = await getFoods({ keywords, category, offset });
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
              <CatalogItem key={i} food={food} />
            ))}
          </section>
          {hasMore && (
            <section className={styles['catalog-more']}>
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

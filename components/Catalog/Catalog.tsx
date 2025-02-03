'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CatalogItem from '@/components/CatalogItem';
import { Food } from '@/types/food';
import { getFoods } from '@/lib/api';
import { FOOD_LIMIT } from '@/constants/api';
import styles from './Catalog.module.scss';

export default function Catalog({ initialFoods }: { initialFoods: Food[] }) {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const searchParams = useSearchParams();
  const [hasMore, setHasMore] = useState(initialFoods.length === FOOD_LIMIT);
  const keywords = searchParams.get('keywords') ?? '';
  const category = searchParams.get('category') ?? '';

  useEffect(() => {
    if (initialFoods.length < FOOD_LIMIT) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    setFoods(initialFoods);
  }, [initialFoods]);

  const handleMore = async () => {
    const offset = foods.length;
    const moreFoods = await getFoods({ keywords, category, offset });
    if (moreFoods.length < FOOD_LIMIT) {
      setHasMore(false);
    }
    setFoods([...foods, ...moreFoods]);
  };

  return (
    <>
      <section className={styles.catalog}>
        {foods.map((food, i) => (
          <CatalogItem key={i} food={food} />
        ))}
      </section>
      {hasMore && (
        <section className={styles['catalog-more']}>
          <button onClick={handleMore}>+ Show More</button>
        </section>
      )}
    </>
  );
}

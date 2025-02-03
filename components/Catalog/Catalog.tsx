'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CatalogItem from '@/components/CatalogItem';
import { Food } from '@/types/food';
import styles from './Catalog.module.scss';

export default function Catalog({ initialFoods }: { initialFoods: Food[] }) {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const searchParams = useSearchParams();
  const keywords = searchParams.get('keywords') ?? '';
  const category = searchParams.get('category') ?? '';

  useEffect(() => {
    setFoods(initialFoods);
  }, [initialFoods]);

  return (
    <>
      <section className={styles.catalog}>
        {foods.map((food, i) => (
          <CatalogItem key={i} food={food} />
        ))}
      </section>
      {foods.length > 0 && (
        <section className={styles['catalog-more']}>
          <button>+ Show More</button>
        </section>
      )}
    </>
  );
}

'use client';

import { useState } from 'react';
import CatalogItem from '@/components/CatalogItem';
import { Food } from '@/types/food';
import styles from './Catalog.module.scss';

export default function Catalog({ initialFoods }: { initialFoods: Food[] }) {
  const [foods] = useState<Food[]>(initialFoods);

  return (
    <>
      <section className={styles.catalog}>
        {foods.map((food, i) => (
          <CatalogItem key={i} food={food} />
        ))}
      </section>
      <section className={styles['catalog-more']}>
        <button>+ Show More</button>
      </section>
    </>
  );
}

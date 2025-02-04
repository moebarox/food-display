'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Category } from '@/types/category';
import styles from './CategoryFilter.module.scss';

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get('category') ?? '';

  const handleChangeCategory = (category: string) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set('category', category);

    // update the URL with the new category
    router.push(`/?${query.toString()}`);
  };

  return (
    <div className={styles.category}>
      <div className={styles['category__item']}>
        <input
          type="radio"
          name="category"
          id="category-all"
          className={styles['category__item-input']}
          value=""
          defaultChecked={!categoryId}
          onChange={(e) => handleChangeCategory(e.target.value)}
        />
        <label
          htmlFor="category-all"
          className={styles['category__item-label']}
        >
          All
        </label>
      </div>
      {categories.map((category) => (
        <div className={styles['category__item']} key={category.id}>
          <input
            type="radio"
            name="category"
            id={`category-${category.id}`}
            className={styles['category__item-input']}
            value={category.id}
            defaultChecked={category.id === categoryId}
            onChange={(e) => handleChangeCategory(e.target.value)}
          />
          <label
            htmlFor={`category-${category.id}`}
            className={styles['category__item-label']}
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
}

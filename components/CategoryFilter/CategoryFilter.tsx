import { Category } from '@/types/category';
import styles from './CategoryFilter.module.scss';

export default function CategoryFilter({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className={styles.category}>
      <div className={styles['category__item']}>
        <input
          type="radio"
          name="category"
          id="category-all"
          className={styles['category__item-input']}
          defaultChecked
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

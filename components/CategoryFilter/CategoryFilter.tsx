import styles from './CategoryFilter.module.scss';

export default function CategoryFilter() {
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
      <div className={styles['category__item']}>
        <input
          type="radio"
          name="category"
          id="category-sushi"
          className={styles['category__item-input']}
        />
        <label
          htmlFor="category-sushi"
          className={styles['category__item-label']}
        >
          Sushi
        </label>
      </div>
    </div>
  );
}

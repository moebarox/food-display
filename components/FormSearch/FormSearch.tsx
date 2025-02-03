import { Icon } from '@iconify/react';
import styles from './FormSearch.module.scss';

export default function FormSearch() {
  return (
    <div className={styles.search}>
      <button className={styles['search__button']}>
        <Icon icon={'mdi:magnify'} />
      </button>
      <input
        type="search"
        name="keywords"
        placeholder="Enter restaurant name..."
        className={styles['search__input']}
      />
    </div>
  );
}

import CatalogItem from '../CatalogItem';
import styles from './Catalog.module.scss';

export default function Catalog() {
  return (
    <>
      <section className={styles.catalog}>
        {[...Array(6)].map((_, i) => (
          <CatalogItem key={i} />
        ))}
      </section>
      <section className={styles['catalog-more']}>
        <button>+ Show More</button>
      </section>
    </>
  );
}

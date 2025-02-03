import FormSearch from '@/components/FormSearch';
import CategoryFilter from '@/components/CategoryFilter';
import styles from './page.module.scss';
import Catalog from '@/components/Catalog/Catalog';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <FormSearch />
        <CategoryFilter />
      </header>
      <main className={styles.main}>
        <Catalog />
      </main>
    </div>
  );
}

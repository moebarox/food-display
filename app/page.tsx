import FormSearch from '@/components/FormSearch';
import CategoryFilter from '@/components/CategoryFilter';
import Catalog from '@/components/Catalog/Catalog';
import styles from './page.module.scss';
import { getCategories } from '@/lib/api';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <FormSearch />
        <CategoryFilter categories={categories} />
      </header>
      <main className={styles.main}>
        <Catalog />
      </main>
    </div>
  );
}

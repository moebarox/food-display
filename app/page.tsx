import FormSearch from '@/components/FormSearch';
import CategoryFilter from '@/components/CategoryFilter';
import Catalog from '@/components/Catalog/Catalog';
import styles from './page.module.scss';
import { getCategories, getFoods } from '@/lib/api';

export default async function Home() {
  const categories = await getCategories();
  const initialFoods = await getFoods(0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <FormSearch />
        <CategoryFilter categories={categories} />
      </header>
      <main className={styles.main}>
        <Catalog initialFoods={initialFoods} />
      </main>
    </div>
  );
}

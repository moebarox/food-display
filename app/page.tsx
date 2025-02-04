import FormSearch from '@/components/FormSearch';
import CategoryFilter from '@/components/CategoryFilter';
import Catalog from '@/components/Catalog/Catalog';
import { getCategories, getFoods } from '@/lib/api';
import styles from './page.module.scss';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { keywords, category } = await searchParams;

  const categories = await getCategories();
  const initialFoods = await getFoods({
    keywords,
    category,
    offset: 0,
  });

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

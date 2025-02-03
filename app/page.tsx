import Image from 'next/image';
import FormSearch from '@/components/FormSearch';
import CategoryFilter from '@/components/CategoryFilter';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <FormSearch />
        <CategoryFilter />
      </header>
      <main className={styles.main}>
        <section className={styles.catalog}>
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <Image
                src="https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/drink.jpg"
                alt="Sushi"
                width="300"
                height="200"
                layout="responsive"
              />
              <h2>Sushi Place</h2>
              <div>Rating</div>
              <div>Duration</div>
            </div>
          ))}
        </section>
        <section>
          <button>+ Show More</button>
        </section>
      </main>
    </div>
  );
}

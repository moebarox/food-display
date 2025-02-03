import Image from 'next/image';
import Form from 'next/form';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <Form action="/">
          <input
            type="search"
            name="keywords"
            placeholder="Enter restaurant name"
          />
          <button type="submit">Submit</button>
        </Form>
      </header>
      <nav>
        <ul>
          <li>
            <a href="#">All</a>
          </li>
          <li>
            <a href="#">Sushi</a>
          </li>
        </ul>
      </nav>
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

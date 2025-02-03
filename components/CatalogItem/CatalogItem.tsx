import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import styles from './CatalogItem.module.scss';

export default function CatalogItem() {
  return (
    <div className={styles['catalog-item']}>
      <div
        className={`${styles['catalog-item__badge']} ${styles['catalog-item__badge--blue']}`}
      >
        <Icon icon="mdi:gift" />
      </div>
      <Image
        src="https://zen.wego.com/cdn-cgi/image/width=600/web/mock/exam/drink.jpg"
        alt="Sushi"
        width="300"
        height="200"
        className={styles['catalog-item__image']}
      />
      <div className={styles['catalog-item__info']}>
        <h2 className={styles['catalog-item__title']}>Sushi Place</h2>
        <div className={styles['catalog-item__label']}>
          <div className={styles['catalog-item__label-item']}>
            <Icon icon="mdi:star" />
            4.5
          </div>
          <div className={styles['catalog-item__label-item']}>40-50 min</div>
        </div>
      </div>
    </div>
  );
}

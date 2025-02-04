import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Food, FoodPromotion } from '@/types/food';
import styles from './CatalogItem.module.scss';

const Badge = ({ promotion }: { promotion: FoodPromotion }) => {
  if (!promotion) return null;

  const badgeClassModifier = {
    gift: styles['catalog-item__badge--blue'],
    discount: styles['catalog-item__badge--red'],
    '1+1': styles['catalog-item__badge--purple'],
  }[promotion];

  const badgeContent = {
    discount: '%',
    gift: <Icon icon="mdi:gift" />,
    '1+1': '1+1',
  }[promotion];

  return (
    <div
      className={`${styles['catalog-item__badge']} ${badgeClassModifier}`}
      data-testid={`promotion-${promotion}`}
    >
      {badgeContent}
    </div>
  );
};

export default function CatalogItem({ food }: { food: Food }) {
  return (
    <div className={styles['catalog-item']}>
      <Badge promotion={food.promotion} />
      <Image
        src={food.imageUrl}
        alt={food.name}
        width="300"
        height="200"
        className={styles['catalog-item__image']}
        data-testid="food-image"
      />
      <div className={styles['catalog-item__info']}>
        <h2 className={styles['catalog-item__title']} data-testid="food-name">
          {food.name}
        </h2>
        <div className={styles['catalog-item__label']}>
          <div
            className={styles['catalog-item__label-item']}
            data-testid="rating"
          >
            <Icon icon="mdi:star" />
            {food.rating.toFixed(1)}
          </div>
          <div
            className={styles['catalog-item__label-item']}
            data-testid="cook-time"
          >
            {food.minCookTime}-{food.maxCookTime} min
          </div>
          {food.isNew && (
            <div
              className={`${styles['catalog-item__label-item']} ${styles['catalog-item__label-item--green']}`}
              data-testid="new-label"
            >
              New
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

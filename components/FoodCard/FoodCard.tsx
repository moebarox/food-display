import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Food, FoodPromotion } from '@/types/food';
import styles from './FoodCard.module.scss';

const Badge = ({ promotion }: { promotion: FoodPromotion }) => {
  if (!promotion) return null;

  const badgeClassModifier = {
    gift: styles['food-card__badge--blue'],
    discount: styles['food-card__badge--red'],
    '1+1': styles['food-card__badge--purple'],
  }[promotion];

  const badgeContent = {
    discount: '%',
    gift: <Icon icon="mdi:gift" />,
    '1+1': '1+1',
  }[promotion];

  return (
    <div
      className={`${styles['food-card__badge']} ${badgeClassModifier}`}
      data-testid={`promotion-${promotion}`}
    >
      {badgeContent}
    </div>
  );
};

export default function FoodCard({ food }: { food: Food }) {
  return (
    <div className={styles['food-card']} data-testid={`food-card-${food.id}`}>
      <Badge promotion={food.promotion} />
      <Image
        src={food.imageUrl}
        alt={food.name}
        width="300"
        height="200"
        className={styles['food-card__image']}
        data-testid="food-image"
      />
      <div className={styles['food-card__info']}>
        <h2 className={styles['food-card__title']} data-testid="food-name">
          {food.name}
        </h2>
        <div className={styles['food-card__label']}>
          <div className={styles['food-card__label-item']} data-testid="rating">
            <Icon icon="mdi:star" />
            {food.rating.toFixed(1)}
          </div>
          <div
            className={styles['food-card__label-item']}
            data-testid="cook-time"
          >
            {food.minCookTime}-{food.maxCookTime} min
          </div>
          {food.isNew && (
            <div
              className={`${styles['food-card__label-item']} ${styles['food-card__label-item--green']}`}
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

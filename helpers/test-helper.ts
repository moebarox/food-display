import { Food } from '@/types/food';

export const generateFood = (override?: Partial<Food>): Food => ({
  id: '1',
  index: 0,
  categoryId: '1',
  restaurant: 'Restaurant Name',
  name: 'Food Name',
  imageUrl: 'https://via.placeholder.com/300x200',
  rating: 4.5657,
  minCookTime: 10,
  maxCookTime: 20,
  isNew: false,
  promotion: null,
  ...override,
});

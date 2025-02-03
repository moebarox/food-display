export interface Food {
  id: string;
  index: number;
  rating: number;
  promotion: string | null;
  isNew: boolean;
  categoryId: string;
  minCookTime: number;
  maxCookTime: number;
  restaurant: string;
  name: string;
  imageUrl: string;
}

export interface FoodAPIResponse {
  foods: Food[];
}

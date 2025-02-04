export type FoodPromotion = 'gift' | 'discount' | '1+1' | null;

export interface Food {
  id: string;
  index: number;
  rating: number;
  promotion: FoodPromotion;
  isNew: boolean;
  categoryId: string;
  minCookTime: number;
  maxCookTime: number;
  restaurant: string;
  name: string;
  imageUrl: string;
}

export interface FoodAPIRequest {
  keywords?: string;
  category?: string;
  offset?: number;
}

export interface FoodAPIResponse {
  foods: Food[];
}

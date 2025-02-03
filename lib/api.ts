import axios from 'axios';
import { Category } from '@/types/category';
import { Food, FoodAPIRequest, FoodAPIResponse } from '@/types/food';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get<Category[]>(
      'https://gist.githubusercontent.com/wilson-wego/f7381fcead7a47a7df257a97a033456a/raw/33cd31ce75ba72a809d48944463b53b74b9ccae8/categories.json'
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFoods = async (params: FoodAPIRequest): Promise<Food[]> => {
  try {
    const { data } = await axios.get<FoodAPIResponse>(
      'https://gist.githubusercontent.com/wilson-wego/8311b463cd331099e34a1f251dad4cbf/raw/f1b04f9afe0fcc0c9270cb486b927641b7d27436/food.json'
    );

    // filter the data to simulate pagination
    const limit = 9;
    const offset = params.offset ?? 0;
    const category = params.category ?? '';
    const keywords = params.keywords?.trim() ?? '';

    return data.foods
      .filter((food) => {
        if (category && food.categoryId !== category) {
          return false;
        }
        return true;
      })
      .filter((food) => {
        if (
          keywords &&
          !food.name.toLowerCase().includes(keywords.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .slice(offset, offset + limit);
  } catch (error) {
    console.error(error);
    return [];
  }
};

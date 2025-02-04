import axios from 'axios';
import { getCategories, getFoods } from '@/lib/api';

jest.mock('axios');
global.console.error = jest.fn();

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('API Library', () => {
  describe('getCategories', () => {
    it('fetches categories', async () => {
      mockAxios.get.mockResolvedValueOnce({
        data: [
          { id: '1', name: 'Category 1' },
          { id: '2', name: 'Category 2' },
          { id: '3', name: 'Category 3' },
        ],
      });
      const categories = await getCategories();
      expect(categories).toHaveLength(3);
    });

    it('handles error', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Network Error'));
      const categories = await getCategories();
      expect(categories).toEqual([]);
    });
  });

  describe('getFoods', () => {
    it('fetches foods', async () => {
      mockAxios.get.mockResolvedValueOnce({
        data: {
          foods: [
            { id: '1', name: 'Food 1', categoryId: '1' },
            { id: '2', name: 'Food 2', categoryId: '2' },
            { id: '3', name: 'Food 3', categoryId: '3' },
          ],
        },
      });
      const foods = await getFoods({ keywords: '', category: '', offset: 0 });
      expect(foods).toHaveLength(3);
    });

    it('handles error', async () => {
      mockAxios.get.mockRejectedValueOnce(new Error('Network Error'));
      const foods = await getFoods({ keywords: '', category: '', offset: 0 });
      expect(foods).toEqual([]);
    });

    it('filters foods by category', async () => {
      mockAxios.get.mockResolvedValueOnce({
        data: {
          foods: [
            { id: '1', name: 'Food 1', categoryId: '1' },
            { id: '2', name: 'Food 2', categoryId: '2' },
            { id: '3', name: 'Food 3', categoryId: '3' },
          ],
        },
      });
      const foods = await getFoods({ keywords: '', category: '2', offset: 0 });
      expect(foods).toHaveLength(1);
    });

    it('filters foods by keywords', async () => {
      mockAxios.get.mockResolvedValueOnce({
        data: {
          foods: [
            {
              id: '1',
              name: 'Food 1',
              categoryId: '1',
              restaurant: 'Restaurant 1',
            },
            {
              id: '2',
              name: 'Food 2',
              categoryId: '2',
              restaurant: 'Restaurant 2',
            },
            {
              id: '3',
              name: 'Food 3',
              categoryId: '3',
              restaurant: 'Restaurant 3',
            },
          ],
        },
      });
      const foods = await getFoods({
        keywords: 'restaurant 2',
        category: '',
        offset: 0,
      });
      expect(foods).toHaveLength(1);
    });

    it('paginates foods', async () => {
      mockAxios.get.mockResolvedValueOnce({
        data: {
          foods: [
            { id: '1', name: 'Food 1', categoryId: '1' },
            { id: '2', name: 'Food 2', categoryId: '2' },
            { id: '3', name: 'Food 3', categoryId: '3' },
          ],
        },
      });
      const foods = await getFoods({ keywords: '', category: '', offset: 1 });
      expect(foods).toHaveLength(2);
    });
  });
});

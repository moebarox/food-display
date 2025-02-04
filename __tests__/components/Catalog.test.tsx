import { fireEvent, render, screen, act } from '@testing-library/react';
import Catalog from '@/components/Catalog';
import { Food } from '@/types/food';

const mockGetFoods = jest.fn();

jest.mock('@/lib/api', () => ({
  getFoods: jest.fn(() => mockGetFoods()),
}));

jest.mock('@iconify/react/dist/iconify.js', () => ({
  Icon: () => <span />,
}));

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ''),
    set: jest.fn(),
    toString: jest.fn(() => ''),
  })),
}));

const generateFood = (override?: Partial<Food>): Food => ({
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

describe('Catalog Component', () => {
  it('renders a catalog item card', () => {
    const food = generateFood();
    render(<Catalog initialFoods={[food]} />);

    const catalogItem = screen.getByTestId('catalog-item-1');

    expect(catalogItem).toBeInTheDocument();
  });

  it('renders a show more button', () => {
    const foods = Array(9)
      .fill(null)
      .map((_, idx) => generateFood({ id: idx.toString() }));
    render(<Catalog initialFoods={foods} />);

    const catalogItems = screen.getAllByTestId(/catalog-item-\w+/);
    const button = screen.getByRole('button');

    expect(catalogItems).toHaveLength(9);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('+ Show More');
  });

  it('handles load more', async () => {
    mockGetFoods.mockResolvedValueOnce([generateFood({ id: '10' })]);
    const foods = Array(9)
      .fill(null)
      .map((_, idx) => generateFood({ id: idx.toString() }));

    render(<Catalog initialFoods={foods} />);

    const button = screen.getByRole('button');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockGetFoods).toHaveBeenCalled();

    const catalogItems = screen.getAllByTestId(/catalog-item-\w+/);

    expect(catalogItems).toHaveLength(10);
  });
});

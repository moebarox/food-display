import { render, screen } from '@testing-library/react';
import FoodCard from '@/components/FoodCard';
import { generateFood } from '@/helpers/test-helper';

jest.mock('@iconify/react/dist/iconify.js', () => ({
  Icon: () => <span />,
}));

describe('FoodCard Component', () => {
  it('renders a food card', () => {
    const food = generateFood();
    render(<FoodCard food={food} />);

    const image = screen.getByTestId('food-image');
    const name = screen.getByTestId('food-name');
    const rating = screen.getByTestId('rating');
    const cookTime = screen.getByTestId('cook-time');

    expect(image).toBeInTheDocument();
    expect(name).toHaveTextContent('Food Name');
    expect(rating).toHaveTextContent('4.6');
    expect(cookTime).toHaveTextContent('10-20 min');
  });

  it('renders a food card with gift promotion', () => {
    const food = generateFood({ promotion: 'gift' });
    render(<FoodCard food={food} />);

    const badge = screen.getByTestId('promotion-gift');
    expect(badge).toBeInTheDocument();
  });

  it('renders a food card with discount promotion', () => {
    const food = generateFood({ promotion: 'discount' });
    render(<FoodCard food={food} />);

    const badge = screen.getByTestId('promotion-discount');
    expect(badge).toBeInTheDocument();
  });

  it('renders a food card with 1+1 promotion', () => {
    const food = generateFood({ promotion: '1+1' });
    render(<FoodCard food={food} />);

    const badge = screen.getByTestId('promotion-1+1');
    expect(badge).toBeInTheDocument();
  });

  it('renders a food card with new label', () => {
    const food = generateFood({ isNew: true });
    render(<FoodCard food={food} />);

    const newLabel = screen.getByTestId('new-label');
    expect(newLabel).toBeInTheDocument();
  });
});

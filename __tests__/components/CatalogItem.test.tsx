import { render, screen } from '@testing-library/react';
import CatalogItem from '@/components/CatalogItem';
import { generateFood } from '@/helpers/test';

jest.mock('@iconify/react/dist/iconify.js', () => ({
  Icon: () => <span />,
}));

describe('CatalogItem Component', () => {
  it('renders a catalog item card', () => {
    const food = generateFood();
    render(<CatalogItem food={food} />);

    const image = screen.getByTestId('food-image');
    const name = screen.getByTestId('food-name');
    const rating = screen.getByTestId('rating');
    const cookTime = screen.getByTestId('cook-time');

    expect(image).toBeInTheDocument();
    expect(name).toHaveTextContent('Food Name');
    expect(rating).toHaveTextContent('4.6');
    expect(cookTime).toHaveTextContent('10-20 min');
  });

  it('renders a catalog item with gift promotion', () => {
    const food = generateFood({ promotion: 'gift' });
    render(<CatalogItem food={food} />);

    const badge = screen.getByTestId('promotion-gift');
    expect(badge).toBeInTheDocument();
  });

  it('renders a catalog item with discount promotion', () => {
    const food = generateFood({ promotion: 'discount' });
    render(<CatalogItem food={food} />);

    const badge = screen.getByTestId('promotion-discount');
    expect(badge).toBeInTheDocument();
  });

  it('renders a catalog item with 1+1 promotion', () => {
    const food = generateFood({ promotion: '1+1' });
    render(<CatalogItem food={food} />);

    const badge = screen.getByTestId('promotion-1+1');
    expect(badge).toBeInTheDocument();
  });

  it('renders a catalog item with new label', () => {
    const food = generateFood({ isNew: true });
    render(<CatalogItem food={food} />);

    const newLabel = screen.getByTestId('new-label');
    expect(newLabel).toBeInTheDocument();
  });
});

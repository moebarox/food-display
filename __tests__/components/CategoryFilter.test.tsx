import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '@/components/CategoryFilter';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ''),
    set: jest.fn(),
    toString: jest.fn(() => ''),
  })),
}));

const categories = [
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
  { id: '3', name: 'Category 3' },
];

describe('CategoryFilter Component', () => {
  it('renders category options', () => {
    render(<CategoryFilter categories={categories} />);

    const radios = screen.getAllByRole('radio');

    expect(radios).toHaveLength(4);
  });

  it('handles click event on category', () => {
    render(<CategoryFilter categories={categories} />);

    const radio = screen.getByDisplayValue('1');

    fireEvent.click(radio);

    expect(mockPush).toHaveBeenCalledWith('/?category=1');
  });
});

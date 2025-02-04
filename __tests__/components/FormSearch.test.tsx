import { render, screen, fireEvent } from '@testing-library/react';
import FormSearch from '@/components/FormSearch';

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

describe('FormSearch Component', () => {
  it('renders a search form', () => {
    render(<FormSearch />);

    const searchbox = screen.getByTestId('searchbox');
    const button = screen.getByTestId('search-button');

    expect(searchbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('handles click event on search button', () => {
    render(<FormSearch />);

    const searchbox = screen.getByTestId('searchbox');
    const button = screen.getByTestId('search-button');

    fireEvent.change(searchbox, { target: { value: 'restaurant' } });

    expect(searchbox).toHaveValue('restaurant');

    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/?keywords=restaurant');
  });

  it('handles press enter on searchbox', () => {
    render(<FormSearch />);

    const searchbox = screen.getByTestId('searchbox');

    fireEvent.change(searchbox, { target: { value: 'restaurant' } });

    expect(searchbox).toHaveValue('restaurant');

    fireEvent.keyDown(searchbox, { key: 'Enter', code: 'Enter' });
    expect(mockPush).toHaveBeenCalledWith('/?keywords=restaurant');
  });
});

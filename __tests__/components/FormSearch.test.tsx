import { render, screen, fireEvent } from '@testing-library/react';
import FormSearch from '@/components/FormSearch';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push,
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

    const searchbox = screen.getByRole('searchbox');
    const button = screen.getByRole('button');

    expect(searchbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('handles click event on search button', () => {
    render(<FormSearch />);

    const searchbox = screen.getByRole('searchbox');
    const button = screen.getByRole('button');

    fireEvent.change(searchbox, { target: { value: 'restaurant' } });

    expect(searchbox).toHaveValue('restaurant');

    button.click();

    expect(push).toHaveBeenCalledWith('/?keywords=restaurant');
  });

  it('handles press enter on searchbox', () => {
    render(<FormSearch />);

    const searchbox = screen.getByRole('searchbox');

    fireEvent.change(searchbox, { target: { value: 'restaurant' } });

    expect(searchbox).toHaveValue('restaurant');

    fireEvent.keyDown(searchbox, { key: 'Enter', code: 'Enter' });
    expect(push).toHaveBeenCalledWith('/?keywords=restaurant');
  });
});

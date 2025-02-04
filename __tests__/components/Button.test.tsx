import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button Component', () => {
  it('renders a button', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  it('renders a loading button', () => {
    render(<Button isLoading>Click me</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveTextContent('Loading...');
  });

  it('handles click event', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');

    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

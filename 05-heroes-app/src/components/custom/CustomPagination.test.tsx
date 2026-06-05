import type { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomPagination } from './CustomPagination';

// Como usa useSearchParams, ysa el contexto del router, hay que prepararlo
const renderWithRouter = (
  component: React.ReactElement,
  initialEntries?: string[],
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>,
  );
};

// Hacemos un mock para shadcn
vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));

describe('CustomPagination', () => {
  test('should render component with default values', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();
  });

  test('should disabled previous button when page is 1', () => {
    renderWithRouter(<CustomPagination totalPages={5} />);

    const previusButton = screen.getByText('Previous');

    // Como la propiedd 'disables aparece, significa que esta aplicada, si una propiedad no aparece,
    // es porque no esta aplicada
    // screen.debug(previusButton);
    // console.log(previusButton.getAttributeNames());
    expect(previusButton.getAttributeNames()).toContain('disabled');
  });

  test('should disabled next button when is the last page', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5']);

    const nextButton = screen.getByText('Next');
    expect(nextButton.getAttributeNames()).toContain('disabled');
  });

  test('should has attribute "variant" set to "default" for button 3 when is the page 3', () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);

    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');

    expect(button2.getAttribute('variant')).toBe('outline');
    expect(button3.getAttribute('variant')).toBe('default');
  });

  test('should change page when click on number button', () => {
    renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3']);
    const button2 = screen.getByText('2');
    const button3 = screen.getByText('3');
    expect(button2.getAttribute('variant')).toBe('outline');
    expect(button3.getAttribute('variant')).toBe('default');

    fireEvent.click(button2);

    expect(button2.getAttribute('variant')).toBe('default');
    expect(button3.getAttribute('variant')).toBe('outline');
  });
});

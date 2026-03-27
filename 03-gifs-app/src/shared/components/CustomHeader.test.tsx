import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
  const title = 'Test Title';

  test('should render the header with the correct title', () => {
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  test('should render the subtitle when provided', () => {
    const subtitle = 'Test Subtitle';
    render(<CustomHeader title={title} subtitle={subtitle} />);

    expect(screen.getByText(subtitle)).toBeDefined();
  });

  test('should render the description when provided', () => {
    const description = 'Test Description';
    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(description);
  });

  test('should not render the description when no provided', () => {
    const title = 'Test Title';
    const { container } = render(<CustomHeader title={title} />);

    const divElement = container.querySelector('.content-center');
    const h1Element = divElement?.querySelector('h1');
    const pElement = divElement?.querySelector('p');
    expect(h1Element?.innerHTML).toBe(title);
    expect(pElement).toBeNull();
  });
});

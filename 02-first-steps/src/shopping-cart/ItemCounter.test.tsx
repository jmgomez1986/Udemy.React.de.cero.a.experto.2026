import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ItemCounter } from './ItemCounter';

describe('ItemCounter component', () => {
  test('should render with default values', () => {
    const productName = 'Test Product';
    const productQuantity = 0;

    render(<ItemCounter productName={productName} />);

    expect(screen.getByText(productName)).toBeDefined();
    expect(screen.getByText(productName)).not.toBeNull();
    expect(screen.getByText(productQuantity)).toBeDefined();
  });

  test('should render with custom quantity', () => {
    const productName = 'Test Product';
    const productQuantity = 10;

    render(
      <ItemCounter
        productName={productName}
        productQuantity={productQuantity}
      />,
    );

    expect(screen.getByText(productQuantity)).toBeDefined();
  });

  test('should increase count when "+1 button" is pressed', () => {
    const productName = 'Test Product';
    const productQuantity = 0;

    render(
      <ItemCounter
        productName={productName}
        productQuantity={productQuantity}
      />,
    );

    const [, buttonAdd] = screen.getAllByRole('button');
    fireEvent.click(buttonAdd);

    expect(screen.getByText('1')).toBeDefined();
  });

  test('should decrease count when "-1 button" is pressed', () => {
    const productName = 'Test product';
    const productQuantity = 10;

    render(
      <ItemCounter
        productName={productName}
        productQuantity={productQuantity}
      />,
    );

    const [buttonSubtract] = screen.getAllByRole('button');
    fireEvent.click(buttonSubtract);

    expect(screen.getByText('9')).toBeDefined();
  });

  test('should not decrease count when "-1 button" is pressed and quantity is 0', () => {
    const productName = 'Test Product';
    const productQuantity = 0;

    render(
      <ItemCounter
        productName={productName}
        productQuantity={productQuantity}
      />,
    );

    const [buttonSubtract] = screen.getAllByRole('button');
    fireEvent.click(buttonSubtract);

    expect(screen.getByText('0')).toBeDefined();
  });

  test('should change to colour "red" when quantity is 0', () => {
    const productName = 'Test Product';
    const productQuantity = 0;

    render(
      <ItemCounter
        productName={productName}
        productQuantity={productQuantity}
      />,
    );

    const itemText = screen.getByText(productName);
    expect(itemText.style.color).toBe('red');
  });

  test('should change to colour "black" when quantity is greater than 0', () => {
    const productName = 'Test Product';
    const productQuantity = 1;

    render(
      <ItemCounter
        productName={productName}
        productQuantity={productQuantity}
      />,
    );

    const itemText = screen.getByText(productName);
    expect(itemText.style.color).toBe('black');
  });
});

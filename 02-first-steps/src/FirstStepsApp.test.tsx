/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { FirstStepsApp } from './FirstStepsApp';

interface Props {
  productName: string;
  productQuantity: number;
}

// vi.mock('./shopping-cart/ItemCounter', () => ({
//   ItemCounter: (props: Props) => (
//     <div
//       data-testid='item-counter'
//       data-product-name={props.productName}
//       data-product-quantity={props.productQuantity}
//     >
//       Mocked ItemCounter
//     </div>
//   ),
// }));

const mockItemCounter = vi.fn((_props: Props) => {
  return <div data-testid="item-counter">Mocked ItemCounter</div>;
});

vi.mock('./shopping-cart/ItemCounter', () => ({
  ItemCounter: (props: Props) => mockItemCounter(props),
}));

describe('FirstStepsApp', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should match snapshot', () => {
    const { container } = render(<FirstStepsApp />);
    expect(container).toMatchSnapshot();
  });

  test('should render to correct number of "ItemCounter" components', () => {
    render(<FirstStepsApp />);

    const itemCounters = screen.getAllByTestId('item-counter');
    expect(itemCounters.length).toBe(3);
  });

  test('should render "ItemCounter"with correct props', () => {
    render(<FirstStepsApp />);

    expect(mockItemCounter).toHaveBeenCalledTimes(3);
    expect(mockItemCounter).toHaveBeenCalledWith({
      productName: 'Nintendo Switch 2',
      productQuantity: 1,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      productName: 'Pro Controller',
      productQuantity: 0,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      productName: 'Super Smash',
      productQuantity: 3,
    });
  });
});

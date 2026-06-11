export interface PricesRanges {
  id: number;
  value: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export const PRICES_RANGES = [
  {
    id: 1,
    value: 'any',
    minPrice: undefined,
    maxPrice: undefined,
  },
  {
    id: 2,
    value: '0-50',
    minPrice: 0,
    maxPrice: 50,
  },
  {
    id: 3,
    value: '50-100',
    minPrice: 50,
    maxPrice: 100,
  },
  {
    id: 4,
    value: '100-200',
    minPrice: 100,
    maxPrice: 200,
  },
  {
    id: 5,
    value: '200+',
    minPrice: 200,
    maxPrice: undefined,
  },
];

import { useQuery } from '@tanstack/react-query';
import { getProductsAction } from '../actions/get-products.action';
import { useParams, useSearchParams } from 'react-router';
import { PRICES_RANGES } from '@/interfaces/pricesRanges.constant';

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams() || 'all';

  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const offset = (Number(page) - 1) * Number(limit);
  const sizes = searchParams.get('sizes') || undefined;
  const price = searchParams.get('price') || 'any';
  const query = searchParams.get('query') || undefined;

  let minPrice = undefined;
  let maxPrice = undefined;

  const priceFinded = PRICES_RANGES.find(
    (priceRange) => priceRange.value === price,
  );

  if (priceFinded) {
    minPrice = priceFinded.minPrice;
    maxPrice = priceFinded.maxPrice;
  }

  return useQuery({
    queryKey: [
      'products',
      { offset, limit, sizes, gender, minPrice, maxPrice, query },
    ],
    queryFn: () =>
      getProductsAction({
        limit: Number.isNaN(Number(limit)) ? 9 : limit,
        offset: Number.isNaN(Number(offset)) ? 0 : offset,
        sizes,
        gender,
        minPrice,
        maxPrice,
        query,
      }),
    staleTime: 1000 * 60 * 5,
  });
};

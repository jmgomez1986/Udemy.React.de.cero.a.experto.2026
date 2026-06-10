import { CustomJumbotron } from '@/shop/components/CustomJumbotron';
import { ProductsGrid } from '@/shop/components/ProductsGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { products } from '@/temporalMocks/products.mock';

export const HomePage = () => {
  return (
    <>
      <CustomJumbotron title='Todos los proctos' />

      <ProductsGrid products={products} />

      <CustomPagination totalPages={7} />
    </>
  );
};

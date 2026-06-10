import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomJumbotron } from '@/shop/components/CustomJumbotron';
import { ProductsGrid } from '@/shop/components/ProductsGrid';
import { products } from '@/temporalMocks/products.mock';
import { useParams } from 'react-router';

const genderList = [
  {
    id: 'all',
    label: 'Todos los productos',
  },
  {
    id: 'men',
    label: 'Hombres',
  },
  {
    id: 'women',
    label: 'Mujeres',
  },
  {
    id: 'kid',
    label: 'Niños',
  },
];

export const GenderPage = () => {
  const { gender } = useParams() || 'all';

  const genderLabel =
    genderList.find((genderElement) => genderElement.id === gender)?.label ??
    genderList[0].label;

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />

      <ProductsGrid products={products} />

      <CustomPagination totalPages={7} />
    </>
  );
};

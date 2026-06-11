import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomJumbotron } from '@/shop/components/CustomJumbotron';
import { ProductsGrid } from '@/shop/components/ProductsGrid';
import { useProducts } from '@/shop/hooks/useProducts';
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
  const { data } = useProducts();

  const genderLabel =
    genderList.find((genderElement) => genderElement.id === gender)?.label ??
    genderList[0].label;

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />

      <ProductsGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 1} />
    </>
  );
};

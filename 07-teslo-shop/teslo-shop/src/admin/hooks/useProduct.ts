import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductByIdAction } from '../actions/get-product-by-id.action';
import { createUpdateProductAction } from '../actions/create-update-product.action';
import type { Product } from '@/interfaces/product.interface';

/******************
 *  El useQuery se usa cuando quieres hacer peticiones get o sea básicamente para obtener data y mostrarla
 * mientras que el useMutation es para cuando necesitas hacer cambios en la data como crear un registro nuevo,
 * actualizar algo existente o borrar, básicamente los queries son para leer y las mutations para escribir o
 * modificar.
 ******************/

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      // Invalidar cache: se vuelven a hacer las peticiones donde tienen las keys que se especifican
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      queryClient.invalidateQueries({
        queryKey: ['product', { id: product.id }],
      });
      // Actualizar queryData
      queryClient.setQueryData(
        [
          'products',
          {
            id: product.id,
          },
        ],
        product,
      );
    },
  });

  return {
    ...query,
    mutation,
  };
};

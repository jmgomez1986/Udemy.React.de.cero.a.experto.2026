import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'react-router';

export const FilterSidebar = () => {
  // Obtener los parametros de la URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Obtengo un string y con el split cor comas, queda en un arreglo con cada talla como un elemento, y si no viene,
  // es un arreglo vacion, o sea que siempre tenemos un arreglo
  const currentSizes = searchParams.get('sizes')?.split(',') || []; // xl,xs,l
  const currentPrice = searchParams.get('price') || 'any';

  const handleSizesChanged = (size: string) => {
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];

    searchParams.set('sizes', newSizes.join(','));
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePriceChanged = (price: string) => {
    searchParams.set('price', price);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const sizes = [
    { id: 'xs', label: 'XS' },
    { id: 's', label: 'S' },
    { id: 'm', label: 'M' },
    { id: 'l', label: 'L' },
    { id: 'xl', label: 'XL' },
    { id: 'xxl', label: 'XXL' },
  ];

  return (
    <div className='w-64 space-y-6'>
      <div>
        <h3 className='font-semibold text-lg mb-4'>Filtros</h3>
      </div>

      {/* Sizes */}
      <div className='space-y-4'>
        <h4 className='font-medium'>Tallas</h4>
        <div className='grid grid-cols-3 gap-2'>
          {sizes.map((size) => (
            <Button
              key={size.id}
              variant={currentSizes.includes(size.id) ? 'default' : 'outline'}
              size='sm'
              className='h-8'
              onClick={() => handleSizesChanged(size.id)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className='space-y-4'>
        <h4 className='font-medium'>Precio</h4>
        {/* El radiobutton checked se asigna en el padre y no en el item */}
        <RadioGroup defaultValue='' className='space-y-3' value={currentPrice}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='any'
              id='priceAny'
              onClick={() => handlePriceChanged('any')}
            />
            <Label htmlFor='priceAny' className='text-sm cursor-pointer'>
              Cualquier precio
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='0-50'
              id='price1'
              onClick={() => handlePriceChanged('0-50')}
            />
            <Label htmlFor='price1' className='text-sm cursor-pointer'>
              $0 - $50
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='50-100'
              id='price2'
              onClick={() => handlePriceChanged('50-100')}
            />
            <Label htmlFor='price2' className='text-sm cursor-pointer'>
              $50 - $100
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='100-200'
              id='price3'
              onClick={() => handlePriceChanged('100-200')}
            />
            <Label htmlFor='price3' className='text-sm cursor-pointer'>
              $100 - $200
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem
              value='200+'
              id='price4'
              onClick={() => handlePriceChanged('200+')}
            />
            <Label htmlFor='price4' className='text-sm cursor-pointer'>
              $200+
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

// Propuesta de un usuario donde valida que no se tenga una URL con data invalida usando useLayoutEffect de React
/*
useLayoutEffect: Es una versión síncrona de useEffect. Se ejecuta inmediatamente después de que React evalúe los cambios
                 en el DOM, pero antes de que el navegador tenga la oportunidad de pintar la interfaz en la pantalla.
                 Puede afectar el desempeño. Se prefiere el uso de useEffect cuando sea posible.
*/

// import { Button } from '../../components/ui/button';
// import { Separator } from '../../components/ui/separator';
// import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
// import { Label } from '../../components/ui/label';
// import { useSearchParams } from 'react-router';
// import { useLayoutEffect } from 'react';

// export const FilterSidebar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleSizeChanged = (size: string) => {
//     const newSizes = currentSizes.includes(size)
//       ? currentSizes.filter((s) => s !== size)
//       : [...currentSizes, size];

//     const newParams = new URLSearchParams(searchParams);

//     // --- Reset page ---
//     newParams.set('page', '1');

//     // --- Mantener price válido ---
//     const priceParam = newParams.get('price');
//     if (!priceParam || !prices.includes(priceParam)) {
//       newParams.set('price', 'any');
//     }

//     // --- Actualizar sizes ---
//     if (newSizes.length > 0) {
//       newParams.set('sizes', newSizes.join(','));
//     } else {
//       newParams.delete('sizes'); // eliminar si queda vacío
//     }

//     setSearchParams(newParams);
//   };

//   const handlePriceChange = (price: string) => {
//     searchParams.set('page', '1');
//     searchParams.set('price', price);
//     setSearchParams(searchParams);
//   };

//   const sizes = [
//     { id: 'xs', label: 'XS' },
//     { id: 's', label: 'S' },
//     { id: 'm', label: 'M' },
//     { id: 'l', label: 'L' },
//     { id: 'xl', label: 'XL' },
//     { id: 'xxl', label: 'XXL' },
//   ];

//   const validSizeIds = sizes.map((s) => s.id);

//   // Obtenemos los tamaños actuales del query param
//   const currentSizes = (searchParams.get('sizes')?.split(',') || []).filter(
//     (s) => validSizeIds.includes(s),
//   );

//   const prices = ['any', '0-50', '50-100', '100-200', '200+'];
//   const priceParam = searchParams.get('price') || 'any';

//   // 2️⃣ Efecto para corregir URL si no es válido
//   useLayoutEffect(() => {
//     const params = new URLSearchParams(window.location.search);

//     // --- Validar Price ---
//     const priceParam = params.get('price');
//     if (!priceParam || !prices.includes(priceParam)) {
//       params.set('price', 'any'); // nunca quedará price=
//     }

//     // --- Validar Sizes ---
//     const sizesParam = params.get('sizes') ?? '';
//     const newSizes = sizesParam
//       .split(',')
//       .filter((s) => validSizeIds.includes(s));

//     if (newSizes.length === 0) {
//       params.delete('sizes'); // eliminar si queda vacío
//     } else {
//       params.set('sizes', newSizes.join(','));
//     }

//     // --- Actualizamos la URL solo si hay cambios ---
//     const newSearch = params.toString();
//     if (newSearch !== window.location.search.replace(/^\?/, '')) {
//       setSearchParams(params);
//     }
//   }, []); // solo al montar

//   const currentPrice = priceParam;

//   return (
//     <div className='w-64 space-y-6'>
//       <div>
//         <h3 className='font-semibold text-lg mb-4'>Filtros</h3>
//       </div>

//       {/* Sizes */}
//       <div className='space-y-4'>
//         <h4 className='font-medium'>Tallas</h4>
//         <div className='grid grid-cols-3 gap-2'>
//           {sizes.map((size) => (
//             <Button
//               key={size.id}
//               variant={currentSizes.includes(size.id) ? 'default' : 'outline'}
//               size='sm'
//               className='h-8'
//               onClick={() => handleSizeChanged(size.id)}
//             >
//               {size.label}
//             </Button>
//           ))}
//         </div>
//       </div>

//       <Separator />

//       {/* Price Range */}
//       <div className='space-y-4'>
//         <h4 className='font-medium'>Precio</h4>
//         <RadioGroup value={currentPrice} className='space-y-3'>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem
//               value='any'
//               id='priceAny'
//               onClick={() => handlePriceChange('any')}
//             />
//             <Label htmlFor='priceAny' className='text-sm cursor-pointer'>
//               Cualquier precio
//             </Label>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem
//               value='0-50'
//               id='price1'
//               onClick={() => handlePriceChange('0-50')}
//             />
//             <Label htmlFor='price1' className='text-sm cursor-pointer'>
//               $0 - $50
//             </Label>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem
//               value='50-100'
//               id='price2'
//               onClick={() => handlePriceChange('50-100')}
//             />
//             <Label htmlFor='price2' className='text-sm cursor-pointer'>
//               $50 - $100
//             </Label>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem
//               value='100-200'
//               id='price3'
//               onClick={() => handlePriceChange('100-200')}
//             />
//             <Label htmlFor='price3' className='text-sm cursor-pointer'>
//               $100 - $200
//             </Label>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <RadioGroupItem
//               value='200+'
//               id='price4'
//               onClick={() => handlePriceChange('200+')}
//             />
//             <Label htmlFor='price4' className='text-sm cursor-pointer'>
//               $200+
//             </Label>
//           </div>
//         </RadioGroup>
//       </div>
//     </div>
//   );
// };

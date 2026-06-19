export const currencyFormatter = (value: number) => {
  return value.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'ARG',
    minimumFractionDigits: 2,
  });
};

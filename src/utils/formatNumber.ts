export const formatNumber = (num: number): string => {
  const str = num.toFixed(2);
  const [integer, decimal] = str.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedInteger}.${decimal}`;
};

export const formatCurrency = (num: number): string => {
  return `$${formatNumber(num)}`;
};

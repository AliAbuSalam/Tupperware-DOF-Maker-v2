const parseToRp = (number) => {
  const currencyInIDR = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'IDR'
  }).format(number);

  const parsedToRp = currencyInIDR.replace('IDR', 'Rp.');
  return parsedToRp
};

export default parseToRp;
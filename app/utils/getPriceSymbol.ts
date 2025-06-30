// app/utils/getPriceSymbol.ts
export const getPriceSymbol = (range: string) => {
  switch(range) {
    case 'budget': return '€';
    case 'mid': return '€€';
    case 'high': return '€€€';
    case 'luxury': return '€€€€';
    default: return '€';
  }
};


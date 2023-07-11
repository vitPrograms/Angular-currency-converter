interface Currency {
    value: string;
    symbol: string;
}

export const currenciesData = [
    { value: 'USD', symbol: '$' },
    { value: 'EUR', symbol: '€' },
    { value: 'UAH', symbol: '₴' }
];

export const currencies: Currency[] = currenciesData.map((cur) => ({
    value: cur.value,
    symbol: cur.symbol
}));
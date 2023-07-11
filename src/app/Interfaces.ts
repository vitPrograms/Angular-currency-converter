export interface Currency {
    value: string;
    symbol: string;
}

export interface ExchangeRate {
    base: string;
    quote: string;
    bid: Number;
    ask: Number;
    mid: Number;
}

export interface CurrencyAndAmountChange {
    currency: string | undefined,
    amount: number
}
export interface ExchangeRate {
    StartDate: string;
    TimeSign: string;
    CurrencyCode: string;
    CurrencyCodeL: string;
    Units: number;
    Amount: number;
}

export interface ActiveExchangesValue {
    CurrencyCodeL: string;
    Units: number;
    Amount: number;
}
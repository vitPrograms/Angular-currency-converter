import { Injectable } from '@angular/core';
import { config } from 'src/assets/config';
import { ExchangeRate } from './Interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExchangeAPIService {
  data: ExchangeRate;
  URL = config.api
  API_KEY = config.api_key

  constructor() {
    this.data = {
      base: '',
      quote: '',
      bid: 0.0,
      ask: 0.0,
      mid: 0.0
    }
  }

  fetchExchange(curA: string, curB: string) : Promise<ExchangeRate> {
    const URI = `${this.URL}?api_key=${this.API_KEY}&base=${curA}&quote=${curB}`
    return fetch(URI)
      .then((response) => response.json())
      .then((data) => {
        this.convertRawData(data)
        return this.data
      })
      .catch(err => {
        console.error(err)
        return this.data;
      });
  }

  private convertRawData(data: any) {
    const rawData = data?.quotes[0];
    this.data = {
      base: rawData?.base_currency,
      quote: rawData?.quote_currency,
      bid:  Number(Number(rawData?.average_bid).toFixed(2)),
      ask: Number(Number(rawData?.average_ask).toFixed(2)),
      mid: Number(Number(rawData?.average_midpoint).toFixed(2)),
    };
  }
}

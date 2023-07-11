import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExchangeAPIService } from '../exchange-api.service';
import { VALUE } from 'src/assets/values';
import { ExchangeRate, Currency, CurrencyAndAmountChange } from '../Interfaces';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ConverterComponent {
  @Input() currencies!: Currency[];
  activeA: Currency | undefined;
  activeB: Currency | undefined;
  amountA: number;
  amountB: number;
  exchangeRate: ExchangeRate;

  constructor(private exchangeAPIService: ExchangeAPIService) {
    this.amountA = 0.0;
    this.amountB = 0.0;
    this.exchangeRate = {
      base: '',
      quote: '',
      bid: 0.0,
      ask: 0.0,
      mid: 0.0
    }
  }

  ngOnInit() {
    this.activeA = this.getCurrency(VALUE.USD);
    this.activeB = this.getCurrency(VALUE.UAH);
  }

  async changeActiveA(data: CurrencyAndAmountChange) {
    this.activeA = this.currencies.find(
      (cur: Currency) => cur.value === data.currency);
    this.amountA = data.amount;

    if(data.amount <= 0) return;
    this.exchangeRate = await this.getData(this.activeA?.value || '', this.activeB?.value || '')
    this.amountB = this.calculate(this.exchangeRate, data.amount);
  }

  async changeActiveB(data: CurrencyAndAmountChange) {
    this.activeB = this.currencies.find(
      (cur: Currency) => cur.value === data.currency);
    this.amountB = data.amount;

    if(data.amount <= 0) return;
    this.exchangeRate = await this.getData(this.activeB?.value || '', this.activeA?.value || '')
    this.amountA = this.calculate(this.exchangeRate, data.amount);
  }

  getCurrency(value: VALUE) : Currency | undefined {
    return this.currencies.find(
      (cur: Currency) => cur.value === value);
  }

  async getData(cur1:string, cur2:string) {
    try {
      this.exchangeRate = await this.exchangeAPIService.fetchExchange(cur1, cur2);
    }catch (error) {
      console.error(error);
    }
    return this.exchangeRate;
  }

  calculate(rate: ExchangeRate, amount: Number) {
    return Number(rate.ask) * Number(amount);
  }

}

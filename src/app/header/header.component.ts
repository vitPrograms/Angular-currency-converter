import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExchangeAPIService } from '../exchange-api.service';
import { ExchangeRate, Currency } from '../Interfaces';
import { VALUE } from 'src/assets/values';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() currencies!: Currency[];
  USD: Currency | undefined;
  EUR: Currency | undefined;
  USDtoUAH: ExchangeRate | undefined;
  EURtoUAH: ExchangeRate | undefined;

  fetchedData: ExchangeRate | undefined;

  constructor(private exchangeAPIService: ExchangeAPIService) {}

  ngOnInit() {
    this.getUSD();
    this.getEUR();
    this.getData();
  }

  getUSD() {
    this.USD = this.currencies.find(
      (cur: Currency) => cur.value === VALUE.USD);
  }

  getEUR() {
    this.EUR = this.currencies.find(
      (cur: Currency) => cur.value === VALUE.EUR);
  }

  async getData() {
    try {
      this.USDtoUAH = await this.exchangeAPIService.fetchExchange(VALUE.USD, VALUE.UAH);
      this.EURtoUAH = await this.exchangeAPIService.fetchExchange(VALUE.EUR, VALUE.UAH);
    } catch (error) {
      console.error(error)
    }
  }
}


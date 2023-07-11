import { Component, Input } from '@angular/core';
import { ExchangeRate } from '../Interfaces';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent {
  @Input() exchangeRate!: ExchangeRate;
  base = '';
  quote = '';
  ask = new Number(0);


  ngOnChanges() {
    this.base = this.exchangeRate?.base;
    this.quote = this.exchangeRate?.quote;
    this.ask = this.exchangeRate?.ask;
    console.log(this.exchangeRate)
  }
}

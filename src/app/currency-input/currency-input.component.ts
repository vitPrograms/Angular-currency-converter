import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyAndAmountChange } from '../Interfaces';
import { Currency } from '../Interfaces';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent {
  @Input() currencies!: Currency[];
  @Input() active!: Currency | undefined;
  @Input() activeB!: Currency | undefined;
  @Input() amount!: number;
  @Output() changeData: EventEmitter<CurrencyAndAmountChange> = new EventEmitter();
  timeout: any = null;
  currency: string | undefined;

  ngOnInit() {
    this.currency = this.active?.value
  }

  changeCurrency(event: any) {
    console.log('Currency changed:' + event.target.value)
    this.currency = event?.target?.value
    this.changeState()
  }

  changeAmount(event: any) {
    let amount = Number(event?.target?.value);
    if(amount < 0) {
      event.target.value = Math.abs(amount);
      amount = Math.abs(amount)
    }

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.amount = amount;
      this.changeState()
    }, 1000)
  }

  changeState() {
    this.changeData.emit({currency: this.currency, amount: this.amount});
  }
}

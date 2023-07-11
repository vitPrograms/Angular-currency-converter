import { Component, EventEmitter } from '@angular/core';
import { currencies } from 'src/assets/currencies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currencies = currencies

  constructor() {}
}

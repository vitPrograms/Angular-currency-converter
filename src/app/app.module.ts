import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent,
    ExchangeRateComponent,
    CurrencyInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

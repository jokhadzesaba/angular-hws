import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
interface RootObject {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = "rxjs";
  public users!: RootObject;
  public quantity = 0;
  public converted = 0;
  public sourceCurrency: string = 'USD';
  public targetCurrency: string = 'EUR';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  public convert() {
    if (this.sourceCurrency === this.targetCurrency) {
      this.converted = this.quantity;
    } else {
      const apiUrl = `https://v6.exchangerate-api.com/v6/e61eec28c6ec69849dcf827a/pair/${this.sourceCurrency}/${this.targetCurrency}`;
      this.http.get<RootObject>(apiUrl).subscribe((res) => {
        this.users = res;
      });
      this.converted = this.quantity * this.users.conversion_rate;
    }
  }
  public convertBack() {
    if (this.sourceCurrency === this.targetCurrency) {
      this.converted = this.quantity;
    } else {
      const apiUrl = `https://v6.exchangerate-api.com/v6/e61eec28c6ec69849dcf827a/pair/${this.sourceCurrency}/${this.targetCurrency}`;
      this.http.get<RootObject>(apiUrl).subscribe((res) => {
        this.users = res;
      });
      this.quantity = this.converted * this.users.conversion_rate;
    }
  }
  public reset() {
    this.quantity = 0;
    this.converted = 0;
  }
}

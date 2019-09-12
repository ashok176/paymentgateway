import { Component } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private iab: InAppBrowser) {}

  makePayment() {
    let name = "Customer";
    let mobile = "8762361489";
    let email = "";
    let bookingId = String(Math.floor(Math.random()*(99 - 10 + 1) + 10)) + String(1235);
    let productInfo = "this is testing";
    let salt = "ai00t5B8ht";
    let key = "Si16yXM1";
    let amt = "100";
    let surl = "http://jslindia.org/Json/successPayumoneyPayment";
    let furl = "http://jslindia.org/Json/failedPayumoney";
    let service_provider = "payu_paisa";
    let udf1 = "";
    let udf2 = "";
    let udf3 = "";
    let udf4 = "";
    let udf5 = "";
    let udf6 = "";
    let udf7 = "";
    let udf8 = "";
    let udf9 = "";
    let udf10 = "";
    
    let string = key + '|' + bookingId + '|' + amt + '|' + productInfo + '|' + name + '|' + email + '|' + udf1 + '|' + udf2 + '|' + udf3 + '|' + udf4 + '|' + udf5 + '|' + udf6 + '|' + udf7 + '|' + udf8 + '|' + udf9 + '|' + udf10 + salt;
    let encryptText = sha512.sha512(string);
    let url = "payumoney/payuBiz.html?amt="+amt+"&service_provicer="+service_provider+"$name="+name+"&surl="+surl+"&furl="+furl+"&mobileNo="+mobile+"&email="+email+"&bookingId="+bookingId+"&productinfo="+productInfo+"&hash="+encryptText+"&salt="+salt+"&key="+key; 

    let options: InAppBrowserOptions = {
      location: "yes",
      clearcache: "yes",
      zoom: "yes",
      toolbar: "no",
      closebuttoncaption: "back"
    };

    const browser: any = this.iab.create(url, '_blank', options);
    
    browser.on('loadstart').subscribe(event => {
      browser.executeScript({
        file: "payumoney/payumoneyPaymentGateway.js"
      });

      if(event.url == surl) {
        browser.close();
      }

      if(event.url == furl) {
        browser.close();
      }
    });
  }
}

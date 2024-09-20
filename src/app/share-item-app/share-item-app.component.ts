
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'app/shared/services/customer.service';
import { SelectItem, MessageService } from 'primeng/api';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { parse } from 'querystring';
import * as CryptoJS from 'crypto-js';
import { parseHttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-share-item-app',
  templateUrl: './share-item-app.component.html',
  styleUrls: ['./share-item-app.component.scss']
})
export class ShareItemAppComponent implements OnInit {


  customerid: number;
  lang: string;
  wid: number;
  destroyed: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.onInitialize();
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.onInitialize();
    });
  }


  onInitialize() {
    
    setTimeout(() => {
      window.location.href = "https://play.google.com/store/apps/details?id=app.retailer.krina.shop.com.shopkrina_retailer";   
    }, 5000);
  }
}

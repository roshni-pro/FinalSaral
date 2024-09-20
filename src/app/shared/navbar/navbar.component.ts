import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { OrangebookversionService } from '../services/orangebookversion.service';
import { WarehouseService } from '../services/warehouse.service';
import { PepolePilotService } from '../services/pepole-pilot.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  warehouses: any
  public isCollapsed = true;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
  notification: any;
  userRole: any
  constructor(public translate: TranslateService, private layoutService: LayoutService, private WarehouseService: WarehouseService, private peoplePilot: PepolePilotService
    , private configService: ConfigService, private router: Router, private orangebookversionservice: OrangebookversionService) {

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");

  }

  ngOnInit() {
    var roles = localStorage.getItem('role').split(',');
    var warehouseid = localStorage.getItem('Warehouseid');
    var role = roles ? roles.filter(x => x == 'HQ Master login' || x == 'WH Master login') : null;
    //if(role[0] == 'HQ Master login' || role[0] == 'WH Master login'){
    if (parseInt(warehouseid) == 0) {
      this.userRole = warehouseid;
    } else {
      this.userRole = null;
    }
    var warehouseids = localStorage.getItem('warehouseids');
    console.log("warehouseids++++++");
    console.log("+++++", warehouseids);
    if (warehouseids) {
      //this.warehouses= localStorage. getItem('warehouseids');
      this.warehouses = warehouseids.split(',').map(Number);
      //   this.WarehouseService.GetMultipleWarehouses().subscribe(result=>{
      //     // var wid = result.map(x => x.WarehouseId)
      //     // var a  = wid.toString();
      //     localStorage.setItem('warehouseids', result);
      //     this.warehouses= localStorage. getItem('warehouseids');
      //     this.warehouses = this.warehouses.split(',').map(Number);
      //   })
      // }else{

    }


    this.config = this.configService.templateConf;
    this.Notification();
  }

  Notification() {
    this.orangebookversionservice.NavbarNotification().subscribe(result => {
      console.log('Notification is : ', result);
      this.notification = result;
    })
  }

  ngAfterViewInit() {
    if (this.config.layout.dir) {
      const dir = this.config.layout.dir;
      if (dir === "rtl") {
        this.placement = "bottom-left";
      } else if (dir === "ltr") {
        this.placement = "bottom-right";
      }
    }
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigateByUrl('/login');
    // this.token = null;
  }


  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  Acceptance() {
    this.router.navigateByUrl('layout/orangebook/orangebookindex');
  }

  warehouseSelection() {
    this.router.navigateByUrl('layout/warehouse-selection')
  }
}
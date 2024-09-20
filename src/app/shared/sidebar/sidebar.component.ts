import { filter } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from "@angular/core";

import { ROUTES } from './sidebar-routes.config';
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from '../services/config.service';
import { UserRoleService } from '../services/user-role.service';
import { RouteInfo } from './sidebar.metadata';
import { environment } from 'environments/environment';
import { PepolePilotService } from '../services/pepole-pilot.service';
import { WarehouseService } from '../services/warehouse.service';
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('toggleIcon', { static: false }) toggleIcon: ElementRef;
  public menuItems: RouteInfo[];
  public searchedItems: RouteInfo[];
  apiURL: string;
  backendURL: string;
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  searchValue = '';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    private userRoleService: UserRoleService,
    private peoplePilot: PepolePilotService,
    private WarehouseService: WarehouseService

  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }
    this.apiURL = environment.apiURL;
  }


  ngOnInit() {
    this.backendURL = environment.apiURL;
    this.config = this.configService.templateConf;
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
    })

    this.userRoleService.getAllPagePermission().subscribe(result => {
      console.log('getAllPagePermission: ', result);
      this.menuItems = [];
      this.searchedItems = [];
      if (result && result.length > 0) {
        result.forEach(item => {
          let module: RouteInfo = {
            badge: '',
            badgeClass: '',
            class: 'has-sub',
            icon: 'ft-align-left',
            isExternalLink: false,
            path: '',
            submenu: [],
            title: item.PageName
          };
          if (item.ChildPageDcs != null && item.ChildPageDcs.length > 0) {


            item.ChildPageDcs.forEach(cPage => {
              let appender = ""
              if (!cPage.IsNewPortalUrl) {
                appender = this.backendURL + '/#/'
              } else {
                appender = '/#/'
              }
              let child: RouteInfo = {
                badge: '',
                badgeClass: '',
                class: cPage.ClassName,
                icon: '',
                isExternalLink: true,
                path: appender + cPage.RouteName,
                submenu: [],
                title: cPage.PageName
              };
              module.submenu.push(child);
            });
          }
          this.menuItems.push(module);
        })
      }
      //this.menuItems = ROUTES;
    });
    // this.menuItems = ROUTES;
    this.logoUrl = 'assets/img/logo-dark.png';

  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        }
        else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = false;
        }
      }
    }, 0);


  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1)
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
  }

  onClick(path) {
    var token = localStorage.getItem('userToken')
    var warehouseids = localStorage.getItem('warehouseids');
    var userid = localStorage.getItem('userid');
    var userName = localStorage.getItem('userName');
    var rolenames = localStorage.getItem('role');
    var Warehouseid = localStorage.getItem('Warehouseid');
    var data = path.path.split('#');
    var checkURL = this.apiURL + '/';
    var redirectto = data[1].substr(1);
    if (data[0] == checkURL) {
      redirectto = redirectto.replace(/\//g, '---');
      window.location.replace(this.apiURL + "#/LoginToken/" + token + '/' + redirectto + '/' + warehouseids + '/' + userid + '/' + userName + '/' + rolenames + '/' + Warehouseid);
    } else {
      this.router.navigateByUrl(redirectto);
    }
  }

  bindThroughSearchedArray() {
    if (this.searchValue == '' && this.menuItems && this.menuItems.length) {
      return this.menuItems;
    }
    else {
      return this.searchedItems;
    }
  }

  searchMenuItems(textValue) {
    textValue = textValue.toLowerCase();
    this.searchValue = textValue.toLowerCase();

    if (textValue.length == "") {
      this.activeTitles = [];
    }

    if (textValue.length > 2) {

      this.menuItems.forEach(menuItem => {
        if (menuItem.title.toLowerCase().includes(textValue)) {
          if (this.searchedItems.filter(searchitem => searchitem.title == menuItem.title)[0]) {
         
          }
          else {
            this.searchedItems.push(menuItem);
          };

          if (this.activeTitles.filter(searchitem => searchitem == menuItem.title)[0]) {
          }
          else {
            setTimeout(() => {
              if (!this.activeTitles.filter(item => item == menuItem.title)[0]) {
                if (menuItem.submenu.length) {
                  this.activeTitles.push(menuItem.title);
                }
              }
            }, 300);
          };

        }
        else {
          this.searchedItems = this.searchedItems.filter(searchitem => searchitem.title != menuItem.title);
          this.activeTitles = this.activeTitles.filter(searchitem => searchitem != menuItem.title);
          if (menuItem.submenu.length) {
            menuItem.submenu.forEach(submenuItem => {
              if (submenuItem.title.toLowerCase().includes(textValue)) {
                if (this.searchedItems.filter(searchitem => searchitem.title == menuItem.title)[0]) {
                }
                else {
                  setTimeout(() => {
                    if (!this.searchedItems.filter(item => item.title == menuItem.title)[0]) {
                      this.searchedItems.push(menuItem);
                    }
                  }, 300);
                };

                if (this.activeTitles.filter(searchitem => searchitem == menuItem.title)[0]) {
                }
                else {
                  setTimeout(() => {
                    if (!this.activeTitles.filter(item => item == menuItem.title)[0]) {
                      this.activeTitles.push(menuItem.title);
                    }

                  }, 300);
                };

              }
              else {
                //this.searchedItems = this.searchedItems.filter(searchitem => searchitem.title != menuItem.title);
              }
            });
          }
        }
      });
    }
  }
}

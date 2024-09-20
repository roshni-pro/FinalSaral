import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { CustomerRatingFilter, DboyRatingFilter, SalesRatingFilter, WarehouseIdDC } from 'app/rating/interface/RatingMasterDC';
import { RatingService } from 'app/rating/service/rating.service';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-customer-rating',
  templateUrl: './customer-rating.component.html',
  styleUrls: ['./customer-rating.component.scss']
})
export class CustomerRatingComponent implements OnInit {
  ratingList: any[];
  cityList: any[];
  selectedCityList: any[];
  cityIds: any[] = [];
  hubList: any[];
  selectedHubList: any[];
  hubIds: any[] = [];
  dBoyIds: any[] = [];
  clusterIds: any[] = [];
  salesIds: any[] = [];
  AppType: number;
  customerRatingFilter: CustomerRatingFilter;
  customerRatingList: any[];
  totalcount: number = 0;
  TodayDate: any;
  todaySelected: any;
  rangeDates: Date[];
  Start: any
  End: any
  clusterList: any[];
  selectedCluster: any[];
  salesPersonList: any[];
  selectedSales: any[];
  dBoyList: any[];
  selectedDBoy: any[];
  dboyRatingFilter: DboyRatingFilter;
  salesRatingFilter: SalesRatingFilter;
  warehouseIdDC: WarehouseIdDC;
  skip: number;
  Take: number;
  first: number = 0;
  Keyword: any;
  noDataFound: boolean = false;
  isSearch: boolean = false;
  exportData: any[] = [];
  cols: any[];
  isInvalid: boolean = false;
  selectedLabel: any;
  blocked: boolean = false;
  constructor(private cityService: CityService, private ratingService: RatingService,
    private exportService: ExportServiceService, private inventoryforcastserService: InventoryforcastserService) { }

  ngOnInit() {
    this.AppType = null;
    this.ratingList = [];
    // this.cols = [
    //   { field: 'OrderID', header: 'OrderID'  },     
    //   // { field: 'CountryName', header: 'CountryName' },
    //   // { field: 'ZoneName', header: 'ZoneName' },    
    //   { field: 'DeliveryBoy', header: 'DeliveryBoy' },     
    //   // { field: 'CityManagerName', header: 'CityManagerName' }
    //   { field: 'Rating', header: 'Rating' },
    //   { field: 'CustomerName', header: 'Alias Name' },     
    //   { field: 'Skcode', header: 'Skcode' },     

    // ];
    this.blocked = true;
    // this.cityService.GetActiveCity().subscribe(result => {      
    //   this.blocked = false;
    //   this.cityList = result;
    // })
    this.inventoryforcastserService.getCityList().subscribe(result => {
      this.blocked = false;
      this.cityList = result;
    })
  }
  //   customSort(event: SortEvent) {
  //     event.data.sort((data1, data2) => {
  //         let value1 = data1[event.field];
  //         let value2 = data2[event.field];
  //         let result = null;

  //         if (value1 == null && value2 != null)
  //             result = -1;
  //         else if (value1 != null && value2 == null)
  //             result = 1;
  //         else if (value1 == null && value2 == null)
  //             result = 0;
  //         else if (typeof value1 === 'string' && typeof value2 === 'string')
  //             result = value1.localeCompare(value2);
  //         else
  //             result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

  //         return (event.order * result);
  //     });
  // }
  onSelectCity(selectedCityList) {
    this.cityIds = [];
    selectedCityList.forEach(element => {
      this.cityIds.push(element.Cityid);
    });
    this.blocked = true;
    this.ratingService.getCityWiseHubList(this.cityIds).subscribe(x => {
      this.blocked = false;
      this.hubList = x;
      // this.selectedHubList = x;
      this.onSelectHub(this.selectedHubList);
      console.log('xxx', x);
    })
  }
  onSelectHub(selectedHubList) {
    this.hubIds = [];
    selectedHubList.forEach(element => {
      this.hubIds.push(element.WarehouseId);
    });
    this.warehouseIdDC = null;
    if (this.AppType == 3) {
      if (this.Start != null && this.End != null) {
        // this.Keyword = null;
        this.TodayDate = null;
      }
      if (this.Start != null && this.End == null) {
        this.End = this.Start;
        this.TodayDate = null;
      } else if (this.Start == null && this.End != null) {
        this.Start = this.End;
        this.TodayDate = null;
      }
      if (this.hubIds.length > 0 && this.hubList.length > 0) {
        this.customerRatingFilter = {
          WarehouseIds: this.hubIds,
          AppType: this.AppType,
          // OrderId : null,
          Start: this.Start ? this.Start : null,
          End: this.End ? this.End : null,
          // Mobile : null,
          // Skcode : null,
          Today: this.TodayDate ? this.TodayDate : null,
          Take: this.Take ? this.Take : 20,
          Skip: this.skip ? this.skip : 1,
          key: this.Keyword ? this.Keyword : null
        }
        this.ratingList = [];
        this.blocked = true;
        this.ratingService.getHubWiseCustomerRatingList(this.customerRatingFilter).subscribe(res => {
          this.blocked = false;
          this.ratingList = res.RatingDC;
          this.totalcount = res.total_count;
          if (this.ratingList.length == 0) {
            this.blocked = false;
            this.noDataFound = true;

          }
        });
      }
      // else{
      //   if(this.hubList.length == 0){
      //     alert('Select City First!!');
      //     this.todaySelected = null;
      //   }else{
      //     alert('Select Atleast 1 Hub!!');
      //     this.todaySelected = null;
      //   }
      // }
    }
    if (this.AppType == 2) {
      this.warehouseIdDC = {
        WarehouseIds: this.hubIds
      }
      this.blocked = true;
      this.ratingService.getHubWiseDboyList(this.warehouseIdDC).subscribe(res => {
        this.blocked = false;
        this.dBoyList = res;
        // this.selectedDBoy = res;
        this.selectedDBoy.forEach(element => {
          this.dBoyIds.push(element.DboyId);
        });
        // this.onSelectDboy(this.selectedDBoy);
      });
    }
    if (this.AppType == 1) {
      this.warehouseIdDC = {
        WarehouseIds: this.hubIds
      }
      this.blocked = true;
      this.ratingService.getHubWiseClusterList(this.warehouseIdDC).subscribe(res => {
        this.blocked = false;
        this.clusterList = res;
        // this.selectedCluster = res;
        this.onSelectCluster(this.selectedCluster);
        // this.selectedCluster.forEach(element => {
        //   this.clusterIds.push(element.ClusterId);
        // });
      });
    }

  }
  onSelectCluster(selectedCluster) {
    this.warehouseIdDC = {
      WarehouseIds: this.hubIds
    }
    selectedCluster.forEach(element => {
      this.clusterIds.push(element.ClusterId);
    });
    if (this.clusterIds.length > 0 && this.clusterList.length > 0) {
      this.blocked = true;
      this.ratingService.getHubWiseSalesPersonList(this.warehouseIdDC).subscribe(res => {
        this.blocked = false;
        this.salesPersonList = res;
        // this.selectedSales = res;
        this.onSelectSalesPerson(this.selectedSales);
      });
    }
    // else{
    //   if(this.clusterList.length == 0){
    //     alert('Select Hub First!!');
    //     this.todaySelected = null;
    //   }else{
    //     alert('Select Atleast 1 Cluster First!!');
    //     this.todaySelected = null;
    //   }

    // }
  }
  onSelectSalesPerson(selectedSales) {
    this.ratingList = [];
    this.salesIds = [];
    selectedSales.forEach(element => {
      this.salesIds.push(element.SalesId);
    });
    if (this.Start != null && this.End != null) {
      // this.Keyword = null;
      this.TodayDate = null;
    }
    if (this.Start != null && this.End == null) {
      this.End = this.Start;
      this.TodayDate = null;
    } else if (this.Start == null && this.End != null) {
      this.Start = this.End;
      this.TodayDate = null;
    }
    if (this.salesIds.length > 0 && this.salesPersonList.length > 0) {
      this.salesRatingFilter = {
        AppType: this.AppType,
        SalesIds: this.salesIds,
        Today: this.TodayDate ? this.TodayDate : null,
        Start: this.Start ? this.Start : null,
        End: this.End ? this.End : null,
        // OrderId : null,
        // Skcode : null,
        // Mobile : null,
        Take: this.Take ? this.Take : 20,
        Skip: this.skip ? this.skip : 1,
        key: this.Keyword ? this.Keyword : null
      }
      this.blocked = true;
      this.ratingService.getHubWiseSalesPersonRatingList(this.salesRatingFilter).subscribe(res => {
        this.blocked = false;
        this.ratingList = res.RatingDC;
        this.totalcount = res.total_count;
        if (this.ratingList.length == 0) {
          this.noDataFound = true;
          this.blocked = false;
        }
      });
    }
    // else{
    //   if(this.salesPersonList.length == 0){
    //     alert('Select Cluster First!!');
    //     this.todaySelected = null;
    //   }else{
    //     alert('Select Atleast 1 Salesperson!!');
    //     this.todaySelected = null;
    //   }

    // }
  }
  onSelectDboy(selectedDBoy) {
    this.ratingList = [];
    this.dBoyIds = [];
    selectedDBoy.forEach(element => {
      this.dBoyIds.push(element.DboyId);
    });
    if (this.Start != null && this.End != null) {
      // this.Keyword = null;
      this.TodayDate = null;
    }
    if (this.Start != null && this.End == null) {
      this.End = this.Start;
      this.TodayDate = null;
    } else if (this.Start == null && this.End != null) {
      this.Start = this.End;
      this.TodayDate = null;
    }

    if (this.dBoyIds.length > 0 && this.dBoyList.length > 0) {
      this.dboyRatingFilter = {
        DboyIds: this.dBoyIds,
        Today: this.TodayDate ? this.TodayDate : null,
        Start: this.Start ? this.Start : null,
        End: this.End ? this.End : null,
        // OrderId : null,
        // Skcode : null,
        // Mobile : null,

        Take: this.Take ? this.Take : 20,
        Skip: this.skip ? this.skip : 1,
        AppType: this.AppType,
        key: this.Keyword ? this.Keyword : null
      }
      this.blocked = true;
      this.ratingService.getHubWiseDboyRatingList(this.dboyRatingFilter).subscribe(res => {
        if (res.RatingDC.length > 0) {
          this.ratingList = res.RatingDC;
          this.totalcount = res.total_count;
          this.blocked = false;

        } else {
          this.noDataFound = true;
          this.blocked = false;

        }
      });
    }
    // else{
    //   if(this.dBoyList.length ==  0){
    //     alert('Select Hub First!!');
    //     this.todaySelected = null;
    //   }else{
    //     alert('Select Atleast 1 Dboy!!');
    //     this.todaySelected = null;
    //   }
    // }
  }
  onClickToday() {
    debugger
    this.todaySelected = 1;
    // Get current date
    const currentDate = new Date();
    // Get the year, month, and day components separately
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = currentDate.getDate();
    // Concatenate them in the desired format
    //const todayDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    this.TodayDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    // this.TodayDate =  //this.TodayDate ? moment(this.TodayDate).format('DD/MM/YYYY') : null
    this.Keyword = null;
    this.Start = null;
    this.End = null;
    this.isSearch = true;
    this.rangeDates = null;
    this.load(event);

  }
  onChangeKeyword() {
    if (this.Keyword != null) {
      // this.Start = null;
      // this.End = null;
      this.TodayDate = null;
      this.isSearch = true;
      this.todaySelected = null;
    }
  }
  onChangeAppType() {
    this.hubList = [];
    this.cityIds = [];
    this.hubIds = [];
    this.dBoyList = [];
    this.dBoyIds = [];
    this.salesIds = [];
    this.clusterIds = [];
    this.salesPersonList = [];
    this.clusterList = [];
    this.selectedHubList = [];
    this.selectedSales = [];
    this.selectedDBoy = [];
    this.selectedCluster = [];
    this.selectedCityList = [];
    this.ratingList = [];
    this.totalcount = null;
    this.TodayDate = null;
    this.Start = null;
    this.End = null;
    this.Keyword = null;
    this.noDataFound = false;
    this.isInvalid = false;
    this.rangeDates = null;
    this.todaySelected = null;
  }

  onSearch(userRatingForm: any) {
    debugger
    if (userRatingForm.form.status == "VALID") {
      this.ratingList = [];
      this.totalcount = 0;
      this.first = 0;
      this.selectedDBoy.forEach(element => {
        this.dBoyIds.push(element.DboyId);
      });
      this.selectedSales.forEach(element => {
        this.salesIds.push(element.SalesId);
      });
      if (this.AppType == 2) {
        debugger
        if ((this.Start != null && this.End != null) || (this.Start == null && this.End == null) &&
          (this.cityIds.length > 0 && this.hubIds.length > 0 && this.dBoyIds.length > 0)) {
          this.load(event);
        }
      } else if (this.AppType == 3) {
        if ((this.Start != null && this.End != null) || (this.Start == null && this.End == null) &&
          (this.cityIds.length > 0 && this.hubIds.length > 0)) {
          this.load(event);
        }
      }
      else if (this.AppType == 1) {
        if ((this.Start != null && this.End != null) || (this.Start == null && this.End == null) &&
          (this.cityIds.length > 0 && this.hubIds.length > 0 && this.clusterIds.length > 0 && this.salesIds.length > 0)) {
          this.load(event);
        }
      }
    } else {
      this.isInvalid = true;
      // this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }
  onClickDate() {
    this.isSearch = true;
    this.todaySelected = null;
    this.Start = moment(this.rangeDates[0]).format("yyyy-MM-DD");
    this.End = moment(this.rangeDates[1]).format("yyyy-MM-DD");
    // this.Start = this.rangeDates[0];
    // this.End = this.rangeDates[1];
    console.log('Start', this.Start + ' ' + 'End:', this.End);
  }
  load(event) {
    var Last = event.first ? event.first + event.rows : 20;
    this.skip = event.rows ? Last / event.rows : Last / 20;
    this.Take = event.rows ? event.rows : 20;
    if (this.AppType == 3) {
      this.onSelectHub(this.selectedHubList);
    } else if (this.AppType == 2) {
      this.onSelectDboy(this.selectedDBoy);
    } else if (this.AppType == 1) {
      this.onSelectSalesPerson(this.selectedSales);
    }
  }
  exportExcel() {
    if (this.Start != null && this.End != null) {
      // this.Keyword = null;
      this.TodayDate = null;
    }
    if (this.Start != null && this.End == null) {
      this.End = this.Start;
      this.TodayDate = null;
    } else if (this.Start == null && this.End != null) {
      this.Start = this.End;
      this.TodayDate = null;
    }
    this.exportData = [];
    if (this.AppType == 3) {
      if (this.hubIds.length > 0 && this.hubList.length > 0) {
        this.customerRatingFilter = {
          WarehouseIds: this.hubIds,
          AppType: this.AppType,
          Start: this.Start ? this.Start : null,
          End: this.End ? this.End : null,
          Today: this.TodayDate ? this.TodayDate : null,
          Take: null,
          Skip: null,
          key: this.Keyword ? this.Keyword : null
        }
        this.blocked = true;
        this.ratingService.getExportHubWiseCustomerRatingList(this.customerRatingFilter).subscribe(res => {
          this.blocked = false;
          if (res.RatingDC.length == 0) {
            alert('No Data Found!!');
          } else {
            // this.exportData = res.RatingDC;
            res.RatingDC.forEach(element => {
              element.rv = [];
              element.UserRatingDetailDcs.forEach(el => {
                element.rv.push(el.Review);
              });
              let obj = {
                OrderID: element.OrderID,
                OrderDate: element.OrderDate,
                Skcode: element.Skcode,
                CustomerName: element.CustomerName,
                CityName: element.CityName,
                WarehouseName: element.Warehouse,
                MobileNo: element.MobileNo,
                RatingDate: element.RatingDate,
                Rating: element.Rating,
                Review: JSON.stringify(element.rv),
                DeliveryBoy: element.DeliveryBoy,
              }
              this.exportData.push(obj);
            });
            this.exportService.exportAsExcelFile(this.exportData, 'ExportCustomerUserRating');
          }
        });
      }
      // else{
      //   if(this.hubList.length == 0){
      //     alert('Select City First!!');
      //     this.todaySelected = null;
      //   }else{
      //     alert('Select Atleast 1 Hub!!');
      //     this.todaySelected = null;
      //   }
      // }
    } else if (this.AppType == 2) {
      if (this.dBoyIds.length > 0 && this.dBoyList.length > 0) {
        this.dboyRatingFilter = {
          DboyIds: this.dBoyIds,
          Today: this.TodayDate ? this.TodayDate : null,
          Start: this.Start ? this.Start : null,
          End: this.End ? this.End : null,
          Take: null,
          Skip: null,
          AppType: this.AppType,
          key: this.Keyword ? this.Keyword : null
        }
        this.blocked = true;
        this.ratingService.getExportHubWiseDboyRatingList(this.dboyRatingFilter).subscribe(res => {
          this.blocked = false;
          if (res.RatingDC.length > 0) {
            // this.exportData = res.RatingDC;
            res.RatingDC.forEach(element => {
              element.rv = [];
              element.UserRatingDetailDcs.forEach(el => {
                element.rv.push(el.Review);
              });
              let obj = {
                OrderID: element.OrderID,
                OrderDate: element.OrderDate,
                DeliveryBoy: element.DeliveryBoy,
                CityName: element.CityName,
                WarehouseName: element.Warehouse,
                RatingDate: element.RatingDate,
                Rating: element.Rating,
                Review: JSON.stringify(element.rv),
                Skcode: element.Skcode,
                CustomerName: element.CustomerName,
                MobileNo: element.MobileNo,
              }
              this.exportData.push(obj);
            });
            this.exportService.exportAsExcelFile(this.exportData, 'ExportDboyUserRating');
          } else {
            alert('No Data Found!!');
          }
        });
      }
      // else{
      //   if(this.dBoyList.length ==  0){
      //     alert('Select Hub First!!');
      //     this.todaySelected = null;
      //   }else{
      //     alert('Select Atleast 1 Dboy!!');
      //     this.todaySelected = null;
      //   }
      // }
    } else if (this.AppType == 1) {
      if (this.salesIds.length > 0 && this.salesPersonList.length > 0) {
        this.salesRatingFilter = {
          AppType: this.AppType,
          SalesIds: this.salesIds,
          Today: this.TodayDate ? this.TodayDate : null,
          Start: this.Start ? this.Start : null,
          End: this.End ? this.End : null,
          Take: null,
          Skip: null,
          key: this.Keyword ? this.Keyword : null
        }
        this.blocked = true;
        this.ratingService.getExportHubWiseSalesPersonRatingList(this.salesRatingFilter).subscribe(res => {
          this.blocked = false;
          if (res.RatingDC.length == 0) {
            alert('No Data Found!!');
          } else {
            // this.exportData = res.RatingDC;
            res.RatingDC.forEach(element => {
              element.rv = [];
              element.UserRatingDetailDcs.forEach(el => {
                element.rv.push(el.Review);
              });
              let obj = {
                OrderID: element.OrderID,
                OrderDate: element.OrderDate,
                SalesPerson: element.SalesPerson,
                CityName: element.CityName,
                WarehouseName: element.Warehouse,
                Cluster: element.Cluster,
                RatingDate: element.RatingDate,
                Rating: element.Rating,
                Review: JSON.stringify(element.rv),
                Frequency: element.Frequency,
                Skcode: element.Skcode,
                CustomerName: element.CustomerName,
                MobileNo: element.MobileNo,
              }
              this.exportData.push(obj);
            });
            this.exportService.exportAsExcelFile(this.exportData, 'ExportSalesUserRating');
          }
        });
      } else {
        if (this.salesPersonList.length == 0) {
          alert('Select Cluster First!!');
          this.todaySelected = null;
        } else {
          alert('Select Atleast 1 Salesperson!!');
          this.todaySelected = null;
        }

      }
    }
  }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable2");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (n != 0 && n != 1 && n != 2 && n != 3) {
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        } else {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


}

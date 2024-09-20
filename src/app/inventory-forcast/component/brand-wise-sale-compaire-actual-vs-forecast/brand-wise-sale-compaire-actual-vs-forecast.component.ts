import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { BrandbuyerService } from 'app/shared/services/brandbuyer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
import { types } from 'util';

@Component({
  selector: 'app-brand-wise-sale-compaire-actual-vs-forecast',
  templateUrl: './brand-wise-sale-compaire-actual-vs-forecast.component.html',
  styleUrls: ['./brand-wise-sale-compaire-actual-vs-forecast.component.scss']
})
export class BrandWiseSaleCompaireActualVsForecastComponent implements OnInit, AfterViewInit {


  masterwarehouseList: any[] = [];
  selectedwarehouse: any;
  CategoryList: any[] = [];
  selectedCatregory: any[] = [];
  subCatList: any[] = [];
  brandList: any[] = [];
  selectedSubsubCatregory: any[] = [];
  selectedSubCat: any[] = [];
  dateValue: Date;
  types = [
    { name: "Quantity Wise", value: "Qty" },
    { name: "Amount Wise", value: "Amt" }
  ]
  selectedType: any;
  skip: number = 0;
  take: number = 0;

  brand_wise_list: any[] = [];
  totalRecords: number = 0;
  first: number = 0;
  loading: boolean = false;
  exportData: any[] = [];
  exportPayload: any;
  activeExport: boolean = false;
  blocked : boolean = false;

  constructor(private warehouseservice: WarehouseService, private Brandbuyer: BrandbuyerService, private API_Service: InventoryforcastserService, private exportService: ExportServiceService) {
    this.selectedType = this.types[0];
    console.log(this.selectedType.value);
  }

  ngOnInit() {
    this.getWarehouse();
    this.getBuyer();
  }

  getWarehouse() {
    this.warehouseservice.GetAllWarehouseWithoutKpp().subscribe(result => {
      this.masterwarehouseList = result;
      console.log('this.warehouseList: ', this.masterwarehouseList);
    });
  }

  getBuyer() {
    this.subCatList = [];
    this.selectedSubCat = [];
    this.selectedSubsubCatregory = [];
    this.API_Service.getAllCategories().subscribe(result => {
      console.log('test', result);
      this.CategoryList = result;
    });
  }

  subcat:[];
  getSubCatList(categories) {
    this.subCatList = [];
    this.selectedSubCat = [];
    this.brandList = [];
    if (categories && categories.length) {
     
      this.subcat = categories.map(function (elem) {
        return elem.CategoryId ? elem.CategoryId : elem
      });

      this.API_Service.getSubCategories(this.subcat).subscribe(result => {
        console.log('subCatList', result);
        this.subCatList = result;
      });
    }
  }

  subSubcat:[];
  getBrandsnew(subcategories) {
    this.brandList = [];
    this.selectedSubsubCatregory = [];
    if (subcategories && subcategories.length) {
      
      this.subSubcat = subcategories.map(function (elem) {
        return elem.SubCategoryId ? elem.SubCategoryId : elem
      });

      const payload = {
        categoryId: this.subcat,
        subcategoryId: this.subSubcat
      }

      this.API_Service.getSubSubCatList(payload).subscribe(result => {
        console.log('test', result);
        this.brandList = result;
      });
    }
  }

  ngAfterViewInit() {
    this.loading = false;
  }

  exportNew={}
  search() {
    // this.loading = true;
    this.totalRecords = 0;
    console.log(this.selectedType);
    let warehouseIDs: any[] = [];
    let categoriesIDs: any[] = [];
    let subCategoriesIDs: any[] = [];
    let subSubCategoriesIDs: any[] = [];
    let date = this.dateValue ? moment(this.dateValue).format('YYYY-MM-01') : null;
    let catSelection: number = 0;

    // if (this.selectedwarehouse.length > 0) {
    //   this.selectedwarehouse.forEach(element => {
    //     warehouseIDs.push(element.WarehouseId)
    //   });
    // }

    if (this.selectedwarehouse != undefined) {
      warehouseIDs.push(this.selectedwarehouse.WarehouseId)
    }

    if (this.selectedCatregory.length > 0) {
      catSelection = 1;
      this.selectedCatregory.forEach(element => {
        categoriesIDs.push(element.CategoryId)
      });

      if (this.selectedSubCat.length > 0) {
        catSelection = 2;
        this.selectedSubCat.forEach(element => {
          subCategoriesIDs.push(element.SubCategoryId)
        });

        if (this.selectedSubsubCatregory.length > 0) {
          this.selectedSubsubCatregory.forEach(element => {
            subSubCategoriesIDs.push(element.BrandId)
            catSelection = 3;
          });
        } else {
          alert("please select catagory then sub catagory then brands")
        }
      } else {
        alert("please select catagory then sub catagory then brands")
      }
    }

    // if (catSelection < 3 && catSelection > 0) {
    //   alert("please select catagory then sub catagory then brand")
    // }


    if (date == null) {
      alert("Select Month First");
    } else {
      if (warehouseIDs.length > 0 || catSelection == 3) {
        this.loading = true;
        let payload = {
          categoriesIds: categoriesIDs,
          subCategoriesIds: subCategoriesIDs,
          subSubCategoriesIds: subSubCategoriesIDs,
          warehouseIds: warehouseIDs,
          startDate: date,
          Skip: this.skip,
          Take: this.take
        }

        this.exportNew={
          categoriesIds: categoriesIDs,
          subCategoriesIds: subCategoriesIDs,
          subSubCategoriesIds: subSubCategoriesIDs,
          warehouseIds: warehouseIDs,
          startDate: date,
        }

        console.log(payload);
        this.blocked = true;
        this.API_Service.GetBrandSaleCompaireActualVSForecast(payload).subscribe(
          (res) => {
            console.log(res);
           this.blocked = false;

            if (res.brandSaleCompaireActualVSForecastListDcs.length > 0) {
              this.loading = false;
              this.brand_wise_list = res.brandSaleCompaireActualVSForecastListDcs;
              this.totalRecords = res.totalRecords;
              this.first = 0;
              payload.Take = this.totalRecords;
              this.exportPayload = this.exportNew;
              this.activeExport = true;

            } else {
              this.exportPayload = undefined;
              this.brand_wise_list = [];
              alert("List is Empty");
              this.loading = false;
              this.activeExport = false;

            }
          },
          (err) => {
            this.exportPayload = undefined;
            this.loading = false;
            this.brand_wise_list = [];
            console.log(err);
            this.activeExport = false;

          }
        );
      } else {
        alert("Either warehouse or Brands has to be filled")
      }
    }




  }

  Export() {
    this.exportData = [];
    this.blocked = true;
    this.API_Service.GetBrandSaleCompaireActualVSForecastExport(this.exportPayload).subscribe(
      (res) => {
        this.blocked = false;
        console.log(res);
        if (res.length > 0) {
          this.exportData = res;
          // var result = this.vanTransactionList.map(function (a) {
          //   return {
          //     'Warehouse': a.WarehouseName,
          //     'Sk-Code': a.Skcode,
          //     'Reference Number': a.AlertSequenceNo,
          //     'Name': a.Name,
          //     'Mobile': a.Mobile,
          //     'Added Amount': a.Amount,
          //     'Created Date': a.CreatedDate,
          //     'Mode Of Payment': 'RTGS',
          //     'Used Amount': a.UsedAmount,
          //     'Remaining Amount': a.remain_amount
          //   }
          // })
          this.exportService.exportAsExcelFile(this.exportData, 'allReports(Item)');
        }
      },
      (err) => {
        // this.exportPayload = undefined;
        // this.Item_wise_list = [];
        // console.log(err);
        // this.loading = false;
        // this.activeExport = false;
        alert("error in exporting")
      }
    );
  }
  clearRecord()
  {
    this.selectedwarehouse=null
    this.selectedCatregory=null
    this.selectedSubCat=null
    this.selectedSubsubCatregory=null
    this.dateValue=null
    // this.brand_wise_list =[];
    this.totalRecords=0   
  }

  load(event) {
    this.loading = true;
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;

    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    // console.log(date);

    let warehouseIDs: any[] = [];
    let categoriesIDs: any[] = [];
    let subCategoriesIDs: any[] = [];
    let subSubCategoriesIDs: any[] = [];
    let date = this.dateValue ? moment(this.dateValue).format('YYYY-MM-01') : null;
    let catSelection: number = 0;

    // if (this.selectedwarehouse.length > 0) {
    //   this.selectedwarehouse.forEach(element => {
    //     warehouseIDs.push(element.WarehouseId)
    //   });
    // }

    if (this.selectedwarehouse != undefined) {
      warehouseIDs.push(this.selectedwarehouse.WarehouseId)
    }

    if (this.selectedCatregory.length > 0) {
      catSelection = 1;
      this.selectedCatregory.forEach(element => {
        categoriesIDs.push(element.CategoryId)
      });

      if (this.selectedSubCat.length > 0) {
        catSelection = 2;
        this.selectedSubCat.forEach(element => {
          subCategoriesIDs.push(element.SubCategoryId)
        });

        if (this.selectedSubsubCatregory.length > 0) {
          this.selectedSubsubCatregory.forEach(element => {
            subSubCategoriesIDs.push(element.BrandId)
            catSelection = 3;
          });
        } else {
          alert("please select catagory then sub catagory then brands")
        }
      } else {
        alert("please select catagory then sub catagory then brands")
      }
    }

    let payload = {
      categoriesIds: categoriesIDs,
      subCategoriesIds: subCategoriesIDs,
      subSubCategoriesIds: subSubCategoriesIDs,
      warehouseIds: warehouseIDs,
      startDate: date,
      Skip: this.skip,
      Take: this.take
    }


    console.log(payload);
    this.blocked = true;
    this.API_Service.GetBrandSaleCompaireActualVSForecast(payload).subscribe(
      (res) => {
        this.blocked = false;
        console.log(res);
        if (res.brandSaleCompaireActualVSForecastListDcs.length > 0) {
          this.loading = false;
          this.brand_wise_list = res.brandSaleCompaireActualVSForecastListDcs;
          this.totalRecords = res.totalRecords;
          payload.Take = this.totalRecords;
          this.exportPayload = payload;
          this.activeExport = true;

        } else {
          this.brand_wise_list = [];
          this.loading = false;
          this.exportPayload = undefined;
          this.activeExport = false;

          // alert("List is Empty");
        }
      },
      (err) => {
        this.activeExport = false;
        this.exportPayload = undefined;
        this.brand_wise_list = [];
        this.loading = false;
        console.log(err);
      }
    );
  }




}

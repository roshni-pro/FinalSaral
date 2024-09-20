import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { AddCustomerRefferalConfigComponent } from 'app/customer/component/add-customer-refferal-config/add-customer-refferal-config.component';
import { ProductPerformanceDashboardService } from 'app/sales-app-backend-pages/Services/product-performance-dashboard.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { getMonth } from 'date-fns';
import { environment } from 'environments/environment';
import { data } from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-product-performance-dashboard',
  templateUrl: './product-performance-dashboard.component.html',
  styleUrls: ['./product-performance-dashboard.component.scss']
})
export class ProductPerformanceDashboardComponent implements OnInit {
  // warehouseListData: any;
  warehouseListData1: any;
  blocked: boolean = false;
  MedianDialog: boolean = false;
  quadrant: any;
  quadrantItems: any;
  maxDate = new Date();
  SelectedMonthYear: Date;
  commentDialog: boolean = false;
  SelectedWarehouse: any = [];
  SelectedBrand: any[] = []
  SelectedBuyer: any;
  btandList: any;
  buyer: any[];
  brand: any[] = [];
  buyerId: any[] = [];
  PerformanceList: any[] = [];
  totalDispatchValue: any;
  totalPlannedValues: any;
  getOverAllMedian: any[] = []
  getOverAll: any = [];
  StoreList: any;
  StoreList1: any;
  selectedStore: any = [];
  BuyerList: any;
  itemnumber: any;
  files: any;
  filepath: File[];
  file: File[];
  Comment: any;
  updateSalesForcast: any;
  BrandList: any;
  Historypopup: boolean = false;
  HistoryList: any
  quadrantId: any = [];
  roleName: any;
  roleList: any;
  roleListarry: boolean = false;
  depolistarry: boolean = false;
  IsHubLeadEdit: any;
  IsBuyerEdit: any;
  tempRowData: any;
  item: any;
  baseURL: any;
  export: any;
  exportt: any;
  refrace: any;
  SalesRemark: any;
  buyerRemark: any;
  payload: any;
  status:any[];
  selectedStatus:any;
  allExportList:any;
  isSearch:boolean=false
  constructor(private ProductPerformanceDashboardService: ProductPerformanceDashboardService, private exportService: ExportServiceService, private peoplePilot: PepolePilotService) {
    this.baseURL = environment.apiURL;

  }

  ngOnInit() {
    this.warehouseList();
    this.SelectedMonthYear=new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1),
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList); 
      let depolistarry = this.roleList.filter(x => x == 'Buyer'  || x == "Sourcing Associate" || x== "HQ Sourcing Associate" || x== "Sourcing Executive"
                                                  || x== "HQ Sourcing Executive" || x== "Sourcing Senior Executive");
      if (depolistarry.length > 0) {
        this.depolistarry = true;
        this.refrace=false;
      }
      
      var roleListarry = this.roleList.filter(x => x == 'Hub sales lead' ||  x=="WH Sales lead");
      if (roleListarry.length > 0) {
        this.roleListarry = true;
        this.refrace=true;
      }
    });
    this.status=[
      {label:'Not Updated',value:'Not Updated'},
      {label:'Approval Pending',value:'Approval Pending'},
      {label:'Approved',value:'Approved'},
      {label:'Rejected',value:'Rejected'}
    ]
  }
  warehouseList() {
      this.blocked = true;
      this.ProductPerformanceDashboardService.GetWarehouses().subscribe(res => {
        if (res) {
          console.log(res, "GetWarehouse");
          this.blocked = false;
          this.warehouseListData1 = res;
        }
        else {
          alert("No Data Found!")
          this.blocked = false;
        }
      })
  }

  getStore() {

    this.ProductPerformanceDashboardService.GetStoreList(this.SelectedWarehouse.value).subscribe(res => {
      if (res.length>0) {
        this.StoreList = res;
        console.log(this.StoreList, "this.StoreList");
      }
      else {
        alert("No Data Found!");
        this.selectedStore=[];
        this.BrandList=[];
        this.SelectedBrand=[];
      }
    })
  }
 
  Search() {

    if (this.SelectedWarehouse == undefined || this.SelectedWarehouse.length == 0) {
      alert("Please Select Warehouse");
      return false;
    } else if (this.selectedStore == undefined || this.selectedStore.length == 0) {
      alert("Please Select Store");
      return false;
    }
    else if (this.SelectedMonthYear == undefined) {
      alert("Select Month / Year");
      return false;
    }
    else
    {
      this.brand = [];
      if (this.SelectedBrand != undefined) {
        this.SelectedBrand.forEach((element) => {
          this.brand.push(element.SubsubCategoryid);
        })
    }
    if (this.SelectedWarehouse != undefined && this.selectedStore != undefined && this.SelectedMonthYear != undefined) {
      
      const payload =
      {
        "warehouseId": this.SelectedWarehouse.value,
        "Status":this.selectedStatus ? this.selectedStatus.value :"",
        "StoreId": this.selectedStore.StoreId,
        "BrandIds": this.brand != undefined ? this.brand : [],
        "MonthDate": this.SelectedMonthYear ? moment(this.SelectedMonthYear).format('YYYY/MM/DD') : "",
      }
      console.log(payload,"payload");
      
      this.blocked = true;
      this.ProductPerformanceDashboardService.getQuadrantItemforSearch(payload).subscribe(x => {
        if (x && x.length > 0) {
          this.quadrantItems = x;
          console.log(this.quadrantItems, "quadrantItems");
          this.IsBuyerEdit = this.quadrantItems[0].IsBuyerEdit;
          this.IsHubLeadEdit = this.quadrantItems[0].IsHubLeadEdit;
          this.Historypopup = false;
          this.blocked = false;
        }else {
          alert("No Data Found!");
          this.quadrantItems = [];
          // this.selectedStore=[];
          // this.SelectedBrand=[];
          this.blocked = false;
        }
      })
    }
    }
  }

  ExportSearch() {
  
    if( this.quadrantItems !=undefined &&this.quadrantItems.length>0)
    {
        const payload =
      {
        "warehouseId": this.SelectedWarehouse.value,
        "StoreId": this.selectedStore.StoreId,
        "Status":this.selectedStatus ? this.selectedStatus.value :"",
        "BrandIds": this.brand != undefined ? this.brand : [],
        "MonthDate": this.SelectedMonthYear ? moment(this.SelectedMonthYear).format('YYYY/MM/DD') : "",
      }
      this.blocked = true;
      this.ProductPerformanceDashboardService.exportAllQuadrantData(payload).subscribe((x:string) => {
        if(x.length > 0)
        {
          window.open(x);
          this.blocked = false;
        }
        else
        {
          alert("No Data Found!");
          this.quadrantItems = [];
          this.blocked = false;
        }
      })
    }
    else
    {
      alert("Please Search The Data First");
      this.blocked = false;
    }
  }

  SaveChanges(item) {

    this.item = item;
    if (((this.item.CommitedForeCastInCase < this.item.MinValueInCase || this.item.CommitedForeCastInCase > this.item.MaxValueInCase) && this.refrace == true) && this.item.Status != 'Approved' && (this.item.SalesRemark==null || this.item.SalesRemark=='' || this.item.SalesRemark===undefined)) {
     alert("Please Enter Sales Remark");
     return false;
    }
      if (this.refrace == true) {
        this.payload =
        {
          "Id": this.item.Id,
          "NewASP": 0,
          "MinValue": this.item.MinValueInCase,
          "MaxValue": this.item.MaxValueInCase,
          "CommitedForeCastValue": this.item.CommitedForeCastInCase,
          "BuyerRemark": null,
          "SalesRemark": this.item.SalesRemark,
          "CaseSize":0
        }
      } else {
        this.payload =
        {
          "Id": this.item.Id,
          "NewASP": this.item.NewASP,
          "MinValue": this.item.MinValueInCase,
          "MaxValue": this.item.MaxValueInCase,
          "CommitedForeCastValue": '',
          "BuyerRemark": this.item.BuyerRemark,
          "SalesRemark": null,
          "CaseSize":this.item.CaseSize
        }
      }
      this.blocked = true;
      this.ProductPerformanceDashboardService.updateSalesForcastValue(this.payload).subscribe(res => {
        if (res.Status == true) {
          this.updateSalesForcast = res.Data;
          console.log(this.updateSalesForcast, "updateSalesForcast");
          alert(res.Message)
          this.commentDialog = false;
          this.blocked = false;
        } else {
          alert(res.Message)
          this.commentDialog = false;
          this.Comment = [];
          this.blocked = false;
        }
      })
    this.Historypopup = false;
  }

  commentSave() {
  
    if (this.Comment == undefined) {
      alert("Please Enter Comment");
      return;
    }
    if (this.Comment != undefined) {
      if (this.refrace == true) {
        this.payload =
        {
          "Id": this.item.Id,
          "NewASP": 0,
          "MinValue": this.item.MinValueInCase,
          "MaxValue": this.item.MaxValueInCase,
          "CommitedForeCastValue": this.item.CommitedForeCastInCase,
          "BuyerRemark": null,
          "SalesRemark": this.Comment != null ? this.Comment : this.item.SalesRemark
        }
      } else {
        this.payload =
        {
          "Id": this.item.Id,
          "NewASP": this.item.NewASP,
          "MinValue": this.item.MinValueInCase,
          "MaxValue": this.item.MaxValueInCase,
          "CommitedForeCastValue": '',
          "BuyerRemark": this.item.BuyerRemark,
          "SalesRemark": null
        }
      }
      this.blocked = true;
      this.ProductPerformanceDashboardService.updateSalesForcastValue(this.payload).subscribe(res => {
        if (res.Status == true) {
          this.updateSalesForcast = res.Data;
          this.Search()
          console.log(this.updateSalesForcast, "updateSalesForcast");
          alert(res.Message)
          this.commentDialog = false;
          this.blocked = false;
        } else {
          alert(res.Message)
          this.Search()
          this.blocked = false;
          this.commentDialog = false;
          this.Comment = [];
        }
      })
    }
  }



  BrandData() {
    this.blocked = true;
    this.ProductPerformanceDashboardService.getWarehouseQuadrantBrandList(this.SelectedWarehouse.value,this.selectedStore.StoreId).subscribe(x => {
      if ( x != undefined && x.length > 0) {
        this.btandList = x;
        this.SelectedBrand=undefined;
        console.log(this.btandList, "Brand");
        this.blocked = false;
      }else {
       this.SelectedBrand=undefined;
        this.btandList=[];
        this.blocked = false;
      }

    })
  }

  cancelComment() {
    this.Comment = [];
  }
  MedianHistory(item) {
    this.itemnumber = item.ItemNumber
    console.log(this.itemnumber);
    this.blocked = true;
    this.ProductPerformanceDashboardService.getOverAllMedian(this.itemnumber).subscribe((res) => {
      this.getOverAllMedian = res
      console.log(this.getOverAllMedian);

      if (this.getOverAllMedian.length > 0) {
        this.MedianDialog = true
        this.Historypopup = false;
        this.blocked = false;

      }
      if (this.getOverAllMedian.length > 0) {
        this.getOverAll = Object.keys(res[0])
        this.MedianDialog = true
        this.Historypopup = false
        this.blocked = false;
      }
    },(err) => {
        console.log(err)
        this.blocked = false;
      })
  }

  onUploadCheque(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
    }
  }
  uploadFile(file) {
    this.files = file.files[0]
  }

  Uploader() {
    if (this.file == undefined) {
      alert("Please upload File");
    }
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.blocked = true;
    this.ProductPerformanceDashboardService.Uploader(formData).subscribe((result: any) => {
      this.file = [];
      if (result == "File Saved Sucessfully") {
        alert(result);
        this.blocked = false;
        window.location.reload();
      } else {
        alert(result);
        this.blocked = false;
        window.location.reload();
      }
    })
  }

  History(item) {
    this.quadrantId = item.Id;
    console.log(item.Id);
    this.blocked = true;
    this.ProductPerformanceDashboardService.getQuadrantitemhistory(this.quadrantId).subscribe(result => {
      if (result.length > 0) {
        this.blocked = false;
        this.HistoryList = result;
        console.log(result, "resultHistory");
        this.Historypopup = true
      }
      else {
        alert("No Data Found")
        this.blocked = false;
      }
    })
  }
  
  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }
 
  ExportAll()
  { 
      this.blocked = true;
      this.ProductPerformanceDashboardService.ExportAllProductPerformanceData().subscribe(x => {
        if(x.Status == true)
        {
          this.allExportList=x.Data;
          console.log(this.allExportList,"ExportAll");
          window.open(this.allExportList);
           alert(x.Message)
          this.blocked = false;
        }else
        {
          alert(x.Message)
          this.blocked = false;
        }
      }
      )
  }
}
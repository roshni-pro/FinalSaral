import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { Item } from 'app/category-master/components/sale-default-category/sale-default-category.component';
import { event } from 'jquery';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-po-stop-configuration',
  templateUrl: './po-stop-configuration.component.html',
  styleUrls: ['./po-stop-configuration.component.scss']
})
export class PoStopConfigurationComponent implements OnInit {
  ConfigurationPopup: boolean = false;
  warehouseListData: any[] = [];
  SubCategoryList: any[] = [];
  isLoading: boolean = false;
  SubSubCategory: any[] = [];
  record: boolean = false;
  WarehouseIdss: any;
  SubCategoryIds: any;
  SubsubCategoryids: any;
  WarehouseIds: any;
  formdate: any;
  todate: any;
  SelectedSubCategoryId: any;
  AddPOlist: any;
  subcategoryid: any[] = [];
  WarehouseIdes: any[] = []
  SubsubCategory: any[] = [];
  EditPopup: boolean = false;
  warehoueseName: any;
  subcate: any;
  subsubcate: any;
  firstdate: any;
  endDate: any;
  id: any;
  isStop: any;
  first: number = 0;
  cdate = new Date();
  TotalRecords: any;
  Historypopup:boolean=false;
  poListHistory:any;
  WareId:any[]=[];
  constructor(private podashboardserviceService: PodashboardserviceService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit() {
    
    this.warehouseList()
    // debugger
    // if( this.warehouseListData.length >0){
    //   this.SubCategory()
    // }

  }

  warehouseList() {
 
    this.isLoading = true;
    this.podashboardserviceService.GetWarehouse().subscribe(res => {
      if (res.length > 0) {
      
        this.warehouseListData = res;
        this.WarehouseIds = this.warehouseListData;
        this.isLoading = false;
        if( this.warehouseListData.length >0){
          this.SubCategory()
        }
        console.log(this.warehouseListData, "warehouselist");
      } else {
        alert("No Data Found!");
        this.isLoading = false;
      }

    })
  }
  SubCategory() {
    
    this.isLoading = true;
    this.podashboardserviceService.GetAllSubCategory().subscribe(result => {
      if (result.length > 0) {
        this.SubCategoryList = result;
        this.SelectedSubCategoryId = this.SubCategoryList
        this.isLoading = false;
        console.log(this.SubCategoryList, "SubCategoryList");
        if (this.WarehouseIds!=undefined  && this.SelectedSubCategoryId != undefined) {
          this.onSearch(event)
        }
      } else {
        alert("No Data Found!");
        this.isLoading = false;
      }

    })
  }
  getSubCatList() {
    this.isLoading = true;
    this.podashboardserviceService.GetSubSubCategoryBySubCategoryId(this.SubCategoryIds.SubCategoryId).subscribe(result => {
      if (result.length > 0) {
        this.SubSubCategory = result;
        console.log(this.SubSubCategory, "SubSubCategory");
        this.SubsubCategoryids = this.SubSubCategory;
        this.isLoading = false;
      } else {
        alert("No Data Found!");
        this.SubsubCategoryids = undefined;
        this.isLoading = false;
      }
    });

  }


  addConfiguration() {
    this.ConfigurationPopup = true;
  }
  load(event)
  {
    if (this.WarehouseIds!=undefined  && this.SelectedSubCategoryId != undefined) {
    this.onSearch(event)
  }
  }

  onSearch(event) {
    debugger
    if (this.WarehouseIds == undefined || this.WarehouseIds.length == 0) { alert("Please select a Warehouse"); return false; }
    else if (this.SelectedSubCategoryId == undefined || this.SelectedSubCategoryId == null || this.SelectedSubCategoryId.length == 0) { alert("Please Select a SubCategory"); return false; }

    this.subcategoryid = [];
    if (this.SelectedSubCategoryId != undefined) {
      this.SelectedSubCategoryId.forEach((element) => {
        this.subcategoryid.push(element.SubCategoryId)
      })
    }
    this.WarehouseIdes = [];
    if (this.WarehouseIds != undefined) {
      this.WarehouseIds.forEach((element) => {
        this.WarehouseIdes.push(element.WarehouseId)
      })
    }

    if (this.WarehouseIds != undefined && this.SelectedSubCategoryId != undefined) {
      const payload =
      {
        "WarehouseId": this.WarehouseIdes,
        "SubcategoryId": this.subcategoryid,
        "Skip": event.first ? event.first : 0,
        "Take": event.rows ? event.rows : 10
      }
      this.isLoading = true;
      this.podashboardserviceService.GetSeasonalConfig(payload).subscribe(res => {
        if (res.length > 0) {
          this.isLoading = false;
          this.AddPOlist = res;
          console.log(res, "AddPOlist");
          this.TotalRecords = res[0].TotalCount
          console.log(this.TotalRecords,"TotalRecords");
          
        } else {
          alert("No Data Found!")
          this.isLoading = false;
          this.AddPOlist = [];
          this.TotalRecords = 0
        }

      })
    } else {
      this.isLoading = false;
      alert("No Data Found!");
    }
  }


  addConfigurationSave() {
    debugger
    if (this.WarehouseIdss == undefined || this.WarehouseIdss.length == 0) { alert("Please select a Warehouse"); return false; }
    else if (this.SubCategoryIds == undefined || this.SubCategoryIds == null) { alert("Please Select a SubCategory"); return false; }
    else if (this.SubsubCategoryids == undefined || this.SubsubCategoryids == null || this.SubsubCategoryids.length == 0) { alert("Please Select SubsubCategory"); return false; }

    if (this.formdate == undefined && this.todate != undefined) {
      alert("please select FromDate");
      return false;
    } else if (this.todate == undefined && this.formdate != undefined) {
      alert("please select ToDate");
      return false;
    }
    else if (this.todate != undefined && this.formdate != undefined && this.formdate > this.todate) {
      alert("Please Select from Date less then todate ")
      return false
    }
    else {
      this.WareId=[];
      if(this.WarehouseIdss !=undefined)
      {
        this.WarehouseIdss.forEach(element => {
          this.WareId.push(element.WarehouseId)
        });
      }
      this.SubsubCategory = [];
      if (this.SubsubCategoryids != undefined) {
        this.SubsubCategoryids.forEach((element) => {
          this.SubsubCategory.push(element.SubsubCategoryid)
        })
      }
      if (this.WarehouseIdss != undefined && this.SubCategoryIds != undefined && this.SubsubCategoryids != undefined) {

        const payload =
        {
          "WarehouseId": this.WareId,
          "SubCategoryId": this.SubCategoryIds.SubCategoryId,
          "SubsubCategoryId": this.SubsubCategory,
          "FromDate": this.formdate ? moment(this.formdate).format('L') : null,
          "ToDate": this.todate ? moment(this.todate).format('L') : null
        }
        this.isLoading = true;
        this.podashboardserviceService.AddnewSeasonalConfig(payload).subscribe(res => {

          if (res.Status == true) {
            alert(res.Data)
            this.isLoading = false;
            this.SubSubCategory = undefined;
            this.SubsubCategoryids = undefined;
            this.ConfigurationPopup = false;
            this.onSearch(event);
          }
          else {
            alert(res.Data);
            this.isLoading = false;
            this.ConfigurationPopup = false;
            this.SubSubCategory = undefined;
            this.SubsubCategoryids = undefined;

          }

        })
      }
    }
  }
  cancel() {
    this.WarehouseIdss = undefined;
    this.SubCategoryIds = undefined;
    this.SubsubCategoryids = undefined;
    this.formdate = undefined;
    this.todate = undefined;
  }

  edit(item) {
    this.id = item.Id;
    this.isStop = item.StopPo;
    this.warehoueseName = item.WarehouseName;
    this.subcate = item.SubcategoryName;
    this.subsubcate = item.SubsubcategoryName;
    this.firstdate = item.FromDate ? moment(item.FromDate).format('L') : "";
    this.endDate = item.ToDate ? moment(item.ToDate).format('L') : "";
    this.EditPopup = true;
  }
  SaveChanges() {
    this.firstdate = this.firstdate ? moment(this.firstdate).format('L') : "";
    this.endDate = this.endDate ? moment(this.endDate).format('L') : "";
    if ((this.firstdate == undefined || this.firstdate == "") && this.endDate != undefined) {
      alert("please select FromDate");
      return false;
    } else if ((this.endDate == undefined || this.endDate == "") && this.firstdate != undefined) {
      alert("please select ToDate");
      return false;
    }
    else if (this.endDate != undefined && this.firstdate != undefined && this.firstdate > this.endDate) {
      alert("Please Select from Date less then todate ")
      return false
    }
    else {
      this.firstdate = this.firstdate ? moment(this.firstdate).format('L') : "";
      this.endDate = this.endDate ? moment(this.endDate).format('L') : "";
      this.podashboardserviceService.EditSeasonalConfigById(this.id, this.firstdate, this.endDate, this.isStop).subscribe(res => {
        if (res) {
          alert(res);
          this.EditPopup = false;
          this.onSearch(event)
        } else {
          alert(res);
          this.EditPopup = false;
        }
      })
    }
  }

  History(po) {
    debugger
    this.id = po.Id;
    this.isLoading=true;
    this.podashboardserviceService.GetPostopConfigHistory(this.id).subscribe(result=>
      {
        if(result.length>0)
        {
          this.poListHistory=result
          this.isLoading=false;
          console.log(this.poListHistory,"poListHistory");
          this.Historypopup=true;
        }else
        {
          this.isLoading=false;
          this.poListHistory=[];;
        }
        
      })

  }

  stoppos(item) {
    this.id = item.Id;
    this.isStop = item.StopPo;
    this.firstdate = item.FromDate ? moment(this.firstdate).format('L') : "";
    this.endDate = item.ToDate ? moment(this.endDate).format('L') : "";
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.isLoading = true;
        this.podashboardserviceService.EditSeasonalConfigById(this.id, this.firstdate, this.endDate, item.StopPo).subscribe(res => {
          alert(res);
          console.log(res, "stoppo");
          this.isLoading = false;
        })
      },
      reject: () => {
        this.isLoading = false;
        item.StopPo = !item.StopPo
      }
    });
  }

  onPageRedirect() {
    this.router.navigateByUrl('/layout/Purchase-Order/Change-Seasoanal-Configuration');
  }
}

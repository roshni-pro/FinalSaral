import { Component, OnInit } from '@angular/core';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { CityService } from 'app/shared/services/city.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { MessageService } from 'primeng/api';
import { WheelPointWeightPercentConfig } from 'app/order-assignments/Interfaces/WheelPointWeightPercentConfig';
import { OrderAssignmentsService } from 'app/order-assignments/Services/order-assignments.service';
import { environment } from 'environments/environment';
import { CustomerService } from 'app/shared/services/customer.service';
import { image } from 'html2canvas/dist/types/css/types/image';
import { ClearanceStockMovementOrderComponent } from 'app/current-stock/component/clearance-stock-movement-order/clearance-stock-movement-order.component';
import { ClearanceStockMovementOrderService } from 'app/current-stock/services/clearance-stock-movement-order.service';

@Component({
  selector: 'app-order-configuration',
  templateUrl: './order-configuration.component.html',
  styleUrls: ['./order-configuration.component.scss']
})
export class OrderConfigurationComponent implements OnInit {

  req: any;
  cityList: any;
  allwarehoues: any;
  selectedopen: boolean;
  show: boolean;
  CashParcentage: any;
  searchModel: any;
  warehouseList: any;
  rowData: any;
  getwheel: any;
  OrderAmount: any;
  getwheelweight: any;
  ADDCustomizedOrders: any;
  GetCustomizedPrepaidOrders: any;
  AddCustomizedPrepaidOrder: any;
  GetCustomizedOrderDeletes: any;
  updateMaxWalletPoints: any;
  MaxWalletPointsSet: any;
  WheelPointupdate: any;
  getFlashDealImage: any;
  baseURL: any
  imagePath: any;
  ImagePath: any;
  imgURL: any;
  file: any;
  selected:boolean;
  WheelPointWeightPercentConfig: WheelPointWeightPercentConfig;
  deletedImg: boolean = false;
  Store: any;
  StoreList: any[];
  StoreMinOrderList:any;
  popupOpen:boolean;
  entityName:any;
  historydata:any;
  entity:any;
  rowDataV1 : any;
  MaxWalletPointUsed:any;
  warehouseLis:any[]=[]

  constructor(private CityServices: CityService, private WarehouseServices: WarehouseService,
    private messageService: MessageService, private orderAssignmentsService: OrderAssignmentsService,
    private CustomerServices: CustomerService, private clearanceStockMovementOrderService:ClearanceStockMovementOrderService) { this.req = {}; this.searchModel = {}; this.getwheel = {}; this.getwheelweight = {}; this.updateMaxWalletPoints = {}; this.baseURL = environment.apiURL; this.Store = {StoreId:null};this.entity="CompanyDetails" }

  ngOnInit() {
    //this.getWarehouseName()
    this.GetStoreMinOrderList();
    this.getStores();
    this.selectedopen = false;
    this.deletedImg = false;
    this.show = false;
    this.getCityList();
    this.getCityForMinOrderList();
  }

  getWarehouseList(cityId:number){
    this.warehouseLis=[];
    let cityArr = [];
    cityArr.push(cityId);
    this.CityServices.getWarehouseByCityID(cityArr).subscribe(result=>{
      this.warehouseLis=result;
    })
  }

  // getWarehouseName(){
  //   this.clearanceStockMovementOrderService.WarehouseGetByID().subscribe(res=>{
  //      if(res!=null){
  //         this.warehouseLis=res
  //       }
  //     })
  // }

  getStores() {
    this.StoreList = [];
    this.WarehouseServices.GetAllStore().subscribe(result => {
      if (result.length > 0) {
        this.StoreList = result;
      }
    });
  }
  SaveStoreMinOrder(StoreData) {
    if(StoreData.CityId==null){
      alert("Select City")
      return
    }
    if(StoreData.WarehouseId==null){
      alert("Select WarehouseName")
      return
    } 
    if(StoreData.StoreId==null){
      alert("Select Store")
      return
    }
    if(StoreData.MinOrderValue==null){
      alert("Enter Min Order Value")
      return
    }
    if(StoreData.MinLineItem==null){
      alert("Enter Min LineItem Value")
      return
    }
    this.WarehouseServices.AddStoreMinOrder(StoreData).subscribe(result => {
      console.log("result",result);
      
     if(result!=null)
     {
      this.GetStoreMinOrderList();
      this.Store={};
     }
    })
  }
  GetStoreMinOrderList() {
    this.WarehouseServices.StoreMinOrderList().subscribe(result => {
     this.StoreMinOrderList= result;
     console.log(this.StoreMinOrderList,"StoreMinOrderList");
     
    })
  }
 
  eDit(rowData)
  {
    debugger
const payload={'Id':rowData.Id,'MinOrderValue':rowData.MinOrderValue,'MinLineItem':rowData.MinLineItem}


   this.WarehouseServices.UpdateStoreMinOrderList(payload).subscribe(res=>{

console.log("res",res);
if(res!=null)
{
  alert(res);
  this.GetStoreMinOrderList();

}


   })

  }
  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;

    }
    (success) => {
      alert("image uploaded successfully")
    };
  }
  onTabChange(event) {
    this.show = false;
    if (event.index == 1) {
      this.show = true;
      this.GetCustomizedPrepaidOrder();
    } else if (event.index == 2) {
      this.show = false;
      this.GetCompanyWheelConfigurations();
    } else if (event.index == 4)
      this.getCompanyDetails();
    else if (event.index == 5)
      this.GetUpComingFlashDealImage();
  }

  getCityList() {
    this.CityServices.cityget().subscribe(result => {
      this.cityList = result;
      console.log(this.cityList)
    });
  }

  cityMinOrdeList:any;
  getCityForMinOrderList() {
    this.CityServices.cityForStoreMinOrder().subscribe(result => {
      this.cityMinOrdeList = result;
      console.log(this.cityMinOrdeList)
    });
  }

  update(cityListUpdated) {
    this.CityServices.cityPost(cityListUpdated).subscribe(result => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Data update Successfully', detail: '' });
      } else {
        this.messageService.add({ severity: 'Error', summary: 'Data not update', detail: '' });
      }
      this.getCityList();
    })
  }

  GetCustomizedPrepaidOrder() {
    this.WarehouseServices.GetCustomizedPrepaidOrder().subscribe(result => {
      this.GetCustomizedPrepaidOrders = result;
      console.log(this.GetCustomizedPrepaidOrders,"GetCustomizedPrepaidOrders");
      
    })
  }
  updateGetCustomizedPrepaidOrders(req) {
    this.WarehouseServices.AddCustomizedPrepaidOrders(req).subscribe(result => {
      this.AddCustomizedPrepaidOrder = result;
      this.GetCustomizedPrepaidOrder();
      this.messageService.add({ severity: 'success', summary: 'Data Update Successfully', detail: '' });
    })
  }

  GetCustomizedOrderDelete(data) {
    this.WarehouseServices.GetCustomizedOrderDelete(data).subscribe(result => {
      this.GetCustomizedOrderDeletes = result;
      this.GetCustomizedPrepaidOrder();
    })
  }

  open() {
    this.selectedopen = true;
    this.searchModel.OrderAmount = 0;
    this.WarehouseServices.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    })
  }

  reset() {
    this.searchModel = [];
  }
  add(addData) {
    if (addData.OrderAmount == 0) {
      this.messageService.add({ severity: 'error', summary: 'Please Enter Value', detail: '' });
      return;
    }
    this.WarehouseServices.ADDCustomizedOrder(addData).subscribe(result => {
      if (result) {
        this.ADDCustomizedOrders = result;
        this.selectedopen = false;
        this.messageService.add({ severity: 'success', summary: 'Data Add Successfully', detail: '' });
        this.reset();
        this.GetCustomizedPrepaidOrder();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Data Alredy Exites', detail: '' });
        this.selectedopen = false;
        this.reset();
        this.GetCustomizedPrepaidOrder();
      }
    })
  }

  validateNegative(targetValue, rowData) {
    if (targetValue >= 0) {
      rowData.CashParcentage = (100 - targetValue);
      rowData.OnlineParcentage = targetValue;
    }
    else {
      rowData.OnlineParcentage = rowData.OnlineParcentage;
      this.messageService.add({ severity: 'error', summary: 'Please enter value greater than or equal to zero', detail: '' });

    }
  }
  addvalidateNegative(targetValue, searchModel) {
    if (targetValue >= 0) {
      searchModel.CashParcentage = (100 - targetValue);
      searchModel.OnlineParcentage = targetValue;
    }
    else {
      searchModel.OnlineParcentage = searchModel.OnlineParcentage;
      this.messageService.add({ severity: 'error', summary: 'Please enter value greater than or equal to zero', detail: '' });

    }
  }
  GetCompanyWheelConfigurations() {
    this.WarehouseServices.GetCompanyWheelConfigurations().subscribe(result => {
      this.getwheel = result;
      console.log("getwheel",this.getwheel);
      
    })
  }

  updateWheel(updateModel) {
    this.WarehouseServices.updateCompanyWheelConfigurations(updateModel).subscribe(result => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Data Upadte Successfully', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Data not Upadte', detail: '' });
      }

    })

  }

  updateWheelweight(wheelweight) {
    this.WheelPointWeightPercentConfig = {
      WheelPoint: wheelweight.WheelPoint,
      WheelWeightPercent: wheelweight.WheelWeightPercent
    }
    this.WarehouseServices.updateWheelPointWeightPercentConfigs(this.WheelPointWeightPercentConfig).subscribe(x => {
      if (x == true) {
        this.messageService.add({ severity: 'success', summary: 'Data Updated Successfully', detail: '' });
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Data not Upadted', detail: '' });

      }

    })
  }
  updateMaxWalletPointsSet(WheelPointupdate) {
    var datatoPost = {
      Maxwalletpointused: WheelPointupdate
    }
    this.WarehouseServices.updateMaxWalletPointsSet(datatoPost).subscribe(x => {
      if (x == true) {
        this.getCompanyDetails();
        this.messageService.add({ severity: 'success', summary: 'Data Updated Successfully', detail: '' });
      }
      else {
        this.getCompanyDetails();
        this.messageService.add({ severity: 'error', summary: 'Data not Upadted', detail: '' });

      }
    })
  }
  getCompanyDetails() {
    this.WarehouseServices.getCompanyDetails().subscribe(x => {
      this.updateMaxWalletPoints = x;
      this.MaxWalletPointUsed= x.MaxWalletPointUsed;
    })
  }
  GetUpComingFlashDealImage() {
    this.WarehouseServices.GetUpComingFlashDealImages().subscribe(x => {
      let getdata = x;
      getdata.forEach(element => {
        if (element.ImagePath) {
          element.ImagePath = this.baseURL + '/UploadedImages/' + element.ImagePath;
        }
      });
      this.getFlashDealImage = getdata;
    })
  }
  uploadFlashDealImage(UpdateFlashDealImages) {

    if (this.file == null) {
      alert('Choose File First!');
    }
    else {
      let ImagePaths = new FormData();
      ImagePaths.append('file', this.file[0])
      var datatoPost = {
        WarehouseId: UpdateFlashDealImages.WarehouseId
      }

      this.CustomerServices.uploadFlashDealImage(datatoPost.WarehouseId, ImagePaths).subscribe(y => {
        
        let images = y;
        var datatoPosts = {
          WarehouseId: UpdateFlashDealImages.WarehouseId,
          ImagePath: images
        }
        this.WarehouseServices.UpdateUpComingFlashDealImage(datatoPosts).subscribe(z => {
          this.GetUpComingFlashDealImage();
          if (z == true) {
            this.messageService.add({ severity: 'success', summary: 'Data Updated Successfully', detail: '' });
            this.GetUpComingFlashDealImage();
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Data not Upadted', detail: '' });
            this.GetUpComingFlashDealImage();
          }

        })
      })
    }

  }

  RemoveFlashDealImage(rowData, event) {


    let ImagePaths = new FormData();
    //ImagePaths.append('file', this.file[0])
    this.CustomerServices.uploadFlashDealImage(rowData.WarehouseId, ImagePaths).subscribe(y => {

      let images = y;
      var datatoPosts = {
        WarehouseId: rowData.WarehouseId,
        WarehouseName: rowData.WarehouseName,
        ImagePath: images
      }

      this.WarehouseServices.RemoveUpComingFlashDealImage(datatoPosts).subscribe(z => {
        this.GetUpComingFlashDealImage();
        if (z == true) {
          this.file = null;
          this.messageService.add({ severity: 'success', summary: 'Deleted  Successfully', detail: '' });
          this.GetUpComingFlashDealImage();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Deleted  unSuccessfully', detail: '' });
          this.GetUpComingFlashDealImage();
        }


      })
    })

  }
  openDetails(rowDataV1){
    this.rowDataV1 = rowDataV1;
    this.popupOpen=true;
  }
}

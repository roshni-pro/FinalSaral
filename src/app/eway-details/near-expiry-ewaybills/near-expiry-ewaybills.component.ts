import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { NewEwayServiceService } from '../Servicee/new-eway-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
@Component({
  selector: 'app-near-expiry-ewaybills',
  templateUrl: './near-expiry-ewaybills.component.html',
  styleUrls: ['./near-expiry-ewaybills.component.scss']
})
export class NearExpiryEwaybillsComponent implements OnInit {
  popupOpen:boolean=false;
  entity:any;
  constructor(private EwayBillOrderDetailService:NewEwayServiceService,private customerService:CustomerService,  private peoplePilot: PepolePilotService,
    private warehouseService: WarehouseService,private cityService: CityService,private exportservice:ExportServiceService, private msg:MessageService,
    public datepipe:DatePipe) {this.entity="OrderEwayBill" }
    dateMin = new Date();
    showOrderType:boolean=false
    dateMax = new Date();
    OrderTypeList:any[]=[]
    NearExpiryreasonss:any[]=[]
    General:any[]=[
      {name: 'General', code: 1},
      {name: 'InternalTransfer', code: 0}
    ]
    roleName: any;
    roleList: any;
    roleListarry: boolean = true;
  ngOnInit() {

    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      
      for (var i in this.roleList) {
        if (this.roleList[i] == 'WH delivery planner' || this.roleList[i] == 'Outbound Lead'|| this.roleList[i] == 'Hub delivery planner') {
          this.roleListarry = false;
        } 
      }
    });
  
    this.dateMax.setDate(this.dateMax.getDate() ); 

    this.popupOpen=false;
    this.NearExpiryreasonss =
    [
      {name: 'NATURAL_CALAMITY', code: 1},
      {name: 'LAW_ORDER_SITUATION', code: 2},
      {name: 'TRANSSHIPMENT', code: 4},
      {name: 'ACCIDENT', code: 5},
      {name: 'OTHERS', code: 99}
    ]
 
    this.OrderTypeList = 
    [
      {name: 'Delivery Redispatch', code: 'Delivery Redispatch'},
      {name: 'Issued', code: 'Issued'},
      {name: 'Ready to Dispatch', code: 'Ready to Dispatch'},
      {name: 'Shipped', code: 'Shipped'},
      // {name: 'Delivered', code: 'Delivered'},
      // {name: 'sattled', code: 'sattled'},     
    ];
    this.GetWOKPPthird();
    this.general={name: 'General', code: 1}
  }
  WareHouseList:any
  GetWOKPPthird()
  {
    this.warehouseService.GetWarehousesForEWayBill().subscribe(WareRes=>
      {
        this.WareHouseList=WareRes;
        console.log("wareres",this.WareHouseList)
      
        // this.blocked=false;
     })
  }
 SearchHit:boolean=false
  ForSearchHit()
  {
    this.SearchHit=true
    this.first=0;
    this.TotalRecords=0;
  }

  Orderidthree:any
  selectedWareHousethird:any
  FromDatethree:any
  ToDatethree:any
  OrderTypeThree:any
  general:any
  wareID:any[]=[]
  nearlyexpiryDCs:any
  blocked:boolean=false
  NearExpiryewaybills:any
  TotalRecords:any
  ExpiryEwaybills(event)
  {
 

    // if((this.selectedWareHousethird==undefined || this.selectedWareHousethird.length==0) && this.FromDatethree==undefined &&  this.ToDatethree==undefined && this.Orderidthree==undefined &&  this.OrderTypeThree==undefined)
    // {
  
    //   this.showError("Please select atlest one filter criteria"); 
    //   return false;
    // }    
    if(this.ToDatethree!=undefined && (this.FromDatethree==undefined || this.FromDatethree==null ))
    {
      this.showError("Please Select Start Date")
      return false;
    }
    if((this.selectedWareHousethird==undefined || this.selectedWareHousethird.length==0) && (this.lo==false || this.SearchHit==true) )
    {
     
      this.showError("Select Warehouse")    
      return false;  
    }  
    if(this.selectedWareHousethird!=undefined)
    {
        this.wareID=[];
        this.selectedWareHousethird.forEach(element => {
        this.wareID.push(element.value)
      });
    }
    if(this.general.name=='InternalTransfer')
    {
     this.showOrderType=true
    }
    else
    {
     this.showOrderType=false
    }
    if(this.SearchHit==true)
    {
      this.nearlyexpiryDCs =
      {
       
        "Warehouseid" : this.selectedWareHousethird ? this.wareID : [],
        "ordertype": this.OrderTypeThree!=undefined ? this.OrderTypeThree.code : null,
        "OrderId" : this.Orderidthree ? this.Orderidthree : 0,
        "Startdate" :this.FromDatethree ? moment(this.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.ToDatethree ? moment(this.ToDatethree).format('YYYY-MM-DD') : null,
        "skip":event && event.first ? event.first : 0,
        "take":event && event.rows ? event.rows : 10,
        "type": this.general?this.general.code:1
      }
  
      console.log(this.nearlyexpiryDCs);
      
        this.blocked=true;
        this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe(result => {
        console.log("NearExpiryewaybills",result);  
        this.NearExpiryewaybills=result
        this.NearExpiryewaybillList=this.NearExpiryewaybills.nearExpiryDcs  
        this.TotalRecords=this.NearExpiryewaybills.TotalRecord  //TotalRecord
        this.blocked=false;
      })
    }
  }

  skip:any
  take:any
  NearExpiryewaybillsExport:any
  nearlyexpiryDCExport:any
  ExportExpiryEway()
  {
    // if(this.toastE=true && this.searchModel.selectedWareHousethird==undefined && this.searchModel.FromDatethree==undefined &&  this.searchModel.ToDatethree==undefined && this.searchModel.Orderidthree==undefined &&  this.searchModel.OrderTypeThree==undefined)
    // {
    //   this.showError("Please select atlest one filter criteria"); 
    //   return false;
    // }
    // if((this.selectedWareHousethird!=undefined && this.selectedWareHousethird.length > 0) && (this.ToDatethree!=undefined && this.FromDatethree!=undefined ))
    if(this.selectedWareHousethird==undefined && this.Orderidthree==undefined &&  this.OrderTypeThree==undefined && this.FromDatethree==undefined &&  this.ToDatethree==undefined)
    {
      this.showError("Please select atlest one filter criteria")    
      return false;  
    }  
    if(this.NearExpiryewaybillList==undefined)
    {
      this.showError("Please search the data first")    
      return false;
    }
    // if(this.NearExpiryewaybillList==undefined)
    // {
    //   this.showError("Please select atlest one filter criteria")    
    //   return false
    // }
    if(this.ToDatethree!=undefined && (this.FromDatethree==undefined || this.FromDatethree==null ))
    {
      this.showError("Please Select Start Date")
      return false;
    }

    if(this.selectedWareHousethird!=undefined)
    {      
        this.wareID=[];
        this.selectedWareHousethird.forEach(element => {
        this.wareID.push(element.value)
      });        
      this.nearlyexpiryDCExport =
      {
        "ordertype":  this.OrderTypeThree!=undefined ? this.OrderTypeThree.code : null,
        "Warehouseid" :this.selectedWareHousethird ? this.wareID : [],
        "OrderId" : this.Orderidthree ? this.Orderidthree : 0,
        "Startdate" :this.FromDatethree ? moment(this.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.ToDatethree ? moment(this.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : 0,
        "take" :  this.TotalRecords ? this.TotalRecords : 20,
        "type": this.general?this.general.code:1
      }
      var nearExpiryExportNew;  
        this.blocked=true;

        this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCExport).subscribe((result:any) => {
        console.log("NearExpiryewaybills",result);    
        this.NearExpiryewaybillsExport=result.nearExpiryDcs  

        // nearExpiryExportNew = this.NearExpiryewaybillsExport.map(function (a) {
        //   return {
        //      // PaymentRefNo: a.PaymentRefNo,
        //       // OrderId :a.OrderId,
        //       // OrderAmount:a.OrderAmount,
        //       // InvoiceNumber :a.InvoiceNumber,
        //       // OrderStatus:a.OrderStatus,
        //       // EwayBillNumber:a.EwaybillNumber,
        //       // EwayBillDate :a.EwayBillDate,
        //       // EwayBillValidTill:a.EwayBillValidTill,
        //       // CustomerTypeName:a.CustomerTypeName,
        //       // EwayBillStatus:a.EwayBillStatus,
        //   };
       // });

          if(this.NearExpiryewaybillsExport && this.NearExpiryewaybillsExport.length > 0)
          {
            this.exportservice.exportAsExcelFile(this.NearExpiryewaybillsExport,"Export Near Expiry Eway-bills Data")
            this.blocked=false;
          }  else  {
            this.showError('No Data Found!');
            this.blocked=false;
          }       
      })      
    }
  }

  NearExpiryEwayBillspopup:boolean=false
  Reasonofextension:any
  RemarkThird:any
  CurrentPlacethird:any
  Pincodethird:any
  CurrentStatethird:any
  VehicleNumberThird:any
  ExtendTableData:any
  NearExpiryEwaypopup(item)
  {
    this.ExtendTableData=item
    this.press=false;
    this.NearExpiryEwayBillspopup=true;
    this.Reasonofextension=undefined
    this.RemarkThird=undefined
    this.CurrentPlacethird=undefined
    this.Pincodethird=undefined
    this.CurrentStatethird=undefined
    this.VehicleNumberThird=undefined
    this.Address=undefined
    this.transDocNo=undefined
    this.transDocDate=undefined
  }
  
  transDocNo:any
  transDocDate:any
  Address:any
  press:boolean=false
  show:any
  isReasonofextension:boolean=false;
  isRemarkThird:boolean=false;
  istransDocNo:boolean=false;
  istransDocDate:boolean=false;
  isAddress:boolean=false;
  isVehicleNumberThird:boolean=false;
  ExtendValidityEwaybill()
  {
  if(this.Reasonofextension==undefined){
    this.isReasonofextension=true;    
  }
  if(this.RemarkThird==undefined){
    this.isRemarkThird=true;   
  }
  if((this.transDocNo==undefined || this.transDocNo=="") && this.transDocDate){
    this.istransDocNo=true;
    return false;
  }
  if(this.transDocNo==undefined){
    this.istransDocNo=false;
  }else if(this.transDocNo && this.transDocDate==undefined){
    this.istransDocDate=true;
    return false;
  }
  if(this.transDocDate==undefined){
    this.istransDocDate=false;
  }
  if(this.Address==undefined){
    this.isAddress=true; 
  }
  if(this.VehicleNumberThird==undefined){
    this.isVehicleNumberThird=true;
  }
      console.log("ExtendTableData",this.ExtendTableData)
      var eway=parseInt(this.ExtendTableData.EwaybillNumber)
      if(this.VehicleNumberThird!=undefined && this.RemarkThird!=undefined && this.Address!=undefined){
      const payload=
      {
        "orderid": this.ExtendTableData.OrderId,
        "ewbNo": eway,
        "vehicleNo": this.VehicleNumberThird,
        "fromPlace": this.ExtendTableData.fromPlace,
        "fromState": this.ExtendTableData.fromState,
        "remainingDistance": this.ExtendTableData.Distance,
        "transDocNo": this.transDocNo,
        "transDocDate": this.datepipe.transform(this.transDocDate, 'dd/MM/yyyy'),//formatDate(this.transDocDate,'dd/MM/yyyy'),
        "transMode": 1,
        "extnRsnCode":  this.Reasonofextension.name ,// this.Reasonofextension.code
        "extnRemarks": this.RemarkThird,
        "fromPincode": this.ExtendTableData.fromPincode,
        "consignmentStatus": null,
        "transitType": null,
        "addressLine1": this.Address,
        "addressLine2": this.Address,
        "addressLine3": this.Address,
        "Customertype":this.ExtendTableData.CustomerType ==1?0:0,
        // "Customertype": this.ExtendTableData.CustomerType,
         "APITypes" :this.general.name=='InternalTransfer'?2:1
      }
      console.log(payload);
      this.blocked=true;
      this.EwayBillOrderDetailService.ExtendValidityEwaybill(payload).subscribe((result:any)=>{
        console.log("result",result);       
        if(result.status==true)
        {
          alert(result.Message)
          this.NearExpiryEwayBillspopup=false;
          this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe(result => {
            console.log("NearExpiryewaybills",result);  
            this.NearExpiryewaybills=result
            this.NearExpiryewaybillList=this.NearExpiryewaybills.nearExpiryDcs  
            this.TotalRecords=this.NearExpiryewaybills.TotalRecord  //TotalRecord
            this.blocked=false;
            this.ExpiryEwaybills(event)
          })
        }
        else{
          alert(result.Message)
          this.NearExpiryEwayBillspopup=false;
          this.blocked=false;
          this.ExpiryEwaybills(event)
          window.location.reload();
        } 
      })
    }
    }
  

  NearExpiryEwayCancel()
  {
    this.NearExpiryEwayBillspopup=false;
  }

  Capital(event){
    const pattern = /[A-Z0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  result:any
  lo:boolean=false
  load(event)
  {
    this.lo=true
    this.ExpiryEwaybills(event);
  }

  ClearExpiryEway()
  {
    this.selectedWareHousethird=undefined
    this.OrderTypeThree=undefined
    this.Orderidthree=undefined
    this.FromDatethree=undefined
    this.ToDatethree=undefined
    this.NearExpiryewaybillList=undefined
    this.TotalRecords=0
    this.first=0
  }
   
  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

  NearExpiryewaybillList:any
  first:number=0
  // KeyUpClean()
  // {
  //   this.NearExpiryewaybillList=undefined
  //   this.TotalRecords=0
  //   this.first=0
  //   this.skip=0
  //   this.take=0
  // }

  isSearch:boolean=false
  toggleSearch(){
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }

  // keyPress(event: any) {
  //   const pattern = /[0-9]/;
  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }
  rowDataV1:any;
  openDetails(rowDataV1){

    this.rowDataV1 = rowDataV1;
    this.popupOpen=true;
  }
}


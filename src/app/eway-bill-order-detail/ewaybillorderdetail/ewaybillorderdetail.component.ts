import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { OrderDC,InternalTransfersDC,nearlyexpiryDC,FailedEwaybillDC } from '../Interface/EwayInterface';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { EwayBillOrderDetailServiceService } from '../Service/eway-bill-order-detail-service.service';
import { MessageService } from 'primeng/primeng';
import { CustomerService } from 'app/shared/services/customer.service';
@Component({
  selector: 'app-ewaybillorderdetail',
  templateUrl: './ewaybillorderdetail.component.html',
  styleUrls: ['./ewaybillorderdetail.component.scss']
})
export class EwaybillorderdetailComponent implements OnInit {

  searchModel: any;
  isSearch:boolean
  isSearchfour:boolean
  isSearchthree:boolean
  isSearchtwo:boolean
  FailedEwaybills:any[]=[];
  NearExpiryEwayBills:any[]=[]
  openupdatepopup:boolean=false;
  opengeneratebill:boolean=false;
  opencancelbill:boolean=false;
  NearExpiryEwayBillspopup:boolean=false
  tranfergeneratepopup:boolean=false
  reasonss:any[]=[]
  NearExpiryreasonss:any[]=[]
  status:any[]=[]
  OrderType:any[]=[]
  WareHouseList:any[]=[]
  WareHouseListf:any
  cityList:any[]=[]
  SelectedCity:any
  CtyId:any
  wareID:any
  orderlist: any[]
  orderlistt: any[]
  OrderTypeListtt:any[]=[]
  FailedEwaybillList:any[]
  index: number = 0;
  currentTab:number=0
  selectDate:any
  blocked:boolean=false
  opencancelbil:any[]=[]
  Error:any[]
  GSTdisplay: boolean=false;
  GSTdisplayy: boolean=false;
  GSTCustomerName:any;
  skip:any
  take:any
  tabCurrentIndex:number
  TotalRecord:any
  OrderTypeList:any
  WareHouseListthird:any 
  ITList:any
  itExportData:any
  Internal:any[]=[]
  WareHouseListsecond:any
  TotalRecords:any
  WareHouseListlast:any
  CtyIdd:any
  TotalRecordsThird:any
  NearExpiryewaybills:any
  NearExpiryewaybillList:any
  isverified:boolean=false;
  disabled:boolean=false;
  disabledd:boolean=false;
  ab:boolean=true
  tabCtype:boolean=false
  cd:boolean=false
  isverify:boolean=false;
  GSTCustomerNames:any
  NearExpiryewaybillsExport:any
  entity : any;
  historyHide:boolean=false
  OrderDCs:OrderDC
  InternalTransfersDCs:InternalTransfersDC
  FailedEwaybillDCs:FailedEwaybillDC
  nearlyexpiryDCs:nearlyexpiryDC

  constructor(private EwayBillOrderDetailService:EwayBillOrderDetailServiceService,private customerService:CustomerService,
    private warehouseService: WarehouseService,private cityService: CityService,private exportservice:ExportServiceService, private msg:MessageService,
    public datepipe:DatePipe) 
    { this.searchModel = {};  
    this.GetOrderType();
    this.OrderTypeListtt = 
    [
      {name: 'Issued', code: 'Issued'},
      {name: 'Ready to Dispatch', code: 'Ready to Dispatch'},
      {name: 'Shipped', code: 'Shipped'},
      {name: 'Delivered', code: 'Delivered'},
      {name: 'sattled', code: 'sattled'},   
      {name: 'Delivery Redispatch', code: 'Delivery Redispatch'},
    ];
    
    this.reasonss = 
    [
      {name: 'Due to breake down', code: '01'},
      {name: 'Due to shipment', code: '02'},
      {name: 'Other', code: '03'}
    ];
    this.NearExpiryreasonss =
    [
      {name: 'Natural Calamit', code: '01'},
      {name: 'Law & Orders', code: '02'},
      {name: 'Transhipment', code: '03'},
      {name: 'Accident', code: '04'},
      {name: 'Other', code: '05'}
    ]
    this.opencancelbil=
    [
      {name: 'Wrong Entry', code: '01'},
      {name: 'Duplicate', code: '02'},
      {name: 'Order Cancel', code: '03'},
      {name: 'Others', code: '04'}
    ]

    this.status = 
    [      
      {name: 'Issued', code: 'Issued'},
      {name: 'Ready to Dispatch', code: 'Ready to Dispatch'},
      {name: 'Shipped', code: 'Shipped'},
      {name: 'Delivered', code: 'Delivered'},
      {name: 'sattled', code: 'sattled'},        
      {name: 'Delivery Redispatch', code: 'Delivery Redispatch'},
    ];
   }

  ngOnInit() 
  {
    this.GetOrderType();
    this.GetWOKPPthird();
    this.GetWarehousesSecond();
    this.GetCity();
    this.GetWarehousef();
  }

   orderlistEmpty()
   {
    this.orderlist=undefined
   }
  printV()
  {
    this.historyHide = true;  
  }
  
  OrderPageHistoryData:any
  ophd:boolean=false
  OrderHistory(d)
  {
    debugger;
    this.EwayBillOrderDetailService.OrderPageHistory(d.OrderId).subscribe(res=>{
      console.log(res);
      this.ophd=true
      this.OrderPageHistoryData=res
    }) 
  }
  onDismiss()
  {
    this.ophd=false
  }

  reasonchaneg(){
    if(this.searchModel.Reason.name == 'Other'){
      this.disabled=true;
    }
    else{
      this.disabled=false;
    }
  }
  Updatesubmit(){
    debugger;
    if(this.searchModel.Vehiclenumupdatetwo==undefined )
    {
      this.showError("Enter Vehicle Number");
      return false;
    }
    else if( this.searchModel.placeofchangeupdate == undefined )
    {
      this.showError(" Enter Place of Change")
      return false;
    }
    else if( this.searchModel.Reason == undefined)
    {
      this.showError("Select Reason")
      return false;
    }
    else if(this.searchModel.Reason.name == 'Other' && this.searchModel.UpdateComment==undefined )
    {
      this.showError("please enter comment")
    }
    else if(this.searchModel.Vehiclenumupdatetwo!=undefined && this.searchModel.placeofchangeupdate != undefined && this.searchModel.Reason != undefined)
    {
      debugger;//aartimukati
      var ewbNo=this.ewaynumber
      var vehicleNo=this.searchModel.Vehiclenumupdatetwo ? this.searchModel.Vehiclenumupdatetwo:null
      var  reasonCode = this.searchModel.Reason ? this.searchModel.Reason.code : 0
      var reasonRem= this.searchModel.Reason ? this.searchModel.Reason.name : null

      const payload =
      {
        "ewbNo" : ewbNo,
        "vehicleNo" : vehicleNo,
        "reasonCode" : reasonCode,
        "reasonRem": reasonRem
      }

      this.EwayBillOrderDetailService.GetvehicleUpdate(payload).subscribe(res=>{
        debugger;
        console.log(res);
      })
      this.openupdatepopup=false;
    }
  }
  
  cancelreasonchange()
  {
    if(this.searchModel.reasoncancel.name == 'Others'){
      this.disabledd=true;
    }
    else{
      this.disabledd=false;
    }
  }
kl:boolean=false
  CancelSubmitBtn() ////Cancel Button funtion
  {
    debugger;
    if(this.searchModel.reasoncancel == undefined){
      this.showError("Please select option")
    }

    if(this.searchModel.reasoncancel.name == 'Others' && this.searchModel.CommentCancel==undefined)
    {
      if(this.searchModel.CommentCancel==undefined )
      {
        this.showError("please enter comment")
        return false;
      }
      else{
        this.showError("condition")  
      }
      return false;
    }
    else{
      alert("conditon")
      this.kl=true
    this.opencancelbill=false;
    }
  }
  
  GetCity()
  {
    // this.blocked=true;
    this.cityService.GetAllCity().subscribe(result => {
      this.cityList = result;
      // this.blocked=false;
    })
  }

  GetWarehouse()
  {
    // this.blocked=true;
    debugger;
    this.CityIDD=[]
      this.searchModel.SelectedCity.forEach(element => {
      this.CityIDD.push(element.Cityid)     
      this.customerService.GetWarehouseListForTarget(this.CityIDD).subscribe(WareRes=>
      { 
        this.WareHouseList=WareRes       
      })
    })
  }

  getEwaybillListundefined()
  {
    this.cd=true
  }

  CityIDD:any[]
  WareID:any[]=[]
  r:any
  getEwaybillList()
  {
    debugger;    
    // if(this.toastE==false && (this.ab==true || this.cd==true) && this.tabCtype==true && this.searchModel.SelectedCity==undefined  && this.searchModel.selectedWareHouse==undefined &&   this.searchModel.SkCode == undefined && (this.searchModel.OrderId==undefined || this.searchModel.OrderId=='') && this.searchModel.FromDate==undefined &&   this.searchModel.ToDate==undefined &&   this.searchModel.Status ==undefined) 
    // {
    //   this.showError("Please select atlest one filter criteria")
    //   this.ab=false 
    //   return false ;      
    // }
    // console.log("sdvhji",this.searchModel.selectedWareHouse);
    if(this.searchModel.FromDate == undefined && this.searchModel.ToDate != undefined)
    {
      this.showError("please select StartDate")
    }
    else if(this.searchModel.ToDate == undefined && this.searchModel.FromDate != undefined )
    {
      this.showError("please select EndDate")
    }

    else if(this.searchModel.OrderId !=0 && this.searchModel.OrderId !='' && this.searchModel.OrderId !=undefined && this.searchModel.SelectedCity==undefined 
    && this.searchModel.selectedWareHouse==undefined  &&  this.searchModel.Status ==undefined && this.searchModel.ToDate==undefined && this.searchModel.FromDate==undefined)
    {   
      // console.log(WID, FromDatee, ToDatee, OrderId, SKCode, Status);
      if(this.searchModel.OrderId !=0)
      {
        this.OrderDCs=
        {
          "cityid": this.searchModel.SelectedCity ? [] : [] ,
          "warehouseid":this.searchModel.selectedWareHouse ? [] : [],
          "orderid": this.searchModel.OrderId  ,
          "skcode":  this.searchModel.SKCode ? this.searchModel.SKCode : null,
          "Status":  this.searchModel.Status ? this.searchModel.Status.code :null,
          "startdate":this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null  ,
          "EndDate":this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null  ,
          "skip": this.skip,
          "take":  this.take  
        }

        this.blocked=true;
        this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe(result=>{
          console.log("result",result);
          // this.orderlist=result.getEwaydata
          this.r = result
          this.orderlist=this.r.getEwaydata
          console.log("orderlist",this.orderlist);
          this.TotalRecord=this.r.TotalRecord
          console.log("tr",this.TotalRecord);
          this.blocked=false;
          this.tabC==false;
        })
      } 
    } 
    else if(this.toastE==false && (this.ab==true || this.cd==true) && this.tabCtype==true && this.searchModel.SelectedCity==undefined ) 
    {
      this.showError("Select City")
      this.ab=false 
      return false ;      
    } 
   
    else if(this.searchModel.SelectedCity!=undefined && this.searchModel.SelectedCity!=null && this.searchModel.SelectedCity!='' && this.searchModel.selectedWareHouse==undefined ) 
    {
      debugger;
      this.CityIDD=[];
      this.searchModel.SelectedCity.forEach(element => {
      this.CityIDD.push(element.Cityid)
    });
    this.OrderDCs=
    {
      "cityid": this.searchModel.SelectedCity  ? this.CityIDD : [],
      "warehouseid":this.searchModel.selectedWareHouse ? this.searchModel.selectedWareHouse : [],
      "orderid":this.searchModel.OrderId ? this.searchModel.OrderId : 0 ,
      "skcode": this.searchModel.SKCode ? this.searchModel.SKCode : null,
      "Status": this.searchModel.Status ? this.searchModel.Status.code  :null,
      "startdate": this.searchModel.FromDate? moment(this.searchModel.FromDate).format('YYYY-MM-DD') :null,
      "EndDate":  this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null,
      "skip":  this.skip,
      "take": this.take
    }
      this.blocked=true;
      this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe(result=>{
        console.log("result",result);
        this.r = result
        this.orderlist=this.r.getEwaydata
        console.log("orderlist",this.orderlist);
        this.TotalRecord=this.r.TotalRecord
        console.log("tr",this.TotalRecord);
        this.tabC==false;
        this.blocked=false;
      })
    
    }
    else if(this.toastE==false && (this.ab==true || this.cd==true) && this.tabCtype==true && this.searchModel.selectedWareHouse==undefined ) 
    {
      this.showError("Select Warehouse")
      this.ab=false 
      return false ;      
    } 

    else if(this.searchModel.selectedWareHouse!=undefined && this.searchModel.selectedWareHouse!=null && this.searchModel.selectedWareHouse!='' ) 
    {
      this.WareID=[];
      this.CityIDD=[];
      this.searchModel.SelectedCity.forEach(element => {
        this.CityIDD.push(element.Cityid)
    });
      this.searchModel.selectedWareHouse.forEach(element => {
      this.WareID.push(element.WarehouseId)
    });
    
      this.OrderDCs=
    {
      "cityid":this.searchModel.SelectedCity ? this.CityIDD : [],
      "warehouseid":this.searchModel.selectedWareHouse  ? this.WareID : [],
      "startdate":this.searchModel.FromDate? moment(this.searchModel.FromDate).format('YYYY-MM-DD') :null,
      "EndDate":this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null,
      "orderid":this.searchModel.OrderId ? this.searchModel.OrderId : 0,
      "skcode": this.searchModel.SKCode ? this.searchModel.SKCode : null,
      "Status": this.searchModel.Status ? this.searchModel.Status.code  :null,
      "skip":this.skip,
      "take":this.take
    }
     this.blocked=true;
      this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe((result:any)=>{
        console.log(result);
        this.r = result
        this.orderlist=this.r.getEwaydata
        console.log("orderlist",this.orderlist);
        this.TotalRecord=this.r.TotalRecord
        console.log("tr",this.TotalRecord);

        this.tabC==false;
        this.blocked=false;
      })  
    }
  }

  ExportEwayOrders()
  {
    debugger;
    // if( this.searchModel.SelectedCity==undefined  && this.searchModel.selectedWareHouse==undefined &&   this.searchModel.SkCode == undefined && this.searchModel.OrderId==undefined && this.searchModel.FromDate==undefined &&   this.searchModel.ToDate==undefined &&   this.searchModel.Status ==undefined) 
    // {debugger;
    //   this.showError("Please select atlest one filter criteria")
    //   return false;
    // }
    if(this.orderlist==undefined)
    {
      this.showError("Please search the data first")
      return false;
    }    
    else if(this.searchModel.FromDate == undefined && this.searchModel.ToDate != undefined)
    {
      this.showError("please select StartDate")
    }
    else if(this.searchModel.ToDate == undefined && this.searchModel.FromDate != undefined )
    {
      this.showError("please select EndDate")
    }

    else if(this.searchModel.OrderId !=0 && this.searchModel.OrderId !='' && this.searchModel.OrderId !=undefined && this.searchModel.SelectedCity==undefined 
    && this.searchModel.selectedWareHouse==undefined  &&  this.searchModel.Status ==undefined && this.searchModel.ToDate==undefined && this.searchModel.FromDate==undefined)
    {
      this.OrderDCs=
          {
            "cityid":this.searchModel.SelectedCity ? [] : [],
            "warehouseid":this.searchModel.selectedWareHouse  ? [] : [],
            "startdate":this.searchModel.FromDate? moment(this.searchModel.FromDate).format('YYYY-MM-DD') :null,
            "EndDate":this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null,
            "orderid":this.searchModel.OrderId ? this.searchModel.OrderId : 0,
            "skcode": this.searchModel.SKCode ? this.searchModel.SKCode : null,
            "Status": this.searchModel.Status ? this.searchModel.Status.code  :null,
            "skip":this.skip,
            "take":this.TotalRecord
          }
          this.blocked=true;
          this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe(result=>{
            console.log("result",result);
            this.blocked=false;
            this.r = result
            this.orderlistt=this.r.getEwaydata
            console.log("orderlistt",this.orderlistt);
            this.TotalRecord=this.r.TotalRecord
            console.log("tr",this.TotalRecord);
          this.blocked=false;
          var exportData=[];
          for (var i in this.orderlistt) {
            var selectedFields = {
              OrderId: this.orderlistt[i].OrderId,
              OrderAmount: this.orderlistt[i].orderamount,
              InvoiceNo:this.orderlistt[i].InvoiceNo,
              Skcode: this.orderlistt[i].Skcode,
              OrderStatus:this.orderlistt[i].OrderStatus,
              CustomerDetails:this.orderlistt[i].Skcode,
              CustomerName:this.orderlistt[i].CustomerName,
              MobileNo:this.orderlistt[i].MobileNo,
              EwayBillNumber:this.orderlistt[i].EwayBillNumber
          }
          exportData.push(selectedFields);
        
          }
          if(this.orderlistt && this.orderlistt.length > 0)
          {
            this.exportservice.exportAsExcelFile(exportData,"Export EwayOrder Data")
            this.blocked=false;
          }
          else
          {
            this.showError('No Data Found!');
            this.blocked=false;
          }       
        })
      
    } 
    else if(this.toastE==false && (this.ab==true || this.cd==true) && this.tabCtype==true && this.searchModel.SelectedCity==undefined ) 
    {
      this.showError("Select City")
      this.ab=false 
      return false ;      
    } 
   
    else if(this.searchModel.SelectedCity!=undefined && this.searchModel.SelectedCity!=null && this.searchModel.SelectedCity!='' && this.searchModel.selectedWareHouse==undefined ) 
    {
      debugger;
      this.CityIDD=[];
      this.searchModel.SelectedCity.forEach(element => {
      this.CityIDD.push(element.Cityid)
    });

        this.OrderDCs=
        {
          "cityid":this.searchModel.SelectedCity ? this.CityIDD : [],
          "warehouseid":this.searchModel.selectedWareHouse  ?this.searchModel.selectedWareHouse : [],
          "startdate":this.searchModel.FromDate? moment(this.searchModel.FromDate).format('YYYY-MM-DD') :null,
          "EndDate":this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null,
          "orderid":this.searchModel.OrderId ? this.searchModel.OrderId : 0,
          "skcode": this.searchModel.SKCode ? this.searchModel.SKCode : null,
          "Status": this.searchModel.Status ? this.searchModel.Status.code  :null,
          "skip":this.skip,
          "take":this.TotalRecord
        }
        this.blocked=true;
        this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe(result=>{
          console.log("result",result);
          this.blocked=false;
          this.r = result
          this.orderlistt=this.r.getEwaydata
          console.log("orderlistt",this.orderlistt);
          this.TotalRecord=this.r.TotalRecord
          console.log("tr",this.TotalRecord);
        this.blocked=false;
        var exportData=[];
        for (var i in this.orderlistt) {
          var selectedFields = {
            OrderId: this.orderlistt[i].OrderId,
            OrderAmount: this.orderlistt[i].orderamount,
            InvoiceNo:this.orderlistt[i].InvoiceNo,
            Skcode: this.orderlistt[i].Skcode,
            OrderStatus:this.orderlistt[i].OrderStatus,
            CustomerDetails:this.orderlistt[i].Skcode,
            CustomerName:this.orderlistt[i].CustomerName,
            MobileNo:this.orderlistt[i].MobileNo,
            EwayBillNumber:this.orderlistt[i].EwayBillNumber
        }
        exportData.push(selectedFields);
      
        }
        if(this.orderlistt && this.orderlistt.length > 0)
        {
          this.exportservice.exportAsExcelFile(exportData,"Export EwayOrder Data")
          this.blocked=false;
        }
        else
        {
          this.showError('No Data Found!');
          this.blocked=false;
        }       
      })
   
    }
    else if(this.toastE==false && (this.ab==true || this.cd==true) && this.tabCtype==true && this.searchModel.selectedWareHouse==undefined ) 
    {
      this.showError("Select Warehouse")
      this.ab=false 
      return false ;      
    } 

    else if(this.searchModel.selectedWareHouse!=undefined && this.searchModel.selectedWareHouse!=null && this.searchModel.selectedWareHouse!='' ) 
    {
      var cityiddd=[]
      var widddd=[]
      this.WareID=[];
      this.CityIDD=[];
      this.searchModel.SelectedCity.forEach(element => {
        this.CityIDD.push(element.Cityid)
      });
        this.searchModel.selectedWareHouse.forEach(element => {
        this.WareID.push(element.WarehouseId)
      });
      this.OrderDCs=
      {
        "cityid":this.searchModel.SelectedCity ? this.CityIDD : [],
        "warehouseid":this.searchModel.selectedWareHouse  ? this.WareID : [],
        "startdate":this.searchModel.FromDate? moment(this.searchModel.FromDate).format('YYYY-MM-DD') :null,
        "EndDate":this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null,
        "orderid":this.searchModel.OrderId ? this.searchModel.OrderId : 0,
        "skcode": this.searchModel.SKCode ? this.searchModel.SKCode : null,
        "Status": this.searchModel.Status ? this.searchModel.Status.code  :null,
        "skip":this.skip,
        "take":this.TotalRecord
      }
      this.blocked=true;
      this.EwayBillOrderDetailService.GetEwaybillOrder(this.OrderDCs).subscribe(result=>{
        console.log("result",result);
        this.blocked=false;
        this.r = result
        this.orderlistt=this.r.getEwaydata
        console.log("orderlist",this.orderlistt);
        this.TotalRecord=this.r.TotalRecord
        console.log("tr",this.TotalRecord);
      this.blocked=false;
      var exportData=[];
      for (var i in this.orderlistt) {
        var selectedFields = {
          OrderId: this.orderlistt[i].OrderId,
          OrderAmount: this.orderlistt[i].orderamount,
          InvoiceNo:this.orderlistt[i].InvoiceNo,
          Skcode: this.orderlistt[i].Skcode,
          OrderStatus:this.orderlistt[i].OrderStatus,
          CustomerDetails:this.orderlistt[i].Skcode,
          CustomerName:this.orderlistt[i].CustomerName,
          MobileNo:this.orderlistt[i].MobileNo,
          EwayBillNumber:this.orderlistt[i].EwayBillNumber
      }
        exportData.push(selectedFields);
      
        }
        if(this.orderlistt && this.orderlistt.length > 0)
        {
          this.exportservice.exportAsExcelFile(exportData,"Export EwayOrder Data")
          this.blocked=false;
        }
        else
        {
          this.showError('No Data Found!');
          this.blocked=false;
        }       
      })
    }
  }

  ClearEwayOrders()
  {
    this.searchModel.SelectedCity=undefined
    this.searchModel.selectedWareHouse =undefined,
    this.WareHouseList =[],
    this.TotalRecord= undefined    
    this.searchModel.OrderId=undefined
    this.searchModel.FromDate=undefined
    this.searchModel.ToDate=undefined
    this.searchModel.Status=undefined
    this.orderlist=[]
    this.orderlist=undefined
  }

  VarifiedCustomerGSTNO(text) {
    if(text == undefined)
    {
      alert("Please enter Transport GST")
    }
     if (text.length == 15) {
        this.blocked = true;
        this.EwayBillOrderDetailService.CheckVarifiedCustomerGSTNO(text).subscribe(result => {
          if (result.Status) {
            this.GSTCustomerName  = result.custverify.Name;
            this.GSTdisplay = true;
            this.isverify=true;
            this.blocked = false;
          } 
          else
          {
            alert("Invalid  Transport GST. "); 
            // this.GSTdisplay=false;
            this.blocked = false;
          }
        })
      } 
      else { alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE"); 
    // this.GSTdisplay=false;
    this.blocked = false;
    }
  }

  generatesuubmitbtn(){
    console.log("asffffffffffffffffff",this.OrrdID);
    
    if (this.searchModel.Pincodeone  == undefined)
    {
      this.showError("Please Enter Pincode");
    }
    else if (this.searchModel.VehicleNumgenerateone == undefined)
    {
      this.showError("Please Enter Vehicle Number ");
      
    }
    else if (this.searchModel.RefNo == undefined || this.searchModel.RefNo == "")
    {
      this.showError("Please Enter Transpost GST Number");
    }
    else if (this.searchModel.Distanceone == undefined)
    {
      this.showError("Please Enter Distance");
      this.searchModel.Distanceone=0
    }
    else if(this.isverify==false)
    {
      this.showError("Please Verify Transport GST Number");
    }
    else {
      
      this.isverify =true;
      debugger;
      this.EwayBillOrderDetailService.GeneratedEwayBillNo(this.OrrdID).subscribe(res=>
        {
          debugger; 
          console.log(res);
          // this.blocked=false;
        })
      //this.opengeneratebill=false;
    }    
  }

  gstpopupclose()
  {
    this.GSTdisplay = false;
  }
  OrrdID:any
  generateitem(it)
  {
    debugger;
    console.log("fwqdwqed",it);
    this.OrrdID=it
    this.opengeneratebill=true;
    this.searchModel.RefNo=undefined
    this.GSTCustomerName=undefined
    this.searchModel.Pincodeone=undefined
    this.searchModel.Distanceone=undefined
    this.isverify=false;
    this.searchModel.VehicleNumgenerateone=undefined
  }
  CancelOrder()
  {
    debugger;
    this.searchModel.reasoncancel=undefined
    this.searchModel.CommentCancel=undefined
    this.opencancelbill=true;
  }
  ewaynumber:any
  updateitem(enm)
  {
    console.log(enm);
    this.ewaynumber=enm
    this.searchModel.Vehiclenumupdatetwo=undefined
    this.searchModel.placeofchangeupdate=undefined
    this.searchModel.Reason=undefined
    this.searchModel.UpdateComment=undefined
    this.openupdatepopup=true;
  }
  generateeeCancel()
  {
    this.opengeneratebill=false;
    this.isverify=false; 
  }
  generateCancel()
  {
    this.opencancelbill=false;
  }
  updatepopupClose()
  {
    this.openupdatepopup=false;
  }
  cancelbillBtn()
  {
    this.opencancelbill=false;
  }
  GSTdisplayClose()
  {
    this.GSTdisplay=false
  }
  GSTdisplayClosee()
  {
    this.GSTdisplayy=false
  }
  // first end  Second Start --------------------------------------------------------------------------------------

  wer:boolean=false
  InternalTransferHistoryData:any
  openHistoryy(doy)
  {
    debugger;
    this.EwayBillOrderDetailService.ITHistory(doy.TransferOrderId).subscribe(res=>{
      console.log(res);
      this.wer=true
      this.InternalTransferHistoryData=res
    }) 
  }

  onDismisss(){
    this.wer=false
  }

  GetWarehousesSecond()
  {
    this.warehouseService.GetAllWarehouse().subscribe(WareRes=>
      { 
        debugger;
        this.WareHouseListsecond=WareRes
        console.log(this.WareHouseListsecond);
        this.WareHouseListsecond.forEach(element => {
          element.warecity=element.WarehouseName+' '+element.CityName
        });
        console.log(this.WareHouseListsecond);
      })
  }
  tty:any
  InternalTransfers()
  {
    debugger;     
    if(this.searchModel.FromDatetwo!=undefined && (this.searchModel.ToDatetwo==undefined ||this.searchModel.ToDatetwo==null))
    {
      alert("Please Select End date")
      return false;
    }
    if(this.searchModel.ToDatetwo!=undefined && (this.searchModel.FromDatetwo==undefined ||this.searchModel.FromDatetwo==null))
    {
      this.showError("Please Select Start date")
      return false;
    }
    if(this.searchModel.TransferOrderidTwo!=undefined && this.searchModel.selectedWareHousesecond==undefined && this.searchModel.FromDatetwo==undefined &&
      this.searchModel.ToDatetwo==undefined &&
      (this.searchModel.InvoiceTwo==undefined || this.searchModel.InvoiceTwo=='' || this.searchModel.InvoiceTwo==null))
    {

      this.InternalTransfersDCs= 
      {
        "Warehouseid":this.searchModel.selectedWareHousesecond ? [] : [] ,
        "TransferOrderId":  this.searchModel.TransferOrderidTwo ? this.searchModel.TransferOrderidTwo : 0 ,
        "InvoiceNumber":  this.searchModel.InvoiceTwo ? this.searchModel.InvoiceTwo : null ,
        "Startdate": this.searchModel.FromDatetwo ? moment(this.searchModel.FromDatetwo).format('YYYY-MM-DD') : null,
        "EndDate": this.searchModel.ToDatetwo ? moment(this.searchModel.ToDatetwo).format('YYYY-MM-DD') : null ,
        "skip": this.skip ,
        "take": this.take,
      }
      this.blocked=true;
      this.EwayBillOrderDetailService.internaltransfernew( this.InternalTransfersDCs).subscribe(result => {
       console.log(result);
        this.tty = result
       this.ITList=this.tty.ewayBillInternalTransfernews
       this.TotalRecord=this.tty.TotalRecord
       this.blocked=false;
       console.log("this.ITList",this.ITList);
     });
      return false;
    }
    if(this.searchModel.selectedWareHousesecond==undefined  )
    {
      debugger;
      this.showError("Select Warehouse")    
      return false;  
    }
    if(this.searchModel.selectedWareHousesecond!=undefined && this.searchModel.selectedWareHousesecond!=null )
    {
      this.WareID=[];
      this.searchModel.selectedWareHousesecond.forEach(element => {
      this.WareID.push(element.WarehouseId)
    });

     
      this.InternalTransfersDCs= 
      {
        "Warehouseid":this.searchModel.selectedWareHousesecond ? this.WareID : [] ,
        "TransferOrderId":  this.searchModel.TransferOrderidTwo ? this.searchModel.TransferOrderidTwo : 0 ,
        "InvoiceNumber":  this.searchModel.InvoiceTwo ? this.searchModel.InvoiceTwo : null ,
        "Startdate": this.searchModel.FromDatetwo ? moment(this.searchModel.FromDatetwo).format('YYYY-MM-DD') : null,
        "EndDate": this.searchModel.ToDatetwo ? moment(this.searchModel.ToDatetwo).format('YYYY-MM-DD') : null ,
        "skip": this.skip ,
        "take": this.take,
      }
      this.blocked=true;
      this.EwayBillOrderDetailService.internaltransfernew(this.InternalTransfersDCs).subscribe(result => {
       console.log(result);
        this.tty = result
       this.ITList=this.tty.ewayBillInternalTransfernews
       this.TotalRecord=this.tty.TotalRecord
       this.blocked=false;
       console.log("this.ITList",this.ITList);
      //  this.TotalRecords=result.TotalRecords    
     });
     return false;
    }    
  }
  EmptyITList()
  {
    this.ITList=undefined
  }
  ExportInternalTransfers()
  {
    debugger;
    if( this.searchModel.SelectedCity==undefined  && this.searchModel.selectedWareHouse==undefined &&   this.searchModel.SkCode == undefined && this.searchModel.OrderId==undefined && this.searchModel.FromDate==undefined &&   this.searchModel.ToDate==undefined &&   this.searchModel.Status ==undefined) 
   
    if(this.searchModel.selectedWareHousesecond==undefined && this.searchModel.TransferOrderidTwo==undefined &&  this.searchModel.InvoiceTwo==undefined && this.searchModel.FromDatetwo==undefined &&  this.searchModel.ToDatetwo==undefined)
    {
      debugger;
      this.showError("Please select atlest one filter criteria")    
      return false;  
    }
    if(this.ITList==undefined)
    {
      this.showError("Please search the data first")    
      return false;
    }
    
    // if(this.searchModel.FromDatetwo!=undefined && (this.searchModel.ToDatetwo==undefined ||this.searchModel.ToDatetwo==null))
    // {
    //   alert("Please Select End date")
    //   return false;
    // }
    if(this.searchModel.ToDatetwo!=undefined && (this.searchModel.FromDatetwo==undefined ||this.searchModel.FromDatetwo==null))
    {
      this.showError("Please Select Start date")
      return false;
    }
    if(this.searchModel.FromDatetwo!=undefined && this.searchModel.ToDatetwo!=undefined )
    {
      this.InternalTransfersDCs= 
      {
        "Warehouseid":this.searchModel.selectedWareHousesecond ? this.WareID : [] ,
        "TransferOrderId":  this.searchModel.TransferOrderidTwo ? this.searchModel.TransferOrderidTwo : 0 ,
        "InvoiceNumber":  this.searchModel.InvoiceTwo ? this.searchModel.InvoiceTwo : null ,
        "Startdate": this.searchModel.FromDatetwo ? moment(this.searchModel.FromDatetwo).format('YYYY-MM-DD') : null,
        "EndDate": this.searchModel.ToDatetwo ? moment(this.searchModel.ToDatetwo).format('YYYY-MM-DD') : null ,
        "skip": this.skip ,
        "take": this.take,
      }
      this.blocked=true;
      this.EwayBillOrderDetailService.internaltransfernew(this.InternalTransfersDCs).subscribe(result => {
       console.log(result);
        this.tty = result
       this.itExportData=this.tty.ewayBillInternalTransfernews
       this.TotalRecord=this.tty.TotalRecord
       this.blocked=false;
       console.log("this.ITList",this.ITList);
        var exportData=[];
        for (var i in this.itExportData) {
            var selectedFields = {
              TransferOrderId: this.itExportData[i].TransferOrderId,
              OrderAmount: this.itExportData[i].OrderAmount,
              InvoiceNo:this.itExportData[i].InvoiceNumber,
              OrderStatus: this.itExportData[i].OrderStatus,
              FromWarehouse:this.itExportData[i].FromWarehouse,
              RequestToWarehouseName:this.itExportData[i].RequestToWarehouseName,
              EwaybillNumber:this.itExportData[i].EwaybillNumber,
              EwayBillDate:this.itExportData[i].EwayBillDate,
              EwayBillValidTill:this.itExportData[i].EwayBillValidTill
          }
          exportData.push(selectedFields);
        }
        if(this.itExportData && this.itExportData.length > 0)
        {
          this.exportservice.exportAsExcelFile(exportData,"Export Internal Transfer Export Data")
          this.blocked=false;
        }
        else
        {
          this.showError('No Data Found!');
          this.blocked=false;
        }       
      })
    }
    else{
    this.InternalTransfersDCs= 
      {
        "Warehouseid":this.searchModel.selectedWareHousesecond ? this.WareID : [] ,
        "TransferOrderId":  this.searchModel.TransferOrderidTwo ? this.searchModel.TransferOrderidTwo : 0 ,
        "InvoiceNumber":  this.searchModel.InvoiceTwo ? this.searchModel.InvoiceTwo : null ,
        "Startdate": this.searchModel.FromDatetwo ? moment(this.searchModel.FromDatetwo).format('YYYY-MM-DD') : null,
        "EndDate": this.searchModel.ToDatetwo ? moment(this.searchModel.ToDatetwo).format('YYYY-MM-DD') : null ,
        "skip": this.skip ,
        "take": this.take,
      }
      this.blocked=true;
      this.EwayBillOrderDetailService.internaltransfernew(this.InternalTransfersDCs).subscribe(result => {
       console.log(result);
        this.tty = result
        this.blocked=false;
       this.itExportData=this.tty.ewayBillInternalTransfernews
       this.TotalRecord=this.tty.TotalRecord
       console.log("this.ITList",this.ITList);
       var exportData=[];
       for (var i in this.itExportData) {
         var selectedFields = {
           TransferOrderId: this.itExportData[i].TransferOrderId,
           OrderAmount: this.itExportData[i].OrderAmount,
           InvoiceNo:this.itExportData[i].InvoiceNumber,
           OrderStatus: this.itExportData[i].OrderStatus,
           FromWarehouse:this.itExportData[i].FromWarehouse,
           RequestToWarehouseName:this.itExportData[i].RequestToWarehouseName,
           EwaybillNumber:this.itExportData[i].EwaybillNumber,
           EwayBillDate:this.itExportData[i].EwayBillDate,
           EwayBillValidTill:this.itExportData[i].EwayBillValidTill
       }
       exportData.push(selectedFields);
     }
     if(this.itExportData && this.itExportData.length > 0)
     {
       this.exportservice.exportAsExcelFile(exportData,"Export Internal Transfer Export Data")
       this.blocked=false;
     }
     else
     {
       this.showError('No Data Found!');
       this.blocked=false;
     }       
    })
      
    }
  }
  VarifiedCustomerGSTNOs(text)
  {
    if(text == undefined)
    {
      alert("Please enter Transport GST")
    }
     if (text.length == 15) {
        this.blocked = true;
        this.EwayBillOrderDetailService.CheckVarifiedCustomerGSTNO(text).subscribe(result => {
          if (result.Status) {
            this.GSTCustomerNames  = result.custverify.Name;
            this.GSTdisplayy = true;
            this.blocked = false;
            this.isverified=true;
          } 
          else
          {
              alert("Invalid  Transport GST. "); 
          }
        })
      } 
      else { alert("Pls enter valid GST/TIN_No/Ref No. For eg. - 23AAVCS1981Q1ZE"); 
    this.GSTdisplayy=false;
    }
  }
  IRNGenerate(rt)
  {
    debugger;
    // var widddd=[]
    //   this.WareID=[];
    //   this.searchModel.selectedWareHousesecond.forEach(element => {
    //   this.WareID.push(element.WarehouseId)
    // });
    
    const payload =
    {     
      "Cityids": [1,6,7,16,17,19,33,36,37,58,69,84,111,120,130,143,161,164,165,166,167,169,183,186,187,196],
      "ItemPerPage": this.take,
      "OrderId": rt,
      "PageNo" : this.skip,
      "WarehouseIds" : [1,7,9,10,11,12,20,25,33,39,52,53,54,55,57,67,74,76,77,78,80,83,86,92,94,95,107,109,118,143,149,156,163,164,169,174,176,178,182,190,191,192,194,195,196,197,199,200,201,202,203,204,205,206,207,208,211,212,213,215,216,217,219,220,221,222,224,225,226,227,228,229,230,232,233,234,236,237,238,239,240,241,242] 
    }
    console.log("payloadpayload",payload);
    this.EwayBillOrderDetailService.IRNReGenerate(payload).subscribe(result => {
      console.log(result);
    })
  }
  tranfergenerate()
  {
    this.tranfergeneratepopup=true;
    this.isverified=false
    this.searchModel.RefNos=undefined
    this.GSTCustomerNames=''
    this.searchModel.VehicleNumbertwo=undefined
    this.searchModel.DOCNoIT=undefined
    this.searchModel.selectDateIT=undefined
    this.searchModel.Distancetwo=undefined

  }
  tranferpupopclose()
  {
    this.tranfergeneratepopup=false;
  }

  TransferPopupsubmit()
  {
    debugger;
    if(this.searchModel.VehicleNumbertwo==undefined )
    {
      alert("Please Enter Vehicle Number")
      // return false;
    }
    else if (this.searchModel.RefNos==undefined )
    {
      alert("Please Transpost GST")
    }
    else if (this.searchModel.Distancetwo==undefined)
    {
      alert("Please Enter Distance")
      this.searchModel.Distancetwo=0
    }
    else if(this.GSTCustomerNames=='')
    {
      alert("lease enter GST Transport Name")
    }
    else if(this.isverified == false){
      alert("Please verify Transport Gst Number")
    }
    else{
      alert("submit api");
      this.tranfergeneratepopup=false;
      this.isverified=true
    }
  }

  ClearInternalTransfers()
  {
    this.searchModel.selectedWareHousesecond=undefined
    this.searchModel.TransferOrderidTwo=undefined
    this.searchModel.InvoiceTwo=undefined
    this.searchModel.FromDatetwo=undefined
    this.searchModel.ToDatetwo=undefined
    this.ITList=undefined
  }
  //second end  Third Start---------------------------------------------------------------------------------------------------------------
  KeyUpClean()
  {
    this.NearExpiryewaybillList=undefined
  }

  GetWOKPPthird()
  {
    this.warehouseService.GetWOKPP().subscribe(WareRes=>
      { 
        this.WareHouseListthird=WareRes
        // this.blocked=false;
     })
  }
  GetOrderType()
  {
    this.OrderTypeList = 
    [
      {name: 'Delivery Redispatch', code: 'Delivery Redispatch'},
      {name: 'Issued', code: 'Issued'},
      {name: 'Ready to Dispatch', code: 'Ready to Dispatch'},
      {name: 'Shipped', code: 'Shipped'},
      {name: 'Delivered', code: 'Delivered'},
      {name: 'sattled', code: 'sattled'},     
    ];
  }
 
  ExpiryEwaybills()
  {
    debugger;
    if(this.toastE=true && (this.searchModel.selectedWareHousethird==undefined || this.searchModel.selectedWareHousethird.length==0) && this.searchModel.FromDatethree==undefined &&  this.searchModel.ToDatethree==undefined && this.searchModel.Orderidthree==undefined &&  this.searchModel.OrderTypeThree==undefined)
    {
      debugger;
      this.showError("Please select atlest one filter criteria"); 
      return false;
    }
    
    if(this.searchModel.ToDatethree!=undefined && (this.searchModel.FromDatethree==undefined || this.searchModel.FromDatethree==null ))
    {
      this.showError("Please Select Start Date")
      return false;
    }
    if((this.searchModel.selectedWareHousethird!=undefined && this.searchModel.selectedWareHousethird.length > 0) && (this.searchModel.ToDatethree!=undefined && this.searchModel.FromDatethree!=undefined ))
    {      
        this.wareID=[];
        this.searchModel.selectedWareHousethird.forEach(element => {
        this.wareID.push(element.WarehouseId)
      });
      var wareidd=[]
      this.nearlyexpiryDCs =
      {
        "ordertype": this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
        "Warehouseid" : this.searchModel.selectedWareHousethird ? this.wareID : wareidd,
        "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
        "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : this.skip,
        "take" : this.take
      }
        this.blocked=true;
        debugger;
        this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe(result => {
        console.log("NearExpiryewaybills",result);    
        this.NearExpiryewaybills=result
        this.NearExpiryewaybillList=this.NearExpiryewaybills.nearExpiryDcs  
        this.TotalRecordsThird=this.NearExpiryewaybills.TotalRecord  //TotalRecord

        this.blocked=false;
      })
    }
    else if((this.searchModel.selectedWareHousethird==undefined || this.searchModel.selectedWareHousethird.length>0 )&& (this.searchModel.ToDatethree!=undefined && this.searchModel.FromDatethree!=undefined ))
    {
      this.nearlyexpiryDCs =
      {
        "ordertype": this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
        "Warehouseid" : (this.searchModel.selectedWareHousethird ==undefined || this.searchModel.selectedWareHousethird.length>0 ) ? [] : [],
        "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
        "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : this.skip,
        "take" : this.take
      }
      this.blocked=true;
      debugger;
      this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe(result => {
        this.NearExpiryewaybills=result
        console.log("ppppppppppp",result);
        this.NearExpiryewaybillList=this.NearExpiryewaybills.nearExpiryDcs  
        this.TotalRecordsThird=this.NearExpiryewaybills.TotalRecord 
        this.blocked=false; 
      });
    }
    
    else if( this.searchModel.selectedWareHousethird!=undefined)
    {      
        this.wareID=[];
        this.searchModel.selectedWareHousethird.forEach(element => {
        this.wareID.push(element.WarehouseId)
      });
        this.nearlyexpiryDCs =
        {
          "ordertype":  this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
          "Warehouseid" :this.searchModel.selectedWareHousethird ? this.wareID : [],
          "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
          "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
          "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
          "skip" : this.skip,
          "take" : this.take
        }

        this.blocked=true;
        debugger;
        this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe(result => {
        console.log("NearExpiryewaybills",result);    
        this.NearExpiryewaybills=result
        this.NearExpiryewaybillList=this.NearExpiryewaybills.nearExpiryDcs  
        this.TotalRecordsThird=this.NearExpiryewaybills.TotalRecord 
        this.blocked=false;
      })
    }
    else if(this.searchModel.selectedWareHousethird==undefined || this.searchModel.selectedWareHousethird.length>0 )
    {
      this.nearlyexpiryDCs =
      {
        "ordertype":  this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
        "Warehouseid" :(this.searchModel.selectedWareHousethird ==undefined || this.searchModel.selectedWareHousethird.length>0 ) ? this.wareID : wareidd,
        "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
        "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : this.skip,
        "take" : this.take
      }
      this.blocked=true;
      debugger;
      this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe(result => {
        this.NearExpiryewaybills=result
        console.log("ppppppppppp",result);
        
        this.NearExpiryewaybillList=this.NearExpiryewaybills.nearExpiryDcs  
        this.TotalRecordsThird=this.NearExpiryewaybills.TotalRecord 
        this.blocked=false; 
      });
    }
  }
  ExportExpiryEway()
  {
    debugger;
    if(this.toastE=true && this.searchModel.selectedWareHousethird==undefined && this.searchModel.FromDatethree==undefined &&  this.searchModel.ToDatethree==undefined && this.searchModel.Orderidthree==undefined &&  this.searchModel.OrderTypeThree==undefined)
    {
      debugger;
      this.showError("Please select atlest one filter criteria"); 
      return false;
    }
    if(this.NearExpiryewaybillList==undefined)
    {
      this.showError("Please select atlest one filter criteria")    
      return false
    }
    if(this.searchModel.ToDatethree!=undefined && (this.searchModel.FromDatethree==undefined || this.searchModel.FromDatethree==null ))
    {
      this.showError("Please Select Start Date")
      return false;
    }
    if((this.searchModel.selectedWareHousethird!=undefined && this.searchModel.selectedWareHousethird.length > 0) && (this.searchModel.ToDatethree!=undefined && this.searchModel.FromDatethree!=undefined ))
    {      
        this.wareID=[];
        this.searchModel.selectedWareHousethird.forEach(element => {
        this.wareID.push(element.WarehouseId)
      });        
      this.nearlyexpiryDCs =
      {
        "ordertype":  this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
        "Warehouseid" :this.searchModel.selectedWareHousethird ? this.wareID : [],
        "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
        "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : this.skip,
        "take" :  this.TotalRecordsThird ? this.TotalRecordsThird : 20
      }
        debugger;
        this.blocked=true;
        this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe((result:any) => {
        console.log("NearExpiryewaybills",result);    
        // this.NearExpiryewaybillsExport=result
        debugger;
        this.NearExpiryewaybillsExport=result.nearExpiryDcs  
          var exportData=[];
          for (var i in this.NearExpiryewaybillsExport) {
            var selectedFields = {
              OrderId: this.NearExpiryewaybillsExport[i].OrderId,
              OrderAmount: this.NearExpiryewaybillsExport[i].OrderAmount,
              InvoiceNo: this.NearExpiryewaybillsExport[i].InvoiceNumber,
              OrderStatus:this.NearExpiryewaybillsExport[i].OrderStatus,
              EwayBillNumber:this.NearExpiryewaybillsExport[i].EwaybillNumber,
              EwayBillDate:this.NearExpiryewaybillsExport[i].EwayBillDate,
              EwayBillValidTill:this.NearExpiryewaybillsExport[i].EwayBillValidTill
          }          
          exportData.push(selectedFields);
          }
          if(this.NearExpiryewaybillsExport && this.NearExpiryewaybillsExport.length > 0)
          {
            this.exportservice.exportAsExcelFile(exportData,"Export Near Expiry Eway-bills Data")
            this.blocked=false;
          }
          else
          {
            this.showError('No Data Found!');
            this.blocked=false;
          }       
      })      
    }
    else if((this.searchModel.selectedWareHousethird==undefined || this.searchModel.selectedWareHousethird.length>0 )&& (this.searchModel.ToDatethree!=undefined && this.searchModel.FromDatethree!=undefined ))
    {
      
      this.nearlyexpiryDCs =
      {
        "ordertype":  this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
        "Warehouseid" :(this.searchModel.selectedWareHousethird ==undefined || this.searchModel.selectedWareHousethird.length>0 ) ? [] : [],
        "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
        "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : this.skip,
        "take" :  this.TotalRecordsThird ? this.TotalRecordsThird : 20
      }

      this.blocked=true;
      debugger;
      this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe((result:any) => {
        console.log("NearExpiryewaybills",result);    
        // this.NearExpiryewaybillsExport=result
        debugger;
        this.NearExpiryewaybillsExport=result.nearExpiryDcs  
          var exportData=[];
          for (var i in this.NearExpiryewaybillsExport) {
            var selectedFields = {
              OrderId: this.NearExpiryewaybillsExport[i].OrderId,
              OrderAmount: this.NearExpiryewaybillsExport[i].OrderAmount,
              InvoiceNo: this.NearExpiryewaybillsExport[i].InvoiceNumber,
              OrderStatus:this.NearExpiryewaybillsExport[i].OrderStatus,
              EwayBillNumber:this.NearExpiryewaybillsExport[i].EwaybillNumber,
              EwayBillDate:this.NearExpiryewaybillsExport[i].EwayBillDate,
              EwayBillValidTill:this.NearExpiryewaybillsExport[i].EwayBillValidTill
          }          
          exportData.push(selectedFields);
          }
          if(this.NearExpiryewaybillsExport && this.NearExpiryewaybillsExport.length > 0)
          {
            this.exportservice.exportAsExcelFile(exportData,"Export Near Expiry Eway-bills Data")
            this.blocked=false;
          }
          else
          {
            this.showError('No Data Found!');
            this.blocked=false;
          }       
      })  
    }
    
    if( this.searchModel.selectedWareHousethird!=undefined && this.searchModel.selectedWareHousethird.length > 0)
    {      
        this.wareID=[];
        this.searchModel.selectedWareHousethird.forEach(element => {
        this.wareID.push(element.WarehouseId)
      });
      this.nearlyexpiryDCs =
      {
        "ordertype":  this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
        "Warehouseid" :this.searchModel.selectedWareHousethird ? this.wareID : [],
        "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
        "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : this.skip,
        "take" : this.TotalRecordsThird ? this.TotalRecordsThird : 20 
      }
        this.blocked=true;
        debugger;
        this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe((result:any) => {
          console.log("NearExpiryewaybills",result);    
          // this.NearExpiryewaybillsExport=result
          debugger;
          this.NearExpiryewaybillsExport=result.nearExpiryDcs  
            var exportData=[];
            for (var i in this.NearExpiryewaybillsExport) {
              var selectedFields = {
                OrderId: this.NearExpiryewaybillsExport[i].OrderId,
                OrderAmount: this.NearExpiryewaybillsExport[i].OrderAmount,
                InvoiceNo: this.NearExpiryewaybillsExport[i].InvoiceNumber,
                OrderStatus:this.NearExpiryewaybillsExport[i].OrderStatus,
                EwayBillNumber:this.NearExpiryewaybillsExport[i].EwaybillNumber,
                EwayBillDate:this.NearExpiryewaybillsExport[i].EwayBillDate,
                EwayBillValidTill:this.NearExpiryewaybillsExport[i].EwayBillValidTill
            }          
            exportData.push(selectedFields);
            }
            if(this.NearExpiryewaybillsExport && this.NearExpiryewaybillsExport.length > 0)
            {
              this.exportservice.exportAsExcelFile(exportData,"Export Near Expiry Eway-bills Data")
              this.blocked=false;
            }
            else
            {
              this.showError('No Data Found!');
              this.blocked=false;
            }       
        })  
    }
    else if(this.searchModel.selectedWareHousethird==undefined || this.searchModel.selectedWareHousethird.length>0 )
    {
  
      this.nearlyexpiryDCs =
      {
        "ordertype":  this.searchModel.OrderTypeThree!=undefined ? this.searchModel.OrderTypeThree.code : null,
        "Warehouseid" :(this.searchModel.selectedWareHousethird ==undefined || this.searchModel.selectedWareHousethird.length>0 ) ? this.wareID : [],
        "OrderId" : this.searchModel.Orderidthree ? this.searchModel.Orderidthree : 0,
        "Startdate" :this.searchModel.FromDatethree ? moment(this.searchModel.FromDatethree).format('YYYY-MM-DD') : null,
        "EndDate" : this.searchModel.ToDatethree ? moment(this.searchModel.ToDatethree).format('YYYY-MM-DD') : null,
        "skip" : this.skip,
        "take" : this.TotalRecordsThird ? this.TotalRecordsThird : 20 
      }

      this.blocked=true;
      debugger;
      this.EwayBillOrderDetailService.NearExpiryewaybills(this.nearlyexpiryDCs).subscribe((result:any) => {
        console.log("NearExpiryewaybills",result);    
        debugger;
        this.NearExpiryewaybillsExport=result.nearExpiryDcs  
          var exportData=[];
          for (var i in this.NearExpiryewaybillsExport) {
            var selectedFields = {
              OrderId: this.NearExpiryewaybillsExport[i].OrderId,
              OrderAmount: this.NearExpiryewaybillsExport[i].OrderAmount,
              InvoiceNo: this.NearExpiryewaybillsExport[i].InvoiceNumber,
              OrderStatus:this.NearExpiryewaybillsExport[i].OrderStatus,
              EwayBillNumber:this.NearExpiryewaybillsExport[i].EwaybillNumber,
              EwayBillDate:this.NearExpiryewaybillsExport[i].EwayBillDate,
              EwayBillValidTill:this.NearExpiryewaybillsExport[i].EwayBillValidTill
          }          
          exportData.push(selectedFields);
          }
          if(this.NearExpiryewaybillsExport && this.NearExpiryewaybillsExport.length > 0)
          {
            this.exportservice.exportAsExcelFile(exportData,"Export Near Expiry Eway-bills Data")
            this.blocked=false;
          }
          else
          {
            this.showError('No Data Found!');
            this.blocked=false;
          }       
      })  
    }
  }

  NearExpiryEwaypopup()
  {
    this.NearExpiryEwayBillspopup=true;
    this.searchModel.Reasonofextension=undefined
    this.searchModel.RemarkThird=undefined
    this.searchModel.CurrentPlacethird=undefined
    this.searchModel.Pincodethird=undefined
    this.searchModel.CurrentStatethird=undefined
    this.searchModel.VehicleNumberThird=undefined
  }
  NearExpiryEwayCancel()
  {
    this.NearExpiryEwayBillspopup=false;
  }
  NearExpiryEwaySearch()
  {
    if(this.searchModel.Reasonofextension==undefined )
    {
      this.showError("Please Enter Reason of Extension")
    } 
    else if( this.searchModel.RemarkThird ==undefined )
    {
      this.showError("Please Enter the Remark ")
    } 
    else if(this.searchModel.CurrentPlacethird ==undefined ) 
    {
      this.showError("Please Enter Current Place ")
    }
    else if (this.searchModel.Pincodethird ==undefined)
    {
      this.showError("Please Enter Reason of Pincode")
    } 
    else if( this.searchModel.CurrentStatethird ==undefined )
    {
      this.showError("Please Enter Reason of Current State")
    } 
    else if (this.searchModel.VehicleNumberThird  ==undefined) 
    {
      this.showError("Please Enter VehicleNumber ")
    }
    else {
      this.showSuccess("Api")
      this.NearExpiryEwayBillspopup=false;
    }
  }
  ClearExpiryEway()
  {
    this.searchModel.selectedWareHousethird=undefined
    this.searchModel.OrderTypeThree=undefined
    this.searchModel.Orderidthree=undefined
    this.searchModel.FromDatethree=undefined
    this.searchModel.ToDatethree=undefined
    this.NearExpiryewaybillList=undefined
  }
  
  
  // third end Fourth Start---------------------------------------------------------------------------------------------------

  GetWarehousef( )
  {
        debugger;
    this.CtyIdd=[];
    this.searchModel.SelectedCityf.forEach(element => {
      this.CtyIdd.push(element.Cityid)
      })
      this.customerService.GetWarehouseListForTarget(this.CtyIdd).subscribe(WareRes=>
    { 
      this.WareHouseListlast=WareRes
      // this.blocked=false;
    })
  }

  TotalRecordFour:any
  getFailedEwaybillss()
  {
    debugger;
    if(this.tabC==true)
    {
        this.getEwaybillList();        
    }
    debugger;
    if(this.searchModel.ToDatefour != undefined && (this.searchModel.FromDatefour == null || this.searchModel.FromDatefour == undefined ))
    {
      this.showError("Please Select StartDate")
      return false;
    }
    else if(this.searchModel.ToDatefour == undefined && this.searchModel.FromDatefour != undefined )
    {
      this.showError("please select EndDate")
    }

    else if(this.searchModel.OrderIdfour !=0 && this.searchModel.OrderIdfour !='' && this.searchModel.OrderIdfour !=undefined && this.searchModel.SelectedCityf==undefined 
      && this.searchModel.selectedWareHouseFour==undefined  &&  this.searchModel.OrderType ==undefined && this.searchModel.ToDatefour==undefined && this.searchModel.FromDatefour==undefined)
    {
      this.FailedEwaybillDCs=
      {
        "cityid": (this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.searchModel.SelectedCityf.Cityid : [],
        "warehouseId": (this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? this.searchModel.selectedWareHouseFour.WarehouseId : [],
        "ordertype": this.searchModel.OrderType ? this.searchModel.OrderType.code : null,
        "orderid":this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0,
        "Startdate":this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null,
        "EndDate":this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null,
        "skip":this.skip,
        "take":this.take
      }
      console.log(this.FailedEwaybillDCs);
      this.blocked=true;
      this.EwayBillOrderDetailService.GetFailedEwaybill(this.FailedEwaybillDCs).subscribe(result=>{
        debugger;
      this.FailedEwaybillList=result['failedEWayBillOrderDCs']
      this.TotalRecordFour=result['TotalRecords']
      console.log("FailedEwaybillList",this.FailedEwaybillList);
      this.blocked=false;
      console.log(result);
      this.FailedEwaybillList.forEach(element=>{
      if(element["ErrorMessage"]==null){
        element.err="--";
        }
        else{
          element.err=element["ErrorMessage"].split(":",4)
          element.err='"'+element.err[3].split(",",1)
        }
        })
      })   
    }

    else if(this.searchModel.SelectedCityf==undefined && (this.searchModel.OrderType!=undefined ||
      this.searchModel.FromDatefour!=undefined || this.searchModel.ToDatefour!=undefined)) 
    {
      this.showError("Select City")
      this.ab=false 
      return false ;      
    } 
   
    else if(this.searchModel.SelectedCityf!=undefined && this.searchModel.SelectedCityf!=null && this.searchModel.SelectedCityf!='' && this.searchModel.selectedWareHouseFour==undefined ) 
    {
      this.CityIDD=[];
      this.searchModel.SelectedCityf.forEach(element => {
      this.CityIDD.push(element.Cityid)
    });

    this.FailedEwaybillDCs=
    {
      "cityid": (this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.CityIDD :[],
      "warehouseId":(this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? []: [],
      "ordertype": this.searchModel.OrderType ? this.searchModel.OrderType.code : null,
      "orderid":this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0,
      "Startdate":this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null,
      "EndDate":this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null,
      "skip":this.skip,
      "take":this.take
    }
    console.log(this.FailedEwaybillDCs);
    debugger
    this.blocked=true;
    this.EwayBillOrderDetailService.GetFailedEwaybill(this.FailedEwaybillDCs).subscribe(result=>{
      debugger;
    this.FailedEwaybillList=result['failedEWayBillOrderDCs']
    this.TotalRecordFour=result['TotalRecords']
    console.log("FailedEwaybillList",this.FailedEwaybillList);
    this.blocked=false;
    console.log(result);
    this.FailedEwaybillList.forEach(element=>{
    if(element["ErrorMessage"]==null){
      element.err="--";
      }
      else{
        element.err=element["ErrorMessage"].split(":",4)
        element.err='"'+element.err[3].split(",",1)
      }
      })
    })   
  }
  else if(this.searchModel.selectedWareHouseFour!=undefined && this.searchModel.selectedWareHouseFour!=null && this.searchModel.selectedWareHouseFour!='' ) 
    {
      this.CityIDD=[];
      this.searchModel.SelectedCityf.forEach(element => {
      this.CityIDD.push(element.CityId)
    });

    this.wareID=[];
    this.searchModel.selectedWareHouseFour.forEach(element => {
    this.wareID.push(element.WarehoueseId)
  });

    this.FailedEwaybillDCs=
    {
      "cityid":(this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.CityIDD : [],
      "warehouseId": (this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? this.wareID :[],
      "ordertype": this.searchModel.OrderType ? this.searchModel.OrderType.code : null,
      "orderid":this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0,
      "Startdate":this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null,
      "EndDate":this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null,
      "skip":this.skip,
      "take":this.take
    }
    console.log(this.FailedEwaybillDCs);
    debugger
    this.blocked=true;
    this.EwayBillOrderDetailService.GetFailedEwaybill(this.FailedEwaybillDCs).subscribe(result=>{
      debugger;
    this.FailedEwaybillList=result['failedEWayBillOrderDCs']
    this.TotalRecordFour=result['TotalRecords']
    console.log("FailedEwaybillList",this.FailedEwaybillList);
    this.blocked=false;
    console.log(result);
    this.FailedEwaybillList.forEach(element=>{
    if(element["ErrorMessage"]==null){
      element.err="--";
      }
      else{
        element.err=element["ErrorMessage"].split(":",4)
        element.err='"'+element.err[3].split(",",1)
      }
      })
    })   
  }



  //   if(this.toastE=true && this.searchModel.SelectedCityf==undefined && this.searchModel.selectedWareHouseFour == undefined &&  this.searchModel.OrderType==undefined && this.searchModel.OrderIdfour==undefined && this.searchModel.FromDatefour==undefined &&  this.searchModel.ToDatefour==undefined)
  //   {
  //     debugger;
  //     this.showError("Please select atlest one filter criteria")
  //     return false;
  //   }
  
  //   if(this.searchModel.FromDatefour != null && this.searchModel.ToDatefour != null )       
  //   {      
  //     // var CID = (this.searchModel.selectedWareHousef && this.searchModel.selectedWareHousef==undefined) ? this.searchModel.selectedWareHousef.WarehouseId : 0
  //     var CID = (this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.searchModel.SelectedCityf.Cityid : 0
  //     var WID = (this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? this.searchModel.selectedWareHouseFour.WarehouseId : 0
  //     var OrderType = this.searchModel.OrderType ? this.searchModel.OrderType.code : null
  //     var FromDatee = this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null
  //     var ToDatee = this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null
  //     var OrderId = this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0
  //     var skip = this.skip
  //     var take = this.take

  //     const payload=
  //     {
  //       "cityid":CID,
  //       "warehouseId":WID,
  //       "ordertype":OrderType,
  //       "orderid":OrderId,
  //       "Startdate":FromDatee,
  //       "EndDate":ToDatee,
  //       "skip":skip,
  //       "take":take
  //     }
  //     console.log(payload);
  //     debugger
  //     this.blocked=true;
  //     this.EwayBillOrderDetailService.GetFailedEwaybill(payload).subscribe(result=>{
  //       debugger;
  //     this.FailedEwaybillList=result['failedEWayBillOrderDCs']
  //     this.TotalRecordFour=result['TotalRecords']
  //     console.log("FailedEwaybillList",this.FailedEwaybillList);
  //     this.blocked=false;
  //     console.log(result);
  //     this.FailedEwaybillList.forEach(element=>{
  //     if(element["ErrorMessage"]==null){
  //       element.err="--";
  //       }
  //       else{
  //         element.err=element["ErrorMessage"].split(":",4)
  //         element.err='"'+element.err[3].split(",",1)
  //       }
  //       })
  //     })   
  //   }
  // else
  //   {
  //     // var CID = (this.searchModel.selectedWareHousef && this.searchModel.selectedWareHousef==undefined) ? this.searchModel.selectedWareHousef.WarehouseId : 0
  //     var CID = (this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.searchModel.SelectedCityf.Cityid : 0
  //     var WID = (this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? this.searchModel.selectedWareHouseFour.WarehouseId : 0
  //     var OrderType = this.searchModel.OrderType ? this.searchModel.OrderType.code : null
  //     var FromDatee = this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null
  //     var ToDatee = this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null
  //     var OrderId = this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0
  //     var skip = this.skip
  //     var take = this.take

  //     const payload=
  //     {
  //       "cityid":CID,
  //       "warehouseId":WID,
  //       "ordertype":OrderType,
  //       "orderid":OrderId,
  //       "Startdate":FromDatee,
  //       "EndDate":ToDatee,
  //       "skip":skip,
  //       "take":take
  //     }
  //     console.log(payload);
  //     debugger
  //     this.blocked=true;
  //     this.EwayBillOrderDetailService.GetFailedEwaybill(payload).subscribe(result=>{
  //       debugger;
  //     this.FailedEwaybillList=result['failedEWayBillOrderDCs']
  //     this.TotalRecordFour=result['TotalRecords']
  //     console.log("FailedEwaybillList",this.FailedEwaybillList);
  //     this.blocked=false;
  //     console.log(result);
  //     this.FailedEwaybillList.forEach(element=>{
  //     if(element["ErrorMessage"]==null){
  //       element.err="--";
  //       }
  //       else{
  //         element.err=element["ErrorMessage"].split(":",4)
  //         element.err='"'+element.err[3].split(",",1)
  //       }
  //       })
  //     })   
  //   }   
  }

  ExportFailedEway()
  {
    
      debugger;
      if(this.tabC==true)
      {
          this.getEwaybillList();        
      }
      debugger;
      if(this.searchModel.ToDatefour != undefined && (this.searchModel.FromDatefour == null || this.searchModel.FromDatefour == undefined ))
      {
        this.showError("Please Select StartDate")
        return false;
      }
      else if(this.searchModel.ToDatefour == undefined && this.searchModel.FromDatefour != undefined )
      {
        this.showError("please select EndDate")
      }
  
      else if(this.searchModel.OrderIdfour !=0 && this.searchModel.OrderIdfour !='' && this.searchModel.OrderIdfour !=undefined && this.searchModel.SelectedCityf==undefined 
        && this.searchModel.selectedWareHouseFour==undefined  &&  this.searchModel.OrderType ==undefined && this.searchModel.ToDatefour==undefined && this.searchModel.FromDatefour==undefined)
      {
        this.FailedEwaybillDCs=
        {
          "cityid": (this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.searchModel.SelectedCityf.Cityid : [],
          "warehouseId": (this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? this.searchModel.selectedWareHouseFour.WarehouseId : [],
          "ordertype": this.searchModel.OrderType ? this.searchModel.OrderType.code : null,
          "orderid":this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0,
          "Startdate":this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null,
          "EndDate":this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null,
          "skip":this.skip,
          "take":this.take
        }
        console.log(this.FailedEwaybillDCs);
        this.blocked=true;
        this.EwayBillOrderDetailService.GetFailedEwaybill(this.FailedEwaybillDCs).subscribe(result=>{
          debugger;
        this.FailedEwaybillListExport=result['failedEWayBillOrderDCs']
        this.TotalRecordFour=result['TotalRecords']
        console.log("FailedEwaybillListExport",this.FailedEwaybillListExport);
        this.blocked=false;
        console.log(result);
        this.FailedEwaybillListExport.forEach(element=>{
        if(element["ErrorMessage"]==null){
          element.err="--";
          }
          else{
            element.err=element["ErrorMessage"].split(":",4)
            element.err='"'+element.err[3].split(",",1)
          }
          })
          // -----
          // this.FailedEwaybillListExport=result['failedEWayBillOrderDCs']
          var exportData=[];
          for (var i in this.FailedEwaybillListExport) {
            var selectedFields = {
              OrderId: this.FailedEwaybillListExport[i].OrderId,
              OrderAmount: this.FailedEwaybillListExport[i].orderamount,
              InvoiceNo: this.FailedEwaybillListExport[i].InvoiceNo,
              OrderStatus:this.FailedEwaybillListExport[i].OrderStatus,
              EwayBillNumber:this.FailedEwaybillListExport[i].EwayBillNumber,
              Error:this.FailedEwaybillListExport[i].err,
              // EwayBillValidTill:this.FailedEwaybillListExport[i].EwayBillValidTill
          }          
          exportData.push(selectedFields);
          }
          if(this.NearExpiryewaybillsExport && this.NearExpiryewaybillsExport.length > 0)
          {
            this.exportservice.exportAsExcelFile(exportData,"Export Near Expiry Eway-bills Data")
            this.blocked=false;
          }
          else
          {
            this.showError('No Data Found!');
            this.blocked=false;
          }       
      })  
          // -----
        // })   
      }
  
      else if(this.searchModel.SelectedCityf==undefined && (this.searchModel.OrderType!=undefined ||
        this.searchModel.FromDatefour!=undefined || this.searchModel.ToDatefour!=undefined)) 
      {
        this.showError("Select City")
        this.ab=false 
        return false ;      
      } 
     
      else if(this.searchModel.SelectedCityf!=undefined && this.searchModel.SelectedCityf!=null && this.searchModel.SelectedCityf!='' && this.searchModel.selectedWareHouseFour==undefined ) 
      {
        this.CityIDD=[];
        this.searchModel.SelectedCityf.forEach(element => {
        this.CityIDD.push(element.Cityid)
      });
  
      this.FailedEwaybillDCs=
      {
        "cityid": (this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.CityIDD :[],
        "warehouseId":(this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? []: [],
        "ordertype": this.searchModel.OrderType ? this.searchModel.OrderType.code : null,
        "orderid":this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0,
        "Startdate":this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null,
        "EndDate":this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null,
        "skip":this.skip,
        "take":this.take
      }
      console.log(this.FailedEwaybillDCs);
      debugger
      this.blocked=true;
      this.EwayBillOrderDetailService.GetFailedEwaybill(this.FailedEwaybillDCs).subscribe(result=>{
        debugger;
      this.FailedEwaybillList=result['failedEWayBillOrderDCs']
      this.TotalRecordFour=result['TotalRecords']
      console.log("FailedEwaybillList",this.FailedEwaybillList);
      this.blocked=false;
      console.log(result);
      this.FailedEwaybillList.forEach(element=>{
      if(element["ErrorMessage"]==null){
        element.err="--";
        }
        else{
          element.err=element["ErrorMessage"].split(":",4)
          element.err='"'+element.err[3].split(",",1)
        }
        })
      })   
    }
    else if(this.searchModel.selectedWareHouseFour!=undefined && this.searchModel.selectedWareHouseFour!=null && this.searchModel.selectedWareHouseFour!='' ) 
    {
        this.CityIDD=[];
        this.searchModel.SelectedCityf.forEach(element => {
        this.CityIDD.push(element.CityId)
      });
  
      this.wareID=[];
      this.searchModel.selectedWareHouseFour.forEach(element => {
      this.wareID.push(element.WarehoueseId)
    });
  
      this.FailedEwaybillDCs=
      {
        "cityid":(this.searchModel.SelectedCityf || this.searchModel.SelectedCityf!=undefined) ? this.CityIDD : [],
        "warehouseId": (this.searchModel.selectedWareHouseFour && this.searchModel.selectedWareHouseFour!=undefined) ? this.wareID :[],
        "ordertype": this.searchModel.OrderType ? this.searchModel.OrderType.code : null,
        "orderid":this.searchModel.OrderIdfour ? this.searchModel.OrderIdfour : 0,
        "Startdate":this.searchModel.FromDatefour ? moment(this.searchModel.FromDatefour).format('YYYY-MM-DD') : null,
        "EndDate":this.searchModel.ToDatefour ? moment(this.searchModel.ToDatefour).format('YYYY-MM-DD') : null,
        "skip":this.skip,
        "take":this.take
      }
      console.log(this.FailedEwaybillDCs);
      debugger
      this.blocked=true;
      this.EwayBillOrderDetailService.GetFailedEwaybill(this.FailedEwaybillDCs).subscribe(result=>{
        debugger;
      this.FailedEwaybillList=result['failedEWayBillOrderDCs']
      this.TotalRecordFour=result['TotalRecords']
      console.log("FailedEwaybillList",this.FailedEwaybillList);
      this.blocked=false;
      console.log(result);
      this.FailedEwaybillList.forEach(element=>{
      if(element["ErrorMessage"]==null){
        element.err="--";
        }
        else{
          element.err=element["ErrorMessage"].split(":",4)
          element.err='"'+element.err[3].split(",",1)
        }
        })
      })   
    }
  }
  FailedEwaybillListExport:any[]=[]
ClearFailedEway()
{
  this.searchModel.SelectedCityf=undefined
  this.searchModel.selectedWareHouseFour=undefined
  this.WareHouseListlast=[]
  // this.TotalRecords=''
  this.searchModel.OrderType=undefined
  this.searchModel.OrderIdfour=undefined
  this.searchModel.ToDatefour=undefined
  this.searchModel.selectedWareHousef=undefined
  this.searchModel.FromDatefour=undefined
  this.FailedEwaybillList=[]
}
//  common ------------------------------------------------------------------------------------------------------------------------------
  toggleSearchone(){
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
    }
  }
  
  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

  toggleSearchtwo(){
    if (this.isSearchtwo == true) {
      this.isSearchtwo = false;
    } else {
      this.isSearchtwo = true;
    }
  }

  toggleSearchthree(){
    if (this.isSearchthree == true) {
      this.isSearchthree = false;
    } else {
      this.isSearchthree = true;
    }
  }

  toggleSearchfour(){
    if (this.isSearchfour == true) {
      this.isSearchfour = false;
    } else {
      this.isSearchfour = true;
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onTabChange(currentindex: number) {
    debugger;
    this.skip=0;
    this.take= 20;
    // this.ClearEwayOrders();
    // this.ClearInternalTransfers();
    // this.ClearExpiryEway();
    // this.ClearFailedEway();
    this.tabCurrentIndex = currentindex;
  }

  handleChange(e) {
    debugger;
    // this.toastE=true
    this.tabCurrentIndex = e.index;
  }
  
  tabC:boolean=false
  Redirect(e,id){
    debugger;
    this.currentTab = (this.currentTab == 1) ? 0 : this.currentTab + 1;
    this.searchModel.OrderId=id
    this.tabC=true;
    if(this.searchModel.OrderId !=0 && this.searchModel.OrderId !='' && this.searchModel.OrderId !=undefined )
    {   
      var CID = (this.searchModel.SelectedCity && this.searchModel.SelectedCity==undefined) ? this.searchModel.SelectedCity.Cityid : 0
      var WID = (this.searchModel.selectedWareHouse && this.searchModel.selectedWareHouse==undefined) ? this.searchModel.selectedWareHouse.WarehouseId : 0
      var FromDatee = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
      var ToDatee = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
      var OrderId =  this.searchModel.OrderId 
      var SKCode = this.searchModel.SKCode ? this.searchModel.SKCode : null
      var Status = this.searchModel.Status ? this.searchModel.Status.code :null 
      var skip = this.skip
      var take = this.take
      // console.log(WID, FromDatee, ToDatee, OrderId, SKCode, Status);
      if(this.searchModel.OrderId !=0)
      {
        const payload=
        {
            "cityid ": CID ,
            "warehouseid":WID,
            "orderid ":OrderId ,
            "skcode ": SKCode,
            "Status ": Status,
            "startdate ":FromDatee  ,
            "EndDate ":ToDatee  ,
            "take ": skip,
            "skip ": take ,   
        }
        this.blocked=true;
        this.EwayBillOrderDetailService.GetEwaybillOrder(payload).subscribe(result=>{
          console.log("result",result);
          // this.orderlist=result.getEwaydata
          // this.TotalRecord=result.TotalRecord
          console.log("orderlist",this.orderlist);
          this.blocked=false;
          this.tabC==false;
        })
      } 
    }   

  }
    
  toastE:boolean = false
  load(event)  {
    debugger;
    this.skip=event.first;
    this.take= event.rows;

    if(this.tabCurrentIndex == undefined){
      this.getEwaybillList();
      this.toastE=false
      this.tabCtype=true;
    }

    else if (this.tabCurrentIndex == 0 ) {     
      this.getEwaybillList(); 
      this.toastE=true

    } else if (this.tabCurrentIndex == 1) {     
      this.InternalTransfers();
      this.toastE=false
    } else if (this.tabCurrentIndex == 2){   
      this.ExpiryEwaybills();
      this.toastE=false
    }
    else if (this.tabCurrentIndex == 3 ){
      this.getFailedEwaybillss();
      this.toastE=false      
    }
  }
}

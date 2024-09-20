import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { DeliveryService } from 'app/shared/services/delivery.service';
import { TatService } from 'app/shared/services/tat.service';

@Component({
  selector: 'app-createdeliveryassignment',
  templateUrl: './createdeliveryassignment.component.html',
  styleUrls: ['./createdeliveryassignment.component.scss']
})

export class CreatedeliveryassignmentComponent implements OnInit {
  warehouseList: any[];
  AgentList: any [];
  Agent:any[];
  selectedAgentId:any;
  DeliveryBoyList: any[];
  WarehouseId:any;
  display: boolean = false;
  assignedOrders:any[]=[];
  assignedOrdersRedispatch:any[]=[];
  blocked:boolean

  constructor( private warehouseService : WarehouseService ,private DeliveryService : DeliveryService , private tatservice : TatService) { }

  ngOnInit() {
    this.WarehouseId="";
    this.selectedAgentId="";
    this.deliveryBoy="";
    this.AllWarehouse();
  }

  AllWarehouse(){
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    });
  }


  onsearch(whID) { 
    if(whID != null){
      this.allproducts=[];
      this.allproductsRedispatch=[];
      this.AgentList = [];
      this.DeliveryBoyList=[];
      this.tatservice.DboybasedonWarehouseId(this.WarehouseId).subscribe(result => {
        this.DeliveryBoyList = result;
      })
      this.DeliveryService.getAgent(this.WarehouseId).subscribe(result => {  
        this.AgentList = result;
      })
    }else{
      this.DBoyOrdersNew = [];
      this.DBoyOrdersRedipatch = [];
      this.WarehouseId = null;
      this.selectedAgentId = null;
      this.AgentList = [];  
      this.deliveryBoy=null;
      this.allproducts=[];
      this.allproductsRedispatch=[];
    }
  }

  deliveryBoy:any
  Mobile:any;
  onsearchAgent(dboy) {
    this.allproducts=[];
    this.allproductsRedispatch=[];
    this.selectedAgentId = null; 
    this.DBoyOrdersNew=[];
    this.DBoyOrdersRedipatch=[];
    this.Mobile=dboy.Mobile;
    if(dboy != null){
      this.DeliveryService.getAgent(this.WarehouseId).subscribe(result => {  
        this.AgentList = result;  
        this.AgentList.sort((a, b) => (a.DisplayName.toLocaleLowerCase() > b.DisplayName.toLocaleLowerCase()) ? 1 : -1)
      })
    }else{
      this.DBoyOrdersNew = [];
      this.DBoyOrdersRedipatch = [];
      this.selectedAgentId = null;
      this.WarehouseId = null;
      this.allproducts=[];
      this.allproductsRedispatch=[];
    } 
  }
  
  DBoyorders:any[]=[];
  DBoyOrdersNew:any[]=[];
  DBoyOrdersRedipatch:any[]=[];
  getdata() {
    this.assignBtn=true;
    this.finalizebtn = false;
    console.log(this.selectedAgentId)
    this.DBoyOrdersNew=[];
    this.DBoyOrdersRedipatch=[];
    this.allproducts=[];
    this.allproductsRedispatch=[];
    this.blocked = true;
    this.DeliveryService.getordersbyId(this.Mobile).subscribe(result => {
      this.DBoyorders=result;
      this.DBoyorders.forEach(element => {        
        if(element.ReDispatchCount == 0){
          this.DBoyOrdersNew.push(element)
          this.DBoyOrdersNew.sort((a, b) => (a.ClusterName > b.ClusterName) ? 1 : -1)
        }
        else{
          this.DBoyOrdersRedipatch.push(element);
        }
      });
      console.log("dboy",this.DBoyOrdersNew)
      console.log("dispatch",this.DBoyOrdersRedipatch)
      this.blocked = false;
    })
  }
  
  tableDetails:any;
  orderData:any;
  freeItemStatus:boolean
  getOrderDetails(rowdata){
    //console.log(rowdata);
    this.orderData=rowdata.orderDetails;
    this.DeliveryService.getOrderIdList(rowdata.OrderId).subscribe(result=>{
      console.log(result);
        this.display = true;
        this.tableDetails=result;
        if(this.tableDetails.length > 0){
          this.freeItemStatus = true;
        }else{
          this.freeItemStatus = false;
        }
    })
  }

  finalizebtn:boolean =false;
  purchaseOrderId:number;
  sendapproval(details){
    const payload={
      OrderId:details.OrderId,
      Redispatchcount:details.ReDispatchCount
    }
    this.blocked = true;
    this.DeliveryService.approval(payload).subscribe(result=>{
      this.blocked = false;
      if(confirm("Do you want to proceed for Order Id " +details.OrderId +" ?")){
        if (result != null) {
          alert("Successfully Send for approval ");
          this.getdata();
          this.blocked = false;
        }
        else{
          this.getdata();
          this.finalizebtn = false;
          this.blocked = false;
        }
      }else{
        this.blocked = false;
      }
    })
  };

  chackedArray:any[]=[];
  checkbox(event,details){
    //console.log(event);
    //console.log(details.OrderId);
    details.check=event
  }
  
  assignBtn:boolean=true;
  Gtraveltime:number = 0;
  Gtraveldistance:number = 0;
  IdealTime:number = 0;
  allproducts:any[]=[];
  allproductsRedispatch:any[]=[];
  selectedorders:any[] = [];
  selectedordersRedi:any[]=[];
  assignorders(){
   let assignedordersAddress = [];
   let assignedRedispatchorders = [];
   let assignedordersRedispatchAddress = [];
   let allproductsfirst = [];
   let assignedorders = []; 
   let allproductsRedispatchfirst = [];
    for(let i=0; i<this.DBoyorders.length;i++){
      let cord=[];
      if(this.DBoyorders[i].check==true){
        if(this.DBoyorders[i].ReDispatchCount == 0){
          assignedorders.push(this.DBoyorders[i]);
          let l1=this.DBoyorders[i].lat;
          cord.push(l1);
          let l2=this.DBoyorders[i].lg;
          cord.push(l2);
          assignedordersAddress.push(cord);
        }else{
          assignedRedispatchorders.push(this.DBoyorders[i])
          let cordre = [];
          let l1Re = this.DBoyorders[i].lat;
          cordre.push(l1Re);
          var l2Re = this.DBoyorders[i].lg;
          cordre.push(l2Re);
          assignedordersRedispatchAddress.push(cord);
        }
      }
    }
    if (assignedorders.length > 0) {
        this.selectedorders =Array.from(assignedorders);
        let firstreq = true;
        for (var k = 0; k < this.selectedorders.length; k++) {
            for (var j = 0; j <this.selectedorders[k].orderDetails.length; j++) {
                if (firstreq) {
                    var OD = this.selectedorders[k].orderDetails[j];
                    OD.OrderQty = (this.selectedorders[k].orderDetails[j].OrderId + " - " + this.selectedorders[k].orderDetails[j].qty).toString();
                    allproductsfirst.push(OD);
                    firstreq = false;
                } else {
                    var checkprod = true;
                    allproductsfirst.map((prod:any)=> {
                        if (this.selectedorders[k].orderDetails[j].ItemMultiMRPId == prod.ItemMultiMRPId) {//Number
                            prod.OrderQty += ", " + this.selectedorders[k].orderDetails[j].OrderId + " - " + this.selectedorders[k].orderDetails[j].qty;
                            prod.qty = this.selectedorders[k].orderDetails[j].qty + prod.qty;
                            prod.TotalAmt = this.selectedorders[k].orderDetails[j].TotalAmt + prod.TotalAmt;
                            checkprod = false;
                        }
                    })
                    if (checkprod) { 
                        var OD = this.selectedorders[k].orderDetails[j];//instead of OD used OD1
                        OD.OrderQty = (this.selectedorders[k].orderDetails[j].OrderId + " - " + this.selectedorders[k].orderDetails[j].qty).toString();  
                       allproductsfirst.push(OD);
                    }
                }
            }
        }
        for (var a = 0; a < allproductsfirst.length; a++) {
            if (allproductsfirst[a].qty > 0) {
                this.allproducts.push(allproductsfirst[a]);
            }
        }
        this.finalizebtn = true;
        this.finalizeorder();
    } 
    if (assignedRedispatchorders.length > 0) {                  
      this.selectedordersRedi = Array.from(assignedRedispatchorders);    
      var firstreqRe = true;
      for (var k = 0; k < this.selectedordersRedi.length; k++) {//instead of k used k1
          for (var j = 0; j < this.selectedordersRedi[k].orderDetails.length; j++) {//instead of j used j1
              if (firstreqRe) {
                  var ODRE = this.selectedordersRedi[k].orderDetails[j];
                  ODRE.OrderQty = (this.selectedordersRedi[k].orderDetails[j].OrderId + " - " + this.selectedordersRedi[k].orderDetails[j].qty).toString();
                  allproductsRedispatchfirst.push(ODRE);
                  firstreqRe = false;
              } else {
                  var checkprodRe = true;
                  allproductsRedispatchfirst.map((prod:any)=>{              
                      if (this.selectedordersRedi[k].orderDetails[j].ItemMultiMRPId == prod.ItemMultiMRPId) {//Number                          
                          prod.OrderQty += ", " + this.selectedordersRedi[k].orderDetails[j].OrderId + " - " + this.selectedordersRedi[k].orderDetails[j].qty;
                          prod.qty = this.selectedordersRedi[k].orderDetails[j].qty + prod.qty;
                          prod.TotalAmt = this.selectedordersRedi[k].orderDetails[j].TotalAmt + prod.TotalAmt;
                          checkprodRe = false;
                      }
                  })
                  if (checkprodRe) {                  
                      var ODRE = this.selectedordersRedi[k].orderDetails[j];//instead of ODRE used ODRE1
                      ODRE.OrderQty = (this.selectedordersRedi[k].orderDetails[j].OrderId + " - " + this.selectedordersRedi[k].orderDetails[j].qty).toString();  
                      allproductsRedispatchfirst.push(ODRE);
                  }
              }
          }
      }
      for (var a = 0; a < allproductsRedispatchfirst.length; a++) { //instead of a used a1
          if (allproductsRedispatchfirst[a].qty > 0) {
            this.allproductsRedispatch.push(allproductsRedispatchfirst[a]);
          }
      }
      this.finalizebtn = true;
      this.finalizeorder();
    }
    this.assignBtn=false;
    if ((assignedRedispatchorders.length + assignedorders.length) === 0)
    {
        alert("Please select Assign Orders");
        this.assignBtn=true;
    }  
  }

  totalAmount:number=0;
  finalizeorder() {              
    let totalproductspace = 0;
    let totalAmountofallproducts = 0;
    console.log(this.allproducts)
    console.log(this.allproductsRedispatch)
    for (var i = 0; i < this.allproducts.length; i++) {
        totalAmountofallproducts = totalAmountofallproducts + this.allproducts[i].TotalAmt;
        totalproductspace = totalproductspace + this.allproducts[i].qty * this.allproducts[i].SizePerUnit;
    }
    for (var i = 0; i < this.allproductsRedispatch.length; i++) { //instead of i used i1
        totalAmountofallproducts = totalAmountofallproducts +this.allproductsRedispatch[i].TotalAmt;
        totalproductspace = totalproductspace + this.allproductsRedispatch[i].qty * this.allproductsRedispatch[i].SizePerUnit;
    }
    this.totalAmount=totalAmountofallproducts;
  }
  
  DeliveryIssuanceData:any[] = []
  issuance(){
    //console.log(this.selectedAgentId)
    if (this.selectedAgentId) {              
      let allproductdata = [];
      allproductdata = allproductdata.concat(this.allproducts, this.allproductsRedispatch);
      let selectalldata = [];
      if (this.selectedordersRedi != null) {
          selectalldata = selectalldata.concat(this.selectedorders, this.selectedordersRedi);
      } else {
          selectalldata = this.selectedorders;
      }
      if (selectalldata.length > 0) {
          var dataToPost = {
              Cityid: this.deliveryBoy.Cityid,
              city: this.deliveryBoy.city,
              DisplayName: this.deliveryBoy.DisplayName,
              PeopleID: this.deliveryBoy.PeopleID,
              VehicleId: this.deliveryBoy.VehicleId,
              VehicleNumber: this.deliveryBoy.VehicleNumber,
              details: allproductdata,
              AssignedOrders:selectalldata,
              IdealTime: 0,
              TravelDistance: 0,
              AgentId: this.selectedAgentId,
              WarehouseId: this.deliveryBoy.WarehouseId
          };
          console.log(dataToPost);
          this.blocked = true;
          this.DeliveryService.issuanceData(dataToPost).subscribe(result=>{
            if(result.DeliveryIssuanceId>0){
              this.DeliveryIssuanceData = result;
              this.finalizebtn = false;
              alert("Please print/save  of Assignment IssueId : " + result.DeliveryIssuanceId);
              this.blocked = false;       
              this.emptyAllrecords();
            }
            else{
              alert("There is Some Problem");  
              this.emptyAllrecords();
              this.blocked = false;             
            }
          })
          this.blocked = false;
      }else{
        alert("Select Orders");
      }
    }else{
      alert("please select Agent first ");
      return;
    }
  }

  emptyAllrecords(){
    this.allproducts=[];
    this.allproductsRedispatch=[];
    this.DBoyOrdersNew=[];
    this.DBoyOrdersRedipatch=[];
    this.AgentList = [];
    this.DeliveryBoyList=[];
    this.WarehouseId = null;
    this.totalAmount=0;
  }

}


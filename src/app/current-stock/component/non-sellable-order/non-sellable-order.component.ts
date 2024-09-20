// import { Component, OnInit } from '@angular/core';
// import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
// import { NonSellableStocksService } from 'app/current-stock/services/non-sellable-stocks.service';
// import { ThemeService } from 'ng2-charts';

// @Component({
//   selector: 'app-non-sellable-order',
//   templateUrl: './non-sellable-order.component.html',
//   styleUrls: ['./non-sellable-order.component.scss']
// })
// export class NonSellableOrderComponent implements OnInit {
//   WareHouseList:any[]=[];
//   selectedWareHouse:any
//   searcheditem:any
//   searchedEntity:any
//   ItemNameList:any[]=[];
//   selectedItem:any;
//   skcode:any;
//   Appname:boolean=false;

//   categories: any[] = [{name: 'DamageOrder', value: 'DamageOrder'}, {name: 'NonSallableItem', value: 'NonSallableItem'}];
//   constructor(private _service:InventoryAssignSupervisiorService,private service:NonSellableStocksService) {
//    }

//   ngOnInit() {
//     this.Appname=this.categories[1];
//     this._service.getWarehouseList().subscribe(response=>{
//       this.WareHouseList=response
//     })
//   }
//   blkWhouse:boolean=false;
//   onSelectWarH(whId){
//     if(whId) this.blkWhouse=true;
//   }
//   blkSkcode:boolean=false;
//   onSelectSkcode(skc){
//     if(skc) this.blkSkcode=true;
//   }
//   searchlist:any
//   GetWarehouseCustomer(searchedvalue){
//     console.log('searchedEntity',searchedvalue);
//     if(this.selectedWareHouse){
//       this.service.GetWarehouseCustomer(this.selectedWareHouse.WarehouseId,searchedvalue.replace(/\s/g, "")).subscribe(res=>{
//         console.log(res);
//         this.searchlist=res;
//         res.forEach(el=>{
//           el.Name=el.Name+" ("+el.Skcode+")";
//         })
//       })
//     }
//   }

//   SearchedItemList(){
//     if(this.selectedWareHouse==undefined){
//       alert("select warehouse first")
//     }
//     else if(this.searchedEntity==undefined){
//       alert("enter skcode")
//     }
//     else if(this.skcode==undefined){
//       alert("select customers")
//     }
//     else if(this.searcheditem==undefined){
//       alert("enter item name")
//     }
//     else{
//       this.service.SearchedItemList(this.searcheditem,this.selectedWareHouse.WarehouseId).subscribe(res=>{
//         console.log(res);
//         this.ItemNameList=res;
//       })
//     }
//   }
//   showtable:boolean=false;
//   NonSallabeOrderList:any
//   data1:any;
//   GetNonSallabeOrderList(data){
//     if(data){ 
//       var stockType='N'
//       console.log("data",data);
//       this.data1=data;
//       this.service.getNonSellableOrderList(data.ItemMultiMRPId,this.selectedWareHouse.WarehouseId,stockType).subscribe(res=>{
//         console.log("orders",res);
//         res.forEach(el=>{
//           el.UnitPrice=data.UnitPrice;
//         })
//         if(res.length==0) alert("no data found")
//         else {
//           this.NonSallabeOrderList=res;
//           this.showtable=true;
//         }
//       })
//     }
//   }

//   total:any;
//   unitprice:any;
//   DInventryValue:any;
//   enabletotal:boolean=true;
//   selectedList:any[]=[];
//   checked(item){
//     if(item){
//       item.checked=true;
//     }
//   }
//   keypress(entervalue,item){
//     //console.log(item.DInventryValue,item.UnitPrice)
//     item.total=item.DInventryValue*item.UnitPrice;
//     if(item.Qty<entervalue) alert("Damage Inventory cannot be greater then Qty!!")
//   }
//   selectedList1:any[]=[];
//   totalAmt:number=0;
//   AddNonSallableOrder(){
//     this.totalAmt=0;
//     this.data1
//     if(this.selectedList.length==0){
//       alert("Please select batch code!!")
//     }
//     else{
//         this.selectedList.forEach(el=>{
//           if(el.DInventryValue==undefined) alert("Please Enter Quantity!!")
//           else{
//             this.totalAmt=this.totalAmt+el.total;
//             el.StockId=this.data1.DamageStockId,
//             el.ItemName=this.data1.ItemName,
//             el.ABCClassification=this.data1.ABCClassification,
//             el.checked=false
//             this.selectedList1=this.selectedList;
//           }
//         })
//     }    
//   }
//     disableradio:boolean=true;
//   createOrder(){
//     var DamageOrderCartDc=[];
//     this.selectedList1.forEach(e=>{
//       console.log(e);  
//       var obj={
//         "DamageStockId":e.StockId,
//         "CustomerId": this.data1.CompanyId,
//         // "pCompanyId":,
//         // "CustomerName"
//         "Warehouseid ":this.selectedWareHouse.WarehouseId,
//         "WarehouseName ":this.selectedWareHouse.WarehouseName,
//         "ItemId ":this.data1.ItemId,
//         // "SellingSku"
//         "ItemNumber":this.data1.ItemNumber,
//         "ItemName":e.ItemName,
//         "UnitPrice":e.unitprice,
//         "DefaultUnitPrice ":e.unitprice,
//         "TotalAmount ":e.total,
//         "qty ":e.Qty,
//         // "ShippingAddress "
//         "ABCClassification":e.ABCClassification,
//         "BatchCode ":e.BatchCode,
//         "StockBatchMasterId":e.StockBatchMasterId,
//         "isDamageOrder":true
//       }
//       DamageOrderCartDc.push(obj);
//     })
//     this.service.createNonSellableOrderList(DamageOrderCartDc).subscribe(res=>{
//       console.log(res);   
//       alert("Create Non sallable Done")
//     },(err: any) => {
//       console.log(err); alert(err.error.Message)})
//   }
//   cancel(){
//     window.location.reload()
//   }
// }

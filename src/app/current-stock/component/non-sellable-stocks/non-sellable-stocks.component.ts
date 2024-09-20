// import { Component, OnInit } from '@angular/core';
// import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
// import { NonSellableStocksService } from 'app/current-stock/services/non-sellable-stocks.service';
// import { ExportServiceService } from 'app/shared/services/export-service.service';

// @Component({
//   selector: 'app-non-sellable-stocks',
//   templateUrl: './non-sellable-stocks.component.html',
//   styleUrls: ['./non-sellable-stocks.component.scss']
// })
// export class NonSellableStocksComponent implements OnInit {

//   constructor(private service:NonSellableStocksService,private _service:InventoryAssignSupervisiorService
//     ,private exportserv:ExportServiceService) { }
//   WareHouseList:any[]=[];
//   StockList:any[]=[];
//   nonSalbStocksList:any[]=[];
//   selectedWareHouse:any;
//   stockType:any;
//   searchedEntity:any;
//   WarIds:any=[];
//   enableStockList:boolean=true;
//   ngOnInit(){
//     this._service.getWarehouseList().subscribe(response=>{
//       this.WareHouseList=response
//     })
//     this.StockList=[
//       {name:"Non Sellable",code:1},
//       {name:"Damage",code:2}
//     ]

//   }

//   getWarehouse(){
//     var selectedWareHouseIds=[];
//     //console.log(this.selectedWareHouse);
//     this.selectedWareHouse.forEach(el=>{
//       selectedWareHouseIds.push(el.WarehouseId)
//     })  
//     console.log(selectedWareHouseIds);
//     this.WarIds=selectedWareHouseIds;
//   }

//   keyPress(value: any) {
//     console.log(value);
//   }

//   display:any;
//   DamageHistoryList:any[]=[];
//   openHistory(item,event){
//    // console.log(item,event);
//     var list=20;
//     var page=1;
//     this.service.GetDamageHistory(item.ItemNumber,list,page,item.WarehouseId,item.NonSellableStockId).subscribe(res=>{
//       console.log(res);
//       if(res.ordermaster.length==0){
//         alert("data not found.")
//       }
//       else{
//         this.display=true;
//         this.DamageHistoryList=res.ordermaster;
//       }
//     })
//   }
//   Inventrydisplay:any;
//   InventryList:any[]=[];
//   openInventoryDetail(item){
//     var stockType='N'
//     this.service.GetStockBatchMastersDataNew(item.ItemMultiMRPId,item.WarehouseId,stockType).subscribe(res=>{
//       console.log(res);
//       if(res.length==0){
//         alert("data not found.")
//       }
//       else{
//         this.Inventrydisplay=true;
//         this.InventryList=res;
//       }
//     })
//   }

//   ExportHistory(){
//     if(this.selectedWareHouse==undefined){
//       alert("select warehouse first");
//     }
//     else{
//       this.service.GetNonSellableStockHistoryAll(this.WarIds).subscribe(res=>{
//         //this.nonSalbStocksList=res;
//         console.log(res.ordermasterHistory);
//         if(res.ordermasterHistory.length==0) alert("No Data Found.")
//         else this.exportserv.exportAsExcelFile(res.ordermasterHistory,"NonSellableStockHistory")    
//       })
//     }
//   }
//   exportbtn:any
//   Export(){
//     if(this.exportbtn){
//       if(this.nonSalbStocksList.length==0){ 
//         alert("No Data Found.")
//       }
//       else this.exportserv.exportAsExcelFile(this.nonSalbStocksList,"NonSellableStockList")
//     }
//   }

//   GetNonSallabeStockList(){
//     //this.nonSalbStocksList=[];
//     if(this.selectedWareHouse==undefined) alert("select warehouse first")
//     else{
//       var payload={
//         "WarehouseId" :this.WarIds,
//         "Keyword": this.searchedEntity != undefined ? this.searchedEntity : ''
//       }    
//       console.log(payload);
      
//       this.service.getNonSallabeStockList(payload).subscribe(res=>{
//         if(res.length==0){ 
//           alert("No Data Found.")
//           this.exportbtn=false;
//         }
//         else{
//           this.nonSalbStocksList=res;
//           console.log(res); 
//           this.exportbtn=true; 
//         }  
//       })
//     }
//   }

// }

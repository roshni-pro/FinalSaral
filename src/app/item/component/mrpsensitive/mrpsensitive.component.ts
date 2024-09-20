import { Component, OnInit } from '@angular/core';
import { ItemService } from 'app/shared/services/item.service';
import { AnyARecord, AnyMxRecord } from 'dns';
import { ConfirmationService, MessageService } from 'primeng/api';
import {RadioButtonModule} from 'primeng/radiobutton';

@Component({
  selector: 'app-mrpsensitive',
  templateUrl: './mrpsensitive.component.html',
  styleUrls: ['./mrpsensitive.component.scss']
})
export class MrpsensitiveComponent implements OnInit {
  SensitiveItemList : any;
  cols : any;
  groupitemList : any;
  itemList :any;
  blocked : boolean;
  //SelectedMRP : boolean;
  SelectedMRPs : any;
  SelectedMRP: boolean;
  mrpstockList: any[];
  mrpstockLists: any;
  itemMRP:any;
  rowData : any;
  mrpstock : any[];
  mrpstocks : any[];
  selected : any[];
  StockId : any;
  ItemNumber : any;
  itemSelected: any;
  constructor(private itemService : ItemService, private confirmationService: ConfirmationService,private messageService: MessageService ) { this.groupitemList = {};}

  ngOnInit() {
    this.cols = [
      { field: 'ItemName', header: 'Item Name' },
      { field: 'ItemNumber', header: 'Item Number' },
      { field: 'CurrentInventory', header: 'Current Inventory' },
      { field: 'ItemMultiMRPId', header: 'Item MultiMRPId' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'StockId', header: 'Stock Id' },
      { field: 'MRP', header: 'MRP' },
    ];
    
    // this.itemService.GetSensitivedata('AC1305', 1).subscribe(result => {
    //   
    //   this.SensitiveItemList = result;
    // })
  }

  getitem(event) {
    

    if (event.query.length > 2  ) {
      
      this.itemService.searchCentralItem7(event.query)
        .subscribe(result => {
          this.itemList = result;
        
          console.log('this.itemList :', this.itemList);
        });
    }

  }

  onSelect(){
    this.ItemNumber = this.itemSelected.Number;
    console.log(this.ItemNumber)
  }
  onSelectItem(){
    
    this.groupitemList = []
    this.itemService.GetWarehousesStock(this.ItemNumber).subscribe(result => {
      this.groupitemList = result;
      // this.groupitemList[0].Sensitiveitemlist[0].SelectedMRP = false; 
      console.log('this.groupitemList :', this.groupitemList);
      console.log('this.groupitemList.Sensitiveitemlist :', this.groupitemList.Sensitiveitemlist);
      console.log('this.groupitemList.WarehouseId :', this.groupitemList[0].WarehouseId);
      // for (var i in this.groupitemList) {
      //   
      //   this.SelectedMRP=this.groupitemList[i].WarehouseId;
      //   console.log('Index' + i)
      //   console.log('this.groupitemList.WarehouseId1212 :', this.groupitemList[i].WarehouseId);
      //   console.log('  this.SelectedMRP :',   this.SelectedMRP);
      //   if (this.SelectedMRPs.length>0 && this.SelectedMRPs.length<2) {
      //     
      //     rowData.SelectedMRP = true;
      //   }
      // }
      
    });

  }

  // onSelectItem(ItemNumber){
  //   
  //   this.itemService.GetWarehousesStock(ItemNumber).subscribe(result => {
  //     this.groupitemList = result;
  
  //     console.log('this.groupitemList :', this.groupitemList);
  //     console.log('this.groupitemList.Sensitiveitemlist :', this.groupitemList.Sensitiveitemlist);
  //     console.log('this.groupitemList.WarehouseId :', this.groupitemList[0].WarehouseId);
  //     // for (var i in this.groupitemList) {
  //     //   
  //     //   this.SelectedMRP=this.groupitemList[i].WarehouseId;
  //     //   console.log('Index' + i)
  //     //   console.log('this.groupitemList.WarehouseId1212 :', this.groupitemList[i].WarehouseId);
  //     //   console.log('  this.SelectedMRP :',   this.SelectedMRP);
  //     //   if (this.SelectedMRPs.length>0 && this.SelectedMRPs.length<2) {
  //     //     
  //     //     rowData.SelectedMRP = true;
  //     //   }
  //     // }
      
  //   });

  // }

  onEventTypeChange() {
   
  }
  groupselectitem(O){
    this.confirmationService.confirm({
      message: 'Are you sure you want to make Data Sensitive?',
      accept: () => {
        this.blocked = true;
        this.messageService.add({ severity: 'success', summary: 'Your Request for making Data Sensitive is Approved!', detail: '' });
},
reject: () => {
this.blocked= true;
this.blocked= false;
O.SelectedMRP= false
this.messageService.add({ severity: 'error', summary: 'Your Request for making Data Sensitive is Canceled!', detail: '' });
}

});
}
  onCheckBoxChange(check, rowdata) {
    for (var i in check) {
      if (check[i].StockId == rowdata.StockId) {
        check[i].SelectedMRP = rowdata.SelectedMRP;
        rowdata.SelectedMRP = rowdata.SelectedMRP;
      } else {
        check[i].SelectedMRP = false;
      }
    }

  }
onCheck(){
  var arr = []
  var count = 0
  this.groupitemList.forEach(x => {
    x.Sensitiveitemlist.forEach(element => {
      if(element.SelectedMRP == true){
        arr.push(element);
      }
    })
    // if(x.Sensitiveitemlist.length == arr.length){
    //   count = count + 1
    // }
  })
  if(this.groupitemList.length == arr.length){
    return true
  }else{
    return false;
  }
}
Save(groupitemList){
  
  this.blocked = true;

  var isSave = this.onCheck();
  if(isSave == true){
  this.mrpstock = [];
  this.mrpstocks = [];
  if (this.groupitemList && this.groupitemList.length > 0) {
    

    this.confirmationService.confirm({
      message: 'Are you sure you want to make Data Sensitive?',
      accept: () => {
    this.groupitemList.forEach(x => {
      let obj: any = {
        Sensitiveitemlist: x.Sensitiveitemlist
      }
      x.Sensitiveitemlist.forEach(element => {
        let Aobj: any = {
          CurrentInventory: element.CurrentInventory,
          ItemMultiMRPId: element.ItemMultiMRPId,
          ItemName: element.ItemName,
          ItemNumber: element.ItemNumber,
          IsSelected: element.SelectedMRP,
          StockId: element.StockId,
          WarehouseId: element.WarehouseId,
          WarehouseName: element.WarehouseName,
         
        }
        this.mrpstocks.push(Aobj)
        console.log('Aobj.StockId :', Aobj.StockId);
      });
    });
     
        console.log('this.mrpstockmrpstock :', this.mrpstocks);
        this.itemService.MRPSensitiveWarehouseStock(this.mrpstocks).subscribe(result => {
             
          
          this.mrpstockLists = result;
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: "Saved Successfully", detail: '' });
          console.log('this.mrpstockLists :', this.mrpstockLists);
        });
      }});

    }else{
      this.blocked = false;
        this.messageService.add({ severity: 'error', summary: "No Data Found", detail: '' });
    }
  }else{
    this.blocked = false;
    this.messageService.add({ severity: 'error', summary: "Please Checked all Warehouse Sensitivity ", detail: '' });
  }
  // this.itemService.MRPSensitiveWarehouseStock(this.mrpstocks).subscribe(result => {
  //      

  //   this.mrpstockLists = result;
   
  //   console.log('this.mrpstockLists :', this.mrpstockLists);
  // });
}

clear(){
  this.itemSelected = null;
  this.groupitemList = []
}

}

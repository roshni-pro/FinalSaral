import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { CustomersCartFilters } from 'app/shared/interface/shoppingCart/customers-cart-filters';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  @Input() shoppinglist: any[];
  warehouseList: any[];
  selectedWarehouse: any;
  selectedWarehouseCopy: any;
  customersCartFilters: CustomersCartFilters;
  selectedWarehouseList: any[];
  WarehouseIds: any;
  selectedwarehouses: any;
  searchwh: any;
  result: any[];
  selectedRowDetails: any[];
  isOpenPopup: boolean;
  data: any;
  shoppingdetails: any;
  totalRecords:number;
  status: any;
  checked: boolean;
  lazyvalue: boolean;
  IsOrderNotPlaced: number;
  OrderId: number;
  constructor(private shopservice: ShoppingCartService, private pepolePilotService: PepolePilotService, private modalService: NgbModal, private warehouseService: WarehouseService, private exportService: ExportServiceService, private messageService: MessageService) { }

  ngOnInit() {
    this.lazyvalue=true;
    this.shoppingdetails = {};
    this.isOpenPopup = false;
    this.selectedWarehouseList = [];
    this.shoppinglist = [];
    this.selectedRowDetails = [];
    this.customersCartFilters = {
      WarehouseIds: null,
      totalitem: null,
      page: null,
      keyword: null,
      IsOrderNotPlaced:null,
    }
   

    this.warehouseService.GetAllWarehouse().subscribe(result => {
      console.log(result);
      this.warehouseList = result
      console.log('selected' + this.warehouseList)
      this.selectedWarehouse = this.warehouseList.filter(x => { return x.Selected == true }, x => x.WarehouseId);
      this.selectedWarehouseCopy = JSON.parse(JSON.stringify(this.selectedWarehouse));

      console.log('selected' + this.selectedWarehouse)
    })

  }


  selectedWarehouses() {
    this.WarehouseIds = []
    console.log("this.selectedwarehouses");
    for (var i in this.selectedwarehouses) {
      this.WarehouseIds.push(this.selectedwarehouses[i].WarehouseId)
    }

  }


  OnClick() {
    
   this.lazyvalue=true;
    this.selectedWarehouses();
    this.customersCartFilters = {
      WarehouseIds: this.WarehouseIds,
      keyword: this.searchwh,
      page: 0,
      totalitem: 15,
      IsOrderNotPlaced: this.status,
    }
    this.initialize(this.customersCartFilters);
  }
 
 
  initialize(customersCartFilters) {
    this.shopservice.getshoppingdata(customersCartFilters).subscribe(result => {
      
      this.shoppinglist = result.Carts;
      this.totalRecords=result.total_count;

      
      console.log("this.shoppinglist", this.shoppinglist);
    })
  }


  export() {
   
    
    if(this.OrderId >0){

    this.shopservice.getexportdata(this.customersCartFilters).subscribe(result => {
      //var a = result;
      var a = result;
      console.log("a", a);

      var exportdata = [];


      a.forEach(el => {
        var list = [];
        list = el.ItemList ;

        list.forEach(element => {
         let newItem = {
            OrderId: el.OrderId,
            SkCode: el.SkCode,
            ShopName: el.ShopName,
           // Mobile: el.Mobile,
            CreatedDate:el.CreatedDate,
            ItemNumber: element.ItemNumber,
            ItemName: element.ItemName,
            qty: element.qty,
            UnitPrice: element.UnitPrice,
            IsActive : element.IsActive
          }
          exportdata.push(newItem);
        });
      });

      console.log("dsfsdfsdfsdf", exportdata)

    
     
      this.exportService.exportAsExcelFile(exportdata, "shoppingcart");
      
      console.log("result");
    })
  }
  else{
    this.shopservice.getexportdata(this.customersCartFilters).subscribe(result => {
      //var a = result;
      
      var a = result;
      console.log("a", a);

      var exportdata = [];


      a.forEach(el => {
        var list = [];
        list = el.ItemList ;

        list.forEach(element => {
         let newItem = {
            OrderId: el.OrderId,
            SkCode: el.SkCode,
            ShopName: el.ShopName,
            //Mobile: el.Mobile,
            CreatedDate:el.CreatedDate,
            ItemNumber: element.ItemNumber,
            ItemName: element.ItemName,
            qty: element.qty,
            UnitPrice: element.UnitPrice,
            IsActive : element.IsActive
          }
          exportdata.push(newItem);
        });
      });

      console.log("dsfsdfsdfsdf", exportdata)

    
     
      this.exportService.exportAsExcelFile(exportdata, "shoppingcart");
      
      console.log("result");
    })

  }
}
  onStatusChange(s) {
 
    this.status = s
    if(s==true){
      
      
      this.shopservice.getshoppingdata(this.customersCartFilters).subscribe(result => {
        
        this.shoppinglist = result.Carts;
  
    })
  
  }
  }


  load(event) {
    
    var First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
    var Last = event.rows ? event.first + event.rows : 15;

    var page = Last / event.rows;
    this.customersCartFilters.page = page-1;
    this.customersCartFilters.totalitem = (event.rows ?  event.rows : 15);
   // this.customersCartFilters.IsOrderNotPlaced= true;
             if(page>0){
     this.initialize(this.customersCartFilters);
      }
}

  openDetails(d, e) {
    
    this.isOpenPopup = true;
    this.selectedRowDetails = d.ItemList;
  }
}

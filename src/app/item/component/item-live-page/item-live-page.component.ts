import { Component, OnInit } from '@angular/core';
import { InventoryAssignSupervisiorService } from 'app/current-stock/services/inventory-assign-supervisior.service';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { InsertJitRiskQuantityDc, InternalUpdateRiskDc, LiveItemListFilterDc, OpenMoqFilterDc, POUpdateRiskDc, UpdateJITLiveItemDc, UpdateRiskDc, UpdateRiskItemDc } from 'app/item/interface/live-item-list-filter-dc';
import { LiveItemPageService } from 'app/item/services/live-item-page.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { log } from 'console';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-item-live-page',
  templateUrl: './item-live-page.component.html',
  styleUrls: ['./item-live-page.component.scss']
})
export class ItemLivePageComponent implements OnInit {
  blocked : boolean = false;
  warehouses: any[];
  item: string;
  brandList  : any;
  liveData : any;
  isOpenMOQ : boolean = false;
  liveItemList : any;
  multiMRPList : any;
  moqList : any;
  liveItemListFilterDc : LiveItemListFilterDc;
  updateJITLiveItemDc : UpdateJITLiveItemDc[]=[];
  updateRiskItemDc : UpdateRiskItemDc;
  updateRiskDc : UpdateRiskDc;
  poUpdateRiskDc : POUpdateRiskDc;
  internalUpdateRiskDc : InternalUpdateRiskDc;
  openMoqFilterDc : OpenMoqFilterDc;
  insertJitRiskQuantityDc : InsertJitRiskQuantityDc;
  supplierList : any;
  depoList : any;
  selectedRowData : any;
  selectedMultiMRPData : any;
  totalRecords : number=0;
  totalItem : number=0;
  first: number;
  skip : number= 0;
  take : number= 10;
  page : number = 0;
  pageItem :number = 3;
  selectedList: any[];
  selectedMarginList : any[]=[];
  limitQtyData : any;
  limitQtyDataList : any[]=[];
  isOpenLimitQty : boolean = false;
  entity : any;
  entityName : any;
  isEditablePurchase : boolean = false;
  ItemASPList:any;
  TotalCount : number=0;
  Skip : number;
  Take : number;
  isPriceChange:boolean = false;
  IsButtonClick:boolean = false;

  constructor(private inveService: InventoryAssignSupervisiorService,
    private liveItemPageService : LiveItemPageService
    , private messageService: MessageService
    ,private exportService: ExportServiceService
    ,private API_Service: InventoryforcastserService,private confirmationService: ConfirmationService) { this.liveData={}; this.entity='JITRiskQty';
  this.entityName = 'ItemMaster'}

  ngOnInit() {
    var roles = localStorage.getItem('role').split(',');
    var assignedRoles = roles.filter(x=>x=='Region Sourcing lead');
    debugger;
    if(assignedRoles.length > 0) {   
      this.isEditablePurchase = true;
    }else{
      this.isEditablePurchase = false;
    }
    this.liveData.warehouseId = null;
    this.liveData.BrandId = null;
    this.getWarehouseList();
    this.getBrandList();
    this.getSupplierList();
    this.getDepoList();
  }

  getWarehouseList() {
    this.blocked = true;
    this.inveService.getWarehouseList().subscribe(result => {
      this.warehouses = result;
      this.blocked = false;
      console.log(this.warehouses, "warehouses");
    });
  }
  getBrandList()
  {
    this.blocked = true;
    this.liveItemPageService.getBrandListByWarehouseId().subscribe(x=>
      {
        this.brandList = x;
        this.blocked = false;
      })
  }
  getSupplierList()
  {
    // this.API_Service.GetItemMoQ(rowData.ItemMultiMrpId, this.liveData.WarehouseId).subscribe(
      this.blocked = true;
    this.liveItemPageService.getSupplierList().subscribe(
      (res) => {
        console.log(res,'supplielist');
        this.supplierList = res;
        this.blocked = false;
      },
      (err) => {
      }
    );
  }
  getDepoList() {
    this.blocked = true;
    // console.log(selSupplier);
    //console.log(selSupplier.SupplierId)
    // var id = selSupplier.SupplierId
    this.liveItemPageService.getDepo().subscribe(res => {
    // this.API_Service.getDepoForPr(id).subscribe(res => {
      //console.log(res);
      this.depoList = res;
      this.blocked = false;
      //this.depoList = res.filter(x => x.DepoName != "NULL");
    })
  }
  getDepoBySupplierId(rowData)
  {
    this.blocked = true;
    console.log(rowData);
    // console.log(rowData.SupplierId)
    var id = parseInt(rowData.SupplierId);
    this.depoList = [];
    this.API_Service.getDepoForPr(id).subscribe(res => {
      console.log(res);
      rowData.depoList = res;
      this.blocked = false;
      //this.depoList = res.filter(x => x.DepoName != "NULL");
    })
  }
  load(event)
  {
    this.first = 0;
    this.liveItemList = [];
    debugger;
    var Last = event && event.first ? event.first + event.rows : event.rows
    this.skip = event && event.rows ? event.rows : 25;
    this.take = event && event.rows ? Last / event.rows : 0;
    this.onSearch();

  } 
  onSearch()
  {
    debugger;
    if((this.liveData.warehouseId.WarehouseId > 0 && ((this.liveData.BrandId && this.liveData.BrandId.BrandId) > 0)) || this.liveData.warehouseId.WarehouseId > 0 && this.liveData.Keyword != null)
    {
      this.liveItemList = [];
      this.multiMRPList = [];
      this.ItemASPList = [];
      this.liveItemListFilterDc={
        BrandId : this.liveData.BrandId ? Number.parseInt(this.liveData.BrandId.BrandId) : 0,
        Keyword : this.liveData.Keyword,
        Skip : 0,
        Take : 10,
        WarehouseId : Number.parseInt(this.liveData.warehouseId.WarehouseId)
      }
      this.blocked = true;
      this.liveItemPageService.getLiveItems(this.liveItemListFilterDc).subscribe(x=>
        {
          if(x.length > 0)
          {
            x.forEach(element => {
              if(element.SupplierId)
              {
                this.API_Service.getDepoForPr(element.SupplierId).subscribe(res => {
                  console.log(res);
                  // debugger;
                  element.depoList = res;
                })
              //  element.depoList = this.getDepoBySupplierId(element.SupplierDepoId);
              }
            });
            this.liveItemList = x;
            this.totalRecords = x && x[0].TotalCount;
            this.blocked = false;
          }else{
            alert('Data Not Found!!');
            this.blocked = false;
          }
          console.log('liveItemList',this.liveItemList);
          
        })
    }else{
      if(!this.liveData.warehouseId.WarehouseId)
      {
        this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!', detail: '' });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Please Select Brand!', detail: '' });
      }
      
    }
  }
  onClickRow(rowData)
  {
    debugger;
    this.isInputChange = false;
    this.blocked = true;
    this.liveItemPageService.getMultiMrpList(this.liveData.warehouseId.WarehouseId,rowData.ItemNumber).subscribe(x=>
      {
        // x.forEach(element => {
        //   element.LiveQuantity = element.LimitQty + element.RiskQuantity;
        // });
        this.isInputChange = false;
        this.multiMRPList = x;
        this.multiMRPList.forEach(element => {
          if(!element.EnableAutoPrice && (element.WeightedPurchasePrice == null || element.WeightedPurchasePrice == 0))
          {
            element.WeightedPurchasePrice = Number(element.PurchasePrice).toFixed(4);
          }else{
          element.WeightedPurchasePrice = element.WeightedPurchasePrice > 0 ? element.WeightedPurchasePrice : 0;
          element.WeightedPP = element.WeightedPurchasePrice > 0 ? element.WeightedPurchasePrice : 0;
          }
        });
        this.blocked = false;
        console.log('multidata',x);
        
      })
  }
  onClickLimitQty(order)
  {
    this.limitQtyDataList = [];
    this.limitQtyData = order;
    this.limitQtyDataList.push(order);
    this.isOpenLimitQty = true;
  }
  onClickMOQ(rowData,order,openMoq)
  {
    //debugger
    if(this.isInputChange)
    {
      alert("Please Save The Changes First!!!");
    }else{
    if(rowData.SupplierId > 0 && rowData.SupplierDepoId > 0 && order.POPrice > 0 && order.PurchasePrice > 0 && order.RiskQuantity >= 0 && order.RiskPurchasePrice >= 0)
    {
      if((order.RiskQuantity > 0 && order.RiskPurchasePrice > 0) || (!order.RiskQuantity))
      {
      this.selectedRowData = rowData;
      this.selectedMultiMRPData = order;    
      this.openMoqFilterDc={
        WarehouseId : Number.parseInt(this.liveData.warehouseId.WarehouseId),
        ItemNumber : rowData.ItemNumber,
        ItemMultiMrpId : Number.parseInt(order.ItemMultiMRPId)
      }
      this.selectedMarginList = [];
      this.blocked = true;
      this.liveItemPageService.getOpenMoqList(this.openMoqFilterDc).subscribe(x=>
        {
          debugger;
          x.forEach(element => {
            element.PurchasePrice = parseFloat(Number(order.PurchasePrice).toFixed(4));
            element.NPP = order.NPP;
            element.ActualUnitPrice = parseFloat(Number(element.ActualUnitPrice).toFixed(4));
            if(!element.EnableAutoPrice && (element.WeightedPurchasePrice == null || element.WeightedPurchasePrice == 0))
            {
              element.WeightedPurchasePrice = Number(element.PurchasePrice).toFixed(4);
            }
            // element.TotalTaxPercentage = order.TotalTaxPercentage; 
            element.UnitPrice = this.onChangePurchasePrice(element,false);
            element.DistributionPrice = this.onChangeDistributionPrice(element,false);
            element.TradeUnitPrice = this.onChangeTradePrice(element,false);            
            if(element.ActualUnitPrice == element.DistributionPrice && element.ActualUnitPrice == element.TradePrice)
            {
              element.isCopy = true;
            }else{
              element.isCopy = false;
            }
            
          });
          this.moqList = x;
          this.moqList.forEach(element => {
            element.WeightedPurchasePrice = element.WeightedPurchasePrice > 0 ? parseFloat(Number(element.WeightedPurchasePrice).toFixed(4)) : 0;
            if(element.Active)
            {
              this.selectedMarginList.push(element);
            }
          });
          this.blocked = false;
          this.isInputChange= false;
          // this.selectedList = [];
          if(openMoq == true)
          {
            this.isOpenMOQ = true;
          }          
          console.log('moqList',this.moqList);          
        })
      }else{
        if(order.RiskQuantity > 0)
        {
          alert('Enter Risk Purchase Price!!');
        }
      }
    }
    else{
      if((rowData.SupplierId <=0 || rowData.SupplierDepoId <=0) || !(rowData.SupplierId || rowData.SupplierDepoId) )
      {
        alert(!rowData.SupplierId ? 'Select Supplier Name' : 'Select Supplier Depo');
      }
      else if((order.POPrice <=0 || order.PurchasePrice <=0 || order.RiskQuantity <0 || order.RiskPurchasePrice <0) || !(order.POPrice && order.PurchasePrice && order.RiskQuantity && order.RiskPurchasePrice))
      {
        debugger
        var POPrice=Number(order.POPrice);
        if(!POPrice ||POPrice==0|| Number(!order.PurchasePrice) ||Number(order.PurchasePrice)==0  )
        {
          var res= !POPrice ? 'PO Price' : 'Purchase Price'
          alert('Enter ' + res);
        }
        else if(!order.RiskQuantity || order.RiskQuantity < 0)
        alert('Enter Risk Quantity');
        else if(!order.RiskPurchasePrice || order.RiskPurchasePrice < 0)
        alert('Enter Risk Purchase Price');
      }
    }
  }
  }
  onClickPurchasePrice(order)
  {
    this.isOpenWPP = true;
  }
  isValid : boolean = false;
  isInputChange : boolean = false;
  isOpenWPP : boolean = false;
  onChangeInput(order)
  {
    if(!this.isEditablePurchase)
    {
      if((order.EnableAutoPrice && order.WeightedPP > 0) || order.WeightedPP > 0)
      {
        this.isInputChange = false;
      }else{
        this.isInputChange = true;
      }
    }else{
      this.isInputChange = true;
    }
  }
  onChangeWPP(order)
  {
    if(order.WeightedPurchasePrice > order.MRP)
    {
      alert('You cannot enter WeightedPurchasePrice greater then MRP');
      order.WeightedPurchasePrice = 0;
      return order.WeightedPurchasePrice;
    }
  }
  isMRPGreater : boolean = false;
  onSaveMOQ()
  {
    debugger;
    if(this.selectedMarginList && this.selectedMarginList.length > 0)
    {
      this.updateJITLiveItemDc = [];
      this.isValid = false;
      debugger;
      this.isMRPGreater = false;
      this.selectedMarginList.forEach(element => {
            var margin = element.Margin / 100;
            var totalMargin = parseFloat(Number(element.PurchasePrice).toFixed(4)) * margin;
            element.UnitPrice = parseFloat(Number(element.PurchasePrice).toFixed(4)) + totalMargin;
            var wmargin = element.WholesaleMargin / 100;
            var totalWMargin = parseFloat(Number(element.PurchasePrice).toFixed(4)) * wmargin;
            element.WholsellerUnitPrice = parseFloat(Number(element.PurchasePrice).toFixed(4)) + totalWMargin;
            var tMargin = element.TradeMargin / 100;
            var totalTMargin = parseFloat(Number(element.PurchasePrice).toFixed(4)) * tMargin;
            element.TradeUnitPrice = parseFloat(Number(element.PurchasePrice).toFixed(4)) + totalTMargin;
            if((element.UnitPrice > element.MRP) && element.Active) 
            {
              this.isMRPGreater = true;
              alert('New Retailer Unit Price is ' + parseFloat(Number(element.UnitPrice).toFixed(4)) + ' .New Retailer Unit Price should be less then or equal to MRP.Please Change Margin!!!')
              return false; 
            }
            else  if((element.WholsellerUnitPrice > element.MRP) && element.Active)
            {
              this.isMRPGreater = true;
              alert('New Wholesale Unit Price is ' + parseFloat(Number(element.WholsellerUnitPrice).toFixed(4)) + ' .New Wholesale Unit Price should be less then or equal to MRP.Please Change Wholesale Margin!!!')
              return false; 
            }
            else if((element.TradeUnitPrice > element.MRP) && element.Active)
            {
              this.isMRPGreater = true;
              alert('New Trade Unit Price is ' + parseFloat(Number(element.TradeUnitPrice).toFixed(4)) + ' .New Trade Unit Price should be less then or equal to MRP.Please Change Trade Margin!!!')
              return false; 
            }
        // if(parseInt(element.DiscountPercent) > 0 && element.Margin)
        // {rowData.PurchasePrice + (rowData.PurchasePrice * rowData.Margin / 100)
          if(((element.PurchasePrice + (element.PurchasePrice * element.Margin / 100)) > element.MRP) && element.Active)
          {
            this.isMRPGreater = true;
            alert("Unit price must be less than MRP");
            return false;
          }
          if((this.selectedMultiMRPData.POPrice > element.MRP) && element.Active)
          {
            this.isMRPGreater = true;
            alert("PO Purchase price must be less than MRP");
            return false;
          }
          if ((this.selectedMultiMRPData.PurchasePrice > element.MRP) && element.Active) {
            this.isMRPGreater = true;
            alert("Purchase price must be less than MRP");
            return false;
          }
          else if ((this.selectedMultiMRPData.PurchasePrice == 0 || this.selectedMultiMRPData.POPrice == 0) && element.Active) {
            this.isMRPGreater = true;
            alert("Purchase price can't be zero");
            return false;
          }
          else if ((element.WholesaleMargin == 0 || element.WholesaleMargin == null) && element.Active) {
            this.isMRPGreater = true;
            alert("WholesaleMargin can't be zero");
            return false;
          }
          // else if (element.Margin == 0) {
          //   alert("Margin can't be zero");
          //   return false;
          // }
          else if ((element.TradeMargin == 0 || element.TradeMargin == null) && element.Active) {
            this.isMRPGreater = true;
            alert("TradeMargin can't be zero");
            return false;
          }
          // else if (element.TradeMargin  < element.TradeRMargin) {
          //   alert("TradeMargin can't be less then minmargin!!");
          //   return false;
          // }
          // else if (element.WholesaleMargin  < element.WholesaleRMargin) {
          //   alert("WholesaleMargin can't be less then minmargin!!");
          //   return false;
          // }
          // else if (element.Margin  < element.RetailerRMargin) {
          //   alert("RetailerMargin can't be less then minmargin!!");
          //   return false;
          // }
          else if(!this.isMRPGreater){
            element.PurchasePrice = Number.parseFloat(element.PurchasePrice);
            // element.PurchasePrice = Number.parseFloat(element.WeightedPurchasePrice > 0 ? element.WeightedPurchasePrice : 0);
debugger;
            let obj ={
              WarehouseId : parseInt(this.liveData.warehouseId.WarehouseId),
              SupplierId : this.selectedRowData.SupplierId,
              DepoId : this.selectedRowData.SupplierDepoId,
              ItemMultiMrpId : this.selectedMultiMRPData.ItemMultiMRPId,
              ItemId : element.ItemId,  
              POPurchasePrice : parseFloat(Number(this.selectedMultiMRPData.POPrice).toFixed(4)),
              PurchasePrice : parseFloat(Number(element.PurchasePrice).toFixed(4)),//this.selectedMultiMRPData.PurchasePrice,
              Discount : parseInt(element.DiscountPercent),
              Margin : element.Margin,
              LimitQuantity : this.selectedMultiMRPData.LimitQty,
              RiskQuantity : this.selectedMultiMRPData.RiskQuantity,
              QtyToLive : this.selectedMultiMRPData.LiveLimitQuantity,
              RiskPurchasePrice : parseFloat(Number(this.selectedMultiMRPData.RiskPurchasePrice).toFixed(4)),
              UnitPrice : ((element.PurchasePrice) + ((element.PurchasePrice) * element.Margin / 100)).toFixed(4),
              Active : element.Active,
              WholesalePrice : ((element.PurchasePrice) + ((element.PurchasePrice) * element.WholesaleMargin / 100)).toFixed(4),
              TradePrice : ((element.PurchasePrice) + ((element.PurchasePrice) * element.TradeMargin / 100)).toFixed(4),
              WholesaleMargin : element.WholesaleMargin,
              TradeMargin : element.TradeMargin,
            }
            // this.isMRPGreater = false;
            this.updateJITLiveItemDc.push(obj);  
          }
        
      // }else{
      //   this.isValid = true;
      //   alert('Please Enter Discount And Margin');
      //   return false;
      // }
      });      
      if(!this.isValid && !this.isMRPGreater && this.updateJITLiveItemDc.length > 0){
      this.blocked = true;
      this.liveItemPageService.updateJITLiveItem(this.updateJITLiveItemDc).subscribe(x=>
        {
          debugger;
          console.log('update data',x);
          console.log(x);
          if(!x.Status)
          {
            alert(x.Message);
            this.blocked = false;
            if(x.Message == 'Purchase Price is different you cannot do the changes reload the page!!')
            {
              window.location.reload();
            }
          }else{
            alert(x.Message);
            this.blocked = false;
            this.isOpenMOQ = false;
          }
          
        })
      }
    }else{
      alert('Please Select Atleast One Item!!');
      this.blocked = false;
      return false;
    }
  }
  onUpdate(isMoqList,selectedMarginList)
  {
    debugger;
      this.confirmationService.confirm({
        message: 'Are you sure that you want to live this item?',
        accept: () => {      
          this.onSaveMOQ(); 
      }
    });
  }
  onModify(rowData,order)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {      
        this.selectedRowData = rowData;
        this.selectedMultiMRPData = order;   
        this.updateRiskItemDc = null;
        this.isValid = false;      
        if(order.WeightedPurchasePrice > order.MRP)
        {
          alert('You cannot enter WeightedPurchasePrice greater then MRP');
          order.WeightedPurchasePrice = 0;
        }
        else if(order.POPrice > order.MRP) //new change for poprice validation 
        {
          alert('You cannot enter Po Price greater then MRP');
          return false;
        }
        else{
        if(rowData.SupplierId > 0 && rowData.SupplierDepoId > 0 && order.POPrice > 0 && (order.LiveLimitQuantity <= (order.LimitQty + order.RiskQuantity)))
        {
          // if(((Number.parseInt(order.RiskQuantity) > 0 && order.RiskPurchasePrice > 0) || (Number.parseInt(order.RiskQuantity) == 0 && order.RiskPurchasePrice == 0)) || (!order.RiskQuantity))
          // {
            if (this.selectedMultiMRPData.POPrice == 0) {
              alert("PO Price can't be zero");
              return false;
            }
            if (this.selectedMultiMRPData.WeightedPurchasePrice == 0 || this.selectedMultiMRPData.WeightedPurchasePrice == null) {
              alert("Weighted Purchase price can't be zero");
              return false;
            }
            else{
              this.updateRiskItemDc ={
                WarehouseId : parseInt(this.liveData.warehouseId.WarehouseId),
                ItemMultiMrpId : this.selectedMultiMRPData.ItemMultiMRPId,
                SupplierId : this.selectedRowData.SupplierId,
                DepoId : this.selectedRowData.SupplierDepoId,
                POPurchasePrice : this.selectedMultiMRPData.POPrice,
                // PurchasePrice : this.selectedMultiMRPData.PurchasePrice,//this.selectedMultiMRPData.PurchasePrice,
                PurchasePrice : this.selectedMultiMRPData.WeightedPurchasePrice,//this.selectedMultiMRPData.PurchasePrice,
                LimitQuantity : this.selectedMultiMRPData.LimitQty,
                RiskQuantity : this.selectedMultiMRPData.RiskQuantity,
                QtyToLive : this.selectedMultiMRPData.LiveLimitQuantity,
                RiskPurchasePrice : this.selectedMultiMRPData.RiskPurchasePrice,
              }
            } 
            if(!this.isValid && this.updateRiskItemDc != null){
            this.blocked = true;
            this.liveItemPageService.updateLimit(this.updateRiskItemDc).subscribe(x=>
              {
                this.isInputChange = false;
                console.log('update data',x);
                if(!x.Status)
                {
                  alert(x.Message);
                  this.blocked = false;
                }else{
                  alert(x.Message);
                  this.onClickRow(rowData);
                  this.blocked = false;
                  this.isOpenMOQ = false;
                }
                
              })
              }
            // }else{
            //   if(Number.parseInt(order.RiskQuantity) > 0)
            //   {
            //     alert('Enter Risk Purchase Price!!');
            //   }
            // }
            }else{
              if((rowData.SupplierId <=0 || rowData.SupplierDepoId <=0) || !(rowData.SupplierId || rowData.SupplierDepoId) )
              {
                alert(!rowData.SupplierId ? 'Select Supplier Name' : 'Select Supplier Depo');
              }
              // else if((order.POPrice <=0 || order.WeightedPurchasePrice <=0 || order.RiskQuantity <0 || order.RiskPurchasePrice <0) || !(order.POPrice && order.WeightedPurchasePrice && order.RiskQuantity && order.RiskPurchasePrice))
              else if((order.POPrice <=0 || order.WeightedPurchasePrice <=0 ) || !(order.POPrice && order.WeightedPurchasePrice))
              {
                debugger
                var POPrice=Number(order.POPrice);
                if(!POPrice ||POPrice==0|| Number(!order.WeightedPurchasePrice) ||Number(order.WeightedPurchasePrice)==0  )
                {
                  var res= !POPrice ? 'PO Price' : 'Weighted Purchase Price'
                  alert('Enter ' + res);
                }
                // else if(!order.RiskQuantity || order.RiskQuantity < 0)
                // alert('Enter Risk Quantity');
                // else if(!order.RiskPurchasePrice || order.RiskPurchasePrice < 0)
                // alert('Enter Risk Purchase Price');
              }else if(order.LiveLimitQuantity > (order.LimitQty + order.RiskQuantity))
              {
                alert('Live Qty Cannot be Greater Then Allowed Qty!!');
              }else{
                alert('Something Went Wrong!!');
              }
            }
          }
    }
  });
  }
  isOpenRiskPopup : boolean = false;
  riskData : any;
  riskQtyDataList : any;
  onClickUpdateRisk(rowData,order)
  {
    debugger;
    if(this.isInputChange)
    {
      alert("Please Save The Changes First!!!");
    }else{
      debugger;
      // order.PORiskQuantity = order.RiskQuantity;
      // order.PORiskPurchasePrice = order.RiskPurchasePrice;
      order.WPP=order.RiskPurchasePrice;
      order.TotalRiskQty=order.RiskQuantity;
      this.riskData = order;
      this.riskData.ItemNumber = rowData.ItemNumber;
      this.riskData.RiskQty = 0;
      this.riskData.RiskPPrice = 0;
      this.liveItemPageService.getRiskList(order.WarehouseId,order.ItemMultiMRPId).subscribe(x=>
        {
            this.riskData.RiskQty = 0;
            this.riskData.RiskPPrice = 0;
            this.riskData.PORiskQty = 0;
            this.riskData.PORiskPPrice = 0;
            this.riskData.PORiskQuantity = x!= null && x.length > 0 && x[0].RiskType == 0 ? x[0].RiskQuantity : 0;
            this.riskData.PORiskPurchasePrice = x!= null && x.length > 0 &&  x[0].RiskType == 0 ? Number(x[0].RiskPurchasePrice).toFixed(4) : 0;
            if(x!= null && x.length > 1)
            {
              this.riskData.InternalRiskQuantity = x!= null && x.length > 1 &&  x[1].RiskType == 1 ? x[1].RiskQuantity : 0;
              this.riskData.InternalRiskPurchasePrice = x!= null && x.length > 1 &&  x[1].RiskType == 1 ? Number(x[1].RiskPurchasePrice).toFixed(4) : 0;
            }
            // else if(x!= null && x.length > 0 && x[0].RiskType == 1){
            //   this.riskData.InternalRiskQuantity = x!= null && x.length > 0 &&  x[0].RiskType == 1 ? x[1].RiskQuantity : 0;
            //   this.riskData.InternalRiskPurchasePrice = x!= null && x.length > 0 &&  x[0].RiskType == 1 ? x[1].RiskPurchasePrice : 0;
            // }
            else{
              this.riskData.InternalRiskQuantity = 0;
              this.riskData.InternalRiskPurchasePrice = 0;
            }
            
         
          // x.forEach(element => {
          //   element.RiskQty = 0;
          //   element.RiskPPrice = 0;
          //   element.PORiskQty = 0;
          //   element.PORiskPPrice = 0;
          //   element.ItemNumber = rowData.ItemNumber;
          //   if(element.RiskType == 0)
          //   {
          //     element.PORiskQuantity = element.RiskQuantity
          //     element.PORiskPurchasePrice = element.RiskPurchasePrice
          //   }else{
          //   }
          // });
          // this.riskQtyDataList = x;
        })
      this.isOpenRiskPopup = true;
    }
  }
  isBothQtyUpdate : boolean= false;
  msg : any;
  onUpdateRisk()
  {
    this.isInputChange = false;
    debugger;
    this.riskData;
    var totalPORiskQty = 0;
    var totalInternalRiskQty = 0;    
    if(this.riskData.PORiskPPrice > this.riskData.MRP)
    {
      alert('PO Risk Price cannot be greater then MRP!!!');
    }else if(this.riskData.RiskPPrice > this.riskData.MRP)
    {
      alert('Internal Risk Price cannot be greater then MRP!!!');
    }else{
    if(((this.riskData.PORiskQty !=0 && this.riskData.PORiskPPrice > 0) && (this.riskData.RiskQty !=0 && this.riskData.RiskPPrice > 0)) || ((this.riskData.PORiskQty !=0 && this.riskData.PORiskPPrice > 0) || (this.riskData.RiskQty !=0 && this.riskData.RiskPPrice > 0)))
    {
      if(((this.riskData.PORiskQuantity >= 0) && (this.riskData.InternalRiskQuantity >= 0)) || ((this.riskData.PORiskQuantity >= 0)|| (this.riskData.InternalRiskQuantity >= 0)))
      {
        if(this.riskData.PORiskQty != 0 && this.riskData.RiskQty != 0)
        {
          this.isBothQtyUpdate = true;
          totalPORiskQty =  this.riskData.PORiskQuantity + this.riskData.PORiskQty;
          totalInternalRiskQty =  this.riskData.InternalRiskQuantity + this.riskData.RiskQty;
        }else if(this.riskData.PORiskQty != 0)
        {
          this.isBothQtyUpdate = false;
          totalPORiskQty = this.riskData.PORiskQuantity + this.riskData.PORiskQty;
        }
        else{
          this.isBothQtyUpdate = false;
          totalInternalRiskQty =  this.riskData.InternalRiskQuantity + this.riskData.RiskQty;
        }
        // var totalRiskQty =  this.riskData.RiskQuantity + this.riskData.RiskQty;
        if((this.isBothQtyUpdate && totalPORiskQty >= 0 && totalInternalRiskQty >= 0) || (!this.isBothQtyUpdate && (totalPORiskQty >= 0 || totalInternalRiskQty >= 0)))
        {   
          if(!this.isBothQtyUpdate)
          {
            this.msg = 'Are you sure that you want to perform this action? Your Risk Quantity will be ' + (this.riskData.PORiskQty != 0 ? totalPORiskQty : totalInternalRiskQty) + ' from ' + (this.riskData.PORiskQty != 0 ? this.riskData.PORiskQuantity : this.riskData.InternalRiskQuantity);
          }else{
            this.msg = 'Are you sure that you want to perform this action? Your Risk Quantity will be for PO ' + totalPORiskQty + ' from ' + this.riskData.PORiskQuantity + ' and for Internal ' + totalInternalRiskQty + ' from ' + this.riskData.InternalRiskQuantity;
          }
              this.confirmationService.confirm({
                message: this.msg,//'Are you sure that you want to perform this action? Your Risk Quantity will be ' + totalInternalRiskQty + ' from ' + this.riskData.RiskQuantity,
                accept: () => {      
                  this.updateRiskDc = null;
                  this.isValid = false; 
                  debugger;     
                    if(((((Number.parseInt(this.riskData.PORiskQty) != null && this.riskData.PORiskPPrice > 0) || (Number.parseInt(this.riskData.PORiskQty) != 0 && this.riskData.PORiskPPrice != 0)) || (!this.riskData.PORiskQty)) &&
                    (((Number.parseInt(this.riskData.RiskQty) != null && this.riskData.RiskPPrice > 0) || (Number.parseInt(this.riskData.RiskQty) != 0 && this.riskData.RiskPPrice != 0)) || (!this.riskData.InternalRiskQty)))
                    || ((((Number.parseInt(this.riskData.PORiskQty) != null && this.riskData.PORiskPPrice > 0) || (Number.parseInt(this.riskData.PORiskQty) != 0 && this.riskData.PORiskPPrice != 0)) || (!this.riskData.PORiskQty)))
                    || ((((Number.parseInt(this.riskData.RiskQty) != null && this.riskData.RiskPPrice > 0) || (Number.parseInt(this.riskData.RiskQty) != 0 && this.riskData.RiskPPrice != 0)) || (!this.riskData.InternalRiskQty)))
                    )
                    {
                      // var poRiskQtyDiff = 0;
                      // var internalRiskQtyDiff = 0;
                      // poRiskQtyDiff = this.riskData.PORiskQuantity - this.riskData.PORiskQty;
                      // internalRiskQtyDiff = this.riskData.InternalRiskQuantity - this.riskData.RiskQty;
                      let obj = [];
                      if(((this.riskData.PORiskQty >= this.riskData.PORiskQuantity) || (this.riskData.PORiskQty >= -this.riskData.PORiskQuantity)) && this.riskData.PORiskPPrice > 0)
                      {
                        this.poUpdateRiskDc= {
                            WarehouseId : parseInt(this.liveData.warehouseId.WarehouseId),
                            ItemMultiMrpId : this.riskData.ItemMultiMRPId,
                            RiskQuantity : this.riskData.PORiskQty,
                            RiskPurchasePrice : parseFloat(Number(this.riskData.PORiskPPrice).toFixed(4)),
                            RiskType : 0
                        }
                        obj.push(this.poUpdateRiskDc);
                      }
                      if(((this.riskData.RiskQty >= this.riskData.InternalRiskQuantity) || (this.riskData.RiskQty >= -this.riskData.InternalRiskQuantity)) && this.riskData.RiskPPrice > 0)
                      {
                        this.internalUpdateRiskDc = {
                          WarehouseId : parseInt(this.liveData.warehouseId.WarehouseId),
                          ItemMultiMrpId : this.riskData.ItemMultiMRPId,
                          RiskQuantity : this.riskData.RiskQty,
                          RiskPurchasePrice : parseFloat(Number(this.riskData.RiskPPrice).toFixed(4)),
                          RiskType : 1
                        }
                        obj.push(this.internalUpdateRiskDc);
                      }
                      if(!this.isValid && obj != null && obj.length > 0){
                      this.blocked = true;
                      this.liveItemPageService.updateRisk(obj).subscribe(x=>
                        {
                          this.isOpenRiskPopup = false;
                          console.log('update data',x);
                          if(!x.Status)
                          {
                            alert(x.Message);
                            this.isInputChange = false;
                            this.blocked = false;
                          }else{
                            alert(x.Message);
                            this.onClickRow(this.riskData);
                            this.blocked = false;
                            this.isOpenMOQ = false;
                          }
                          
                        })
                      }
                      if(obj.length == 0)
                      {
                        if(this.riskData.PORiskQty < -this.riskData.PORiskQuantity)
                        {
                          alert('Manually PO Risk Quantity cannot be less then Current PO Risk Quantity!!');
                        }
                        if(this.riskData.RiskQty < -this.riskData.InternalRiskQuantity)
                        {
                          alert('Manually Internal Risk Quantity cannot be less then Current Internal Risk Quantity!!');
                        }
                      }
                      
                      }else{
                        if((this.isBothQtyUpdate && (this.riskData.PORiskQty != null && this.riskData.PORiskPPrice <= 0) && (this.riskData.RiskQty != null && this.riskData.RiskPPrice <= 0)))
                        {
                          debugger
                          alert('Enter PO and Internal Risk Purchase Price');
                        }else if((!this.isBothQtyUpdate && (this.riskData.PORiskQty != null && this.riskData.PORiskPPrice <= 0) || (this.riskData.RiskQty != null && this.riskData.RiskPPrice <= 0)))
                        {
                          debugger
                          alert('Enter ' + (this.riskData.PORiskQty != null && this.riskData.PORiskPPrice <= 0 ? 'PO ' : 'Internal ') + 'Risk Purchase Price');
                        }
                        else{
                          alert('Something Went Wrong!!');
                        }
                      }
              }
            });
        }else{
          alert("You cannot enter Risk qty more then Current Risk Quantity");
        }     
      }else{
        if(this.riskData.PORiskQuantity < 0 && this.riskData.InternalRiskQuantity < 0)
        {
          alert("You cannot enter PO Risk qty more then Current PO Risk Quantity && Risk qty more then Current Risk Quantity");
        }
        else if(this.riskData.PORiskQuantity < 0 && this.riskData.InternalRiskQuantity < 0)
        {
          alert("You cannot enter (PO and Internal) Risk qty more then Current (PO and Internal) Risk Quantity");
        }
        else (this.riskData.PORiskQuantity < 0 || this.riskData.InternalRiskQuantity < 0)
        {
          alert("You cannot enter " + (this.riskData.PORiskQuantity < 0 ? "PO" : "Internal" )  + " Risk qty more then Current Risk Quantity");
        }
        // else{
        //   alert("You cannot enter Risk qty more then Current Risk Quantity");
        // }
        
      }
    }else if(((this.riskData.PORiskQty > 0) && (this.riskData.RiskQty > 0)) && (this.riskData.PORiskPPrice <= 0) && (this.riskData.RiskPPrice <= 0))
    {
      alert('Enter PO Risk Purchase Price && Internal Risk Purchase Price to be update!');
    }
    else if((this.riskData.PORiskQty > 0 && this.riskData.PORiskPPrice <= 0) || (this.riskData.RiskQty > 0 && this.riskData.RiskPPrice <= 0))
    {
      alert('Enter ' + (this.riskData.PORiskPPrice <= 0 ? 'PO' : 'Internal' ) + ' Risk Purchase Price to be update!');
    }
    else{
      alert('Enter Atleast one (PO or Internal) Risk Quantity And Risk Purchase Price to be update!');
    }
  }
  }
  // (keypress)="decimalFilter($event)"
  decimalFilter(event: any) {
    debugger
    const reg = /^-?\d*(\.\d{1,2})?$/;
    // /^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
 
    if (!reg.test(input)) {
        event.preventDefault();
    }
 }
 keyPress(event: any) {
  debugger
  const pattern = /[0-9]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
 numberOnly(event): boolean { 
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}//type=text
onCheckNegativeValue(order)
{
  if(order && (order.RiskQuantity < 0))
  {
    order.RiskQuantity = 0;
    alert('You cannot enter negative value');
  }
  if(order && (order.RiskPurchasePrice < 0))
  {
    order.RiskPurchasePrice = 0;
    alert('You cannot enter negative value');
  }
  if(order && (order.RiskPurchasePrice > order.MRP))
  {
    order.RiskPurchasePrice = 0;
    alert('You cannot enter RPP more then MRP');
  }
  if( order && (order.LiveLimitQuantity < 0))
  {
    order.LiveLimitQuantity = 0;
    alert('You cannot enter negative value');
  }
  this.onChangeInput(order);
}
  onRowCollapseFun(event)
  {
    // debugger;
    // event.originalEvent.cancelable = true;
    // event.originalEvent.returnValue = true;
    // event.originalEvent.target.hidden = true;
    // originalEvent
  }
  onChangeDiscount(rowData)
  {
    if(rowData.DiscountPercent < 0)
    {
      rowData.DiscountPercent = 0;
      alert('You cannot enter negative value');
    }else{
    // var withouttaxvalue = (parseFloat(rowData.PurchasePrice) / ((100 + parseFloat(rowData.TotalTaxPercentage)) / 100));
    // var withouttax = Math.round(withouttaxvalue);
    // var netDiscountAmountvalue = (withouttax * (rowData.DiscountPercent / 100));
    // var netDiscountAmount = Math.round(netDiscountAmountvalue);
    // rowData.NPP = Math.round((withouttax - netDiscountAmount));// without tax
    var withouttaxvalue :number = (rowData.PurchasePrice / ((100 + rowData.TotalTax) / 100));    
    var  withouttax= withouttaxvalue  ? Number(withouttaxvalue).toFixed(4) : withouttaxvalue;
    var netDiscountAmountvalue :number =  (rowData.DiscountPercent / 100)*  Number(withouttax) ;
    var netDiscountAmount = netDiscountAmountvalue && !isNaN(netDiscountAmountvalue) ? Number(netDiscountAmountvalue).toFixed(4) : netDiscountAmountvalue;
    var totalNetPurchasePrice =  Number(withouttax) -  Number(netDiscountAmount);
    rowData.NPP = totalNetPurchasePrice ? Number(totalNetPurchasePrice).toFixed(4) : totalNetPurchasePrice;
    }
  }
  selectedItemRowData : any;
  selectedItemMRowData : any;
  isHistoryOpen : boolean = false;
  isItemHistoryOpen : boolean = false;
  isRiskQtyHistoryOpen : boolean = false;
  riskHistoryList : any;
  riskTitleData: any;
  onloadRiskQtyHistory(event)
  {
    this.first = 0;
    var Last = event && event.first ? event.first + event.rows : event.rows
    this.pageItem = event && event.rows ? event.rows : 3;
    this.page = event && event.first ? event.first : 0;
    this.onClickRiskQtyHistory(this.selectedMultiMRPData);
  }
  onClickRiskQtyHistory(order)
  {
    debugger;
    this.selectedMultiMRPData = order;   
    this.liveItemPageService.getRiskQuantityHistory(this.liveData.warehouseId.WarehouseId,order.ItemMultiMRPId,this.page,this.pageItem).subscribe(x=>
      {
        // debugger;
        this.riskHistoryList = x;
        if(x.length > 0)
        {
          this.totalItem = x[0].TotalCount;
        }else{
          this.totalItem = 0;
        }
        this.isRiskQtyHistoryOpen = true;
      })
    
  }
  onClickHistory(order)
  {
    this.selectedItemRowData = order;
    this.isHistoryOpen = true;
  }
  onClickItemHistory(order)
  {
    this.selectedItemMRowData = order;
    this.isItemHistoryOpen = true;
  }
  onChangePurchasePrice(rowData,isEditBLE)
  {
    debugger; // PurchasePrice
    if(rowData.Margin >= 0)//&& rowData.ActualUnitPrice <= rowData.MRP
    {
      if(rowData.EnableAutoPrice)
      {
        // if(rowData.Margin >= rowData.RetailerRMargin)
        // {
          var margin = rowData.Margin / 100;
          var totalMargin = rowData.PurchasePrice * margin;
          rowData.UnitPrice = rowData.PurchasePrice + totalMargin;
          if(isEditBLE)
          {
          if(rowData.UnitPrice <= rowData.MRP)
          {
            return parseFloat(Number(rowData.UnitPrice).toFixed(4));
          }else{
            rowData.Margin = 0;
            alert('New Retailer Unit Price is ' + parseFloat(Number(rowData.UnitPrice).toFixed(4)) + ' .New Retailer Unit Price should be less then or equal to MRP.Please Change Margin!!!')
            var margin = rowData.Margin / 100;
            var totalMargin = rowData.PurchasePrice * margin;
            rowData.UnitPrice = rowData.PurchasePrice + totalMargin;
            // rowData.Margin = 0;
            // rowData.UnitPrice = 0;
            return false; 
          }
        }else{
          return parseFloat(Number(rowData.UnitPrice).toFixed(4));
        }
        // }
      }else{
        var margin = rowData.Margin / 100;
        var totalMargin = rowData.PurchasePrice * margin;
        rowData.UnitPrice = rowData.PurchasePrice + totalMargin;
        if(isEditBLE)
        {
        if(rowData.UnitPrice <= rowData.MRP)
          {
            return parseFloat(Number(rowData.UnitPrice).toFixed(4));
          }else{
            rowData.Margin = 0;
            alert('New Retailer Unit Price is ' + parseFloat(Number(rowData.UnitPrice).toFixed(4)) + ' .New Retailer Unit Price should be less then or equal to MRP.Please Change Margin!!!')
            var margin = rowData.Margin / 100;
            var totalMargin = rowData.PurchasePrice * margin;
            rowData.UnitPrice = rowData.PurchasePrice + totalMargin;
            return false; 
          }
        }else{
          return parseFloat(Number(rowData.UnitPrice).toFixed(4));
        }
        // return parseFloat(Number(rowData.UnitPrice).toFixed(3));
      }
      
    }else{
      rowData.Margin = 0;
      // alert('New Retailer Unit Price is ' + parseFloat(Number(rowData.UnitPrice).toFixed(4)) + ' .New Retailer Unit Price should be less then or equal to MRP.Please Change Margin!!!')
      return 0;
    }
    
  }
  onChangeDistributionPrice(rowData,isEditable)
  {
    // PurchasePrice
    debugger;
    if(rowData.WholesaleMargin >= 0)
    {
      if(rowData.EnableAutoPrice)
      {
        // if(rowData.WholesaleMargin >= rowData.WholesaleRMargin)
        // {
          var margin = rowData.WholesaleMargin / 100;
          var totalMargin = rowData.PurchasePrice * margin;
          rowData.WholsellerUnitPrice = rowData.PurchasePrice + totalMargin;
          if(isEditable)
          {
          if(rowData.WholsellerUnitPrice <= rowData.MRP)
          {
            return parseFloat(Number(rowData.WholsellerUnitPrice).toFixed(4));
          }else{
            rowData.WholesaleMargin = 0;
            alert('New Wholesale Unit Price is ' + parseFloat(Number(rowData.WholsellerUnitPrice).toFixed(4)) + ' .New Wholesale Unit Price should be less then or equal to MRP.Please Change Wholesale Margin!!!')
              var margin = rowData.WholesaleMargin / 100;
              var totalMargin = rowData.PurchasePrice * margin;
              rowData.WholsellerUnitPrice = rowData.PurchasePrice + totalMargin;
            // rowData.WholsellerUnitPrice = 0;
            return false; 
          }
        }else{
          return parseFloat(Number(rowData.WholsellerUnitPrice).toFixed(4));
        }
        // }
      }else{
        var margin = rowData.WholesaleMargin / 100;
        var totalMargin = rowData.PurchasePrice * margin;
        rowData.WholsellerUnitPrice = rowData.PurchasePrice + totalMargin;
        if(isEditable)
        {
        if(rowData.WholsellerUnitPrice <= rowData.MRP)
        {
          return parseFloat(Number(rowData.WholsellerUnitPrice).toFixed(4));
        }else{
          rowData.WholesaleMargin = 0;
          alert('New Wholesale Unit Price is ' + parseFloat(Number(rowData.WholsellerUnitPrice).toFixed(4)) + ' .New Wholesale Unit Price should be less then or equal to MRP.Please Change Wholesale Margin!!!')
          var margin = rowData.WholesaleMargin / 100;
          var totalMargin = rowData.PurchasePrice * margin;
          rowData.WholsellerUnitPrice = rowData.PurchasePrice + totalMargin;
          // rowData.WholsellerUnitPrice = 0;
          return false; 
        }
      }else{
        return parseFloat(Number(rowData.WholsellerUnitPrice).toFixed(4));
      }
      }
    }
  }
  onCopyRetailerValueToAll(rowData)
  {
    debugger;
    if(!rowData.isCopy || rowData.isCopy == undefined)
    {
      rowData.isCopy = true;
      if(rowData.Margin > 0 && rowData.ActualUnitPrice < rowData.MRP)
      {
        rowData.WholesaleMargin = rowData.Margin;
        rowData.TradeMargin = rowData.Margin;
        rowData.DistributionPrice = rowData.ActualUnitPrice;
        rowData.TradePrice = rowData.ActualUnitPrice;
        rowData.WholsellerUnitPrice = rowData.UnitPrice;
        rowData.TradeUnitPrice = rowData.UnitPrice;
      }
    }else{
      rowData.WholesaleMargin = 0;
      rowData.TradeMargin = 0;
      rowData.DistributionPrice = 0;
      rowData.TradePrice = 0;
      rowData.WholsellerUnitPrice = 0;
      rowData.TradeUnitPrice = 0;
    }
  }
  onChangeTradePrice(rowData,isEditable)
  {
    // PurchasePrice
    debugger;
    if(rowData.TradeMargin >= 0)
    {
      if(rowData.EnableAutoPrice)
      {
        // if(rowData.TradeMargin >= rowData.TradeRMargin)
        // {
          var margin = rowData.TradeMargin / 100;
          var totalMargin = rowData.PurchasePrice * margin;
          rowData.TradeUnitPrice = rowData.PurchasePrice + totalMargin;
          if(isEditable)
          {
          if(rowData.TradeUnitPrice <= rowData.MRP)
          {
            return parseFloat(Number(rowData.TradeUnitPrice).toFixed(4));
          }else{
            rowData.TradeMargin = 0;
            alert('New Trade Unit Price is ' + parseFloat(Number(rowData.TradeUnitPrice).toFixed(4)) + ' .New Trade Unit Price should be less then or equal to MRP.Please Change Trade Margin!!!')
            var margin = rowData.TradeMargin / 100;
            var totalMargin = rowData.PurchasePrice * margin;
            rowData.TradeUnitPrice = rowData.PurchasePrice + totalMargin;
            // rowData.TradeUnitPrice = 0;
            return false; 
          }
        }else{
          return parseFloat(Number(rowData.TradeUnitPrice).toFixed(4));
        }
        // }else{
        //   alert('You Cannot Enter Margin Less Then TradeMinMargin!!');
        // }
      }else{
        var margin = rowData.TradeMargin / 100;
        var totalMargin = rowData.PurchasePrice * margin;
        rowData.TradeUnitPrice = rowData.PurchasePrice + totalMargin;
        if(isEditable)
        {
        if(rowData.TradeUnitPrice <= rowData.MRP)
        {
          return parseFloat(Number(rowData.TradeUnitPrice).toFixed(4));
        }else{          
          rowData.TradeMargin = 0;
          alert('New Trade Unit Price is ' + parseFloat(Number(rowData.TradeUnitPrice).toFixed(4)) + ' .New Trade Unit Price should be less then or equal to MRP.Please Change Trade Margin!!!')
          var margin = rowData.TradeMargin / 100;
          var totalMargin = rowData.PurchasePrice * margin;
          rowData.TradeUnitPrice = rowData.PurchasePrice + totalMargin;
          // rowData.TradeUnitPrice = 0;
          return false; 
        }
      }else{
        return parseFloat(Number(rowData.TradeUnitPrice).toFixed(4));
      }
      }
    }
   
  }
  onLive(rowData)
  {
    debugger;
    // if(!rowData.Active)
    // {
      if(this.selectedMarginList.length > 0)
      {
        let newRow = this.selectedMarginList.filter(x => { return x.ItemId == rowData.ItemId })[0];
        if(newRow == undefined)
        {
          this.selectedMarginList.push(rowData);
        }else{
        let index = this.selectedMarginList.indexOf(newRow);
        this.selectedMarginList[index].Active = !rowData.Active;        
        }
      }else{
        this.selectedMarginList.push(rowData);
      }
      
    // }else{
    //   let newRow = this.selectedMarginList.filter(x => { return x.ItemId == rowData.ItemId })[0];
    //   let index = this.selectedMarginList.indexOf(newRow);
    //   this.selectedMarginList.splice(index, 1);
    // }
    
  }
  public inputValidator(event: any) {
    // debugger;
      if((event.target.value as string).indexOf(' ') >= 0){  
        // this.liveData.Keyword = null;  
        if(!event.target.value) return event.target.value;
        // ^[^\s].+[^\s]$  --This RegEx will allow neither white-space at the beginning nor at the end of your string/word.
        // (/^\s+/g, '')  --This RegEx will not allow white-space at the beginning of your string/word.
        this.liveData.Keyword = event.target.value.replace(/^\s+/g, '');
        return {cannotContainSpace: true}  
    }  
  }

  keyPressAmount(event: any) {
    // After Decimal Allow only 2 digit

    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  // onPriceChange()
  // {
  //   this.IsButtonClick = true;
  //   this.priceChange();
  // }
  // onLoad(event)
  // {
  //   this.first = 0;
  //   this.liveItemList = [];
  //   this.Skip = event.first;
  //   this.Take = event.rows;
  //   this.priceChange();
  // } 

  // priceChange()
  // {
  //   if(((this.liveData.warehouseId && this.liveData.warehouseId.WarehouseId > 0) && ((this.liveData.BrandId && this.liveData.BrandId.BrandId) > 0)) || (this.liveData.warehouseId && this.liveData.warehouseId.WarehouseId > 0) && this.liveData.Keyword != null)
  //   {
  //     this.blocked = true;
  //     var brandId = this.liveData.BrandId ? Number.parseInt(this.liveData.BrandId.BrandId) : 0;
  //     var WarehouseId = Number.parseInt(this.liveData.warehouseId.WarehouseId);

  //     this.liveItemPageService.getPriceChange(WarehouseId,brandId,this.Skip,this.Take).subscribe(x=>
  //       {
          
  //         if(x.length > 0)
  //         {
  //           this.isPriceChange = true;
  //           this.ItemASPList = x;
  //           this.TotalCount = x && x[0].TotalCount;
  //           this.blocked = false;
  //         }else{
  //           alert('Data Not Found!!');
  //           this.blocked = false;
  //         }
  //         console.log('ItemASPList',this.ItemASPList);
          
  //       })
  //   }else{
  //     if(this.liveData.warehouseId == null && this.IsButtonClick)
  //     {
  //       this.messageService.add({ severity: 'error', summary: 'Please Select Warehouse!', detail: '' });
  //     }else if(this.IsButtonClick){
  //       this.messageService.add({ severity: 'error', summary: 'Please Select Brand!', detail: '' });
  //     }
  //   }
  // }
  // onExport()
  // {
  //   var BrandName = this.liveData.BrandId ? this.liveData.BrandId.BrandName : '';
  //   var brandId = this.liveData.BrandId ? Number.parseInt(this.liveData.BrandId.BrandId) : 0;
  //   var WarehouseId = Number.parseInt(this.liveData.warehouseId.WarehouseId);
  //   this.liveItemPageService.getPriceChange(WarehouseId,brandId,0,this.TotalCount).subscribe((x:any)=>
  //     {
  //       let  result = x.map(function(a){
  //         return{
  //           "WarehouseName": a.Warehouse,
  //           "BrandName" : BrandName,
  //           "ItemName": a.ItemName,
  //           "ItemMRP":a.ItemMRP,
  //           "ASP": a.ASP,
  //           "UnitPrice" : a.UnitPrice,
  //           "TradePrice" : a.TradePrice,       
  //           "WholesalePrice" : a.WholesalePrice
  //         }
  //       })
  //       console.log('Export',result);
  //       this.exportService.exportAsExcelFile(result, 'ExportUnitPriceChange');
  //     })
    
  // }
  // close()
  // {
  //   this.isPriceChange = false;
  // }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from 'app/shared/services/item.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { CategoryService } from 'app/shared/services/category.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { TaxGroupService } from 'app/shared/services/tax-group.service';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { PeopleService } from 'app/shared/services/people.service';
// import { CentalItem } from 'app/shared/interface/central-item';
import { startWith, flatMap } from 'rxjs/operators';
import { FORMERR } from 'dns';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { element } from 'protractor';
import { event } from 'jquery';
declare var $: any;

@Component({
  selector: 'app-itemForm',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})


export class ItemFormComponent {
  finalitem: any;
  @Input() itemDetails: any;
  buyerList: any
  @Input() isWarehouse: any;
  @Input() disabledEdit: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  closeResult: string;
  newItem: any;
  itemCategoryList: any[];
  newSupplier: any;
  item: any;
  groupedItemList: any;
  groupedItemList1: any;
  selectedItem: any;
  grouparray: any[];
  isSelected: any;
  isselect: any;
  categoryList: any;
  subCategoryList: any;
  subSubCategoryList: any;
  taxGroupList: any;
  ItemMasterCentral: any;
  SKUMutiHide: any;
  supplierList: any;
  depotList: any;
  ItemPriceData: any;
  ItemPriceDatatemp: any
  filterData: any;
  blocked: boolean;
  isInvalid: any;
  SubCategoryMappingId: any;
  isMaterial: boolean = false;
  BagList: any;
  GRIRUom1: boolean = false;
  GRIRUom2: boolean = false;
  Inventory1: boolean = false;
  Inventory2: boolean = false;
  materialData: any;
  localItemBaseName: any;
  pouomdis: boolean;
  POUom1: boolean;
  POUom2: boolean;
  IssueDispatchUom1: boolean;
  IssueDispatchUom2: boolean;
  paramName: any;
  paramName1: any;
  paramName2: any;
  paramName3: any;
  paramName4: any;
  displayBasic: boolean;
  IsRunBothMRP: boolean;
  sellerStoreShowStatus:boolean;
  companyCode:any=null
  companyStockCode:any=null
  IsBrandConfig:boolean=false;
  allSeasonConfig:any
  seasonid:any
  countid:number=0
  constructor(private packingmaterialService: PackingMaterialService, private itemService: ItemService, private subcategory: SubCategoryService, private category: CategoryService, private supplier: SupplierService,
    private taxgroup: TaxGroupService, private subsubcategory: SubSubCategoryService, private pepolePilotService: PeopleService, private modalService: NgbModal, private router: Router, private messageService: MessageService ,private ActiveRoute: ActivatedRoute) {
    this.newItem = {};
    this.item = {CompanyCode:'',CompanyStockCode:''};
    this.isSelected = false;
    this.isselect = false;
    this.SKUMutiHide = [];
    this.materialData = {};
  }
  display: boolean = false;
  isReplaced : boolean = false;

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

OldItemMultiMRPId:any
isDisable:boolean=false;
  ngOnInit() {
    this.GetAllSeasonConfig()
    this.companyCode = this.ActiveRoute.snapshot.paramMap.get('companyCode');
    this.companyStockCode = this.ActiveRoute.snapshot.paramMap.get('comapanyStockCode');
    this.item.CompanyCode=this.companyCode
    console.log('Dataq====',this.item,this.companyCode,this.companyStockCode);
    this.item.CompanyStockCode=this.companyStockCode
    this.isInvalid = false;
    this.materialData = {};
    debugger;
    // console.log("itemDetails" + this.itemDetails)
    // console.log("SubsubCategoryid" , this.itemDetails.SubsubCategoryid);
    // console.log("Categoryid" , this.itemDetails.Categoryid);
    if (this.itemDetails) {
      this.sellerStoreShowStatus = true;
      this.item = this.itemDetails;
      console.log(this.item);
      console.log(this.companyCode);
      //this.OldItemMultiMRPId=this.item.ItemMultiMRPId
      // this.item.CompanyCode=this.companyCode
      //this.item.CompanyStockCode=this.companyStockCode
      this.selectedItem = this.item.itemBaseName;
      this.category.GetAllCategory().subscribe(result => {
        this.categoryList = result;
      })
      this.onCategoryChange(this.item.Categoryid);
      
      if (this.isWarehouse) {
        this.item.SupplierId = this.item.SupplierId == 0 ? '' : this.item.SupplierId
        this.getDepotDetails(this.item.SupplierId);
        this.getMultiMRP(this.item.Number);
        this.blocked = true;
        this.itemService.GetBuyer().subscribe(result => {
          this.blocked = false;
          this.buyerList = result;
        })
      }
      if (this.item.Type == 2 || this.item.Type == 4) {
        this.blocked = true;
        this.packingmaterialService.GetMaterialMaster(this.item.Number).subscribe(result => {
          this.blocked = false;
          this.materialData = result;
        
          this.materialData && this.materialData.POUom1 && this.materialData.POUom1 != null ? (this.POUom1 = true, this.paramName1 = this.materialData.POUom1) : this.POUom1 = false;
          this.materialData && this.materialData.POUom2 && this.materialData.POUom2 != null ? (this.POUom2 = true, this.paramName1 = this.materialData.POUom2) : this.POUom2 = false;
          this.materialData && this.materialData.GRIRUom1 && this.materialData.GRIRUom1 != null ? (this.GRIRUom1 = true, this.paramName2 = this.materialData.GRIRUom1) : this.GRIRUom1 = false;
          this.materialData && this.materialData.GRIRUom2 && this.materialData.GRIRUom2 != null ? (this.GRIRUom2 = true, this.paramName2 = this.materialData.GRIRUom2) : this.GRIRUom2 = false;
          this.materialData && this.materialData.Inventory1 && this.materialData.Inventory1 != null ? (this.Inventory1 = true, this.paramName3 = this.materialData.Inventory1) : this.Inventory1 = false;
          this.materialData && this.materialData.Inventory2 && this.materialData.Inventory2 != null ? (this.Inventory2 = true, this.paramName3 = this.materialData.Inventory2) : this.Inventory2 = false;
          this.materialData && this.materialData.IssueDispatchUom1 && this.materialData.IssueDispatchUom1 != null ? (this.IssueDispatchUom1 = true, this.paramName4 = this.materialData.IssueDispatchUom1) : this.IssueDispatchUom1 = false;
          this.materialData && this.materialData.IssueDispatchUom2 && this.materialData.IssueDispatchUom2 != null ? (this.IssueDispatchUom2 = true, this.paramName4 = this.materialData.IssueDispatchUom2) : this.IssueDispatchUom2 = false;
        



          //this.POUom1 = true;
        })
      }

    }else{
      this.item = {}
      this.item.CompanyCode=this.companyCode
      this.item.CompanyStockCode=this.companyStockCode
      this.sellerStoreShowStatus = false;
    }

    if (!this.isWarehouse && !this.itemDetails) {
      // this.blocked = true;
      // this.itemService.GetCentral().subscribe(result => {

      //   this.grouparray = [];
      //   // this.groupedItemList = result.ItemMasterCentralGroupByNumber;
      //   // this.groupedItemList.forEach(element => {
      //   //   element.itemBaseName = element.itemBaseName + ":  (" + element.itemname + ")";

      //   // });
      //   this.ItemMasterCentral = result.ItemMasterCentral;
      //   this.blocked = false;;

      // })
    }
    this.supplier.getSupplierList().subscribe(result => {
    this.category.GetAllCategory().subscribe(result => {

      this.categoryList = result;
    })

    this.packingmaterialService.GetOuterBagDetails().subscribe(result => {

      this.BagList = result;
      console.log(this.BagList);
    })

    // this.subsubcategory.GetAllSubSubCategory().subscribe(result => {
    //   this.subSubCategoryList = result;
    // })
    // this.subcategory.GetAllSubCategory().subscribe(result => {
    //   this.subCategoryList = result
    // })
    this.taxgroup.GetAllTaxGroup().subscribe(result => {
      this.taxGroupList = result;
    })
   
      this.supplierList = result;
    })
    
    this.GetCatBrandConfig(this.item.Categoryid,this.item.SubsubCategoryid);
    this.isDisable=this.itemDetails!=undefined  ? true :false;
  }

  GetCatBrandConfig(catid,brandid)
  {
    this.itemService.GetCatBrandConfig(catid,brandid).subscribe((result:any) => {
      if(result != null && result.Status)
          this.IsBrandConfig = true;
      else
          this.IsBrandConfig = false;
    })
    console.log(this.IsBrandConfig);
    
  }

  getDepotDetails(id) {
    this.blocked = true;
    this.supplier.getDepot(id).subscribe(result => {
      this.blocked = false;
      this.depotList = result;
    })
  }

  getMultiMRP(itemNumber) {
    this.blocked = true;
    this.itemService.getMultiMRP(itemNumber).subscribe(result => {
      this.blocked = false;
      this.ItemPriceData = result;
      this.ItemPriceDatatemp = result;
    })
  }
  onMRPChange(data) {
    
    this.blocked = true;
    this.ItemPriceDatatemp = [];
    var id = parseInt(data.ItemMultiMRPId);
    this.filterData = this.ItemPriceData.filter(x => x.ItemMultiMRPId === id)
    this.ItemPriceDatatemp = this.filterData;
    data.price = this.filterData[0].MRP;
    this.item.itemname = '';
    this.item.SellingUnitName = '';
    this.item.CompanyCode=this.companyCode
    this.item.CompanyStockCode=this.companyStockCode
    // alert("Please Change Purchase Price and Unit Price!!");
    if (data.itemBaseName == undefined) {
      data.itemBaseName = '';
    }
    if (data.price == undefined) { data.price = ''; }
    if (data.UnitofQuantity == undefined) { data.UnitofQuantity = ''; }
    if (data.UOM == undefined) { data.UOM = ''; }
    //$scope.itemMasterData.itemname = data.itemBaseName + " " + $scope.filterData[0].MRP + " MRP " + $scope.filterData[0].UnitofQuantity + " " + $scope.filterData[0].UOM;

    // by anushka(29/04/2019)
    // if (data.IsSensitive == 'true') {
    //   this.item.itemname = data.itemBaseName + " " + this.filterData[0].MRP + " MRP " + this.filterData[0].UnitofQuantity + " " + this.filterData[0].UOM;

    // }
    // else {
    //   this.item.itemname = data.itemBaseName + " " + this.filterData[0].MRP + " MRP ";
    // }
    if ((data.IsSensitive == true || data.IsSensitive == "true") && (data.IsSensitiveMRP == false || data.IsSensitiveMRP == "false" || data.IsSensitiveMRP == undefined)) {
      this.item.itemname = data.itemBaseName + " " + data.UnitofQuantity + " " + data.UOM;
    }
    else if ((data.IsSensitiveMRP == 'true' || data.IsSensitiveMRP == true) && (data.IsSensitive == false || data.IsSensitive == "false" || data.IsSensitive == undefined)) {
      this.item.itemname = data.itemBaseName + " " + data.price + " MRP ";
      // this.item.itemname = data.itemBaseName + " " + data.price + " MRP " + data.UnitofQuantity + " " + data.UOM;
    }
    else if ((data.IsSensitive == true || data.IsSensitive === "true") && (data.IsSensitiveMRP == "true" || data.IsSensitiveMRP == true)) {
      this.item.itemname = data.itemBaseName + " " + data.price + " MRP " + data.UnitofQuantity + " " + data.UOM;
    }
    //item purchase name
    if (data.PurchaseMinOrderQty > 0) {


      this.item.UnitofQuantity = this.filterData[0].UnitofQuantity;
      this.item.PurchaseUnitName = this.item.itemname + " " + data.PurchaseMinOrderQty + "Unit";
    }
    //item selling unit name
    if (data.MinOrderQty > 0) {

      this.item.UOM = this.filterData[0].UOM;
      this.item.SellingUnitName = this.item.itemname + " " + data.MinOrderQty + "Unit";
    }
    this.blocked = false;
    //show dialog for  Run Multiple MRP Item
    
    if (data.WarehouseId > 0) {
      
      this.displayBasic = true;

    }

  }
  RunBothMRP(yes) {
    //debugger;
    if (yes) {
      this.item.IsRunBothMRP = true;
    }
    else {
      this.item.IsRunBothMRP = false;
    }
    this.displayBasic = false;
    this.item.IsReplaceable=false;
  }
  purchaseUnitname(data) {
    if (data.PurchaseMinOrderQty > 0) {
      this.item.PurchaseUnitName = this.item.itemname + " " + data.PurchaseMinOrderQty + "Unit";
    }
  }
  getCentralItems(e) {

    debugger
    this.blocked = true;
    this.itemService.searchCentralItem(e.query).subscribe((result :any) => {
      this.blocked = false;
      this.groupedItemList1 = result;
      this.groupedItemList1.forEach(element => {

        element.localItemBaseName = element.itemBaseName;
        element.itemBaseName = element.itemBaseName + " " + element.MRP + " MRP " + element.UnitofQuantity + " " + element.UOM;
      });

      console.log(this.groupedItemList1)
    })
    // this.groupedItemList1 = this.groupedItemList.filter(x => x.itemBaseName.toLowerCase().startsWith(e.query));


  }
  onSelect() {

    console.log("selected");
    this.isSelected = true;

    // this.isselect = true;
    this.item = this.selectedItem;

    for (var i in this.groupedItemList1) {
      if (this.groupedItemList1[i].Number == this.selectedItem.Number) {
        this.item.itemsBaseName = this.groupedItemList1[i].itemBaseName;
        //this.item.itemBaseName = this.ItemMasterCentral[i].itemBaseName;

        this.SKUMutiHide.push(this.groupedItemList1[i].SellingSku);
        
        this.isDisable=this.groupedItemList1[i].ClearanceFrom>0 ? true :false;
      }

    }
    this.item.SellingSku = '';

    this.onCategoryChange(this.item.Categoryid);
    console.log(this.item)
  }

  // onSelect() {
  //   
  //   console.log("selected");
  //   this.isSelected = true;

  //   // this.isselect = true;
  //   this.item = this.selectedItem;
  //   
  //   for (var i in this.ItemMasterCentral) {
  //     if (this.ItemMasterCentral[i].Number == this.selectedItem.Number) {
  //        this.item.itemBaseName = this.ItemMasterCentral[i].itemBaseName;
  //       //this.item.itemBaseName = this.ItemMasterCentral[i].itemBaseName;
  //       
  //       this.SKUMutiHide.push(this.ItemMasterCentral[i].SellingSku);
  //     }

  //   }
  //   this.item.SellingSku = ''
  //   
  //   this.onCategoryChange(this.item.Categoryid);
  //   console.log(this.item)
  // }
  onmodelChange(s) {
    console.log("ss" + s);
    if (this.isSelected == false) {
      console.log("unselected")
      this.item.itemBaseName = s;
    }
  }
  onSubCategoryChange(subCategoryid) {

    var a = this.subCategoryList.find(x => x.SubCategoryId == subCategoryid)
    console.log(a);
    this.subsubcategory.GetSubSubCategoryBySubCategoryId(a.SubCategoryMappingId).subscribe(result => {
      this.subSubCategoryList = result;
      //this.subSubCategoryList = subSubCategoryList.filter(x => x.SubCategoryId == subCategoryid);
    })
    // this.subsubcategory.GetAllSubSubCategory().subscribe(result => {
    //   var subSubCategoryList = result;
    //   this.subSubCategoryList = subSubCategoryList.filter(x => x.SubCategoryId == subCategoryid);
    // })

  }
  onCategoryChange(Categoryid) {
    this.blocked = true;
    this.subcategory.GetSubCategoryByCategoryId(Categoryid).subscribe(result => {
      this.blocked = false;
      this.subCategoryList = result;
      console.log(this.subCategoryList,"subCategoryList");
      this.countid += 1;
      if(this.countid >1 ){
        this.GetseasonCatId(Categoryid);
      }
      if(this.itemDetails == undefined){
        this.GetseasonCatId(Categoryid);
      }
      this.onSubCategoryChange(this.item.SubCategoryId);
    })

  }

  
  GetAllSeasonConfig()
  {
    this.blocked=true;
    this.subcategory.GetAllSeasonConfig().subscribe(result=>
      {
        if(result.length>0)
        {
          this.allSeasonConfig=result
          console.log(result,"GetAllSeasonConfig");
          this.blocked=false;
        }else
        {
          this.allSeasonConfig=undefined;
          this.blocked=false;
        }
      })
  }

  GetseasonCatId(Categoryid)
  {
    this.blocked=true;
    this.subcategory.GetSeasonIdByCatId(Categoryid).subscribe(result=>
      {
        this.blocked=false;
        this.seasonid = result;
        this.item.SeasonId=result
      })
  }

  itemname(itemData) {
    //   
    //   if (itemData.IsSensitiveMRP == "true")
    //   {
    //   alert("Please transfer item into single MRP");
    // }
   
    this.item.itemname = '';
    this.item.SellingUnitName = '';
    if (itemData.itemBaseName == undefined) {
      itemData.itemBaseName = '';
    }
    if (itemData.price == undefined) { itemData.price = ''; }
    if (itemData.UnitofQuantity == undefined) { itemData.UnitofQuantity = ''; }
    if (itemData.UOM == undefined) { itemData.UOM = ''; }
    // this.item.itemname = data.itemBaseName + " " + data.price + " MRP " + data.UnitofQuantity + " " + data.UOM;
    //Anu(29/04/2019)
    if ((itemData.IsSensitive == true || itemData.IsSensitive == "true") && (itemData.IsSensitiveMRP == false || itemData.IsSensitiveMRP == "false" || itemData.IsSensitiveMRP == undefined)) {
      this.item.itemname = itemData.itemBaseName + " " + itemData.UnitofQuantity + " " + itemData.UOM;
    }
    else if ((itemData.IsSensitiveMRP == 'true' || itemData.IsSensitiveMRP == true) && (itemData.IsSensitive == false || itemData.IsSensitive == "false" || itemData.IsSensitive == undefined)) {
      this.item.itemname = itemData.itemBaseName + " " + itemData.price + " MRP ";
      // this.item.itemname = itemData.itemBaseName + " " + itemData.price + " MRP " + itemData.UnitofQuantity + " " + itemData.UOM;
    }
    else if ((itemData.IsSensitive == true || itemData.IsSensitive === "true") && (itemData.IsSensitiveMRP == "true" || itemData.IsSensitiveMRP == true)) {
      this.item.itemname = itemData.itemBaseName + " " + itemData.price + " MRP " + itemData.UnitofQuantity + " " + itemData.UOM;
    }
    this.item.SellingUnitName = this.item.itemname;
    this.item.PurchaseUnitName = this.item.itemname;
  }
  getItemCode(itemData) {

    if (!this.itemDetails && this.item.SubsubCategoryid != "") {
      this.itemService.generatItemeCode().subscribe(result => {

        var catCode = "";
        var brandCode = "";
        this.item.itemcode = parseInt(result);
        this.isSelected = true;
        for (var i in this.categoryList) {
          if (this.categoryList[i].Categoryid == itemData.Categoryid) {
            catCode = this.categoryList[i].Code;
          }
        }
        for (var j in this.subSubCategoryList) {
          if (this.subSubCategoryList[j].SubsubCategoryid == itemData.SubsubCategoryid) {
            brandCode = this.subSubCategoryList[j].Code;
          }
        }
        if (catCode != "" && brandCode != "") {

          this.item.Number = catCode + brandCode + this.item.itemcode;
          this.item.PurchaseSku = this.item.Number + "P";

        } else {
          alert('category code can not be null')
          this.messageService.add({ severity: 'error', summary: "category code can not be null", detail: '' });

        }

      })
    } else {
      // alert('SubsubCategory code can not be null')
      this.messageService.add({ severity: 'error', summary: "SubsubCategory code can not be null", detail: '' });
    }

  }
  SellingUnitname(data) {

    if (data.MinOrderQty > 0) {
      this.item.SellingUnitName = this.item.itemname + " " + data.MinOrderQty + "Unit";
    }

  };
  onclick(f) {
    this.CLNSValidation();
    if((this.IsValidationSuccess == true && this.itemDetails== undefined ) || this.itemDetails!= null)
    {
      if(f.form.value.weight==null && f.form.value.weight==undefined){
        this.isInvalid=true;
        return;
      }
      if (f.form.status == "VALID") {
        if ((!this.item.IsSensitive || this.item.IsSensitive == 'false') && (!this.item.IsSensitiveMRP || this.item.IsSensitiveMRP == 'false')) {
          this.messageService.add({ severity: 'error', summary: "Please Select IsSensitive Or IsSensitiveMRP First", detail: '' });
        } else {
          if (this.item.localItemBaseName != null) {
            this.item.itemBaseName = this.item.localItemBaseName;
          }
         // debugger;
          // if(this.isReplaced)
          // {
            if (this.itemDetails != null) {
              //put
              this.blocked = true;

              // condition for materials


              

              this.itemService.PutCentralItem(this.item).subscribe(result => {
                this.blocked = false;
                this.messageService.add({ severity: 'success', summary: "Update Successfully", detail: '' });
                this.refreshParent.emit();

              }, (err) => {
                this.blocked = false;
                this.messageService.add({ severity: 'error', summary: "somthing went wrong", detail: '' });
              })

              //   } else {
              //     //post
              //     this.blocked = true;
              //     this.itemService.PostItem(this.item).subscribe(result => {
              //       console.log(result);
              //       this.blocked = false;;
              //       this.messageService.add({ severity: 'success', summary: "Added Successfully", detail: '' });
              //       this.router.navigateByUrl('layout/item/item-master')
              //     }, (err) => {
              //       this.blocked = false;
              //       this.messageService.add({ severity: 'error', summary: "somthing went wrong", detail: '' });
              //     })
              //   }
              // }
            } else {
              this.blocked = true;
              console.log(this.item);

              if (this.item.Type == 2 || this.item.Type == 4) {
                this.materialData.ItemMasterCentral = this.item;
                this.materialData.Brand = this.item.SubCategoryId;
                this.materialData.UnitOfMeasurement = this.item.UOM;

                //  this.materialData.FromConversion = this.item.UOM;
                // this.itemService.PostItem(this.item).subscribe(result => {


                this.POUom1 && this.POUom1 == true ? this.materialData.POUom1 = this.materialData.FromConversion : this.materialData.POUom1 = null;
                this.POUom2 && this.POUom2 == true ? this.materialData.POUom2 = this.materialData.ToConversion : this.materialData.POUom2 = null;
                this.GRIRUom1 && this.GRIRUom1 == true ? this.materialData.GRIRUom1 = this.materialData.FromConversion : this.materialData.GRIRUom1 = null;
                this.GRIRUom2 && this.GRIRUom2 == true ? this.materialData.GRIRUom2 = this.materialData.ToConversion : this.materialData.GRIRUom2 = null;
                this.Inventory1 && this.Inventory1 == true ? this.materialData.Inventory1 = this.materialData.FromConversion : this.materialData.Inventory1 = null;
                this.Inventory2 && this.Inventory2 == true ? this.materialData.Inventory2 = this.materialData.ToConversion : this.materialData.Inventory2 = null;
                this.IssueDispatchUom1 && this.IssueDispatchUom1 == true ? this.materialData.IssueDispatchUom1 = this.materialData.FromConversion : this.materialData.IssueDispatchUom1 = null;
                this.IssueDispatchUom2 && this.IssueDispatchUom2 == true ? this.materialData.IssueDispatchUom2 = this.materialData.ToConversion : this.materialData.IssueDispatchUom2 = null;

                this.packingmaterialService.AddMaterialItem(this.materialData).subscribe(result => {
                  console.log(result);
                  this.blocked = false;
                  this.messageService.add({ severity: 'success', summary: "Added Successfully", detail: '' });
                  this.router.navigateByUrl('layout/item/item-master')
                }, (err) => {
                  this.blocked = false;
                  this.messageService.add({ severity: 'error', summary: "somthing went wrong", detail: '' });
                })
              } else {
                this.itemService.PostItem(this.item).subscribe(result => {
                  console.log(result);
                  this.blocked = false;;
                  this.messageService.add({ severity: 'success', summary: "Added Successfully", detail: '' });
                  this.router.navigateByUrl('layout/item/item-master')
                }, (err) => {
                  this.blocked = false;
                  this.messageService.add({ severity: 'error', summary: "somthing went wrong", detail: '' });
                })
              }
              //post


            }
          // }else{
          //   this.messageService.add({ severity: 'error', summary: 'You cannot make IsReplaceable this Item!', detail: '' });  
          // }
        }
      } else {
        //this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'Please Fill Mandatory Fields!', detail: '' });
      }
    }
    // this.materialData.ItemMasterCentral = this.item;
    // this.materialData.Brand = this.item.SubCategoryId;
    // this.packingmaterialService.AddMaterialItem(this.materialData).subscribe(result=>{
    //   
    //   console.log(result);
    // })
  }
  onSave(war) {
   // debugger;
    if(this.item.UnitPrice < 0)
    {
      alert('Unit Price cannot be negative!!');
    }else{
      console.log(this.item);
    //  this.item.OldItemMultiMRPId= this.OldItemMultiMRPId;

    if(!this.item.IsRunBothMRP){
      if (this.item.DistributorShow == true) {
        if (this.item.DistributionPrice == null || this.item.DistributionPrice == 0) {
          this.messageService.add({ severity: 'error', summary: "Please provide distribution Price", detail: '' });
        }
        else {
          if (this.item.PurchasePrice != 0  && this.item.UnitPrice != 0 && this.item.TradePrice!=0 && this.item.WholeSalePrice !=0) {
            if(this.item.PurchasePrice > this.item.price){
              alert("Purchase Price should not be greater then MRP")
               return false
            }
            else{
              if (war.form.status == "VALID") {
                this.blocked = true;

                this.itemService.PutWarehouseItem(this.item).subscribe(result => {
                  
                  this.blocked = false;
                  this.messageService.add({ severity: 'success', summary: "Update Successfully", detail: '' });
                  // this.refreshParent.emit(false);
                  this.isdetailsclose.emit(false);
                  console.log(result);
    
    
                }, (err) => {
                  this.messageService.add({ severity: 'error', summary: "Somthing went wrong!", detail: '' });
                });
    
    
              } else {
                this.messageService.add({ severity: 'error', summary: "Please Fill All Required Fields", detail: '' });
              }
            }
            
          } else {
            //this.messageService.add({ severity: 'error', summary: "PurchasePrice and UnitPrice Not greater than MRP", detail: '' });
            this.messageService.add({ severity: 'error', summary: "PurchasePrice, UnitPrice, TradePrice and WholeSalePrice Not to be zero", detail: '' });
  
          }
        }
  
      }
      else {
        if (this.item.PurchasePrice != 0 && this.item.UnitPrice != 0  && this.item.TradePrice!=0 && this.item.WholeSalePrice !=0) {
          if(this.item.PurchasePrice > this.item.price){
            alert("Purchase Price should not be greater then MRP")
             return false
          }
          else{
            if (war.form.status == "VALID") {
              this.blocked = true;
    
              this.itemService.PutWarehouseItem(this.item).subscribe(result => {
                
                this.blocked = false;
    
                if (result) {
                  this.messageService.add({ severity: 'success', summary: "Update Successfully", detail: '' });
                  // this.refreshParent.emit(false);
                  this.isdetailsclose.emit(false);
                  console.log(result);
    
                }
                else {
                  this.messageService.add({ severity: 'error', summary: "Somthing went wrong!", detail: '' });
                }
              }, (err) => {
                this.messageService.add({ severity: 'error', summary: "Somthing went wrong!", detail: '' });
              });
    
            } else {
              this.messageService.add({ severity: 'error', summary: "Please Fill All Required Fields", detail: '' });
            }
          }
        } else {
          //this.messageService.add({ severity: 'error', summary: "PurchasePrice and UnitPrice Not greater than MRP", detail: '' });
          this.messageService.add({ severity: 'error', summary: "PurchasePrice, UnitPrice, TradePrice and WholeSalePrice Not to be zero", detail: '' });
        }
      }
    }
    else{
      if (this.item.DistributorShow == true) {
        if (this.item.DistributionPrice == null || this.item.DistributionPrice == 0) {
          this.messageService.add({ severity: 'error', summary: "Please provide distribution Price", detail: '' });
        }
        else {
          if (this.item.PurchasePrice != 0 && this.item.PurchasePrice <= this.item.price && this.item.UnitPrice != 0 && this.item.TradePrice!=0 && this.item.WholeSalePrice !=0
            && this.item.UnitPrice <= this.item.price && this.item.TradePrice <= this.item.price && this.item.WholeSalePrice <= this.item.price) {
            if (war.form.status == "VALID") {
              this.blocked = true;
  
              this.itemService.PutWarehouseItem(this.item).subscribe(result => {
                
                this.blocked = false;
                this.messageService.add({ severity: 'success', summary: "Update Successfully", detail: '' });
                // this.refreshParent.emit(false);
                this.isdetailsclose.emit(false);
                console.log(result);
  
  
              }, (err) => {
                this.messageService.add({ severity: 'error', summary: "Somthing went wrong!", detail: '' });
              });
  
  
            } else {
              this.messageService.add({ severity: 'error', summary: "Please Fill All Required Fields", detail: '' });
            }
          } else {
            //this.messageService.add({ severity: 'error', summary: "PurchasePrice and UnitPrice Not greater than MRP", detail: '' });
            this.messageService.add({ severity: 'error', summary: "PurchasePrice, UnitPrice, TradePrice and WholeSalePrice Not greater than MRP", detail: '' });
  
          }
        }
  
      }
      else {
        if (this.item.PurchasePrice != 0 && this.item.PurchasePrice <= this.item.price && this.item.UnitPrice != 0  && this.item.TradePrice!=0 && this.item.WholeSalePrice !=0
          && this.item.UnitPrice <= this.item.price && this.item.TradePrice <= this.item.price && this.item.WholeSalePrice <= this.item.price) {
          if (war.form.status == "VALID") {
            this.blocked = true;
  
            this.itemService.PutWarehouseItem(this.item).subscribe(result => {
              
              this.blocked = false;
  
              if (result) {
                this.messageService.add({ severity: 'success', summary: "Update Successfully", detail: '' });
                // this.refreshParent.emit(false);
                this.isdetailsclose.emit(false);
                console.log(result);
  
              }
              else {
                this.messageService.add({ severity: 'error', summary: "Somthing went wrong!", detail: '' });
              }
            }, (err) => {
              this.messageService.add({ severity: 'error', summary: "Somthing went wrong!", detail: '' });
            });
  
          } else {
            this.messageService.add({ severity: 'error', summary: "Please Fill All Required Fields", detail: '' });
          }
        } else {
          //this.messageService.add({ severity: 'error', summary: "PurchasePrice and UnitPrice Not greater than MRP", detail: '' });
          this.messageService.add({ severity: 'error', summary: "PurchasePrice, UnitPrice, TradePrice and WholeSalePrice Not greater than MRP", detail: '' });
        }
      }
    }
    
  }
  }


  oncancel() {
    if (this.itemDetails) {
      this.isdetailsclose.emit(false);
    } else {
      this.router.navigateByUrl('layout/item/item-master')
    }

  }
  onAdd() {
    this.isMaterial = true;
    // this.router.navigateByUrl('layout/packing-material/add')
  }


  onPOBoxChange(value, isTrue, name) {

    console.log(this.materialData);
    if (name == "POUom1") {
      if (isTrue) {
        this.materialData.POUom1 = value;
      } else {
        this.materialData.POUom1 = null;
      }
    } else if (name == "POUom2") {
      if (isTrue) {
        this.materialData.POUom2 = value;
      } else {
        this.materialData.POUom2 = null;
      }
    }
    console.log(this.materialData.POUom1)
    console.log(this.materialData.POUom2)

  }

  onGRBoxChange(value, isTrue, name) {

    if (name == "GRIRUom1") {
      if (isTrue) {
        this.materialData.GRIRUom1 = value;
        this.materialData.GRIRUom2 = null;
        this.GRIRUom2 = false;
      } else {
        this.materialData.GRIRUom1 = null;
      }
    }
    else if (name == "GRIRUom2") {
      if (isTrue) {
        this.materialData.GRIRUom2 = value;
        this.materialData.GRIRUom1 = null;
        this.GRIRUom1 = false;
      } else {
        this.materialData.GRIRUom2 = null;
      }
    }

    console.log(this.materialData);
    console.log(this.GRIRUom1)
    console.log(this.GRIRUom2)
  }

  onIssueDispatchBoxChange(value, isTrue, name) {
    if (name == "IssueDispatchUom1") {
      if (isTrue) {
        this.materialData.IssueDispatchUom1 = value;
      } else {
        this.materialData.IssueDispatchUom1 = null;
      }
    } else if (name == "IssueDispatchUom2") {
      if (isTrue) {
        this.materialData.IssueDispatchUom2 = value;
      } else {
        this.materialData.IssueDispatchUom2 = null;
      }
    }
    console.log(this.materialData);
  }


  onInventoryBoxChange(value, isTrue, name) {

    if (name == "Inventory1") {
      if (isTrue) {
        this.materialData.Inventory1 = value;
        this.materialData.Inventory2 = null;
        this.Inventory2 = false;
      } else {
        this.materialData.Inventory1 = null;
      }
    }
    else if (name == "Inventory2") {
      if (isTrue) {
        this.materialData.Inventory2 = value;
        this.materialData.Inventory1 = null;
        this.Inventory1 = false;
      } else {
        this.materialData.Inventory2 = null;
      }
    }

    console.log(this.materialData);
    console.log(this.Inventory1)
    console.log(this.Inventory2)
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
 
    if (!reg.test(input)) {
        event.preventDefault();
    }
 }
 onChangeBarcode(item){  
 // debugger;
  let UpdateItemBarCodeDc = {
    ItemNumber : item.Number,
    EanNumber : item.Barcode
  }
 // debugger;
  item.Barcode = item.Barcode.replace(/\s/g, '');
  if(item.Barcode.length == 13){
    this.isInvalid = false;
    this.blocked = true;
  this.itemService.updateItemBarCode(UpdateItemBarCodeDc).subscribe(x=>{
   // debugger;
    this.blocked = false;
    if(x=='Verified')
    {
      this.messageService.add({ severity: 'success', summary: x, detail: '' });
    }else{
      this.messageService.add({ severity: 'error', summary: x, detail: '' });
      item.Barcode = null;
    }
    
  })
}else{
  this.messageService.add({ severity: 'error', summary: 'Barcode should be atleast 13 digits!!!', detail: '' });     
  this.isInvalid = true;  
}
 }
 checkIsReplaceable(item)
 {
 // debugger;
    if(item.IsReplaceable)
    {
    // this.itemService.checkCatBrandConfig(item.Categoryid,item.SubsubCategoryid).subscribe(x=>
    //   {
    //     debugger;
    //     this.isReplaced = x.Status;
    //     this.messageService.add({ severity: 'error', summary: 'You cannot make IsReplaceable this Item!', detail: '' });  
    //   });
    }else{

    }
 }
 onChangeUnitPrice(UnitPrice)
 {
  if(UnitPrice <= 0)
  {
    alert('Price cannot be negative and zero!!');
  }
 }
 
 IsValidationSuccess : boolean;
 CLNSValidation()
 {
 // debugger
  if(this.itemDetails== undefined ){
    this.IsValidationSuccess = true;
    if(parseInt(this.item.ClearanceFrom) >= parseInt(this.item.ClearanceTo) ){
      alert("ShelfLifeFrom cant be greater than ShelfLifeTo"); 
      this.IsValidationSuccess = false;return false;
    }
    else if( parseInt(this.item.NonsellableFrom)>=parseInt(this.item.NonsellableTo)){
      alert("NonShelfLifeFrom cant be greater than NonShelfLifeTo");
      this.IsValidationSuccess = false;return false;
      }
    else if(parseInt(this.item.ClearanceFrom) >= 100 || parseInt(this.item.NonsellableFrom)>=100 || parseInt(this.item.ClearanceTo)>100 || parseInt(this.item.NonsellableTo)>=100){
      alert("Can't be greater than 100.Check again!")
      this.IsValidationSuccess = false;return false;
    }
    else if(parseInt(this.item.ClearanceFrom)<= parseInt(this.item.NonsellableFrom)){
      alert(" Non shelf life cant be greater than Clearance shelf life")
      this.IsValidationSuccess = false;return false;
    }
    else if(parseInt(this.item.ClearanceFrom) <= parseInt(this.item.NonsellableFrom) || parseInt(this.item.ClearanceTo) <= parseInt(this.item.NonsellableFrom)){
      alert("Non shelf life cant be greater..Check again!")
      this.IsValidationSuccess = false;return false;
    }
    else if(parseInt(this.item.ClearanceFrom) <= parseInt(this.item.NonsellableFrom) || parseInt(this.item.ClearanceFrom) <= parseInt(this.item.NonsellableTo)){
      alert("Can't be greater or equal to clearance shelf life")
      this.IsValidationSuccess = false;return false;
    }

    else if(parseInt(this.item.ClearanceFrom)- parseInt(this.item.NonsellableTo)!=1){
      alert("Inappropriate difference!")
      this.IsValidationSuccess = false;return false;
    }
    else if(this.item.NonsellableTo=='' || this.item.ClearanceFrom=='' || (this.item.NonsellableFrom=='' && parseInt(this.item.NonsellableFrom)!=0 ) || this.item.ClearanceTo==''){
      alert("First fill data! ");
      this.IsValidationSuccess = false;return false;
    }
  }
    
 }
}




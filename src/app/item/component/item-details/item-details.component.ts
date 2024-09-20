import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'app/shared/services/item.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessageService } from 'primeng/api';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  @ViewChild('myInput2', null) fileUploader2: ElementRef;
  displayTabs: any[];
  closeResult: string;
  logo: any;
  ILimit: any;
  ItemBillLimtQty: any;
  imgURL: any;
  file: any;
  imagePath: any;
  blocked: boolean;
  entity: any;
  entityID: any;
  itemEntity: any;
  itemEntityID: any;
  isHistory: any
  isSupplierID: any;
  itemBillLimitQty: any;
  itemlimitData: any;
  BillLimtQty: any;
  apiURL: string;
  cloudUrl: string;
  @Input() isWarehouse: any;
  @Input() details: any;
  @Input() activeFields: any[];
  @Input() type: any;
  @Input() storeType: any;

  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() activeStatus = new EventEmitter<any>();
  @Output() deleteInfo = new EventEmitter<any>();
  @Output() refreshParent = new EventEmitter();

  constructor(private modalService: NgbModal, private itemService: ItemService, private messageService: MessageService) {
    this.apiURL = environment.apiURL;
    this.cloudUrl='https://res.cloudinary.com';
    this.ILimit = {}, this.ItemBillLimtQty = {}, this.BillLimtQty = {},
    this.displayTabs = [];
    this.isHistory = false;
    this.isSupplierID = false;
  }

  open(content) {
    if (this.isWarehouse) {
      if (this.isSupplierID) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      } else {
        this.messageService.add({ severity: 'error', summary: "Please save mandatory fields ", detail: 'Mandatory Fields:- Supplier Name,Unit Price,Purchase Price' })
      }
    } else {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
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

  ngOnInit() {

    if (this.isWarehouse) {
      this.entity = "ItemMaster";
      this.entityID = this.details.ItemId;
      this.itemEntity = "ItemLimitMaster";


    } else {
      this.entity = "ItemMasterCentral";
      this.entityID = this.details.Id;
    }

  }

  ngOnChanges() {
    // debugger
    console.log(this.details);
    if(this.details.LogoUrl!=null && (!(this.details.LogoUrl.includes(this.apiURL))) && !(this.details.LogoUrl.includes(this.cloudUrl)) ){
      this.details.LogoUrl = this.apiURL+this.details.LogoUrl;
      console.log(this.details.LogoUrl);
    }
    this.logo = this.details.LogoUrl;
    this.displayTabs = [{ field: 'overview', bool: true },
    { field: 'edit-form', bool: false },
    { field: 'Add', bool: false },
    { field: 'Item Limit', bool: false },
    { field: 'imageUpload', bool: false },
    { field: 'history', bool: false },
    { field: 'itemLimitHistory', bool: false },
    { field: 'itemLimitBillQty', bool: false },
    { field: 'BOM', bool: false },
    { field: 'rawmaterialDetails', bool: false },
    { field: 'addBatchCodeDisplay', bool: false },
    { field: 'MrpMedia', bool: false },
    ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
    this.isSupplierID = this.details.SupplierId && this.details.PurchaseMinOrderQty != 0 && this.details.PurchasePrice != 0 && this.details.UnitPrice != 0 ? true : false;

  }


  activeTabClass: any[] = [
    {tabName:'overviewDisplay',isActive:true},
    {tabName:'editFormDisplay',isActive:false},
    {tabName:'addDisplay',isActive:false},
    {tabName:'itemLimit',isActive:false},
    {tabName:'imageUpload',isActive:false},
    {tabName:'historyDisplay',isActive:false},
    {tabName:'itemLimitHistoryDisplay',isActive:false},
    {tabName:'ItemBillLimitQty',isActive:false},
    {tabName:'BOM',isActive:false},
    {tabName:'rawmaterialDetails',isActive:false},
    {tabName:'addBatchCodeDisplay',isActive:false},
    {tabName:'MrpMediaDisplay',isActive:false},
  ];
  switchActive(e, pageSelection) {
    console.log(e, pageSelection);

    $('.nav-link').removeClass('active');
    if (e.path && e.path.length > 0) {
      let navitem = e.path[2].children;
      for (var i = 0; i < navitem.length; i++) {
        navitem[i].firstChild.className = "nav-link";
      }
      e.path[0].className = "nav-link active";
    } else {
      let navitem = e;
      navitem.path = [
        {
          children: null,
          firstChild: { className: null }
        },
        {
          children: null,
          firstChild: { className: null }
        },
        {
          children: null,
          firstChild: { className: null }
        }
        ];
      for (var i = 0; i < navitem.length; i++) {
        navitem[i].firstChild.className = "nav-link";
      }
      if(e.path){
        e.path[0].className = "nav-link active";
      }
    }

    this.activeTabClass.forEach((e: any)=>{
      if(pageSelection == e.tabName){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    })

  }

  closeDetails(isDetails: boolean) {

    this.isdetailsclose.emit(isDetails);
  }

  RefreshParent() {
    this.refreshParent.emit();
  }

  ToggleActivation(item) {
    this.modalService.dismissAll("done");
    //  this.activeStatus.emit(item);
    this.blocked = true
    var action = item.active == true ? "Deactivated Successfully" : "Activated Successfully"
    if (item.active) {
      item.active = false;
    } else {
      item.active = true;
    }
    if (this.isWarehouse) {
      this.itemService.PutItem(item).subscribe(result => {
        // this.isDetails = false;
        // this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";

        this.modalService.dismissAll("done");
        this.blocked = false;
        this.messageService.add({ severity: 'success', summary: action, detail: '' });
      });
    } else {
      this.itemService.PutCentralItem(item).subscribe(result => {
        // this.isDetails = false;
        // this.selectedItem.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";

        this.modalService.dismissAll("done");
        this.blocked = false;
        this.messageService.add({ severity: 'success', summary: action, detail: '' });
      });
    }
  }

  onDelete(details) {
    this.deleteInfo.emit(details.ItemId);
  }


  hideDisplayTabsContents() {
    for (var i = 0; i < this.displayTabs.length; i++) {
      this.displayTabs[i].bool = false;
    }
  }

  overviewDisplay(e) {
    this.switchActive(e, 'overviewDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool = true;
  }

  editFormDisplay(e) {
    this.switchActive(e, 'editFormDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool = true;
  }

  addDisplay(e) {
    this.switchActive(e, 'addDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool = true;
  }
  addBatchCodeDisplay(e) {
    this.switchActive(e, 'addBatchCodeDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[10].bool = true;
  }

  historyDisplay(e) {
    this.isHistory = true
    this.switchActive(e, 'historyDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[5].bool = true;
  }

  itemLimitHistoryDisplay(e) {
    debugger;
    this.switchActive(e, 'itemLimitHistoryDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[6].bool = true;
  }
  ItemBillLimitQty(e) {
    this.BillLimtQty.BillLimitQty = 0;
    this.switchActive(e, 'ItemBillLimitQty');
    this.hideDisplayTabsContents();
    this.displayTabs[7].bool = true;

    this.itemService.getItemBillLimit(this.details.ItemId).subscribe(result => {
      this.BillLimtQty = result;
    })
    this.itemService.GetItemlimtData(this.details.ItemId).subscribe(result => {

      this.itemlimitData = result;
    })

  }
  BOM(e) {
    this.switchActive(e, 'BOM');
    this.hideDisplayTabsContents();
    this.displayTabs[8].bool = true;
  }
  rawmaterialDetails(e) {
    this.switchActive(e, 'rawmaterialDetails');
    this.hideDisplayTabsContents();
    this.displayTabs[9].bool = true;
  }
  itemLimit(e) {

    // this.ILimit = {};
    this.ILimit.ItemlimitQty = 0;
    this.ILimit.IsItemLimit = false;
    this.ILimit.ItemId = this.details.ItemId
    this.ILimit.WarehouseId = this.details.WarehouseId;
    this.ILimit.Number = this.details.Number;
    this.ILimit.ItemMultiMRPId = this.details.ItemMultiMRPId;
    this.ILimit.ItemLimitId = this.details.ItemLimitId
    this.itemService.getItemLimit(this.details.Number, this.details.WarehouseId, this.details.ItemMultiMRPId).subscribe(result => {
      if (result) {
        this.ILimit = result;
      }
      // this.ILimit.ItemlimitQty = this.ILimit.ItemlimitQty ? this.ILimit.ItemlimitQty  : 0
    })
    console.log("this....." + this.ILimit);
    this.switchActive(e, 'itemLimit');
    this.hideDisplayTabsContents();
    this.displayTabs[3].bool = true;
  }

  imageUpload(e) {
    this.switchActive(e, 'imageUpload');
    this.hideDisplayTabsContents();
    this.displayTabs[4].bool = true;
  }

  MrpMediaDisplay(e:any){
    debugger;
    console.log(this.storeType);
    
    this.switchActive(e, 'MrpMediaDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[11].bool = true;
  }
  onSave(itemLimit) {

    var dataToPost = {
      ItemId: this.ILimit.ItemId,
      WarehouseId: this.ILimit.WarehouseId,
      ItemNumber: this.ILimit.Number,
      ItemlimitQty: itemLimit.ItemlimitQty,
      ItemLimitSaleQty: this.ILimit.ItemLimitSaleQty,
      IsItemLimit: itemLimit.IsItemLimit,
      ItemMultiMRPId: this.ILimit.ItemMultiMRPId,
      Id: this.ILimit.Id
    };
    this.itemService.PutItemLimit(dataToPost).subscribe(result => {
      console.log(result);      
      debugger;
      if(result.Status == true)
      {
        this.messageService.add({ severity: 'success', summary: result.Message, detail: '' });
      }else{
        this.messageService.add({ severity: 'error', summary: result.Message, detail: '' });
      }      
      this.closeDetails(false);
    }, (err) => {
      console.log(err);
      debugger;
      this.messageService.add({ severity: 'error', summary: err.error.ErrorMessage, detail: '' });
      this.closeDetails(false);
    })
  }

  saveItemBillLimtQty(ItemBillLimtQty) {


    if (this.itemlimitData == null || this.itemlimitData.ItemlimitQty >= ItemBillLimtQty.BillLimitQty || this.itemlimitData.ItemlimitQty == 0) {
      var dataToPost = {
        Number: this.details.Number,
        itemBillLimitQty: ItemBillLimtQty.BillLimitQty,
        WarehouseId: this.details.WarehouseId,
      };
      this.itemService.PutBillItemLimit(dataToPost).subscribe(result => {
        console.log(result);

        this.messageService.add({ severity: 'success', summary: "Update Successfully", detail: '' });
        this.closeDetails(false);
      }, (err) => {
        console.log(err);
        this.messageService.add({ severity: 'success', summary: "Update Successfully", detail: '' });
        this.closeDetails(false);
      })
    } else {
      this.messageService.add({ severity: 'error', summary: "Please Item Limit less then Qty", detail: '' });
      this.closeDetails(false);
    }

  }

  onCancel() {
    this.closeDetails(false);
  }

  upload(file: File) {
    if (file[0].size < 1000000){
      console.log(file[0])
      //  file[0].name = this.details.Number;
      this.file = file[0];
      // this.file.name = this.details.Number;
      var reader = new FileReader();
      this.imagePath = this.file;
      console.log(this.imagePath);
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        this.details.LogoUrl = reader.result;
      }
      (success) => {
        alert("image uploaded successfully")
  
      };
    }
    else{
      alert('Select Image size less than 1MB!!!');
        this.fileUploader2.nativeElement.value = null;
        this.reset();
    }
    


  }

  reset(){
    this.fileUploader2.nativeElement.value = null;
  }
  uploadItemImage() {
    // debugger
    if (this.file) {
      this.blocked = true;
      var newFileName = this.details.Number;
      let formData = new FormData();
      formData.append('file', this.file)
      this.itemService.uploadImage(this.details.itemcode, formData).subscribe(result => {

        console.log(result)
          this.details.LogoUrl = result;
          this.itemService.updateItemImage(this.details).subscribe(result => {
            this.blocked = false;
            this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
            this.file = [];
          }, (err) => {
            this.messageService.add({ severity: 'error', summary: "Uploaded Unsuccessfully", detail: '' });
          })
          if (result) {
            if((!(result.includes(this.apiURL)))&& !(result.includes(this.cloudUrl))){
              this.details.LogoUrl = this.apiURL+result;
            }
            else{
              this.details.LogoUrl = result;
            }
        }
        // if (result != "Upload Unsuccessfull") {
        //   this.people.Id_Proof = result;
        //   this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
        //   this.file = [];
        // } else {
        //   this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        // }

      }, (err) => {
        // this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }

  }

}

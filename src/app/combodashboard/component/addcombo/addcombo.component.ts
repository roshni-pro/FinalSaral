import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CombodashService } from 'app/shared/services/combodash.service';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { analyzeAndValidateNgModules, IfStmt } from '@angular/compiler';
import { Combo } from 'app/shared/interface/combo';
import { element } from 'protractor';


@Component({
  selector: 'app-addcombo',
  templateUrl: './addcombo.component.html',
  styleUrls: ['./addcombo.component.scss']
})
export class AddcomboComponent implements OnInit {


  @Input() GroupID: number;


  TotalTaxAmount: 0
  group: any;
  peopleList: any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  // groupList: any;
  warehouses: any;
  LogoUrl: any;
  file: any;
  imgURL: any;
  isUploaded: boolean;
  public imagePath;
  selecteditem: any[];
  Itemiiii: any[];
  itemList: any;
  itemLists: any[];
  itemcode: any;
  Groupitemlist: any;
  WarehouseId: any;
  WareHouse: any;
  Afterpercentage: any;
  Percentage: any;
  totalamount: any;
  Combo: Combo;
  ComboItem: any[] = [];
  totalprice: any;
  qty: any;
  Result: any;
  TotalResult: any;

  Afterperprice: any;
  TotalPrice: any;
  list:any;
  constructor(private combodashService: CombodashService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.group = {};

  }

  ngOnInit() {
    this.Result = 0;
    this.qty = 0;
    this.selecteditem = [];
    this.isInvalid = false;

    if (this.GroupID) {
      console.log(this.GroupID)
      this.group = this.GroupID;
      console.log('GetByID: ', this.group);

    }

    if (this.GroupID) {
      this.group = this.GroupID;
    }
    this.combodashService.WarehouseGetByID().subscribe(result => {
      
      this.warehouses = result;
    })
    this.Combo = {
      WarehouseId: null,
      WarehouseName: null,
      ComboName: null,
      ComboPrice: null,
      TotalComboPrice: null,
      Discount: null,
      ComboImage: null,
      CreatedDate: null,
      UpdatedDate: null,
      IsActive: false,
      IsPublish: false,
      IsDeleted: false,
      SellQty: null,
      ComboItemlist: []


    }
    this.ComboItem = this.Combo.ComboItemlist;



  }
  getItemList(event, WarehouseId) {
    
    if (event.query.length > 2) {
      this.combodashService.getBylist(event.query, WarehouseId)
        .subscribe(result => {
          this.itemList = result;
          this.Percentage = 0;
        });
    }

  }

  onmodelChange(itemLists) {
    var isexist = false;
    if (this.selecteditem != null) {
      this.selecteditem.forEach(element => {
        if (element.ItemId == itemLists.ItemId) {
          isexist = true;
        }
      });
    }

    if (isexist) {
      this.messageService.add({ severity: 'error', summary: 'Item already exist.', detail: '' });
      return false;
    }
    this.selecteditem.push({
      ItemId: itemLists.ItemId,
      ItemImage: itemLists.LogoUrl,
      itemname: itemLists.itemname,
      Qty: parseInt(itemLists.MinOrderQty),
      UnitPrice: parseFloat(itemLists.UnitPrice),
      MinOrderQty: parseInt(itemLists.MinOrderQty),
      Parcentage: 0,
      AfterPercentage: parseInt(itemLists.MinOrderQty) * parseFloat(itemLists.UnitPrice),
      TotalPriceItem: parseInt(itemLists.MinOrderQty) * parseFloat(itemLists.UnitPrice),
      MRP:itemLists.MRP
    });
    this.TotalAmount();
    //this.selecteditem.push(itemLists);

  }

  onsearch(WarehouseName) {
    console.log("WarehouseId", WarehouseName)
  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //this.imgURL = x;
    }
    (success) => {
      alert("image uploaded successfully")

    };


  }


  UploadImage() {
    
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0]);
      this.combodashService.uploadImage(formData).subscribe(x => {
        
        this.messageService.add({ severity: 'success', summary: 'Upload Successfully!', detail: '' });
        console.log(x);
        // this.imgURL = this.baseURL + x;
        this.imgURL = x;
      })
    }
  }



  save(group, selecteditem, groupEditForm) {
    
  
    // if ((this.selecteditem.filter(x => x.Percentage == null).length > 0)) {
    //   this.messageService.add({ severity: 'error', summary: 'Percentage cant be empty!', detail: '' });
    //   return;
    // }
    if (groupEditForm.form.status == "VALID") {


      console.log("selecteditem111", selecteditem);
      group.imgURL = this.imgURL;
      let selectedList = [];


      if (selecteditem && selecteditem.length > 0) {
        
        this.Combo.WarehouseId = group.WarehouseId;
        this.Combo.ComboImage = group.imgURL;
        this.Combo.ComboName = group.Comboname;
        this.Combo.ComboPrice = this.Result;
        this.Combo.TotalComboPrice = this.TotalResult;
        this.Combo.Discount = 0;
        this.Combo.SellQty = group.SellQty;
        console.log("this.Combo", this.Combo);
        selecteditem.forEach(list => {

          var obj = {

            UnitPrice: list.UnitPrice,
            MinOrderQty: list.MinOrderQty,
            ItemId: list.ItemId,
            comboImage: group.imgURL,
            itemname: list.itemname,
            WarehouseId: group.WarehouseId,
            WarehouseName: group.WarehouseName,
            Parcentage: list.Parcentage,
            Qty: list.Qty,
            AfterPercentage: list.AfterPercentage,
            TotalPriceItem: list.TotalPriceItem,
            ItemImage: list.ItemImage,
          }
          this.ComboItem.push(obj);


        });


        console.log('selectedList::', selectedList);

        this.combodashService.Postitem(this.Combo).subscribe(result => {
          
          this.messageService.add({ severity: 'success', summary: 'Save Successfully!', detail: '' });
          
          this.Groupitemlist = result;
          console.log('Groupitemlist::', this.Groupitemlist);
        })
        this.refreshParent.emit();
        this.getList();
        this.router.navigateByUrl('layout/combodashboard/combodashboard');

        this.refreshParent.emit();
      }
      else {
        this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
      }

    }
    else {
      
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }

  }




  onItemAmount(selecteditem) {
    if (selecteditem.Parcentage != null) {
      this.totalamount = parseInt(selecteditem.Qty) * parseFloat(selecteditem.UnitPrice),
        selecteditem.TotalPriceItem = Number(this.totalamount);
      this.totalamount = (this.totalamount - (this.totalamount * (parseFloat(selecteditem.Parcentage) / 100)));
      //selecteditem.AfterPercentage=this.totalamount; 
      selecteditem.AfterPercentage = (this.totalamount);

    }
    else
    {
      this.messageService.add({severity:'error', summary: 'Atleast one number is required either 0 or more then 1!', detail:''});
    }
    this.TotalAmount();
  }


  onCancel() {
    this.router.navigateByUrl('layout/combodashboard/combodashboard');
  }




  TotalAmount() {
    this.Result = 0;
    this.TotalResult = 0;
    this.selecteditem.forEach(x => {
      
      this.Result += x.AfterPercentage;
      
      this.TotalResult += x.TotalPriceItem;
    })
    this.Combo.ComboPrice = this.Result;
    this.Combo.TotalComboPrice = this.TotalResult;
    this.group.selecteditem = "";
    //this.Combo.ComboPrice= Number(this.Result).toFixed(2);
  }


  removeSelected(selecteditem){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        
        console.log("from html",selecteditem);
        console.log("from list", this.selecteditem); 
    
        var b = this.selecteditem.findIndex(x=> x.ItemId == selecteditem.ItemId);
        this.selecteditem.splice(b, 1)
    
        console.log("from list", this.selecteditem); 
        this.TotalAmount();
        this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      }
     
    });
   

  }

  increment(selecteditem) {
    if (selecteditem.Qty == null) {
      selecteditem.Qty = parseInt(selecteditem.MinOrderQty);
    } else {
      selecteditem.Qty = parseInt(selecteditem.Qty);
      selecteditem.Qty += parseInt(selecteditem.MinOrderQty);
    }

    this.onItemAmount(selecteditem);


  };


  decrement(selecteditem) {
    
    if (selecteditem.ItemId == selecteditem.ItemId) {
      if (selecteditem.Qty >= 0) {
        if (selecteditem.Qty == 0) {
          return selecteditem.Qty;
        }
        selecteditem.Qty = parseInt(selecteditem.Qty);
        selecteditem.Qty -= parseInt(selecteditem.MinOrderQty);
      } else {
        selecteditem.Qty = parseInt(selecteditem.MinOrderQty);

      }
    }
    this.onItemAmount(selecteditem);
  };


  getList()
  {
    this.combodashService.GetItemList().subscribe(result =>{
      
      this.list=result;
     
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DistributerpriceService } from 'app/shared/services/distributerprice.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-distributerprice',
  templateUrl: './distributerprice.component.html',
  styleUrls: ['./distributerprice.component.scss']
})
export class DistributerpriceComponent implements OnInit {

  @Input() Id: any;
  group: any;
  isopen: boolean;
  isInvalid: boolean;
  isDetails: boolean;
  warehouses: any[];
  categories: any[];
  Subcategories: any[];
  Subsubcategories: any[];
  distributerupdateList: any[];
  WarehouseId: any;
  distributerList: any;
  cols: any;
  DistributionPrice: any;
  IsdistributorShow: boolean;
  checked: boolean;
  distributerRole : any;
  sourcingSeniorExecutiveRole : boolean = false;
  exportData: any[]; 

  constructor(private distributerpriceService: DistributerpriceService, private router: Router, 
    private modalService: NgbModal, private wh: WarehouseService, 
    private messageService: MessageService,private exportService : ExportServiceService) { this.isopen === false; this.group = {}; }

  ngOnInit() {

    this.cols = [

      { field: 'ItemName', header: 'Item Name' },
      { field: 'MultiMRPID', header: 'Multi MRP ID' },
      { field: 'ItemNumber', header: 'ItemNumber' },
      { field: 'MOQ', header: 'MOQ' },
      { field: 'Price', header: 'Price' },
      { field: 'IsdistributorShow', header: 'Is show DistributerPrice' },
      { field: 'DistributerPrice', header: 'DistributionPrice' },
    ];

    this.isInvalid = false;
    this.group.WarehouseId = "";
    this.group.Categoryid = "";

    this.wh.getSpecificWarehouses().subscribe(result => {
      this.warehouses = result;
    })


    // this.distributerpriceService.getallcategory(this.Id).subscribe(result => {
    //   this.categories = result;
    // })
  }
  onsearch() {
    
    this.distributerpriceService.getallcategory().subscribe(result => {
      this.categories = result;
      console.log("this.categories", this.categories)
    })
  }
  onsearchcat(Categoryid) {
    
    this.distributerpriceService.getallSubcategory(Categoryid).subscribe(result => {
      this.Subcategories = result;
      console.log(" this.Subcategories", this.Subcategories)
    })

  }

  onsearchSubcat(Categoryid, SubCategoryId) {
    
    this.distributerpriceService.getallBrandcategory(Categoryid, SubCategoryId).subscribe(result => {
      this.Subsubcategories = result;
      console.log(" this.Subcategories", this.Subcategories)
    })

  }
  search(group, groupForm) {
    
    this.distributerList = [];
    if (groupForm.form.status == "VALID") {
      if (this.Id == null) {

        this.distributerpriceService.Search(group).subscribe(result => {
          
          this.distributerList = result.DistributorPriceList;
          this.distributerRole = result.DistributerRole;
          this.exportData = this.distributerList;
          if(this.distributerRole != null)
          {
            this.sourcingSeniorExecutiveRole = true;
          }
          console.log("this.distributerList", this.distributerList)
        });
      }
    }
    else {

      this.isInvalid = true;

    }

  }
  checkBoxChange(event, ItemId) {
    
    this.distributerList.filter(distributor => distributor.ItemId == ItemId)[0].IsdistributorShow == true ?
      this.distributerList.filter(distributor => distributor.ItemId == ItemId)[0].IsdistributorShow = false : this.distributerList.filter(distributor => distributor.ItemId == ItemId)[0].IsdistributorShow = true;
    
  }




  onClickCustomer(row) {
    
    // if (!row.IsChecked) {
    //   let newRow = this.selectcustomertList.filter(x => { return x.Id == row.Id })[0];
    //   let index = this.selectcustomertList.indexOf(newRow);
    //   this.selectcustomertList.splice(index, 1);
    // } else {
    //   this.selectcustomertList.push(row);
    // }
  }
  Save() {
    

    this.distributerList = this.distributerList.filter(row => row.IsdistributorShow == true);
    
    this.distributerpriceService.getsave(this.distributerList).subscribe(result => {
      if (result == true) {

        this.messageService.add({ severity: 'success', summary: 'Save Successfully!', detail: '' });

      } else {
        this.messageService.add({ severity: 'error', summary: 'something went wrong', detail: '' });


      }

      this.distributerupdateList = result;
      console.log("this.distributerupdateList", this.distributerupdateList)
      window.location.reload();

    });

  }

  setPriceVal(DistributionPrice, ItemId) {
    
    let price = this.distributerList.filter(distributor => distributor.ItemId == ItemId)[0].Price
    if(DistributionPrice > price){
    alert("Please Add disributeed price  less then or equal to price  ")
    }
    
    DistributionPrice >= 0 && DistributionPrice <= price ? this.distributerList.filter(distributor => distributor.ItemId == ItemId)[0].DistributionPrice = DistributionPrice :
      this.distributerList.filter(distributor => distributor.ItemId == ItemId)[0].DistributionPrice = 0
  }
  onCancel(){
    
    // this.router.navigateByUrl('layout/distributer-price-update/distributerprice');
    window.location.reload();
  }

  exportDistributerPrice(){
    this.exportService.exportAsExcelFile(this.exportData, 'exportDistributerPriceData');
  }

}

import { BrandBuyerDetail } from '../../interface/BrandBuyerDetail';
import { filter, skip } from 'rxjs/operators';
import { WarehousematerialsserviceService } from './../../services/warehousematerialsservice.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AgentCommissionPaymentService } from 'app/agent-commission-payment/services/agent-commission-payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'app/shared/services/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brandlist',
  templateUrl: './brandlist.component.html',
  styleUrls: ['./brandlist.component.scss']
})
export class BrandlistComponent implements OnInit {

  @ViewChild(Table, { static: false }) table: Table;
  whouseId = 0;
  brandBuyerDetailsList = [];
  consumedcapacity = 0;
  whouseName = '';
  initialCall = true;
  whouseList = [];
  blocked = true;
  viewBrandBuyerList = false;
  warehouseList = [];
  agentCommissionPaymentList = [];
  totalRecords = 0;
  filterBy = '';
  totalCapacityPercentage = 0;
  searchFilterValue = '';
  peopleList = [];
  BrandBuyerList = [];
  BrandsList = [];
  globalsearchval = '';
  keepLoading = true;
  displayError = '';
  page: any;
  searchVal = '';
  brandBuyerFilteredList = [];
  totalbrandcount = 0;
  totalBuyerRecords = 0;
  filters = [
    { name: 'Cancelled' },
    { name: 'Paid' }
  ]
  warehouseCols = [
    // { header: 'Edit' },
    { field: 'WareHouseId', header: ' WareHouseId' },
    { field: 'WareHouseName', header: ' WareHouseName' },
  ];

  brandCols = [
    // { header: 'Edit' },
    { field: 'SubcategoryName', header: ' Brand Name' },
  ];

  brandBuyerDetailsCols = [
    // { header: 'Edit' },
    { field: 'WareHouseId', header: 'WareHouse' },
    { field: 'BrandId', header: 'Brand' },
    { field: 'Buyer', header: 'Buyer' },
    { field: 'AllocatePercent', header: 'Allocation Percent' },

  ];
  unmountedwhouselist = [];
  immutableallocationlist = [];
  brandsCols = [
    // { field: 'AllocationPercent', header: 'AllocationPercent' },
    // { field: 'BrandId', header: 'BrandId' },
    { field: 'BrandName', header: 'BrandName' },
    { field: 'BuyerName', header: 'BuyerName' },

  ];

  editPopup = false;
  BBList = [];
  constructor(private agentCommissionPaymentService: AgentCommissionPaymentService, private router: Router, private warehousematerialservice: WarehousematerialsserviceService,
    private r: ActivatedRoute, private messageService: MessageService, private loaderService: LoaderService) {
    //this.getWarehouseBrands();
  }

  ngOnInit() {
    //this.GetPeople();
    this.blocked = true;

    this.r.params.subscribe(param => {
      this.whouseId = Number(param.warehouseId);
      this.whouseName = param.name;

      this.warehousematerialservice.GetBrandsByWarehouseId(Number(param.warehouseId))
        .subscribe(result => {
          
          if(!result.length){
      this.messageService.add({ severity: 'error', summary: 'Brands Not Found', detail: 'Please Select another warehouse' });
setTimeout(() => {
  this.router.navigate(['brandbuyerallocationroot'], { relativeTo: this.r.parent });
  
}, 2500);
          }
          this.BrandsList = result;
          let consumedTotal = 0;
          this.BBList = result;
          this.totalbrandcount = this.BrandsList.length;
          this.BrandsList.forEach(element => {
            element.allocationPercentage = element.AllocationPercent;
            element.BrandId = element.SubsubCategoryid ? element.SubsubCategoryid : element.BrandId

            element.BrandName = element.BrandName ? element.BrandName : element.SubcategoryName;
            // element.BrandName = element.SubsubcategoryName
            consumedTotal = consumedTotal + Number(element.AllocationPercent);
            if (element.allocationPercentage > 0) {

              let detail = new BrandBuyerDetail();
              detail.BrandId = element.BrandId;
              detail.BuyerId = element.BuyerId;
              detail.BuyerName = element.BuyerName;

              detail.BrandName = element.BrandName;
              detail.WareHouseId = this.whouseId;
              detail.WareHouseName = this.whouseName;
              detail.AllocatePercent = element.allocationPercentage;

              this.brandBuyerDetailsList.push(detail);
            }
            //allocationPercentage
          });

          this.consumedcapacity = consumedTotal;

          this.blocked = false;

        });
    });
    this.immutableallocationlist = this.brandBuyerDetailsList;

  }

  load(event) {

    this.blocked = true;
    this.page = { skip: event.first, take: event.rows };
    if (this.initialCall == true) {
      this.warehousematerialservice.GetWareHouseBrand()
        .subscribe(result => {

          // this.warehouseList = result.WarehouseWareHouseDc;
          this.whouseList = result.WarehouseWareHouseDc;
          this.unmountedwhouselist = result.WarehouseWareHouseDc;
          this.totalRecords = this.whouseList.length;
          this.warehouseList = this.whouseList.filter(wh => result.WarehouseWareHouseDc.indexOf(wh) >= this.page.skip);
          this.warehouseList.splice(10, this.warehouseList.length - 10);

          this.BrandBuyerList = result.BrandBuyer;
          this.BBList = result.BrandBuyer;
          this.blocked = false;
          this.initialCall = false;
        });
    }
    else {
      //this.whouseList = result.WarehouseWareHouseDc;
      this.totalRecords = this.whouseList.length;
      this.warehouseList = this.whouseList.filter(wh => this.whouseList.indexOf(wh) >= this.page.skip);
      this.warehouseList.splice(10, this.warehouseList.length - 10);
      //this.BrandBuyerList = this.whouseList.BrandBuyer;
      this.blocked = false;
    }
  }

  navToAddItem() {
    this.router.navigate(["addAgentCommissionPayment"], { relativeTo: this.r.parent });
  }

  navToSettlePayments() {
    this.router.navigate(['../../agentpaymentsettlement'], { relativeTo: this.r });
  }

  editDetails() {
    this.editPopup = true;
  }

  searchMenuItems(textValue) {

    textValue = textValue.toLowerCase();
    let filteredList = [];


    filteredList = Object.assign([], this.BBList).filter(
      item => item.BrandName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.BuyerName != null && item.BuyerName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
      // && item.WareHouseId == this.whouseId
    )

    // this.BrandBuyerList.forEach(menuItem => {
    //   
    //   if (menuItem.SubcategoryName.toLowerCase().includes(textValue)) {
    //     filteredList.push(menuItem);
    //   }
    // });
    if (filteredList.length) {

      this.BrandsList = filteredList;
    }
    else {
      if (textValue == '') {
        this.BrandsList = this.BBList;
      }
      else {
        this.BrandsList = []
      }
    }

    this.blocked = true;
    this.page = { skip: 0, take: 10 };
    this.totalBuyerRecords = this.BrandBuyerList.length;
    this.brandBuyerFilteredList = this.BrandBuyerList.filter(wh => this.BrandBuyerList.indexOf(wh) >= this.page.skip);
    this.brandBuyerFilteredList.splice(10, this.BrandBuyerList.length - 10);
    this.brandBuyerFilteredList.forEach(brandBuyer => {

      let index = this.brandBuyerDetailsList.findIndex(bb => bb.WareHouseId == this.whouseId && bb.BrandId == brandBuyer.BrandId);


      if (index == -1) {

        brandBuyer.active = false;
        brandBuyer.allocationPercentage = 0;

      }
      else {
        brandBuyer.active = true;
        brandBuyer.allocationPercentage = this.brandBuyerDetailsList[index].AllocatePercent;

      }
    });
    this.blocked = false;

  }


  searchWarehouses(textValue) {
    textValue = textValue.toLowerCase();
    let filteredList = [];


    filteredList = Object.assign([], this.unmountedwhouselist).filter(
      item => item.WareHouseName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
      // && item.WareHouseId == this.whouseId
    )

    // this.BrandBuyerList.forEach(menuItem => {
    //   
    //   if (menuItem.SubcategoryName.toLowerCase().includes(textValue)) {
    //     filteredList.push(menuItem);
    //   }
    // });
    if (filteredList.length) {

      this.whouseList = filteredList;
    }
    else {
      if (textValue == '') {
        this.whouseList = this.unmountedwhouselist;
      }
      else {
        this.whouseList = [];

      }
    }

    this.blocked = true;
    this.page = { skip: 0, take: 10 };
    this.totalBuyerRecords = this.whouseList.length;
    this.warehouseList = this.whouseList.filter(wh => this.whouseList.indexOf(wh) >= this.page.skip);
    this.warehouseList.splice(10, this.whouseList.length - 10);
    this.warehouseList.forEach(brandBuyer => {
      let index = this.warehouseList.findIndex(bb => bb.WareHouseId == this.whouseId);
    });
    this.blocked = false;
  }

  loadBrand(event) {
    this.blocked = true;
    this.page = { skip: event.first, take: event.rows };
    this.totalBuyerRecords = this.BrandBuyerList.length;
    this.brandBuyerFilteredList = this.BrandBuyerList.filter(wh => this.BrandBuyerList.indexOf(wh) >= this.page.skip);
    this.brandBuyerFilteredList.splice(10, this.BrandBuyerList.length - 10);
    this.brandBuyerFilteredList.forEach(brandBuyer => {

      let index = this.brandBuyerDetailsList.findIndex(bb => bb.WareHouseId == this.whouseId && bb.BrandId == brandBuyer.BrandId);


      if (index == -1) {

        brandBuyer.active = false;
        brandBuyer.allocationPercentage = 0;

      }
      else {
        brandBuyer.active = true;
        brandBuyer.allocationPercentage = this.brandBuyerDetailsList[index].AllocatePercent;

      }
    });
    this.blocked = false;
  }

  addAllocationPercentage(event, row) {
    let val = Number(event.target.value);


    if (!event.target.value || Number(event.target.value) == null || event.target.value == null || event.target.value == '' || Number(event.target.value) < 0 || isNaN(event.target.value)) {
      //this.messageService.add({ severity: 'error', summary: 'Allocation Percentage Required', detail: 'Please enter allocation percent before adding brand' });
      let rowindex = this.brandBuyerDetailsList.findIndex(bb => bb.WareHouseId == this.whouseId && bb.BrandId == row.BrandId);
      if (rowindex != -1) {
        this.brandBuyerDetailsList.splice(rowindex, 1)
        // this.messageService.add({ severity: 'success', summary: 'Item Removed Successfully', detail: '' });

      }
      row.allocationPercentage = 0;
      //row.active = false;
      //event.target.checked = false;

    }
    else {

      if (Number(event.target.value) > 100) {
        this.messageService.add({ severity: 'error', summary: 'Allocation Percentage Invalid', detail: 'Allocation percent should be less than / equal to 100' });
        //row.active = false;
        //event.target.checked = false;

        row.allocationPercentage = 0;

      }


      else {

        let totalQuantity = 0
        let totalList = this.BBList;
        totalList.forEach(tl => {
          if (tl.BrandId != row.BrandId)
            totalQuantity += tl.allocationPercentage;
        });
        if ((totalQuantity + Number(event.target.value)) > 100) {
          this.messageService.add({ severity: 'error', summary: 'Allocation Percentage Limit Reached', detail: 'Entered limit exceeds Total Warehouse Allocation Limit ( 100% )' });

          row.allocationPercentage = 0
        }
        else {
          let detail = new BrandBuyerDetail();
          detail.WareHouseId = this.whouseId;
          detail.WareHouseName = this.whouseName;
          detail.BuyerId = row.BuyerId;
          detail.BuyerName = row.BuyerName;


          if (event.target.value.includes('.')) {

            if (event.target.value > Math.floor(event.target.value)) {
              row.allocationPercentage = parseFloat(event.target.value);
              detail.AllocatePercent = Number(event.target.value);
            }
            else {
              row.allocationPercentage = event.target.value;
            }
          }
          else {
            detail.AllocatePercent = Number(event.target.value);
            row.allocationPercentage = Number(event.target.value);
          }



          detail.BrandName = row.BrandName;
          detail.BrandId = row.BrandId;
          let index = this.brandBuyerDetailsList.findIndex(bb => bb.WareHouseId == detail.WareHouseId && bb.BrandId == detail.BrandId);
          if (index == -1) {

            this.brandBuyerDetailsList.push(detail);
            //row.active = true;
            // event.target.checked = true;

            //this.messageService.add({ severity: 'success', summary: 'Item Added Successfully', detail: '' });
          }
          else {
            if (event.target.value.includes('.')) {

              if (event.target.value > Math.floor(event.target.value)) {
                row.allocationPercentage = parseFloat(event.target.value);
                this.brandBuyerDetailsList[index].AllocatePercent = Number(event.target.value);
              }
              else {
                row.allocationPercentage = event.target.value;
              }
            }
            else {
              this.brandBuyerDetailsList[index].AllocatePercent = Number(event.target.value);
              row.allocationPercentage = Number(event.target.value);
            }
            // row.active = false;
            //  event.target.checked = false;
            // this.messageService.add({ severity: 'success', summary: 'Item Updated Successfully', detail: '' });

          }

        }

      }

      let consumedTotal = 0;
      this.BrandsList.forEach(element => {
        consumedTotal = consumedTotal + Number(element.allocationPercentage);
        //allocationPercentage
      });
      this.consumedcapacity = consumedTotal;
    }




  }

  viewbrandbuyer() {
    this.globalsearchval = '';
    this.globalsearch(this.globalsearchval);
    this.brandBuyerDetailsList.length ? this.viewBrandBuyerList = true :
      this.messageService.add({ severity: 'error', summary: 'No Items Found', detail: 'Please add items to brand buyer details list' });

  }

  removeBrandBuyer(row) {

    let bbIndex = this.brandBuyerDetailsList.findIndex(bb => bb.WareHouseId == row.WareHouseId && bb.BrandId == row.BrandId);
    let brandIndex = this.brandBuyerFilteredList.findIndex(bb => bb.WareHouseId == row.WareHouseId && bb.BrandId == row.BrandId);
    this.messageService.add({ severity: 'success', summary: 'Item Removed Successfully', detail: '' });
    this.brandBuyerDetailsList.splice(bbIndex, 1);


  }

  saveBrandBuyerDetails() {
    this.blocked = true;

    this.warehousematerialservice.UpdateBrandBuyer(this.brandBuyerDetailsList)
      .subscribe(result => {
this.blocked = false;
        if (result == true) {
          this.messageService.add({ severity: 'success', summary: 'List Successfully Saved', detail: '' });
          this.viewBrandBuyerList = false
        }
        else {


          this.messageService.add({ severity: 'error', summary: 'issue in save', detail: 'Something went wrong please try again later' });

          this.viewBrandBuyerList = false
        }

      });
  }

  setWhouse(i) {

    this.searchVal = '';
    this.searchMenuItems('');
    this.editPopup = true; this.whouseId = this.warehouseList[i].WareHouseId; this.whouseName = this.warehouseList[i].WareHouseName
  }


  navToGraph() {
    this.router.navigate(['graph', { warehouseId: this.whouseId }], { relativeTo: this.r.parent });


  }


  globalsearch(textValue) {

    this.brandBuyerDetailsList.forEach(bb => {
      
      let existingItemIndex = this.immutableallocationlist.findIndex(iml => iml.BuyerId == bb.BuyerId && iml.BrandId == bb.BrandId);
      if (existingItemIndex != -1) {
        this.immutableallocationlist[existingItemIndex] = bb;
      }
      else {
        this.immutableallocationlist.push(bb);
      }
    });

    textValue = textValue.toLowerCase();
    let filteredList = [];


    filteredList = Object.assign([], this.immutableallocationlist).filter(
      item => item.BrandName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.BuyerName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.WareHouseName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
        || item.WareHouseId == textValue.toLowerCase()

      // && item.WareHouseId == this.whouseId
    );

    // this.BrandBuyerList.forEach(menuItem => {
    //   
    //   if (menuItem.SubcategoryName.toLowerCase().includes(textValue)) {
    //     filteredList.push(menuItem);
    //   }
    // });
    if (filteredList.length) {

      this.brandBuyerDetailsList = filteredList;
    }
    else {
      if (textValue == '') {

        this.brandBuyerDetailsList = this.immutableallocationlist;

      }
      else {
        this.brandBuyerDetailsList = [];
      }
    }



  }


}


import { WarehouseService } from 'app/shared/services/warehouse.service';
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
  selector: 'app-warehousematerialslist',
  templateUrl: './warehousematerialslist.component.html',
  styleUrls: ['./warehousematerialslist.component.scss']
})
export class WarehousematerialslistComponent implements OnInit {

  @ViewChild(Table, { static: false }) table: Table;
  whouseId = 0;
  globalsearchval = '';
  brandBuyerDetailsList = [];
  whouseName = '';
  initialCall = true;
  whouseList = [];
  blocked = true;
  viewBrandBuyerList = false;
  //viewBrandBuyerList = true;

  warehouseList = [];
  agentCommissionPaymentList = [];
  totalRecords = 0;
  filterBy = '';
  totalCapacityPercentage = 0;
  searchFilterValue = '';
  peopleList = [];
  BrandBuyerList = [];
  keepLoading = true;
  displayError = '';
  page: any;
  searchVal = '';
  brandBuyerFilteredList = [];
  totalBuyerRecords = 0;
  immutableallocationlist = [];
  filters = [
    { name: 'Cancelled' },
    { name: 'Paid' }
  ]
  warehouseCols = [
    // { header: 'Edit' },

    { field: 'WareHouseName', header: ' WareHouseName' },
    { field: 'ConsumedPercentage', header: ' Warehouse Consumed' },

  ];

  brandCols = [
    // { header: 'Edit' },
    { field: 'SubcategoryName', header: ' Brand Name' },
  ];

  brandBuyerDetailsCols = [
    // { header: 'Edit' },
    { field: 'WareHouseId', header: 'WareHouse' },
    { field: 'BrandId', header: 'Brand' },
    { field: 'BuyerName', header: 'BuyerName' },

    { field: 'AllocatePercent', header: 'Allocation Percent' },

  ];

  brandsCols = [
    // { header: 'Edit' },
    { field: 'AllocationPercent', header: 'AllocationPercent' },
    { field: 'BrandName', header: 'BrandName' },
    { field: 'BrandId', header: 'BrandId' },

  ];

  unmountedwhouselist = [];

  editPopup = false;
  BBList = [];
  specificwarehouses = [];
  constructor(private agentCommissionPaymentService: AgentCommissionPaymentService, private router: Router, private warehousematerialservice: WarehousematerialsserviceService,
    private r: ActivatedRoute, private messageService: MessageService, private loaderService: LoaderService,
    private warehouseservice: WarehouseService
  ) {
    //this.getWarehouseBrands();
  }

  ngOnInit() {
    this.blocked = true;
    this.getwarehousesbyuserid()
    //this.GetPeople();
  }


  getwarehousesbyuserid() {
    this.warehouseservice.getSpecificWarehouses()
      .subscribe(result => {
        this.specificwarehouses = result;
      });
  }

  load(event) {
    this.blocked = true;
    this.page = { skip: event.first, take: event.rows };
    if (this.initialCall == true) {
      this.warehousematerialservice.GetWareHouseBrand()
        .subscribe(result => {

          this.specificwarehouses.forEach(element => {

            let item = result.WarehouseWareHouseDc.filter(whouse => whouse.WareHouseId == element.WarehouseId)[0];
            if (item) {
              this.whouseList.push(item);
            }
          });

          this.whouseList.sort((a, b) => {
            return a.WareHouseId - b.WareHouseId;
          });

          
          this.unmountedwhouselist = this.whouseList;
          this.totalRecords = this.whouseList.length;
          this.warehouseList = this.whouseList.filter(wh => this.whouseList.indexOf(wh) >= this.page.skip);
          this.warehouseList.splice(10, this.warehouseList.length - 10);

          this.BrandBuyerList = result.BrandBuyer;
          this.BBList = result.BrandBuyer;



          this.immutableallocationlist = this.brandBuyerDetailsList;
          setTimeout(() => {
            this.blocked = false;

          }, 1000);
          this.initialCall = false;
        });
    }
    else {

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
      item => item.SubcategoryName.toLowerCase().indexOf(textValue.toLowerCase()) > -1
      // && item.WareHouseId == this.whouseId
    )

    // this.BrandBuyerList.forEach(menuItem => {
    //   
    //   if (menuItem.SubcategoryName.toLowerCase().includes(textValue)) {
    //     filteredList.push(menuItem);
    //   }
    // });
    if (filteredList.length) {

      this.BrandBuyerList = filteredList;
    }
    else {
      if (textValue == '') {
        this.BrandBuyerList = this.BBList;
      }
      else {
        this.BrandBuyerList = []
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
    if (!event.target.value || Number(event.target.value) == null || event.target.value == null || event.target.value == '' || Number(event.target.value) == 0) {
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
        let totalList = this.brandBuyerDetailsList.filter(bb => bb.WareHouseId == this.whouseId);
        totalList.forEach(tl => {
          if (tl.BrandId != row.BrandId)
            totalQuantity += tl.AllocatePercent;
        });
        if ((totalQuantity + Number(event.target.value)) > 100) {
          this.messageService.add({ severity: 'error', summary: 'Allocation Percentage Limit Reached', detail: 'Entered limit exceeds Total Warehouse Allocation Limit ( 100% )' });

          row.allocationPercentage = 0
        }
        else {
          let detail = new BrandBuyerDetail();
          detail.WareHouseId = this.whouseId;
          detail.WareHouseName = this.whouseName;
          detail.AllocatePercent = Number(event.target.value);
          row.allocationPercentage = Number(event.target.value);

          detail.BrandName = row.SubcategoryName;
          detail.BrandId = row.BrandId;
          let index = this.brandBuyerDetailsList.findIndex(bb => bb.WareHouseId == detail.WareHouseId && bb.BrandId == detail.BrandId);
          if (index == -1) {
            this.brandBuyerDetailsList.push(detail);
            //row.active = true;
            // event.target.checked = true;

            //this.messageService.add({ severity: 'success', summary: 'Item Added Successfully', detail: '' });
          }
          else {
            this.brandBuyerDetailsList[index].AllocatePercent = Number(event.target.value);
            row.allocationPercentage = Number(event.target.value);
            // row.active = false;
            //  event.target.checked = false;
            // this.messageService.add({ severity: 'success', summary: 'Item Updated Successfully', detail: '' });

          }

        }

      }
    }

  }

  viewbrandbuyer() {
    this.viewBrandBuyerList = true;
    this.globalsearchval = '';
    this.globalsearch(this.globalsearchval);
    // this.brandBuyerDetailsList.length ? this.viewBrandBuyerList = true :
    //   this.messageService.add({ severity: 'error', summary: 'No Items Found', detail: 'Please add items to brand buyer details list' });

    //   this.warehouseList.forEach(element => {
    //     
    //   this.warehousematerialservice.GetBrandsByWarehouseId(Number(element.WareHouseId))
    //   .subscribe(result => {
    //     let BrandsList = result;
    //     let consumedTotal = 0;
    //     this.BBList = result;
    //     BrandsList.forEach(element => {
    //       element.allocationPercentage = element.AllocationPercent;
    //       consumedTotal = consumedTotal + Number(element.AllocationPercent);
    //       if (element.allocationPercentage > 0) {
    //         let detail = new BrandBuyerDetail();
    //         detail.WareHouseId = this.whouseId;
    //         detail.WareHouseName = this.whouseName;
    //         detail.AllocatePercent = element.allocationPercentage;
    //         
    //         this.brandBuyerDetailsList.push(detail);
    //       }
    //       //allocationPercentage
    //     });
    //     
    //     element.consumedcapacity = consumedTotal;

    //   });
    // });

  }

  removeBrandBuyer(row) {

    let bbIndex = this.brandBuyerDetailsList.findIndex(bb => bb.WareHouseId == row.WareHouseId && bb.BrandId == row.BrandId);
    let brandIndex = this.brandBuyerFilteredList.findIndex(bb => bb.WareHouseId == row.WareHouseId && bb.BrandId == row.BrandId);
    this.messageService.add({ severity: 'success', summary: 'Item Removed Successfully', detail: '' });
    this.brandBuyerDetailsList.splice(bbIndex, 1);


  }

  saveBrandBuyerDetails() {
    this.warehousematerialservice.UpdateBrandBuyer(this.brandBuyerDetailsList)
      .subscribe(result => {

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

  setWhouse(i, rowData) {

    this.searchVal = '';
    //this.searchMenuItems('');
    // this.editPopup = true;
    //this.whouseId = this.warehouseList[i].WareHouseId; this.whouseName = this.warehouseList[i].WareHouseName
    this.navToBrandListByWhouseId(rowData);
  }


  navToGraph() {

    this.router.navigate(['graph'], { relativeTo: this.r });

  }

  navToBrandListByWhouseId(rowData) {

    this.router.navigate(['brandList', { name: rowData.WareHouseName, warehouseId: rowData.WareHouseId }], { relativeTo: this.r.parent });

    // this.router.navigate(["addAgentCommissionPayment"], { relativeTo: this.r.parent });

  }

  globalsearch(textValue) {
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


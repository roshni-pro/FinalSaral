import { Component, OnInit } from '@angular/core';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { PaginatorViewModelTradeorder } from 'app/shared/interface/paginator-view-model-tradeorder';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';





@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
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

export class OrderComponent implements OnInit {
  CurrentStatus: SelectItem[];
  exportData: any;
  cols: any[];
  orderList: any[];
  displayDialog: boolean;
  closeResult: string;
  isopen: boolean;
  cars: any[];
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow: any;
  isDetails: boolean;
  searchModel: any[];
  selectedRowDetails: any;
  paginator: PaginatorViewModelTradeorder;
  exportpage: PaginatorViewModelTradeorder;
  pageSize: number;
  isSearch: boolean;
  isTable: boolean;
  cityList: any[];
  CategoryList: any[];
  cityLists: any;
  Id: any;
  rangeDates: Date[];
  blocked: boolean;

  activeFields: any[] = [
    { field: 'BuyerName', label: 'Buyer' },
    { field: 'BuyerSkCode', label: 'BuyerSkCode' },
    { field: 'BuyerMobile', label: 'BuyerMobile' },
    { field: 'BuyerBidId', label: 'BuyerBidId' },
    { field: 'BuyerRating', label: 'BuyerRating' },
    { field: 'ItemName', label: 'Item' },
    { field: 'Qty', label: 'Quantity' },
    { field: 'Price', label: 'Price' },
    { field: 'OrderNo', label: 'OrderNo' },
    { field: 'SellerName', label: 'Seller' },
    { field: 'SellerSkCode', label: 'SellerSkCode' },
    { field: 'SellerSkCode', label: 'SellerMobile' },
    { field: 'ShowGstOnInvoice', label: 'ShowGstOnInvoice' },
    { field: 'CurrentStatus', label: 'CurrentStatus' },
    { field: 'SellerRating', label: 'SellerRating' },
    { field: 'CGSTPercent', label: 'CGSTPercent' },
    { field: 'CGSTAmount', label: 'CGSTAmount' },
    { field: 'SGSTPercent', label: 'SGSTPercent' },
    { field: 'SGSTAmount', label: 'SGSTAmount' },
    { field: 'CESSPercent', label: 'CESSPercent' },
    { field: 'CESSAmount', label: 'CESSAmount' }
  ];
  // pager: PagerDataV7;


  constructor(private tradeordersService: TradeOrdersService,
    private router: Router,
    private messageService: MessageService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private exportService: ExportServiceService,
    private pilotService: PepolePilotService,
    private ItemServices: TradeitemmasterService, ) {
    this.isopen === false

    this.CurrentStatus = [
      { label: 'Select Order Status', value: null },
      { label: 'Booked', value: 'Booked' },
      { label: 'Cancelled', value: 'Cancelled' },
      { label: 'Delivered', value: 'Delivered' },
      { label: 'Shipped', value: 'Shipped' },
    ];

  }

  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
    }
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
    this.blocked = true;   
    this.cols = [
      { field: 'OrderNo', header: 'OrderNo' },
      { field: 'BuyerSkCode', header: 'BuyerSkCode' },
      { field: 'BuyerMobile', header: 'BuyerMobile' },
      { field: 'SellerMobile', header: 'SellerMobile' },
      { field: 'BuyerName', header: 'BuyerName' },
      { field: 'SellerSkCode', header: 'SellerSkCode' },
      { field: 'SellerName', header: 'SellerName' },
      { field: 'ItemName', header: 'ItemName' },
      { field: 'MRP', header: 'MRP' },
      { field: 'Qty', header: 'Qty' },
      { field: 'AmountWithoutTax', header: 'AmountWithoutTax' },
      { field: 'CurrentStatus', header: 'CurrentStatus' },
    ];
    this.pageSize = 7;
    this.paginator = {
      Name: '',
      OrderStatus: '',
      Skip: 0,
      Take: this.pageSize,
      itemName: '',
      orderNo: '',
      skcode: '',
      cityid: null,
      categoryid: null,
      startdate: null,
      enddate: null
    }

    this.Id = '';
    this.ItemServices.GetCityV2().subscribe(result => {
      this.cityLists = result;
      console.log('this.cityListcityList: ', this.cityList);
    });
    this.ItemServices.SelectCity().subscribe(result => {
      this.cityList = result;
      console.log('this.cityListcityList: ', this.cityList);
    });

    this.ItemServices.SelectCategoryV2().subscribe(result => {
      this.CategoryList = result;
      console.log('this.CategoryName: ', this.CategoryList);
    });

    // this.tradeordersService.getallorder().subscribe(result => {
    //   console.log('result is : ', result);
    //   this.orderList = result;
    // })
    this.blocked = false;
    this.initialize();

    // this.cityid = '';
    // this.pilotService.City().subscribe(result => {
    //   this.cityLists = result;
    // })
  }


  exportOrder() {
    this.blocked = true;   
    
    this.exportpage = {
      Name: '',
      OrderStatus: this.paginator.OrderStatus,
      Skip: 0,
      Take: this.totalRecords,
      itemName: '',
      orderNo: '',
      skcode: '',
      cityid: null,
      categoryid: null,
      startdate: null,
      enddate: null
    }
    this.blocked=true;
    this.tradeordersService.getallorderWithSearch(this.exportpage).subscribe(result => {
      this.blocked=false;
      this.exportData = result.TradeOrdersInvoiceDCs;
      this.exportService.exportAsExcelFile(this.exportData, 'Order');
      this.blocked = false;


    })
  }


  private initialize() {
    this.blocked = true;
    this.tradeordersService.getallorderWithSearch(this.paginator).subscribe(result => {
      this.orderList = result.TradeOrdersInvoiceDCs;
      if (this.orderList && this.orderList.length > 0) {
        this.orderList.forEach(item => {
          let fromDate = new Date(item.CreatedDate);
          let toDate = new Date();
          const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          item.tatInDays = diffDays;
        });
      }

      this.totalRecords = result.total;
      this.blocked = false;
    });
  }


  onNameChange() {
    this.blocked = true;
    
    if ((this.paginator.Name && this.paginator.Name.length > 2)
      || (this.paginator.skcode && this.paginator.skcode.length > 2)
      || (this.paginator.orderNo && this.paginator.orderNo.length > 2)
      || this.paginator.OrderStatus
      || this.paginator.cityid
      || this.paginator.categoryid
      || (this.rangeDates[0] && this.rangeDates[1])
      || (this.paginator.itemName && this.paginator.itemName.length > 2)
      || (this.paginator.cityid != null)) {
      this.paginator.Skip = 0;
      this.paginator.Take = this.pageSize;
      if (this.rangeDates) {
        this.paginator.startdate = this.rangeDates[0];
        this.paginator.enddate = this.rangeDates[1];
      }
      this.blocked = false;
      this.initialize();
    }
    this.blocked = false;
  }

  onClear() {
    this.paginator = {
      Name: '',
      OrderStatus: '',
      Skip: 0,
      Take: this.pageSize,
      itemName: '',
      orderNo: '',
      skcode: '',
      cityid: null,
      categoryid: null,
      startdate: null,
      enddate: null
    }
    this.rangeDates = null;
     
    this.initialize();
  }
  search(data) {
    this.isDetails = false;
    if ((this.searchModel || this.searchModel) && (!this.searchModel)) {
      this.messageService.add({ severity: 'error', summary: 'Please Select City', detail: '' });
    }
    else if (this.searchModel || this.searchModel || this.searchModel) {



    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Enter Details', detail: '' });
    }

  }

  load(event) {
    this.paginator.Skip = event.first;
    this.paginator.Take = event.rows;

    this.initialize();


  }

  openCustomer(customerID: any) {
    this.router.navigateByUrl('layout/trade/customer-edit/' + customerID);
  }
  openDetails(d, e) {
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }else{
      this.selectedRow = e;
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log('row is:', this.selectedRowDetails);
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      
    }
    this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
  }

  onDelete(tradeordersService: any) {
    console.log('tradeordersService', tradeordersService);
    this.modalService.dismissAll("done");

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {

        //this.messageService.add({severity:'success', summary: 'Deleted Successfully!', detail:''});
      }
    });



  }


}

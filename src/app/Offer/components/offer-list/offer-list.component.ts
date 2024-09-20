import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from 'app/Offer/Service/offer.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { AnyRecordWithTtl } from 'dns';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferListComponent implements OnInit {

  //-------------------------------------------

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  //-------------------------------------------
  totalRecordsOffer:any
  totalRecordsBillDiscount:any
  blocked: boolean=false;
  WarehouseList: any;
  offerlist: any;
  billDiscountList: any;
  totalRecords: any;
  start: Date;
  WarehouseId: any;
  status: any;
  SelectedStatus: any;
  end: Date;
  startDateSearch: Date;
  keySearch: any;
  OfferOn: any = 'Offer Task';
  skip: any;
  getUpdateTYpe = 'Offer';
  take: any;
  Status: any;
  rows: number = 10;
  first: number = 0;
  statusUpdatePopup: boolean = false;
  viewCustomerpop: boolean = false;
  showViewDataPop: boolean = false;
  viewMoreTableRow: boolean = false;
  updateOfferValue: boolean = false;
  getListRowData;
  listTypeValue;
  entity = "Offer";
  forOfferTypeId = 0;
  OfferTypeData: any;
  offertypeName: any;
  includeSectionData: any;
  excludeSectionData: any;
  BilldiscountDc: any;
  includeCheck: boolean = false;
  excludeCheck: boolean = false;
  IncludeSections: string = "lux";
  numbers: number[] = [];
  ShowType: any
  showtypeArr: any;
  IncludeExclude: [] = [];
  apiURL:any;
  GlobalSearch: string;
  popupOpen: boolean = false
  constructor(private warehouseService: WarehouseService,
    private router: Router, private OfferService: OfferService, public exportService: ExportServiceService) {
      this.apiURL = environment.apiURL;
    this.ShowType = [
      { name: 'All', code: '-1' },
      { name: 'Activate', code: '1' },
      { name: 'Deactivate', code: '0' },
    ];
  }


  ngOnInit() {
    this.getAllWarehouseList();
    // this.getAllOfferList(this.WarehouseId, this.startDateSearch, this.end, this.OfferOn);
  }
  showTypeValue: any;
  ShowtypeFunc() {
    this.showTypeValue = this.showtypeArr.code;
    this.totalRecords = null;
    this.skip = 1;
  }
  popUp() {
    this.popupOpen = true
  }

  getAllWarehouseList() { // get all wherehouse list for top search dropdown
    this.blocked=true;
    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.WarehouseList = result;
      this.blocked=false;
    })
  }
  Offerfilter(event) {
    this.keySearch = event.target.value;
  }

  clearGlobalSearch() {
    this.keySearch = '';
    this.GlobalSearch = '';
  }

  viewMoreTableFields(rowdata, listType) { // View More table Fields
    this.getListRowData = rowdata;
    this.listTypeValue = listType;
    this.viewMoreTableRow = true;
    this.forOfferTypeId = this.getListRowData.OfferId
  }
  ExcludeIncludeArr: any[] = [];
  IncludeOfferOn: any;
  ExcludeItemName: any;
  ISInclude: any;
  offerType() {
    // this.blocked=true;

    this.OfferService.getOfferTypeDetails(this.forOfferTypeId).subscribe(res => {
      console.log(res);
      this.OfferTypeData = res;
      this.offertypeName = this.OfferTypeData.OfferType;
      this.includeSectionData = this.OfferTypeData.IncludeSections;
      this.excludeSectionData = this.OfferTypeData.ExcludeSections;
      this.BilldiscountDc = this.OfferTypeData.BillDiscountRequiredItemDcs;
      console.log("this.BilldiscountDc", this.BilldiscountDc);

      console.log("Include Section Area:-", this.includeSectionData);
      //console.log("Offer On",this.includeSectionData[0]['OfferOn']);
      //this.IncludeOfferOn=this.includeSectionData[0]
      //console.log("Include Offer On",this.IncludeOfferOn);

      this.ExcludeIncludeArr = [];
      if (this.includeSectionData != null)
        this.includeSectionData.forEach(element => {
          this.ExcludeIncludeArr.push(element);
        });

      if (this.excludeSectionData != null)
        this.excludeSectionData.forEach(element => {
          this.ExcludeIncludeArr.push(element);
        });

      console.log("this.ExcludeIncludeArr", this.ExcludeIncludeArr);


      if (this.includeSectionData != null) {
        this.includeCheck = true
      }

      if (this.excludeSectionData != null) {
        this.excludeCheck = true;
      }
      console.log("Exclude Section Area :- ", this.excludeSectionData);
      this.ExcludeItemName = this.excludeSectionData[0].ExcludeItemName
      this.ISInclude = this.excludeSectionData[0].IsInclude
      //console.log(this.ExcludeItemName);
      //  console.log(this.ISInclude);

      //console.log(this.ExcludeIncludeArr,'checking');

      //this.ExcludeIncludeArr.push(this.IncludeOfferOn)
      // console.log("Array",this.ExcludeIncludeArr);      
      console.log(this.OfferTypeData)
    }
      ,
      (err) => {
        alert("error")
        console.log(err);

      })
      // this.blocked=false;

  }
  Openedit(rowData) { // Open Popup for update 
    this.getListRowData = rowData;
    this.updateOfferValue = true;
  }
  closepop(e) { // Close Popup
    this.updateOfferValue = false;
  }

  endDateVal(e) {
    this.end = e.toLocaleString('en-US')
  }
  startDateUpdate(e) {
    this.startDateSearch = e.toLocaleString('en-US')
  }
  load(event) {
  
    // console.log(this.startDateSearch, 'event');
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;

    // console.log("------------------------------------------------");
    // console.log(Last, event.rows, this.skip, event.first, this.take);

    if (this.skip < 1) {
      this.skip = 1;
    };
    const payload = {
      DateFrom: this.startDateSearch ? moment(this.startDateSearch).format('DD/MM/YYYY') : null,
      DateTo: this.end ? moment(this.end).format('DD/MM/YYYY') : null,
      page: this.skip,
      totalitem: this.take,
      keyword: this.keySearch ? this.keySearch : null,
      warehouseid: this.WarehouseId ? this.WarehouseId : null,
      status: this.showTypeValue ? this.showTypeValue : '-1',
      ShowType : this.showTypeValue ? this.showTypeValue : '-1',
    }
    this.blocked=true;
    this.OfferService.getAllOffersList(payload, this.OfferOn).subscribe(res => {
      this.blocked=false;
      console.log(res, 'result');
      console.log(this.offerlist, 'this.offerlist');
      if (this.OfferOn == 'Offer Task') {
        this.offerlist = res.OfferListDTO;
        this.totalRecordsOffer = res.total_count;  
      } else {
        this.billDiscountList = res.BillListDTO;
        this.totalRecordsBillDiscount = res.total_count;

      }
    })
  }

  viewAllData(rowData) {
    this.getListRowData = rowData;
    this.showViewDataPop = true
  }

  statusUpdatePop(rowData) {
    this.getListRowData = rowData;
    console.log(rowData);

    this.statusUpdatePopup = true
  }
  closeStatusPop(e) {
    this.statusUpdatePopup = false
  }

  statusUpdate(e) {
    // console.log(e, 'eeeeeeeee');
  }
  Search(searchOption) {
   
    // console.log(this.keySearch, 'this.keySearch');
    this.skip = this.skip;
    this.take = this.rows;
    // this.Status = Number.parseInt(this.SelectedStatus);
    this.totalRecords = 0;
    const payload = {
      DateFrom: this.startDateSearch ? this.startDateSearch.toLocaleString() : null,
      DateTo: this.end ? this.end.toLocaleString() : null,
      page: this.skip,
      totalitem: this.take,
      // IsActive: this.status,
      keyword: this.keySearch ? this.keySearch : null,
      warehouseid: this.WarehouseId ? this.WarehouseId : null,
      status: this.showTypeValue ? this.showTypeValue : '-1',
      ShowType : this.showTypeValue ? this.showTypeValue : '-1',
    }
    console.log("payload - search button", payload);

    if (searchOption == "byWarehouse" && payload.warehouseid == null) {
      alert("Please Select a Warehouse First")
      return
    } else if (searchOption == "byKeyword" && (payload.keyword == null || payload.keyword == " ")) {
      alert("Please Enter a Keyword")
      return
    } else {

    }
    this.blocked = true;
    this.OfferService.getAllOffersList(payload, this.OfferOn).subscribe(res => {
      this.blocked = false;
      console.log(res, 'result');
      if (this.OfferOn == 'Offer Task') {
        this.offerlist = res.OfferListDTO;
        this.totalRecordsOffer = res.total_count;
        // console.log(this.offerlist, 'this.offerlist');
      } else {
        this.billDiscountList = res.BillListDTO;
        console.log("BillDiscount", this.billDiscountList)
        this.totalRecordsBillDiscount = res.total_count;
        // console.log(this.billDiscountList, 'this.billDiscountList');
      }
    })

  }


  clearBtn() {
    //this.idValid=null;
    debugger;
    this.WarehouseId = null;
    this.startDateSearch = null;
    this.keySearch = null;
    this.end = null;
    this.Offerfilter(event);
    window.location.reload();
  }
  exportFileData() { // export file
    let StartDate;
    let endDate;
    if (this.startDateSearch != null) {
      StartDate = this.startDateSearch ? this.startDateSearch.toLocaleString() : null;
    }
    if (this.end != null) {
      endDate = this.end ? this.end.toLocaleString() : null;
    }
    this.getAllWarehouseList();
    if (this.WarehouseId == undefined || this.WarehouseId == "" || this.startDateSearch == undefined || this.startDateSearch == null || this.end == undefined || this.end == null) {
      if (this.WarehouseId == undefined || this.WarehouseId == "") {
        this.WarehouseId = 0;
      }
      if (this.startDateSearch == undefined || this.startDateSearch == null) {
        StartDate = '';
      }
      if (this.end == undefined || this.end == null) {
        endDate = '';
      }
    }
    this.OfferService.getDataExport(this.WarehouseId, StartDate, endDate).subscribe(result => {
      this.exportService.exportAsExcelFile(result, 'offers');
    });
  }

  addNewOffer() {
    this.router.navigateByUrl("/layout/offer/add-offer");
  }
  addOfferWithUploader() {
    this.router.navigateByUrl("/layout/offer/add-OfferWithUploader");
  }

  freebiesuploader() {
    this.router.navigateByUrl("/layout/offer/freebies-uploader");
  }
  viewOfferData(rowdata) { // view customerpopup 
    this.viewCustomerpop = true;
    this.getListRowData = rowdata
  }
  onTabChange(event) { //
    console.log(event);
    this.offerlist = [];
    this.billDiscountList = [];
    this.totalRecords = '';
    this.skip = 1;
    this.rows = 10;
    this.first = 0;
    if (event.index == 0) {
      this.OfferOn = 'Offer Task';
      this.getUpdateTYpe = 'Offer';
      this.Search(1);
    } else if (event.index == 1) {
      this.OfferOn = 'Bill Discount';
      this.getUpdateTYpe = 'BillDiscount';
      this.Search(1);
    }
  }
  offerTab:string='offer'
  onTabChange1(event) {
   
    // this.OfferOn=''
    console.log(event);
    if (event.index == 0) {
      // this.OfferOn = 'Offer';
      this.offerTab='Offer'

    }
    else if (event.index == 1) {
      this.offerTab = 'Details';
      this.offerType()
    }
  }

  viewAllOferpop:boolean=false
  viewAllOfer()
  {
    this.viewAllOferpop=true;
  }
  onUpload(event) {
    debugger;
    const files = event.files[0];
    console.log(files);
    let file = new FormData();
    file.append("file", files)
 
    this.blocked=true;
    this.OfferService.OfferUploadFile(file).subscribe((res:any) => {
        debugger;
        console.log("result",res)
        debugger
        this.blocked=false; 
        console.log(res)
        if(res == 'Offer Created Successfully'){
          this.viewAllOferpop = false;
          alert(res)
        }
        else{
          alert(res)
        }
      })
    }
  
}

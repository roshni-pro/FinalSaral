import { ItemService } from 'app/shared/services/item.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { OpreportsService } from 'app/opreports/services/opreports.service';
import { CityService } from 'app/shared/services/city.service';
import { Table } from 'primeng/components/table/table';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-new-item-scheme',
  templateUrl: './new-item-scheme.component.html',
  styleUrls: ['./new-item-scheme.component.scss']
})
export class NewItemSchemeComponent implements OnInit {
  @ViewChild(Table, { static: false }) table: Table;
  whetherornot = false;
  opreportdata = [];
  baseURL: any;
  Cityid: any[]=[]//number = null;
  SubsubCategoryid: number = null;
  SubCategoryId: number = null;
  ReportType = '';
  successfullSubmit:boolean=false
  itemListArray:any[]=[]
  display:boolean=false
  filterOPReports: ItemSchemeFilterModel;
  blocked: boolean;
  selectedComapnyStockCode:boolean=false
  selectedComapnyCode:boolean=false
  TotalRecords: any;
  FromDate: any;
  files:any
  companyStockCode:any=null
  uploadData:any[]=[]
  companyCode:any=null
  ToDate: any;
  columns1 = [
    { field: 'StartDate', header: 'StartDate' },
    { field: 'EndDate', header: 'EndDate' },
    { field: 'StatusType', header: 'Status' },
    { field: 'CreatedDate', header: 'CreatedDate' },
    { field: 'CreatedBy', header: 'CreatedBy' },
    // { field: 'ApprovedBy', header: 'ApprovedBy' },
    // { field: 'ApprovedDate', header: 'Approved' },
    // { field: 'IsApproved', header: 'IsApproved' },
    { field: 'UploadedSheetUrl', header: 'Sheet' },
    { field: 'ItemSchemeMasterId', header: 'GeneratedId' }
  ];
  minimumDate: any;
  @ViewChild("file", { static: false }) file;
  columns = [
    { field: 'ItemMultiMRPId', header: 'Item MultiMRP Id' },
    { field: 'itemBaseName', header: 'item Base Name' },
    { field: 'CategoryName', header: 'Category Name' },
    { field: 'SubcategoryName', header: 'Sub category Name' },
    { field: 'SubsubcategoryName', header: 'Brand Name' },
    { field: 'PTR', header: 'PTR' },
    { field: 'BaseScheme', header: 'Base Scheme' },
    { field: 'CityName', header: 'City Name' },
    { field: 'CreatedBy', header: 'Created By' },
  ];
  Key: any = '';

  reporttypes = [
    { name: 'Order Color Amount', val: 'OrderColorAmount' },
    { name: 'Order Color Count', val: 'OrderColorCount' },
    { name: 'Order Color Time', val: 'OrderColorTime' }
  ];


  buyerDetails = [];
  heading: string;
  displayBuyerDetails: boolean = false;
  isUploadedCoupon: boolean;
  warehouseList: any;
  cities = [];
  BrandList: any;
  subCategory:any;
  isCrudItem : boolean = false;
  itemList : any;
  selectedData : any;
  selectedItem : any;
  SelectedCityid : any;
  isExist : boolean = false;
  isEdit : boolean = false;
  entity : any;
  isHistoryOpen : boolean = false;

  constructor( private ItemService: ItemService, private cityService: CityService, private exportService: ExportServiceService, private warehouseService: WarehouseService, private opreportsservice: OpreportsService, private messageService: MessageService, public subSubCategoryService: SubSubCategoryService,
    private confirmationService: ConfirmationService,private router : Router ) { this.selectedItem={}; this.entity= "ItemScheme";this.baseURL = environment.apiURL;}

  ngOnInit() {
    this.initialize();
    this.getAllCities();
    this.FromDate = new Date();
    this.ToDate = new Date(this.FromDate.setHours(0, 0, 0, 0));
    this.ToDate = new Date();
    this.minimumDate = new Date();
    this.subSubCategoryService.GetBrand().subscribe(result => {
      this.BrandList = result;
    })
    this.getSubCategory();
  }


  getSubCategory(){
    this.blocked=true;
    this.ItemService.getSubCategory().subscribe((result:any) => {
      console.log(result);
      this.subCategory = result;
      this.blocked=false;
    })
  }

  initialize() {
    this.filterOPReports = new ItemSchemeFilterModel();
  }

  getAllCities() {
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
    });
  }
  
  CID:any
  GetOPReportDetails() {
    this.table.reset();
    if (this.Key == "") {
      this.Key = "";
    }
    if(this.Cityid.length!=0){
        this.CID=[];
        this.Cityid.forEach(element => {
        this.CID.push(element.Cityid)
      });
      this.blocked=true;
      let searchModel = { CityId: this.CID, Key: this.Key, Skip: 0, Take: 10 };
      this.ItemService.getItemScheme(searchModel).subscribe(result => {
        this.whetherornot = true;
        this.blocked=false;
        this.Key = "";
        this.opreportdata = result;
        if(result.length > 0){
        this.TotalRecords = result[0].totalRecord;
        }else{
          this.TotalRecords = null;
        }
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'please select city!', detail: '' });

    }
  }

  GetOPReportDetailsPager(event) {
    if (this.Key == "") {
      this.Key = "";
    }
   
    if(this.Cityid.length!=0){
    this.CID=[];
    this.Cityid.forEach(element => {
    this.CID.push(element.Cityid)
  });
    let searchModel = { CityId: this.CID, Key: this.Key, Skip: event.first, Take: 10 };
    this.ItemService.getItemScheme(searchModel).subscribe(result => {
      this.whetherornot = true;
      this.Key = "";
      this.opreportdata = result;
      if(result.length > 0)
      {
        this.TotalRecords = result[0].totalRecord;
      }else{
        this.TotalRecords = null;
      }
      
    });
  }
  }
  CityName:any
  updateItemSchemeDetails(excelData, fileupload) {
    this.CID=[];
    this.Cityid.forEach(element => {
    this.CID.push(element.Cityid)
  });
    this.CityName=[];
    this.Cityid.forEach(element => {
    this.CityName.push(element.Cityname)
  });


    excelData.forEach(element => {
      element.itemBaseName = '',
        element.CategoryName = '',
        element.SubcategoryName = '',
        element.SubsubcategoryName = '',
        element.totalRecord = 0,
        element.Cityid = this.Cityid;
        element.CityName = this.Cityid ? this.cities.filter(x => x.Cityid == this.CID)[0].CityName : this.messageService.add({ severity: 'error', summary: 'please select city!', detail: '' });
    });

    this.ItemService.updateItemSchemeDetails(excelData).subscribe(result => {
      if (result && result.Status == true) {
        
        fileupload.clear();
        this.blocked = false;
        this.messageService.add({ severity: 'success', summary: 'data updated successfully!', detail: '' });
        this.GetOPReportDetails();
      }
      else {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'problem in saving data!', detail: '' });
      }
    },
      err => {
        // this.messageService.add({ severity: 'error', summary: 'some error has occured!', detail: '' });
      }
    );
  }

  DownLoadSampleFile() {
    let arr = [];
    arr.push({
      'EAN No.':null, 
      'CompanyCode'	:null,
      'CompanyStockCode':null,
      'ItemName'	:null,
      'Item Code':null,
      'Item Multi MRP': '',
      'MRP'	:null,
      'PTR'	:null,
      'GST'	:null,
      'Category'	:null,
      'Subcategory'	:null,
      'Brand'	:null,
      'City'	:null,
      'Zone'	:null,
      'BaseScheme'	:null,
      'IncludeBaseSchmeForPOPrice'	:null,
      'IncludeMaxSlabForPOPrice'	:null,
      'SlabPurchaseQTY1'	:null,
      'SlabScheme1'	:null,
      'SlabPurchaseQTY2'	:null,
      'SlabScheme2'	:null,
      'SlabPurchaseQTY3'	:null,
      'SlabScheme3'	:null,
      'SlabPurchaseQTY4'	:null,
      'SlabScheme4'	:null,
      'BaseItemQty'	:null,
      'ChildItem'	:null,
      'ChildItemCompanycode'	:null,
      'ChildItemCompanyStockcode'	:null,
      'FreeQty'	:null,
      'FreeStockQty'	:null,
      'QPS Target':null,
      'QPS%':null,
      'Promo'	:null,
      'Visibility'	:null,
      'KVI/Non KVI':null,
      'Additional Scheme%':null,
      'onvoiceMargin'	:null,
      'offinvoicemargin':null,
      'StartDate':null,
      'EndDate':null,
    })
  this.exportService.exportAsExcelFile(arr,"SampleFile ItemScheme")
  }

  Upload(event, uploadCustom) {
     this.companyStockCode=' '
     this.companyCode=' '
    this.selectedComapnyCode=false
    this.selectedComapnyStockCode=false
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      var dataFromExcel = jsonData;
      const dataString = JSON.stringify(jsonData);
      let excelData = dataFromExcel.data;
      let arrayData = [];
      console.log(excelData,"excelData") 
      excelData.forEach((element, index) => {
        let obj = {
          EANNo:element.EANNo, 
          CompanyCode:element.CompanyCode,
          CompanyStockCode:element.CompanyStockCode,
          ItemName:element.ItemName,
          MRP:element.MRP,
          PTR:element.PTR,
          SlabScheme1:element.SlabScheme1,
          SlabScheme2:element.SlabScheme2,
          SlabScheme3:element.SlabScheme3,
          onvoiceMargin:element.onvoiceMargin,
          offinvoicemargin:element.offinvoicemargin,
          ItemCode:element.ItemCode,
          ItemMultiMRP:element.ItemMultiMRP,
          GST:element.GST,
          Category:element.Category,
          Subcategory:element.Subcategory,
          Brand:element.Brand,
          City:element.City,
          Zone:element.Zone,
          Rate1:element.Rate1,
          Rate2:element.Rate2,
          Rate3:element.Rate3,
          QPSTarget:element.QPSTarget,
          QPS:element.QPS,
          Promo:element.Promo,
          Visibility:element.Visibility,
          KVIANDNonKVI:element.KVIANDNonKVI,
          AdditionalScheme:element.AdditionalScheme,
        }
        arrayData.push(obj);
      });
      console.log(arrayData);
      this.uploadData=arrayData

      if(arrayData.length==0)
      {
        this.messageService.add({severity:'error', summary: 'Invalid File'});
        this.display=false
        return false
      }
      else
      {
        this.display=true
       
         arrayData.forEach(element=>
        {
          if(element.CompanyCode!=null && element.CompanyStockCode!=null)
          {
             if(element.ItemCode ==null || element.ItemName == null || element.ItemMultiMRP == null)
             {
              this.messageService.add({ severity: 'error', summary:'ItemName, ItemCode and ItemMultiMRP is Empty In Excel File' });
              this.display=false
              return false
             }
             else
            {
               this.display=true
               this.messageService.add({severity:'success', summary:'File Upload Successfully'});
            }
          }
          if(element.CompanyCode!=null)
          {
            if(element.ItemCode ==null || element.ItemName == null)
            {
              this.messageService.add({ severity: 'error', summary:'Please fill ItemName and ItemCode in excel file' });
              this.display=false
              return false
            }
            else
            {
              this.companyCode=element.CompanyCode 
              this.selectedComapnyCode=true
              this.display=true
              this.messageService.add({severity:'success', summary:'File Upload Successfully'});
            }
           
          }
          if(element.CompanyStockCode!=null)
          {
            if(element.ItemCode ==null || element.ItemName == null || element.ItemMultiMRP == null)
            {
              this.messageService.add({ severity: 'error', summary:'Please Fill ItemName, ItemCode and ItemMultiMRP In Excel File' });
              this.display=false
              return false
            }
            else
            {
              this.companyStockCode=element.CompanyStockCode
              this.selectedComapnyStockCode=true
              this.display=true
              this.messageService.add({severity:'success', summary:'File Upload Successfully'});
            }
          }

        })
      }
     arrayData=[]
    }
    reader.readAsBinaryString(file);
  }
  uploadCoupon() {
    this.isUploadedCoupon = true;
  }
  closeUploadingCouponDialog() {
    this.isUploadedCoupon = false;
  }
  exportToExcel() {
    if (this.Cityid) {
      let opreport = [];
      if (this.Key == "") {
        this.Key = "";
      }
      this.CID=[];
      this.Cityid.forEach(element => {
      this.CID.push(element.Cityid)
    });
      let searchModel = { CityId: this.CID, Key: this.Key, Skip: 0, Take: 10 };
      this.blocked=true;
      this.ItemService.getItemScheme(searchModel).subscribe(result => {
        if (result && result.length) {
          let searchModelForExport = { CityId: this.CID, Key: this.Key, Skip: 0, Take: result[0].totalRecord };
          this.ItemService.getItemScheme(searchModelForExport).subscribe(res => {
            this.blocked=false;
            // opreport = res
            if (res && res.length) {
              res.forEach(x => {
                opreport.push({
                  CityName: x.CityName,
                  ItemMultiMRPId: x.ItemMultiMRPId,
                  itemBaseName: x.itemBaseName,
                  CategoryName: x.CategoryName,
                  SubcategoryName: x.SubcategoryName,
                  BrandName: x.SubsubcategoryName,
                  BaseScheme: x.BaseScheme,
                  PTR: x.PTR
                });
              });
              this.exportAsExcelFile(opreport, 'exportFile');
            }
          });
        }
        else{
          alert("No data found!")
          this.blocked=false;
        }
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'please select city!', detail: '' });
    }
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    let wscols = [
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    worksheet['!cols'] = wscols;
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {

    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);

  }
  checkNan(val) {
    return true;
  }

  uploadFile(file) {
    this.display=true
    console.log(file.files[0])
    this.files=file.files[0]
    }
  
  onClickAdd()
  {
    console.log('1cityid',this.Cityid);
    console.log('selectedData',this.selectedData);
    console.log('selectedItem',this.selectedItem);
    this.isEdit = false;
    this.selectedData = null;
    this.selectedItem = [];
    this.SelectedCityid = this.Cityid;
    // this.Cityid = null;
    this.isCrudItem = true;
  }
  
  onsearch(cityId) {
    console.log("cityId", cityId)
  }
  skip1:number;
  take1:number
  load2(event) {
    this.take1 = event.rows;
    this.skip1 = event.first; 
    if(this.showdetailPage){
      this.ItemSchExcelUploaderDetailsList=[];
      this.navigateToDetail(this.itemSchemeDetaildata);
      this.skip1=0 ;this.take1=10;this.TotalRows=0
    } 
  }
  ExportItemSchemeDetails(){
    debugger;
    if(this.ItemSchExcelUploaderDetailsList!=null && this.ItemSchExcelUploaderDetailsList!=undefined && this.ItemSchExcelUploaderDetailsList.length>0){
      this.blocked=true
      const res = this.ItemSchExcelUploaderDetailsList.map((x) => {
        const newdata = {};
        for (const key in x) {
          if (key == 'StartDate' || key == 'EndDate') {
            newdata[key] = x[key]?moment(x[key]).format('DD/MM/yyyy h:mm '):'--'
          }else {
            if(typeof(x[key])=='number') newdata[key]=parseFloat(x[key]).toFixed(2);
            newdata[key]=x[key];
          }
        }
        return newdata;
      });
      this.exportService.exportAsExcelFile(res,"ExportItemSchemeDetails")
      this.blocked=false;
    }else if(this.ItemSchExcelUploaderDetailsList.length==0) this.messageService.add({ severity: 'error', summary: 'Data not found!', detail: '' });
    else this.messageService.add({ severity: 'error', summary: 'Something went worng!', detail: '' });
  }
  first1=0;
  showdetailPage:boolean=false
  ItemSchExcelUploaderDetailsList:any
  TotalRows:number
  itemSchemeDetaildata:any
  getOverAll:any
  navigateToDetail(rowdata){
    debugger
    this.first1=0
    this.itemSchemeDetaildata=rowdata;
    this.ItemSchExcelUploaderDetailsList=[];
    this.blocked=false;
    this.ItemService.GetItemSchExcelUploaderDetails(rowdata.Id,this.skip1,this.take1).subscribe(result => {
      this.blocked=false;
      if(result.length > 0){
        this.showdetailPage=true;
        //result.filter(x=> x.Id);
         this.ItemSchExcelUploaderDetailsList = result.map((x) => {
          const newdata = {};
          for (const key in x) {
            if (key !== 'Id' && key !== 'ExcelUploaderMasterId' && key !== 'totalRecord') {
              newdata[key] = x[key];
            }
          }
          return newdata;
        });
        //this.ItemSchExcelUploaderDetailsList = result;
        this.getOverAll = Object.keys(this.ItemSchExcelUploaderDetailsList[0])
      this.TotalRows = result[0].totalRecord;
      }else{
        this.TotalRows = null;
        this.ItemSchExcelUploaderDetailsList=[];
        this.messageService.add({ severity: 'error', summary: 'Data not found!', detail: '' });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    });
  }

  skip:number=0;
  take:number=10;
  TotalCount:number;
  first=0;
  load1(event){
    this.take = event.rows;
    this.skip = event.first;
    this.search(false)
  }
  ExcelUploadItemSchemeList:any
  search(isshow){
    // this.table.reset();
    // if (this.Key == "") {
    //   this.Key = "";
    // }
    debugger;
    if(isshow){this.first = 0,this.skip=0 }
      if(this.Cityid.length==0 && isshow)
       {
        this.messageService.add({ severity: 'error', summary: 'please select city!', detail: '' });

      }else{
          this.CID=[];
          this.Cityid.forEach(element => {
          this.CID.push(element.Cityid)
        });
        this.blocked=true;
        this.ItemService.GetExcelUploadItemScheme(this.CID,this.skip,this.take).subscribe(result => {
          this.blocked=false;
          this.ExcelUploadItemSchemeList=[];
          this.ExcelUploadItemSchemeList = result;
          //this.Key = "";
          if(result.length > 0){
          this.TotalCount = result[0].totalRecord;
          }else{
            this.TotalCount = null;
            this.ExcelUploadItemSchemeList=[];
            this.messageService.add({ severity: 'error', summary: 'Data not found!', detail: '' });
          }
        });
      }

  }
  getItemList(event, CityId) {
    if (event.query.length > 2) {
      if (CityId > 0) {    
       
            this.ItemService.getBylistCityWise(CityId,event.query).subscribe(x => {
              this.itemList = x;                 
      })    
      } else {
        alert("Please select city.");
      }
    }

  }
  onmodelChange(selectedItem,event, CityId) {
    this.selectedItem =  selectedItem;
    this.ItemService.getExistItemListCityWise(CityId,selectedItem.itemBaseName).subscribe(exist => {          
      if(exist.Msg != null)
      {
        this.isExist = true;
        this.messageService.add({ severity: 'error', summary: exist.Msg, detail: '' });
        alert(exist.Msg);
      }else{this.isExist = false;}
  })      
  }
  CheckPtr(e){
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    if(e.match(pattern)) {
      this.selectedItem.PTR = undefined;
    }
    else{
     this.selectedItem.PTR
    }
  }

  CheckBscheme(e){
    var pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;
    if(e.match(pattern)) {
      this.selectedItem.BaseScheme = undefined;
    }
    else{
      this.selectedItem.BaseScheme
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
        event.preventDefault();
    }

    if ( event.which == 45 || event.which == 189 ) {
      event.preventDefault();
   }
 }
  saveItem(addItemForm : NgForm)
  {
    if(this.selectedItem.PTR>100){
      //this.messageService.add({ severity: 'error', summary: "PTR can't be greater than 100!", detail: '' });
      alert("PTR can't be greater than 100!")
    }
    else if(this.selectedItem.BaseScheme>100){
     //this.messageService.add({ severity: 'error', summary: "BaseScheme can't be greater than 100!", detail: '' });
      alert("BaseScheme can't be greater than 100!")
    }
    else{
      if (addItemForm.valid) {
        if(!this.isExist){
          if(!this.isEdit){
            var txt = 'Do you really want to add a new Item?'
          }else{
            var txt = 'Do you really want to update this Item?'
          }        
          this.confirmationService.confirm({
            header: 'Confirmation',
            message: txt,
            accept: async () => {
              if(!this.isEdit){
              this.blocked = true;
              let addScheme = {
                cityId : this.SelectedCityid,
                ItemMultiMRPId : this.selectedItem.ItemMultiMRPId,
                PTR : this.selectedItem.PTR,
                BaseScheme : this.selectedItem.BaseScheme,
                Id : null
              }
              this.ItemService.addItemCityWise(addScheme).subscribe(x=>{
                this.blocked = false;
                if(x)
                {
                  alert('Item Added Successfully!');
                  // this.Cityid = null;
                  this.SelectedCityid = null;
                  this.selectedData = null;
                  this.selectedItem = [];
                  this.isCrudItem = false;
                  this.messageService.add({ severity: 'success', summary: 'Item Added Successfully!', detail: '' });
                }else{
                  alert('Something Went Wrong!');
                  // this.Cityid = null;
                  this.SelectedCityid = null;
                  this.selectedData = null;
                  this.selectedItem = [];
                  this.isCrudItem = false;
                  this.messageService.add({ severity: 'error', summary: 'Something Went Wrong!', detail: '' });
                }
              });   
            }else{
              let addScheme = {
                cityId : this.Cityid ? this.SelectedCityid : this.SelectedCityid,
                ItemMultiMRPId : this.selectedItem.ItemMultiMRPId,
                PTR : this.selectedItem.PTR,
                BaseScheme : this.selectedItem.BaseScheme,
                Id : this.selectedItem.Id
              }
              this.blocked = true;
              this.ItemService.updateItemCityWise(addScheme).subscribe(x=>{
                this.blocked = false;
                if(x)
                {
                  alert('Item Updated Successfully!');
                  // this.Cityid = null;
                  this.SelectedCityid = null;
                  this.selectedData = null;
                  this.selectedItem = [];
                  this.isCrudItem = false;
                  this.messageService.add({ severity: 'success', summary: 'Item Updated Successfully!', detail: '' });
                }else{
                  alert('Something Went Wrong!');
                  // this.Cityid = null;
                  this.SelectedCityid = null;
                  this.selectedData = null;
                  this.selectedItem = [];
                  this.isCrudItem = false;
                  this.messageService.add({ severity: 'error', summary: 'Something Went Wrong!', detail: '' });
                }
              });  
            }       
             
            }
          })
        }else{
          alert('Data Already Exist!');
        }
      }
    }

  }
  onEditItem(col,rowData)
  {
    this.selectedItem = rowData;
    this.SelectedCityid = rowData.Cityid;
    this.isEdit = true;
    this.isCrudItem = true;
  }
  onCancelItem()
  {
    
          this.GetOPReportDetails();
          this.isCrudItem = false;
        // }
      // })
  }
  msg:any
  onSubmitFileData(Cityid)
  {

    this.CID=[];
    this.Cityid.forEach(element => {
    this.CID.push(element.Cityid)
  });

  if (this.CID.length  > 0 && this.file.nativeElement.files.length > 0) {
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    let formData = new FormData();
    formData.append('file', this.file.nativeElement.files[0], currentTimeInSeconds + ".xlsx");
    formData.append('CityIds', this.CID);
    // // formData.append('SubSubCatId', SubsubCategoryid);
    formData.append('StartDate', this.FromDate);
    formData.append('EndDate', this.ToDate);
    // console.log(this.CID);
    // if(this.selectedComapnyCode== false && this.selectedComapnyStockCode == false)
    // {
    //   this.messageService.add({ severity: 'error', summary: 'Select atleast One Feild!', detail: '' });
    //   return false
    // }
    this.blocked = true;
    debugger;
    this.SubCategoryId==null?this.SubCategoryId=0:this.SubCategoryId;
    this.ItemService.UploadExcel1(this.selectedComapnyCode,this.selectedComapnyStockCode,this.SubCategoryId,this.SubsubCategoryid,this.CID,formData).subscribe((result:any) => {
      if (result) {
        console.log(result,"result")
        this.msg=result
        this.blocked = false;
        if(result=='Your Excel data is uploaded succesfully.')
        {
          this.display=false;
         alert("File uploaded successfully!")
        window.location.reload();
        }
        else
        {
          alert(this.msg)
          window.location.reload();
        }
        
      }
      else {
        alert("Excel Sheet format not correct")
        window.location.reload();
      }
      console.log(result,"result");
    },
    err => {
      this.blocked=false
      alert(err.error.Message)
      window.location.reload();
    }
    
    );
  }
  
  }
  onClickHistory(rowData){
    this.selectedItem = rowData;
    this.isHistoryOpen = true;
  }
  Oncancel()
  {
    this.display=false  
  }

  ischeckDC:boolean=false;
  checkDC(){
    if(!this.SubCategoryId || !this.FromDate || !this.ToDate){
      this.ischeckDC=false;
    }
    else{
      this.ischeckDC= true;
    }
  }
}
export class ItemSchemeFilterModel {
  Cityid: any;
  StartDate: Date;
  EndDate: Date;
  ReportType: string;
  constructor(data?) {
    this.Cityid = data && data.Cityid ? data.Cityid : null
    this.StartDate = data && data.StartDate ? data.StartDate : new Date(new Date().setMonth(new Date().getMonth() - 3));
    
    this.EndDate = data && data.EndDate ? data.EndDate : new Date();
    this.ReportType = data && data.ReportType ? data.ReportType : '';
  }

 
}

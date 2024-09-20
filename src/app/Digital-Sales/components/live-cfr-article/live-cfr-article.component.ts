import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExecutiveService } from 'app/executive-assignment/Services/executive.service';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/components/common/messageservice';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { SubCategoryService } from 'app/shared/services/sub-category.service';

@Component({
  selector: 'app-live-cfr-article',
  templateUrl: './live-cfr-article.component.html',
  styleUrls: ['./live-cfr-article.component.scss']
})
export class LiveCfrArticleComponent implements OnInit {
  [x: string]: any;
  blocked: boolean;
  data: any[];
  CfrItemList: any[];
  cols: any[];
  city:any
  selectCity:any=0;
  subcatList:any
  selectsubcat:any
  @ViewChild(Table, { static: false }) Table: Table;
  first: number = 0;
  constructor(private digitalsaleService: DigitalSaleService, private executiveService: ExecutiveService,
    private messageService: MessageService, private exportService: ExportServiceService,private subcategoryservice : SubCategoryService) { this.data = []; }

  ngOnInit() {
    this.cols = [
      { field: 'ItemNumber', header: 'Item Number' },
      { field: 'CategoryName', header: 'Category Name' },
      { field: 'BrandName', header: 'Brand' },
      { field: 'itemBaseName', header: 'itemBaseName' },
      { field: 'MRP', header: 'MRP' },
      { field: 'WarehouseName', header: 'Warehouse' },
      { field: 'Category', header: 'Classification' },
      { field: 'LimitValue', header: 'Limit Value' },
      // { field: 'active', header: 'active' },
      { field: 'activeItem', header: 'activeItem' }
    ];
    this.getcity()
    this.getSubCategory()
  }

  GetLiveCfr() {
    this.blocked = true;
    this.CfrItemList = null;
    debugger;
    if(this.selectCity != null && this.selectCity.Cityid > 0)
    {
    var City = this.selectCity ? this.selectCity.Cityid : null;
    var subCat = this.selectsubcat ? this.selectsubcat.SubCategoryId : null;
    this.executiveService.getLiveCfr(City,subCat).subscribe(result => {
debugger;
      this.blocked = false;
      this.CfrItemList = result;
      this.first = 0;
    });
  }else{
    alert('Please Select City!');
    this.blocked = false;
  }
  }
  exportExcel() { 
    if (this.CfrItemList && this.CfrItemList.length > 0) {
      this.exportService.exportAsExcelFile(this.CfrItemList, 'LiveCfrItemReport');
    } else { alert("No record found"); }
  }

  downloadSampleFile() {
    let dummyData = []
    dummyData.push({ ItemNumber: '' })
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dummyData);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'SampleCfrUpload');
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }
  getcity()
  {
    this.executiveService.getCityList().subscribe(res=>
      {
        console.log(res);
        this.city=res
      })
  }
  getSubCategory()
  {
    debugger;
    this.subcategoryservice.GetAllSubCategory().subscribe(result=>{
      debugger;
    this.subcatList =result; 
     });
  }
}


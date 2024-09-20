import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { CityService } from 'app/shared/services/city.service';
import { Table } from 'primeng/components/table/table';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { ItemService } from 'app/shared/services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-item-scheme-master',
  templateUrl: './item-scheme-master.component.html',
  styleUrls: ['./item-scheme-master.component.scss']
})
export class ItemSchemeMasterComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  Id: number = null;
  Cityid: number = null;
  SubsubCategoryid: number = null;
  cities = [];
  itemschememasterList = [];
  blocked: boolean;
  TotalRecords: any;
  searchModel: any;
  BrandList: any;
  isInvalid: boolean;
  baseURL: any;
  columns = [
    { field: 'Id', header: 'MasterId' },
    { field: 'BrandName', header: 'BrandName' },
    { field: 'StartDate', header: 'StartDate' },
    { field: 'EndDate', header: 'EndDate' },
    { field: 'CreatedDate', header: 'CreatedDate' },
    { field: 'CreatedBy', header: 'CreatedBy' },
    { field: 'IsActive', header: 'IsActive' },
    { field: 'ApprovedBy', header: 'ApprovedBy' },
    { field: 'ApprovedDate', header: 'ApprovedDate' },
    { field: 'IsApproved', header: 'IsApproved' },
    { field: 'UploadedSheetUrl', header: 'UploadedSheetUrl' }
  ];
  constructor(private router: Router, private r: ActivatedRoute, private cityService: CityService, private ItemService: ItemService, private exportService: ExportServiceService, private messageService: MessageService, public subSubCategoryService: SubSubCategoryService) { this.searchModel = {};this.baseURL = environment.apiURL; }
  ngOnInit() {
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
    });

    this.subSubCategoryService.GetBrand().subscribe(result => {
      this.BrandList = result;
    })
  }
  onBrandChange() {
    
    if (this.Cityid > 0 && this.SubsubCategoryid > 0) {
      this.searchModel.SubsubCategoryid = this.SubsubCategoryid;
      this.searchModel.cityId = this.Cityid;
      this.dataTableComponent.reset();
    }
  }

  load(event) {
   
    this.searchModel.First = event.first;
    this.searchModel.Last = event.rows ? event.first + event.rows : 20;
    var page = this.searchModel.Last / event.rows;
    if (this.Cityid > 0 && this.SubsubCategoryid > 0) {
      this.searchModel.CityId = this.Cityid;
      this.searchModel.SubsubCategoryid = this.SubsubCategoryid;
      this.blocked = true;
      this.itemschememasterList = [];
      this.TotalRecords = 0;

      this.ItemService.getItemSchemeMaster(this.searchModel).subscribe(res => {
      
        this.blocked = false;
        if (res.length > 0) {
          this.itemschememasterList = res;
          this.TotalRecords = res[0].totalRecord;
        }
      });
    }
    // else {
    //   this.blocked = false;
    //   this.messageService.add({ severity: 'error', summary: 'please select city!', detail: '' });
    // }
  }
  navigateToDetail(item) {

    this.router.navigate(['itemschememasterdetails', {
      Id: item.Id,
      //  BrandName: item.BrandName
    }], { relativeTo: this.r.parent });

  }
  Reset() {
    this.searchModel.CityId = null;
    this.searchModel.SubsubCategoryid = null;
    this.itemschememasterList = [];
    this.TotalRecords = 0;
  }
}

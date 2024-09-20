import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ExportService } from 'app/shared/services/export.service';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-spiandppi',
  templateUrl: './spiandppi.component.html',
  styleUrls: ['./spiandppi.component.scss']
})
export class SpiandppiComponent implements OnInit {
  BrandList: any;
  itemList: any;
  list: any;
  searchModel: any;
  Listt: any[];
  SPI: boolean;
  PPI: boolean;
  data: any;
  blocked: boolean;
  columnList: string[];
  constructor(public subSubCategoryService: SubSubCategoryService, 
    private exportService: ExportService,private messageService: MessageService) { this.searchModel = {}; this.Listt = []; }

  ngOnInit() {
    this.searchModel.SPI = 'true';
    this.searchModel.SubsubCategoryid = 0;
    this.searchModel.ItemMultiMRPId = 0;
    this.SPI = false;
    this.PPI = false;
    this.blocked = false;
    this.itemList=[];
    this.subSubCategoryService.GetBrand().subscribe(result => {
      this.BrandList = result;
    })
  }
  onEventTypeSPIChange(seletedData) {
    this.searchModel.SPI = 'true';
    this.searchModel.PPI = 'false';
    console.log('s1', this.searchModel);
  }
  onEventTypePPIChange(seletedData) {
    this.searchModel.SPI = 'false';
    this.searchModel.PPI = 'true';
    console.log('s2', this.searchModel);
  }
  brandclick(SubsubCatID) {
    this.searchModel.ItemMultiMRPId = 0;
    this.subSubCategoryService.GetBrandidbyitem(SubsubCatID).subscribe(result => {
      this.itemList = result;
    })
  }
  search(searchModel) {
    this.blocked = true;
    this.Listt = [];
    if (searchModel.SPI == 'true') {

      if (searchModel.ItemMultiMRPId == undefined) {
        searchModel.ItemMultiMRPId = 0;

      }
      if (searchModel.SubsubCategoryid == undefined) {
        searchModel.SubsubCategoryid = 0;
      }
      this.subSubCategoryService.GetSPI(searchModel.SubsubCategoryid, searchModel.ItemMultiMRPId).subscribe(result => {
        this.SPI = true;
        this.PPI = false;
        this.list = result;
        if (this.list && this.list.length > 0) {
          this.columnList = Object.keys(this.list[0]);
        }
        
        this.blocked = false;
      })
    } else if (searchModel.PPI == 'true') {
      if (searchModel.ItemMultiMRPId == undefined) {
        searchModel.ItemMultiMRPId = 0;
      }
      if (searchModel.SubsubCategoryid == undefined) {
        searchModel.SubsubCategoryid = 0;
      }
      this.subSubCategoryService.GetPPI(searchModel.SubsubCategoryid, searchModel.ItemMultiMRPId).subscribe(result => {
        this.SPI = false;
        this.PPI = true;
        this.list = result;
        if (this.list && this.list.length > 0) {
          this.columnList = Object.keys(this.list[0]);
        }
        this.blocked = false;
      })
    }
  }


  getColorCodeClass(row: any, col: string): string {
    let check = this.searchModel;

      if (check.SPI == 'true') {
    if (col.toLocaleLowerCase().indexOf('(spi)') > -1) {
      if (!row[col]) {
        return 'clr-1';       
      } else if (row[col] >= 100 && row[col] <= 101) {
        return 'clr-2';
      }else if (row[col] == 102) {
        return 'clr-3';
      }else if (row[col] == 103) {
        return 'clr-4';
      }else if (row[col] == 104) {
        return 'clr-5';
      }else if (row[col] >= 105) {
        return 'clr-6';
      }
      
    } else {
      return '';
    }
  }else if (check.PPI == 'true'){
    if (col.toLocaleLowerCase().indexOf('(ppi)') > -1) {
      if (!row[col]) {

        return 'clr-1';
      } else if (row[col] >= 100 && row[col] <= 101) {
        return 'clr-2';
      }else if (row[col] == 102) {
        return 'clr-3';
      }else if (row[col] == 103) {
        return 'clr-4';
      }else if (row[col] == 104) {
        return 'clr-5';
      }else if (row[col] >= 105) {
        return 'clr-6';
      }
      
    } else {
      return '';
    }
  }

  }

  generateExcel(){
    this.blocked=true;
    if(this.list && this.list.length > 0){
    this.exportService.generateExcel(this.list);
    this.messageService.add({ severity: 'success', summary: 'Data Get Successfully!', detail: '' });
    this.blocked=false;
    }else{
      this.messageService.add({ severity: 'error', summary: 'No data found!!', detail: '' });
    this.blocked=false;
    }
    this.blocked=false;
  }
  clear(){
    this.searchModel.SubsubCategoryid=[];
    this.searchModel.ItemMultiMRPId=[];
  }
}

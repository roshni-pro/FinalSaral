import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { ItemService } from 'app/shared/services/item.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';



@Component({
  selector: 'app-itemlive-dashboard',
  templateUrl: './itemlive-dashboard.component.html',
  styleUrls: ['./itemlive-dashboard.component.scss']
})
export class ItemliveDashboardComponent implements OnInit 
{

  ItemLiveDashboardList: any[];
  inputModel: any;
  StartDate:any;
  EndDate:any;

  constructor(   private itemService: ItemService
    ) { this.inputModel = {};}

  ngOnInit() {
    this.inputModel.StartDate = new Date();
    this.inputModel.StartDate = new Date(this.inputModel.StartDate.setHours(0, 0, 0, 0));
    this.inputModel.EndDate = new Date();

  }
  

  getData() 
  {
    
    this.inputModel;
    console.log(this.inputModel);
      this.itemService.getItemLiveDashboard(this.inputModel).subscribe(x => {
      this.ItemLiveDashboardList = x;
    });
  }


  export() 
  {
      this.exportAsExcelFile(this.ItemLiveDashboardList, 'ItemLiveDashboardList');
  }
  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }

}

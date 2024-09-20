import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MasterOwnerViewModel } from '../master-owner/master-owner-view-model';
import { MasterExportRequestPaginator } from '../interface/master-export-request-paginator';
import { Workbook } from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  apiURL: string;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.apiURL = environment.apiURL;
  }


  GetMasterList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/MasterOwner/GetMasterList');
  }

  GetMastersList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/MasterOwner/GetMastersList');
  }

  GetMasterbyId(ID): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/MasterOwner/GetMasterbyId?ID=' + ID);
  }


  AddMaster(ID): Observable<any> {
    return this.http.post<any>(this.apiURL + '/api/MasterOwner', ID);
  }

  UpdateMaster(ID): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/MasterOwner/update', ID);
  }
  DeleteMaster(ID): Observable<any> {
    return this.http.put<any>(this.apiURL + '/api/MasterOwner/Delete', ID);
  }
  UpdateExport(MasterExportRequestDC): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/MasterExportRequest/UpdateMasterExport', MasterExportRequestDC);
  }
  ApprovedExportRequest(MasterExportRequestDC): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/MasterExportRequest/UpdateMasterExport', MasterExportRequestDC);
  }
  RejectExportRequest(MasterExportRequestDC): Observable<any> {

    return this.http.put<any>(this.apiURL + '/api/MasterExportRequest/UpdateMasterExport', MasterExportRequestDC);
  }
  GetRequesteddata(): Observable<any[]> {

    return this.http.get<any[]>(this.apiURL + '/api/MasterExportRequest/GetMasterRExportRequest');
  }

  GetList(paginator: MasterExportRequestPaginator): Observable<any[]> {

    return this.http.post<any[]>(this.apiURL + '/api/MasterExportRequest/GetList', paginator);
  }


  GetAutoComplete(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/api/Peoples/GetAutoComplete/' + keyword);
  }

  SaveMasterOwner(masterOwnerViewModel: MasterOwnerViewModel): Observable<any[]> {
    return this.http.post<any[]>(this.apiURL + '/api/MasterOwner/SaveMasterOwner/', masterOwnerViewModel);
  }

  GetByExportMasterId(exportMasterOwnerId: number): Observable<MasterOwnerViewModel> {
    return this.http.get<MasterOwnerViewModel>(this.apiURL + '/api/MasterOwner/GetByExportMasterId/' + exportMasterOwnerId);
  }

  DeleteExportMaster(exportMasterId: number): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/MasterOwner/DeleteExportMaster/' + exportMasterId);
  }

  DeleteExportMasterOwner(exportMasterOwnerId: number): Observable<boolean> {
    return this.http.get<boolean>(this.apiURL + '/api/MasterOwner/DeleteExportMasterOwner/' + exportMasterOwnerId);
  }

  generateExcel(excelData: any[]) {

    console.log('excelData: ', excelData);
    // const ExcelJS = await import('exceljs');
    // console.log(ExcelJS);
    // const Workbook: any = {};

    // Excel Title, Header, Data
   // const title = 'Car Sell Report';
    const header = Object.keys(excelData[0]);
    let dataList = [];
    excelData.forEach(row => {
      let colList = [];
      header.forEach(col => {
        colList.push(row[col]?row[col] : 0 );
      });
      dataList.push(colList);
    });
    const data = dataList;
    
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Spi List Data');


    // Add Row and formatting
    // const titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);
    // Add Image
    //     const logo = workbook.addImage({
    //   base64: logoFile.logoBase64,
    //   extension: 'png',
    // });

    // worksheet.addImage(logo, 'E1:F3');
    // worksheet.mergeCells('A1:D2');

    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '808080' },  ///red
      // bgColor: { argb: '808000' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    data.forEach(d => {
      const row = worksheet.addRow(d);

      row.eachCell((cell, number) => {
        let color = 'FFFFFF';
        // if ()
        const qty = row.getCell(number);
        color = this.getColorCodeClass(d, header[number-1], number-1);
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color },  ///red
          // bgColor: { argb: '808000' }
        };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
      // const qty = row.getCell(5);
      // let color = 'FF99FF99';
      // if (+qty.value < 500) {
      //   color = 'FF9999';
      // }

      // qty.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color }
      // };
    }

    );

    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 14;
    worksheet.getColumn(4).width = 14;
    worksheet.getColumn(5).width = 14;
    worksheet.getColumn(6).width = 14;
    worksheet.getColumn(7).width = 14;
    worksheet.getColumn(8).width = 14;
    worksheet.getColumn(9).width = 14;
    worksheet.getColumn(10).width = 14;
    worksheet.getColumn(11).width = 14;
    worksheet.getColumn(12).width = 14;
    worksheet.getColumn(13).width = 14;
    worksheet.getColumn(14).width = 14;
    worksheet.getColumn(15).width = 14;
    worksheet.getColumn(16).width = 14;
    worksheet.getColumn(17).width = 14;
    worksheet.getColumn(18).width = 14;
    worksheet.getColumn(19).width = 14;
    worksheet.getColumn(20).width = 14;
    worksheet.getColumn(21).width = 14;
    worksheet.getColumn(22).width = 14;
    worksheet.getColumn(23).width = 14;
    worksheet.getColumn(24).width = 14;
    worksheet.getColumn(25).width = 14;
    worksheet.getColumn(26).width = 14;
    worksheet.getColumn(27).width = 14;
    worksheet.getColumn(28).width = 14;
    worksheet.getColumn(29).width = 14;
    worksheet.getColumn(30).width = 14;
    worksheet.getColumn(31).width = 14;
    worksheet.getColumn(32).width = 14;
    worksheet.getColumn(33).width = 14;
    worksheet.getColumn(34).width = 14;
    worksheet.getColumn(35).width = 14;
    worksheet.getColumn(36).width = 14;
    worksheet.getColumn(37).width = 14;
    worksheet.getColumn(38).width = 14;
    worksheet.getColumn(39).width = 14;
    worksheet.getColumn(40).width = 14;
    worksheet.addRow([]);


    // Footer Row
    // const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' }
    // };
    // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // // Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'SPIandPPIList.xlsx');
    });

  }


  getColorCodeClass(row: any, col: string, index: number): string {

    if (col && (col.toLocaleLowerCase().indexOf('(spi)') > -1|| col.toLocaleLowerCase().indexOf('(ppi)') > -1  )) {
      if (!row[index]) {
        return '63BE7B';
      } else if (row[index] >= 100 && row[index] <= 101) {
        return 'FEEA83';
      } else if (row[index] == 102) {
        return 'FED781';
      } else if (row[index] == 103) {
        return 'FCB27A';
      } else if (row[index] == 104) {
        return 'FB9975';
      } else if (row[index] >= 105) {
        return 'F96C6C';
      }

    } else {
      return 'FFFFFF';
    }
  }

}


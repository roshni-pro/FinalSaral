import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-cityprime-item-master',
  templateUrl: './cityprime-item-master.component.html',
  styleUrls: ['./cityprime-item-master.component.scss']
})
export class CityprimeItemMasterComponent implements OnInit {
  CityList: any[];
  SubCategoryList: any[];
  cityPrimedata: any;
  MrpItemlist: any[];
  primeItemlist: any[];
  blocked: boolean;
  exportlist: any[];
  isInvalid: boolean;
  isDisabled: boolean;
  calculatedValue:any;

  constructor(private cityservice: CityService, private subcategoryservice: SubCategoryService,
    private digitalsaleService: DigitalSaleService, private messageService: MessageService,
    private exportService: ExportServiceService) { this.cityPrimedata = {}; }

  ngOnInit() {
    this.cityPrimedata.CityId = "";
    this.cityPrimedata.SubCategoryId = "";
    this.cityPrimedata.ItemMultiMRPId = "";
    this.primeItemlist = [];
    this.isInvalid = false;
    this.isDisabled = true;
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
    });
  }

  GetSubCat() {
    this.SubCategoryList = null;
    this.blocked = true;
    this.subcategoryservice.GetAllSubCategory().subscribe(result => {
      this.blocked = false;
      this.SubCategoryList = result;
      this.primeItemlist = [];
      this.cityPrimedata.SubCategoryId = "";
      this.cityPrimedata.ItemMultiMRPId = "";
      this.isDisabled = true;
    })
  }

  GetMrpList() {
    this.blocked = true;
    this.digitalsaleService.getMRPlistItem(this.cityPrimedata.CityId, this.cityPrimedata.SubCategoryId).subscribe(result => {
      this.blocked = false; 
      if (result.length > 0) {
        this.MrpItemlist = result;
        this.primeItemlist = [];
        this.isDisabled = true;
      } else {
        this.cityPrimedata.ItemMultiMRPId = "";
      }
    })
  }

  GetPrimeItem() {
    this.blocked = true;
    this.digitalsaleService.GetPrimeItem(this.cityPrimedata.ItemMultiMRPId, this.cityPrimedata.CityId).subscribe(x => {
      this.blocked = false;
      if (x.length > 0) {
        this.isDisabled = false;
        this.primeItemlist = x;
      } else {
        this.primeItemlist = [];
        this.isDisabled = true;
        this.messageService.add({ severity: 'error', summary: 'No Record found!', detail: '' });
      }

    })
  }

  updateRecord(PrimeItemlist) {
    this.blocked = true;
    this.digitalsaleService.UpdatePrimeItems(PrimeItemlist).subscribe(x => {
      this.blocked = false;
      this.messageService.add({ severity: 'success', summary: 'Update Successfully!', detail: '' });
      this.ngOnInit();
    })
  }

  exportPrimeItemlist() {
    if (this.cityPrimedata.CityId == "" || this.cityPrimedata.CityId == null) {
      this.isInvalid = true;
    } else {
      var arr = [];
      this.blocked = true;
      this.isInvalid = false;
      this.digitalsaleService.exportPrimeItemlist(this.cityPrimedata.CityId).subscribe(x => {
        this.blocked = false;
        this.exportlist = x;
        this.exportlist.forEach(x => {
          let obj: any = {
            CityName: x.CityName,
            itemname: x.itemname,
            ItemMultiMRPId: x.ItemMultiMRPId,
            MinOrderQty: x.MinOrderQty,
            MRP: x.MRP,
            UnitPrice: x.UnitPrice,
            PrimePercent: x.PrimePercent,
            PrimePrice: x.PrimePrice,
            IsActive: x.IsActive
          }
          arr.push(obj);
        });
        this.exportService.exportAsExcelFile(arr, 'cityPrimeItemMaster');
      })
    }

  }

  calculateValue(rowData) {
    if (rowData.PrimePercent >= 0 && rowData.PrimePercent <= 20) {
      rowData.PrimePrice = 0;
      rowData.calculatedValue = rowData.UnitPrice-((rowData.UnitPrice * rowData.PrimePercent)/100)
    }else{
      rowData.PrimePercent = 0;
      this.messageService.add({ severity: 'error', summary: 'Percentage can not be greater than 20.', detail: '' });
    }    
  }

  onPriceChange(data){
    if (data.PrimePrice > 0) {
      data.PrimePercent = 0;
      data.calculatedValue = null;
    }   
  }

}

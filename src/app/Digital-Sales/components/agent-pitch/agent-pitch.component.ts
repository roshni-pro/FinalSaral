import { Component, OnInit } from '@angular/core';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-agent-pitch',
  templateUrl: './agent-pitch.component.html',
  styleUrls: ['./agent-pitch.component.scss']
})
export class AgentPitchComponent implements OnInit {
  AgentPitchList: any[];
  cols: any[];
  AgentList: any[];
  Search: any;
  WarehouseList: any[];
  blocked = false
  first = 0;
  rows = 10;
  baseURL: any;
  isOpenPopup: boolean;
  imagePath: any;
  isInvalid: boolean;
  constructor(private warehouseService: WarehouseService,
    private digitalsaleService: DigitalSaleService, private exportService: ExportServiceService) {
    this.baseURL = environment.apiURL;

    this.Search = {};
  }
  ngOnInit() {
    this.Search.AgentId = 0;
    this.isOpenPopup = false;
    this.imagePath = null;
    this.Search.StartDate = new Date();
    this.Search.StartDate = new Date(this.Search.StartDate.setHours(0, 0, 0, 0));
    this.Search.EndDate = new Date();
    this.cols = [
      { field: 'DisplayName', header: 'Agent Name' },
      { field: 'Skcode', header: 'Skcode' },
      { field: 'ShopName', header: 'Shop Name' },
      { field: 'Name', header: 'Name' },
      { field: 'ShippingAddress', header: 'Address' },
      { field: 'lat', header: 'lat' },
      { field: 'lg', header: 'lg' },
      { field: 'CreatedDate', header: 'Created Date' },
      { field: 'StartDate', header: 'Start Date' },
      { field: 'EndDate', header: 'End Date' }
      , { field: '', header: 'Shop Image', bools: true }
      , { field: '', header: 'Audio', bool: true }
      , { field: 'Conversation', header: 'Conversation' }
    ];
    this.warehouseService.GetAllWarehouse().subscribe(x => {
      this.WarehouseList = x;

    })
  }

  getAgent(WarehouseId) {
    this.blocked = true;

    this.digitalsaleService.GetActiveWarehouseSaleExecutives(WarehouseId)
      .subscribe(result => {

        this.blocked = false
        this.AgentList = result;

      });
  }


  SearchRecord(formName) {
    if (formName.invalid) {
      this.isInvalid = true;
    }
    else {
      this.isInvalid = false;
      this.blocked = true;
      this.digitalsaleService.GetAllAgentPitch(this.Search).subscribe(x => {
        this.blocked = false
      
        this.AgentPitchList = x;
        for (var i in this.AgentPitchList) {
          this.AgentPitchList[i].CreatedDate = this.AgentPitchList[i].CreatedDate ? moment(this.AgentPitchList[i].CreatedDate).format('DD/MM/YYYY hh:mm:ss') : null;
          this.AgentPitchList[i].StartDate = this.AgentPitchList[i].StartDate ? moment(this.AgentPitchList[i].StartDate).format('DD/MM/YYYY hh:mm:ss') : null;
          this.AgentPitchList[i].EndDate = this.AgentPitchList[i].EndDate ? moment(this.AgentPitchList[i].EndDate).format('DD/MM/YYYY  hh:mm:ss') : null;
        }
      })
    }

  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return false; //this.first === (this.AgentPitchList.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  exportExcel() {
    var arr = [];
    this.AgentPitchList.forEach(x => {
      let obj: any = {
        AgentName: x.DisplayName,
        Skcode: x.Skcode,
        ShopName: x.ShopName,
        Name: x.Name,
        Address: x.ShippingAddress,
        lat: x.lat,
        lng: x.lg,
        CreatedDate: x.CreatedDate,
        StartDate: x.StartDate,
        EndDate: x.EndDate
      }
      arr.push(obj);
    });
    this.exportService.exportAsExcelFile(arr, 'agentPitchReport');
  }

  openPopup(rowData) {
    this.isOpenPopup = true;
    this.imagePath = rowData;
  }

}

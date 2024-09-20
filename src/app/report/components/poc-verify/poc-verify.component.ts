import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TurnAroundTimeService } from 'app/shared/services/turn-around-time.service';
import { ActivatedRoute } from '@angular/router';
import { POCinterfaceDc } from 'app/shared/interface/paginator-POC-interface';
import { MessageService } from 'primeng/api';
import { AssignmentpaymentService } from 'app/shared/services/assignmentpayment.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';

@Component({
  selector: 'app-poc-verify',
  templateUrl: './poc-verify.component.html',
  styleUrls: ['./poc-verify.component.scss']
})
export class PocVerifyComponent implements OnInit {
  POCorderlist: any[];
  blocked: boolean;
  paginatorPOC: POCinterfaceDc;
  pageSize: any;
  POCancelorderlist: any[] = [];
  totalRecords: any;
  selectedQue: any;
  remarks: any;
  agentList: any[];
  data: any;
  warehouseList: any[];
  isVerified: boolean;
  isSearch: boolean;
  isTable: boolean;
  NoOfRecords: any;
  // Add by Anoop 5/2/2021
  //filterOPReports: OrderColorRequest;
  selectedwarehouse: any[];
  warehouseid: any[];
  selectedlist: any[];
  WarehouseIds: any[];


  constructor(private turuAroundService: TurnAroundTimeService, private exportService: ExportServiceService,
    private assignmentpaymentService: AssignmentpaymentService,
    private warehouseService: WarehouseService, private messageService: MessageService) { this.data = {} }

  ngOnInit() {

    this.remarks = null;
    this.data.AgentId = '';
    this.data.warehouseId = '';
    this.data.IsPocVerified = 0;
    this.NoOfRecords = 20;
    // this.route.params.subscribe(params => {
    //   this.warehouseId = params['Id'];
    // });
    //Comment this Method by Anoop
    this.getWarehousesforPOC();

    //this.getSpecificWarehouses();
    this.pageSize = 20;
    this.paginatorPOC = {
      skip: 0,
      take: this.pageSize,
      WarehouseId: 0,
      WarehouseIds: [],
      AgentId: 0,
      IsPocVerified: 0
    }

    //this.initialize();
  }

  private async getSpecificWarehouses() {

    this.warehouseService.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
    });
  }



  //Added by Anoop 5/2/2021
  private async getWarehousesforPOC() {

    this.warehouseService.GetAllWarehouse()
      .subscribe(result => {
        //this.blocked = false
        this.warehouseList = result;
        //this.paginatorPOC.WarehouseId = result;
      });

  }




  // Changed Warehouse,foreach by Anoop
  onsearch(warehouse) {

    this.warehouseid = [];

    warehouse.forEach(element => {
      this.warehouseid.push(
        element.WarehouseId

      )
    });

    // this.assignmentpaymentService.GetAssignmentAgent(warehouseList).subscribe(result => {
    //   this.agentList = result;
    // let WarehouseIdList = this.selectedwarehouse.map(x => x.warehouse)
    this.assignmentpaymentService.PostAssignmentAgent(this.warehouseid).subscribe(result => {
      this.agentList = result;
    })
  }

  private initialize() {

    this.blocked = true;
    //Added by Anoop 
    //this.filterOPReports = new OrderColorRequest();
    //this.paginatorPOC= new POCinterfaceDc();
    this.turuAroundService.getPOCancelOrders(this.paginatorPOC).subscribe(result => {
      this.blocked = false;
      if (result.TotalRecords > 0) {
        this.POCorderlist = result.getPOCVerificationlist;
        this.totalRecords = result.TotalRecords;
        this.isVerified = this.POCorderlist[0].isPocVerified;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'No Records found!!', detail: '' });
        this.ngOnInit();
      }
    })
  }

  load(event) {

   //this.paginatorPOC.skip = event.first;
    //this.paginatorPOC.take = event.rows;

    var Last = event.first ? event.first + event.rows : 20
    this.paginatorPOC.skip =  Last / event.rows;
    this.paginatorPOC.take = event.rows;
    // this.paginatorPOC.WarehouseId = this.warehouseId;   
    // this.blocked=true;
    //this.initialize();
    this.turuAroundService.getPOCancelOrdersbyMultiW(this.paginatorPOC).subscribe(result => {
      this.blocked = false;

      if (result.TotalRecords > 0) {
        this.POCorderlist = result.getPOCVerificationlist;
        this.totalRecords = result.TotalRecords;
        this.isVerified = this.POCorderlist[0].isPocVerified;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'No Records found!!', detail: '' });
        this.ngOnInit();
      }
    })
  }

  onPageSize(NoOfRecords) {
    this.pageSize = NoOfRecords;
    this.paginatorPOC.skip = 0;
    this.paginatorPOC.take = NoOfRecords;
    this.initialize();
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

  updatePOCstatus(POCorderlist) {
    this.blocked = true;
    var count = 0;
    for (var i = 0; i < POCorderlist.length; i++) {
      if (POCorderlist[i].isPocVerified == true) {
        if (POCorderlist[i].remarks == null || POCorderlist[i].remarks == "") {
          count = 0;
          this.blocked = false;
          this.messageService.add({ severity: 'error', summary: 'Remark is Required!!', detail: '' });
          return;
        }
        else {
          count++;
          var datatoPost = POCorderlist[i];
          this.POCancelorderlist.push(datatoPost);
        }

      }
    }
    if (count > 0) {
      this.turuAroundService.updatePOClist(this.POCancelorderlist).subscribe(result => {
        this.blocked = false;
        if (result.Status == true) {
          this.messageService.add({ severity: 'success', summary: 'POC Verified Successfully!', detail: '' });
          this.initialize();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'POC Verified failed!', detail: '' });
        }
      })
    }
    else {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'POC Verification failed!', detail: '' });
    }
  }
  //  SearchpocVerifypage(data){}

  // SearchpocVerifypage(data) {
  //   
  //   //Added forloop for warehouseid by Anoop on 25/3/2021
  //   this.warehouseid=[];

  //   if (data.warehouseId !=undefined) {
  //     data.warehouseId.forEach(element => {
  //       this.warehouseid.push({Wwarehouseid: element.WarehouseId});
  //     });

  //   } else {
  //     this.blocked=false;
  //     this.messageService.add({ severity: 'error', summary: 'Please select warehouse!!', detail: '' });
  //     return;
  //   }

  //   this.paginatorPOC.skip = 0;
  //   this.paginatorPOC.take = this.pageSize;
  //   this.paginatorPOC.AgentId = data.AgentId;
  //   // Commented by Anoop
  //   //this.paginatorPOC.WarehouseId = data.warehouseId;
  //   this.paginatorPOC.WarehouseIds = this.warehouseid;

  //   this.paginatorPOC.IsPocVerified = data.IsPocVerified;
  //   this.initialize();
  // }

  //Added by Anoop for multiselect warehouse

  SearchpocVerifypage(data) {
    this.blocked = true;
    //Added forloop for warehouseid by Anoop
    this.warehouseid = [];
    let whouse = [];
    if (data.warehouseId != "") {
      data.warehouseId.forEach(element => {
        whouse.push(element.WarehouseId);
      });
    } else {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'Please select warehouse!!', detail: '' });
      return;
    }

    this.paginatorPOC.skip = this.paginatorPOC.skip;
    this.paginatorPOC.take = this.paginatorPOC.take;
    this.paginatorPOC.AgentId = data.AgentId;
    // Commented by Anoop on 25/3/2021
    //this.paginatorPOC.WarehouseId = data.warehouseId;
    this.paginatorPOC.WarehouseIds = whouse;

    this.paginatorPOC.IsPocVerified = data.IsPocVerified;
    //this.initialize();

    this.turuAroundService.getPOCancelOrdersbyMultiW(this.paginatorPOC).subscribe(result => {
      this.blocked = false;

      if (result.TotalRecords > 0) {
        this.POCorderlist = result.getPOCVerificationlist;
        this.totalRecords = result.TotalRecords;
        this.isVerified = this.POCorderlist[0].isPocVerified;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'No Records found!!', detail: '' });
        this.ngOnInit();
      }
    })

  }

  ExportReport(exportData) {
    this.blocked = true;
    //Added forloop for warehouseid by Anoop
    this.warehouseid = [];
    let whouse = [];
    if (exportData.warehouseId != "") {
      exportData.warehouseId.forEach(element => {
        whouse.push(element.WarehouseId);
      });
    } else {
      this.blocked = false;
      this.messageService.add({ severity: 'error', summary: 'Please select warehouse!!', detail: '' });
      return;
    }


    if (exportData.AgentId || whouse || exportData.IsPocVerified) {
      //this.blocked = true;
      this.paginatorPOC.skip = 1;
      this.paginatorPOC.take = this.totalRecords;
      this.paginatorPOC.AgentId = exportData.AgentId;
      //this.paginatorPOC.WarehouseId = exportData.warehouseId;
      this.paginatorPOC.WarehouseIds = whouse;
      this.paginatorPOC.IsPocVerified = exportData.IsPocVerified;
      //this.turuAroundService.getPOCancelOrders(this.paginatorPOC).subscribe(result => {

      this.turuAroundService.getPOCancelOrdersbyMultiW(this.paginatorPOC).subscribe(result => {
        this.blocked = false;
        if (result.TotalRecords > 0) {
          this.POCorderlist = result.getPOCVerificationlist;
          this.exportService.exportAsExcelFile(this.POCorderlist, 'POCExportdata');
          this.ngOnInit();
        }
        else {
          alert("No data found for export");
        }
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Please select atleast one filter!', detail: '' })
    }
  }

}

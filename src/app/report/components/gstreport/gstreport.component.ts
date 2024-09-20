import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { GstReportService } from 'app/shared/services/gst-report.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StateService } from 'app/shared/services/state.service';

import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';

@Component({
  selector: 'app-gstreport',
  templateUrl: './gstreport.component.html',
  styleUrls: ['./gstreport.component.scss']
})
export class GSTReportComponent implements OnInit {

@Input() Stateid:any;
  private value;
  searchModel: any;
  preport: any[];
  isDetails: boolean;
  cols: any;
  Exit: boolean;
  Exits: boolean;
  show: boolean;
  n: any;
  customerList: any[];
  closeResult: string;
  isopen: boolean
  finallink: string;

  loading: boolean;
  totalRecords: number;
  // pager: PagerDataV7;
  pageSize: number;
  selectedRow: any;

  selectedRowDetails: any;
  inputModel: any
  searchKey: string;

  cityList: any
  isSearch: any;
  isMissingDetails: any;
  exportData: any
  isResultFalse: boolean;
  gstnorecorddata: any[];
  totalamount: any[];
  finalamount: any;
  blocked: boolean;
  stateList:any[];

  



  constructor(private gstReportService: GstReportService, private exportService: ExportServiceService,private pepolePilotService : PepolePilotService, private router: Router, private modalService: NgbModal, private messageService: MessageService,
  ) {
    this.inputModel = {}; this.searchModel = {};

  }

  ngOnInit() {
    this.gstnorecorddata = [];
    this.isDetails = false;

    this.pepolePilotService.States().subscribe(result => {
      this.stateList = result;
      console.log('this.stateList :', result);

    });




  }

  load(event) {
    
    // this.loading = true;
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null

  }

  search(searchModel) {
    
    var FromDate = this.searchModel.FromDate ? moment(this.searchModel.FromDate).format('YYYY-MM-DD') : null
    var ToDate = this.searchModel.ToDate ? moment(this.searchModel.ToDate).format('YYYY-MM-DD') : null
    var searchModels= searchModel.Stateid;
    //searchModels
    this.gstReportService.GetPurchasereport(FromDate, ToDate,searchModels).subscribe(res => {
      
      console.log(this.searchModel.FromDate);

      
      console.log("res", res);
      
     
      var filename = 'GstReport'+new Date;

      this.downloadURI(res , filename)

      //  this.exportService.exportAsExcelFile(res, 'preport');
      // 



    })
  }
  onChangeState(Stateid) {
    this.pepolePilotService.City().subscribe(result => {
      this.cityList = result.filter(x => x.Stateid == Stateid);
    });

  }


  downloadURI(uri, name) {
    
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }



  goToAddItem() {
    this.router.navigateByUrl("/layout/report/gstreport");

  }
 

}

import { Component, OnInit } from '@angular/core';
import { MasterExportRequestPaginator } from 'app/shared/interface/master-export-request-paginator';
import { ExportService } from 'app/shared/services/export.service';

@Component({
  selector: 'app-export-request',
  templateUrl: './export-request.component.html',
  styleUrls: ['./export-request.component.scss']
})
export class ExportRequestComponent implements OnInit {
  rows: number;
  paginator: MasterExportRequestPaginator;
  constructor( private exportService: ExportService) { }

  ngOnInit() {
    this.rows = 20;
    this.paginator = {
      ApproverID: null,
      Contains: '',
      FromDate: null,
      RequesterID: null,
      Skip: 0,
      Take:this.rows,
      ToDate: null
    }

    this.exportService.GetList(this.paginator).subscribe( x => {
      console.log('list is: ', x);
    });
  }

}

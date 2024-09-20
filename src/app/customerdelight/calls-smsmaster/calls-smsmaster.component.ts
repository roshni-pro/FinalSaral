import { Component, OnInit } from '@angular/core';
import { PaginatorViewModel } from 'app/shared/interface/paginator-view-model';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { CallssmsService } from 'app/shared/services/callssms.service';




@Component({
  selector: 'app-calls-smsmaster',
  templateUrl: './calls-smsmaster.component.html',
  styleUrls: ['./calls-smsmaster.component.scss']
})
export class CallsSMSMasterComponent implements OnInit {


  PageList: any[];
  totalRecords: number;
  loading: boolean;
  isLoading: boolean;
  paginator: PaginatorViewModel;
  cols: any[];
  pageSize: number;

  constructor(private CallssmsService: CallssmsService, private router: Router, private messageService: MessageService, private modalService: NgbModal, private confirmationService: ConfirmationService) { }

  ngOnInit() {


    this.cols = [
      { field: 'Title', header: 'Title' },
      { field: 'Description', header: 'Description' },
      { field: 'OnDate', header: 'OnDate' },
      { field: 'RequestCompletedDate', header: 'RequestCompletedDate' },
      { field: 'IsCompleted', header: 'IsCompleted' },
      { field: 'IsProcessed', header: 'IsProcessed' },
      { field: 'VoiceMessageURL', header: 'VoiceMessageURL' },
      { field: 'SMSOne', header: 'SMSOne' },
      { field: 'SMSTwo', header: 'SMSTwo' },
      { field: 'IsActive', header: 'IsActive' },
      { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'CreatedBy', header: 'CreatedBy' },
      { field: 'DisplayName', header: 'DisplayName' },
    ];

    this.pageSize = 10;
    this.paginator = {
      Skip: 0,
      Take: this.pageSize,
    }
    
    this.initialize();

  }


  addCallsSms() {
    this.router.navigateByUrl('/layout/customerdelight/addcallsms')
  }

  private initialize() {
    this.loading = true;

    this.CallssmsService.getallCallDataWithpg(this.paginator).subscribe(result => {
      this.PageList = result.MSorderList;
      this.totalRecords = result.Total_count;
    });
    this.loading = false;

  }
  load(event) {
    this.paginator.Skip = event.first;
    this.paginator.Take = event.rows;

    this.initialize();


  }

}

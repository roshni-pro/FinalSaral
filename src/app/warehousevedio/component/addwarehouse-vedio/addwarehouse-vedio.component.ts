import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { analyzeAndValidateNgModules, IfStmt } from '@angular/compiler';

import { AnonymousSubject } from 'rxjs/internal/Subject';

import { group } from '@angular/animations';
import { WarehousevedioService } from 'app/shared/services/warehousevedio.service';
import { Warehousevedio } from 'app/shared/interface/warehousevedio';
import { WarehouseService } from 'app/shared/services/warehouse.service';

@Component({
  selector: 'app-addwarehouse-vedio',
  templateUrl: './addwarehouse-vedio.component.html',
  styleUrls: ['./addwarehouse-vedio.component.scss']
})
export class AddwarehouseVedioComponent implements OnInit {
  @Input() WarehouseId: number;
  input: any;
  warehousess: any;
  //WarehouseId:any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  videoList: any
  warehousevedio: Warehousevedio;
  message: any;
  constructor(private warehousevedioservice: WarehousevedioService, private router: Router, private wh: WarehouseService, private messageService: MessageService, private confirmationService: ConfirmationService) { this.input = {}; }


  ngOnInit() {
    //this.input.Month = moment().toDate();
    this.wh.getSpecificWarehouses().subscribe(result => {
      this.warehousess = result;
    })
    this.warehousevedio = {
      WarehouseId: null,
      //TodayDate:  null,
      Videolink: null,
      StartDate: null,
      EndDate: null,
      IsActive: null,
      IsDeleted: null
    }
  }
  save(input, groupEditForm) {
    
    if (groupEditForm.form.status == "VALID") {
      let List = [];
      this.warehousevedio = {
        WarehouseId: input.WarehouseId,
        Videolink: input.Link,
        //TodayDate:input.Month,
        StartDate: input.StartDate,
        EndDate: input.EndDate,
        IsActive: true,
        IsDeleted: false
      }
  
    if (input.WarehouseId != null) {
      
      this.warehousevedioservice.postdata(this.warehousevedio).subscribe(result => {
        this.videoList = result;
        if (result != null) {
          this.message = result.Message;
          this.messageService.add({ severity: 'success', summary: this.message, detail: '' });
          // this.router.navigateByUrl("layout/warehousevedio/warehousevedio");
          //this.router.navigateByUrl("layout/warehousevedio/warehousevedio");
        }
        if (result == null) {
          this.messageService.add({ severity: 'error', summary: 'Same Amount Already Exist Please Add more Amount then existing Amount', detail: '' });
        }
      })
    }
  }else{
    this.isInvalid=true;
  }
  }
  onCancel() {
    this.router.navigateByUrl('layout/warehousevedio/warehousevedio');
  }
}

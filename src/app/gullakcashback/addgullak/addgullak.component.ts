import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { analyzeAndValidateNgModules, IfStmt } from '@angular/compiler';
import { GullakService } from 'app/shared/services/gullak.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Gullakcashback } from 'app/shared/interface/gullakcashback';
import { group } from '@angular/animations';

@Component({
  selector: 'app-addgullak',
  templateUrl: './addgullak.component.html',
  styleUrls: ['./addgullak.component.scss']
})
export class AddgullakComponent implements OnInit {
  @Input() WarehouseId: number;
  input: any;
  warehousess: any;
  //WarehouseId:any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Input() hideCancelButton: boolean = false;
  gullaklist: any;
  gullakUpdatelist: any;
  gullaccashback: Gullakcashback;
  constructor(private gullakService: GullakService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { this.input = {}; }

  ngOnInit() {
    this.isInvalid = false;
    this.gullakService.WarehouseGetByID().subscribe(result => {
      this.warehousess = result;
    })
    this.gullaccashback = {
      WarehouseId: null,
      AmountFrom: null,
      AmountTo: null,
      MaximumCashBackAmount: null,
      CashBackPercent: null,
      StartDate: null,
      EndDate: null,
    }

    if (this.WarehouseId) {

      this.input = this.WarehouseId;
    }
    
  }



  save(input, groupEditForm) {



    if (groupEditForm.form.status == "VALID") {


      let gullakselectedList = [];


      this.gullaccashback = {
        WarehouseId: input.WarehouseId,
        AmountFrom: input.AmountFrom,
        AmountTo: input.AmountTo,
        MaximumCashBackAmount: input.MaximumCashBackAmount,
        CashBackPercent: input.CashBackPercent,
        StartDate: input.StartDate,
        EndDate: input.EndDate,
      }

      if (this.WarehouseId == null) {

        this.gullakService.postdata(this.gullaccashback).subscribe(result => {

          this.gullaklist = result;
          if (result != null) {
            this.messageService.add({ severity: 'success', summary: 'Save Successfully!', detail: '' });
          }
          if (result == null) {
            this.messageService.add({ severity: 'error', summary: 'Same Amount Already Exist Please Add more Amount then existing Amount', detail: '' });
          }
        })
        //this.router.navigateByUrl('layout/gullak/gullak');


      } else {
        this.gullakService.updatedata(this.gullaccashback).subscribe(result => {

          this.messageService.add({ severity: 'success', summary: 'Save Successfully!', detail: '' });

          this.gullakUpdatelist = result;
          console.log(' this.gullakUpdatelist::', this.gullakUpdatelist);
        });

      }


    }
    else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }

  }

  onCancel() {
    this.router.navigateByUrl('layout/gullakcashback/gullak');
  }


}



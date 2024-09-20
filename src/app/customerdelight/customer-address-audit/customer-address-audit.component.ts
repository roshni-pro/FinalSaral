import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { HistoryService } from 'app/shared/services/history.service';

@Component({
  selector: 'app-customer-address-audit',
  templateUrl: './customer-address-audit.component.html',
  styleUrls: ['./customer-address-audit.component.scss']
})
export class CustomerAddressAuditComponent implements OnInit {
  @ViewChild('table', { static: false }) table: ElementRef;
  @Input() CustomerAddressId: any;
  @Input() EntityName: any;

  EntityHistory: any;
  isHistory: any
  exportBtnHide: boolean = false;
  statusPicker: any;
  statusField: any;
  FieldName: any;
  NewValue: any;
  OldValue: any;
  entity: string;
  id: number;
  // @Input() dHistory : any 
  constructor(private historyService: HistoryService, private exportService: ExportServiceService) { this.EntityHistory = {} }

  ngOnInit() {
    debugger;
    this.isHistory = true;
    this.entity = this.EntityName;
    this.id = this.CustomerAddressId;
    if (this.entity == 'OrderPickerDetails') {
      this.exportBtnHide = true;
    }
    this.historyService.getHistory(this.entity, this.id).subscribe(result => {
      console.log(result);

      if (result == null || result.AuditEntity == null) {
        this.isHistory = false;
      } else {
        this.isHistory = true;
        this.EntityHistory = result;
        if (this.entity == 'OrderPickerDetails') {
          for (var k in this.EntityHistory.AuditHistory) {
            this.statusPicker = this.EntityHistory.AuditHistory[k];
            for (var j in this.statusPicker) {
              this.statusField = this.statusPicker.AuditFields;
              this.FieldName = this.statusField[10].FieldName;
              this.NewValue = this.statusField[10].NewValue;
              this.OldValue = this.statusField[10].OldValue;

              if (this.NewValue == 0 || this.OldValue == 0) {

                if (this.NewValue == 0) {
                  this.statusField[10].NewValue = 'No Action';
                }
                if (this.OldValue == 0) {
                  this.statusField[10].OldValue = 'No Action';
                }
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker = this.statusPicker.AuditFields;
              }

              if (this.NewValue == 1 || this.OldValue == 1) {

                if (this.NewValue == 1) {
                  this.statusField[10].NewValue = 'Picker Accept';
                }
                if (this.OldValue == 1) {
                  this.statusField[10].OldValue = 'Picker Accept';
                }
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker = this.statusPicker.AuditFields;
              }
              if (this.NewValue == 2 || this.OldValue == 2) {

                if (this.NewValue == 2) {
                  this.statusField[10].NewValue = 'Approver Approved';
                }
                if (this.OldValue == 2) {
                  this.statusField[10].OldValue = 'Approver Approved';
                }
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker = this.statusPicker.AuditFields;
              }
              if (this.NewValue == 3 || this.OldValue == 3) {

                if (this.NewValue == 3) {
                  this.statusField[10].NewValue = 'Picker Reject';
                }
                if (this.OldValue == 3) {
                  this.statusField[10].OldValue = 'Picker Reject';
                }
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker = this.statusPicker.AuditFields;
              }
              if (this.NewValue == 4 || this.OldValue == 4) {

                if (this.NewValue == 4) {
                  this.statusField[10].NewValue = 'Approver Reject';
                }
                if (this.OldValue == 4) {
                  this.statusField[10].OldValue = 'Approver Reject';
                }
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker = this.statusPicker.AuditFields;
              }
            }
          }
        }
      }

    })


  }
  onExport() {

    this.exportService.ExportToExcel(this.table, "history_data");
  }
}

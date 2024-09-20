import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'app/shared/services/item.service';
import { Table } from 'primeng/components/table/table';
import { DialogModule } from 'primeng/dialog';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
// import { data, FormControl } from "./form-data";
import { ConfirmationService, SelectItem } from 'primeng/api';
import { ItemSchemeMasterDc } from './item-scheme-masterdetails-dc';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-item-scheme-master-details',
  templateUrl: './item-scheme-master-details.component.html',
  styleUrls: ['./item-scheme-master-details.component.scss']
})
export class ItemSchemeMasterDetailsComponent implements OnInit {
  BrandName: string;
  blocked: boolean;
  IsActive: boolean;
  IsApproved: boolean;
  OfferIds: string;

  ItemschemMasterDetailscols = [
    { field: "ItemNumber", header: "Number" },
    { field: "CompanyCode", header: "Code" },
    { field: "CompanyStockCode", header: "StockCode" },
    { field: "ItemName", header: "Name" },
    { field: "MRP", header: "MRP" },
    { field: "PTR", header: "PTR %" },
    { field: "BaseScheme", header: "BaseScheme %" },
    { field: "onvoiceMargin", header: "onvoiceMargin" },
    { field: "offinvoicemargin", header: "offinvoicemargin" },
    { field: "IsActive", header: "IsActive" }
  ];
  ItemschemFreebiescols = [
    { field: "ItemName", header: "Name" },
    { field: "BaseItemQty", header: "BaseItemQty" },
    { field: "ItemCompanyCode", header: "Code" },
    { field: "ItemCompanyStockCode", header: "StockCode" },
    { field: "MRP", header: "MRP" },
    { field: "Qty", header: "Qty" },
    { field: "StockQty", header: "StockQty" },
  ];
  ItemschemSlabcols = [
    { field: "SlabScheme", header: "Slab Scheme %" },
    { field: "SlabPurchaseQTY", header: "Qty/MOQ" }

  ];
  PostObj: Array<{ ItemSchemeDetailId: number, ItemSchemeMasterId: number, IsActive: boolean }> = [];
  selectedRows: any[];
  ItemschemMaster: {};
  ItemschemMasterDetails: [];
  ItemschemFreebies: [];
  ItemschemSlab: [];
  display: boolean;
  displayFreeBies: boolean;
  displaySlab: boolean;
  ItemschemDetail: any;
  MasterId: number;
  baseURL: any;
  ItemSchemeMasterDc:ItemSchemeMasterDc[];
  constructor(private router: Router, private r: ActivatedRoute, private ItemService: ItemService, private exportService: ExportServiceService, private confirmationService: ConfirmationService, private messageService: MessageService,) {this.baseURL = environment.apiURL; }
  ngOnInit() {
    this.r.params.subscribe(param => {
      if (param && param.Id > 0) {
        this.ItemschemMaster = param;
        this.ItemService.getItemSchemeMasterById(param.Id).subscribe(x => {
          if (x && x.Id > 0) {
            this.BrandName = x.BrandName;
            this.MasterId = x.Id;
            this.IsApproved = x.IsApproved
            this.IsActive = x.IsActive
            this.ItemschemMaster = x;
            this.ItemSchemeMasterDc=x;
            this.ItemschemMasterDetails = x.ItemSchemeDetails;
          }
        });
      }
    })
  }
  back() {
    this.router.navigateByUrl('layout/item/itemschememaster')
  }
  selectRow(checkValue) {
    if (checkValue) {
      this.selectedRows = this.ItemschemMasterDetails;
    } else {
      this.selectedRows = [];
    }
  }

  Approve() {

    if (this.selectedRows && this.selectedRows.length > 0) {
      if (this.selectedRows && this.selectedRows.length > 0) {
        this.PostObj = [];
        for (let index = 0; index < this.selectedRows.length; index++) {
          this.PostObj.push({ ItemSchemeDetailId: this.selectedRows[index].Id, ItemSchemeMasterId: this.selectedRows[index].ItemSchemeMasterId, IsActive: true });
        }
      }
      if (this.PostObj && this.PostObj.length > 0) {
        this.confirmationService.confirm({
          message: 'Are you sure that you want to perform this action?',
          accept: () => {
            this.blocked = true;
            this.ItemService.PostApproveItemSchemMaster(this.PostObj).subscribe(x => {
              this.blocked = false;
              alert(x);
              if (x) {
                this.messageService.add({ severity: 'success', summary: x, detail: '' });
                window.location.reload();
              }
            });
          }
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Please select atleast one checkbox to approve scheme', detail: '' });
      }
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Please select atleast one checkbox to approve scheme', detail: '' });

    }
  }
  Reset() {
    window.location.reload();

  }
  DeactiveItemSchem(item) {

    if (item && item.Id > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.ItemService.DeActivateSchemeDetail(item.ItemSchemeMasterId, item.Id).subscribe(res => {
            this.blocked = false;
            if (res) {
              alert(res);
              window.location.reload();
            }
            else {
              this.messageService.add({ severity: 'error', summary: "Something went wrong", detail: '' });
            }
          });
        }
      });
    }
  }

  DeactiveItemSchemMaster() {

    if (this.ItemschemMaster && this.MasterId > 0) {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.ItemService.DeActivateSchemeMaster(this.MasterId).subscribe(res => {

            this.blocked = false;
            if (res) {
              alert(res);
              window.location.reload();

            } else {
              this.messageService.add({ severity: 'error', summary: "Something went wrong", detail: '' });
            }
          });
        }
      });
    }
  }
  opendisplaySlab(row) {

    this.ItemschemSlab = row.Slabs;
    this.displaySlab = true;
    this.ItemschemFreebies = [];
    this.displayFreeBies = false;
  }
  opendisplayFreeBies(row) {
  
    this.ItemschemSlab = [];
    this.displaySlab = false;
    this.OfferIds=row.OfferIds;
    this.ItemschemFreebies = row.ItemSchemeFreebiess;

    this.displayFreeBies = true;
  }

  DeActivateFreebiesByDetailId(row) {

    if (row) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action? to Deactivate FreeBies',
        accept: () => {
          this.blocked = true;
          this.ItemService.DeActivateFreebiesByDetailId(this.MasterId,row).subscribe(res => {
           
            alert(res);
            this.blocked = false;
            if (res) {

              window.location.reload();
            } else {
              this.messageService.add({ severity: 'error', summary: "Something went wrong", detail: '' });
            }
          });
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'app/shared/services/item.service';
import { Table } from 'primeng/components/table/table';
import { DialogModule } from 'primeng/dialog';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ConfirmationService, SelectItem } from 'primeng/api';

@Component({
  selector: 'app-item-scheme-uploaded-details',
  templateUrl: './item-scheme-uploaded-details.component.html',
  styleUrls: ['./item-scheme-uploaded-details.component.scss']
})
export class ItemSchemeUploadedDetailsComponent implements OnInit {

  constructor(private router: Router, private r: ActivatedRoute, private ItemService: ItemService, private exportService: ExportServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ItemschemuplaoderMaster: {};
  ItemschemuplaoderDetails: [];
  ItemschemuplaoderDetail: [];
  ErroItemschemuplaoderDetail: any;
  display: boolean;
  Errordisplay: boolean;
  blocked: boolean;
  BrandName: string;
  MasterId: number;
  baseURL: any;
  Detailscolumns = [
    { field: 'ItemName', header: 'Item' },
    { field: 'CompanyCode', header: 'CompanyCode' },
    { field: 'MRP', header: 'MRP' },
    { field: 'CompanyStockCode', header: 'CompanyStockCode' },
    { field: 'BaseScheme', header: 'BaseScheme' },
    { field: 'PTR', header: 'PTR' },
    { field: 'FreeChildItem', header: 'FreeChildItem' },
    { field: 'FreeChildItemCompanyStockcode', header: 'Stockcode' },
    { field: 'ErrorMessage', header: 'Error' },
  ];
  ngOnInit() {
    this.r.params.subscribe(param => {
      if (param && param.Id > 0) {
        this.blocked = true;
     
        this.ItemService.getUploadedItemSchemeById(param.Id).subscribe(x => {
          this.blocked = false;
       
          if (x) {
            this.BrandName = x.BrandName;
            this.ItemschemuplaoderMaster = x;
            this.MasterId = x.Id;
            this.ItemschemuplaoderDetail = x.ItemSchemeExcelUploaderDetails;
          }
        });

      }
    })
  }
  back() {
    this.router.navigateByUrl('layout/item/uploaded-itemscheme')
  }
  openErrorDetails(Details) {
 
    this.ErroItemschemuplaoderDetail = Details;
    this.display = false;
    this.Errordisplay = true;

  }

  openDetails(Details) {

    this.ItemschemuplaoderDetails = Details;
    this.Errordisplay = false;
    this.display = true;
  }

  UpdateForReErrorChecking() {

    if (this.MasterId > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.blocked = true;
          this.ItemService.UpdateForReErrorChecking(this.MasterId).subscribe(res => {

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
  navigateToMaster(item) {

    this.router.navigate(['itemschememasterdetails', {
      Id: item.ItemSchemeMasterId,
    }], { relativeTo: this.r.parent });

  }

}

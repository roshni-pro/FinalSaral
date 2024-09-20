import { Component, Input, OnInit } from '@angular/core';
import { OrderRedispatchCountApproval } from 'app/operation-capacity/interface/orderResipatchCountApproval';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { VehicleMasterService } from 'app/operation-capacity/services/vehicle-master.service';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-redispatch-approval',
  templateUrl: './redispatch-approval.component.html',
  styleUrls: ['./redispatch-approval.component.scss']
})
export class RedispatchApprovalComponent implements OnInit {
  userId: number;
  // warehouseList : any; 
  @Input() warehouseId: number;
  orderRedispatchList: any;
  orderRedispatchCountApproval: OrderRedispatchCountApproval;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private vehiclemasterService: VehicleMasterService, private loaderService: LoaderService) { }

  ngOnInit() {
    // this.warehouseId = null;
    this.userId = Number.parseInt(localStorage.getItem('userid'));
    // this.loaderService.loading(true);
    // this.vehiclemasterService.whForRedispatch(this.userId).subscribe(x=>{
    //   this.warehouseList = x;
    //   this.loaderService.loading(false);
    // })
    this.onChangeWarehouse();
  }

  onChangeWarehouse() {
    this.loaderService.loading(true);
    this.vehiclemasterService.getRedispatchOrder(this.warehouseId).subscribe(res => {
      this.orderRedispatchList = res;
      this.loaderService.loading(false);
      console.log('Result', res);
    })
  }
  onApproval(rowData) {
    this.confirmationService.confirm({
      message: 'Are you sure,you want to Send request?',
      accept: () => {
        this.orderRedispatchCountApproval = {
          userId: rowData.UserId,
          CreatedDate: rowData.CreatedDate,
          Id: rowData.Id,
          IsApproved: true,
          OrderId: rowData.OrderId,
          Redispatchcount: rowData.Redispatchcount,
          UpdateDate: rowData.UpdateDate,
        }
        this.loaderService.loading(true);
        this.vehiclemasterService.approvalorder(this.orderRedispatchCountApproval).subscribe(result => {
          console.log('result', result);
          this.loaderService.loading(false);
          this.ngOnInit();
          this.messageService.add({ severity: 'success', summary: 'Approved Successfully!', detail: '' });
        });

      }
    });
  }
}

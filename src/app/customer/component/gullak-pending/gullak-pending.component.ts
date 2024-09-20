import { Component, OnInit, Input } from '@angular/core';
import { GullakService } from 'app/shared/services/gullak/gullak.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { GetGullakTransaction, GullakPendingDc } from 'app/shared/interface/gullak/gullak';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gullak-pending',
  templateUrl: './gullak-pending.component.html',
  styleUrls: ['./gullak-pending.component.scss']
})
export class GullakPendingComponent implements OnInit {

  @Input() Id: any;
  CustomerId: any;
  pendingresult: any;
  pageSize: number;
  GetGullakTransaction: GetGullakTransaction;
  GullakPendingDc: GullakPendingDc;
  blocked: boolean;
  sucess: boolean;
  fail: boolean;
  Ids: number[];
  isSelectedIds: boolean[];
  isSelect: boolean;
  successlist: any;
  url: string;
  src: string;
  isopenPopup: boolean;
  safeSrc: SafeResourceUrl;
  isPDF: boolean;
  IsFrame: boolean;
  Img: any;
  constructor(private gullakService: GullakService, private messageService: MessageService, private router: Router,
    private confirmationService: ConfirmationService, private route: ActivatedRoute, private exportService: ExportServiceService,
    private sanitizer: DomSanitizer) {
    this.Ids = [];
    this.isSelectedIds = [];
    this.successlist = [];
    this.url = this.gullakService.apiURL + '/GullakImages/';
  }

  ngOnInit() {
    this.isopenPopup = false;
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    this.CustomerId = Number(this.route.snapshot.paramMap.get("CustomerId"));

    this.pageSize = 10;
    this.GetGullakTransaction = {
      Skip: 0,
      Take: this.pageSize,
      GullakId: this.Id,
      CustomerId: this.CustomerId,
    }

    this.GullakPendingDc = {
      id: null,
      CustomerId: null,
      GullakId: null,
      GatewayTransId: null, // cheque number // online trX Number 
      status: '',
      Amount: null,
      GatewayRequest: '',// bank name // online payment Details      
      PaymentFrom: '',// online // cash //cheque
      comment: '',  // comment 
      GullakImage: '',
    }

    this.gullakService.getPendingStatus().subscribe(x => {
      this.pendingresult = x;
      console.log("x:", x);
      this.src = this.url + this.pendingresult.GullakImage;
      if (this.src != null) {
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
        this.IsFrame = true;
      }
    })


  }



  //   Statussuccess(rowdata) {
  //     
  //     if(rowdata.success == true)
  //     {

  //     this.GullakPendingDc = {    
  //       id: this.Id,
  //       CustomerId: this.CustomerId,
  //       GullakId : rowdata.GullakId,
  //       GatewayTransId: rowdata.GatewayTransId, // cheque number // online trX Number 
  //       status : "Success",
  //       Amount: rowdata.amount,
  //       GatewayRequest: rowdata.GatewayRequest,// bank name // online payment Details      
  //       PaymentFrom: rowdata.PaymentFrom,// online // cash //cheque
  //       comment: rowdata.comment,  // comment 
  //       GullakImage : rowdata.GullakImage,  
  //     }
  //   }
  //   if(rowdata.fail == true)
  //   {

  //   this.GullakPendingDc = {    
  //     id: this.Id,
  //     CustomerId: this.CustomerId,
  //     GullakId : rowdata.GullakId,
  //     GatewayTransId: rowdata.GatewayTransId, // cheque number // online trX Number 
  //     status : "Fail",
  //     Amount: rowdata.amount,
  //     GatewayRequest: rowdata.GatewayRequest,// bank name // online payment Details      
  //     PaymentFrom: rowdata.PaymentFrom,// online // cash //cheque
  //     comment: rowdata.comment,  // comment 
  //     GullakImage : rowdata.GullakImage,  
  //   }
  // }

  //     this.confirmationService.confirm({
  //       message: 'Are you sure that you want to perform this action?',
  //       accept: () => {
  //         
  //         this.blocked = true;
  //        
  //         this.gullakService.ChangePendingStatusV2(this.GullakPendingDc).subscribe(result => {
  //           this.blocked = false;
  //           if (result) {
  //             // success message                            
  //             this.messageService.add({ severity: 'success', summary: 'Status Updated Successfully!', detail: '' });
  //           } else {
  //             // fail message
  //             this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
  //           }
  //         });
  //         this.back();
  //       },
  //       reject: () => {
  //         
  //         this.blocked = true;
  //         rowdata.success = false;
  //         this.blocked = false;
  //         this.messageService.add({ severity: 'error', summary: 'Your Status is Canceled!', detail: '' });
  //       }
  //     });
  //   }
  openImg(GullakImage) {
    this.isopenPopup = true;
    this.Img = GullakImage;
  }

  success(Ids) {
    console.log('Ids54564:', Ids);
    // this.sucess = true;
    // this.fail = false;
    this.successlist = [];
    for (var i in Ids) {
      this.GullakPendingDc = {
        id: Ids[i].Id,
        CustomerId: Ids[i].CustomerId,
        GullakId: Ids[i].GullakId,
        GatewayTransId: Ids[i].GatewayTransId, // cheque number // online trX Number 
        status: "Success",
        Amount: Ids[i].amount,
        GatewayRequest: Ids[i].GatewayRequest,// bank name // online payment Details      
        PaymentFrom: Ids[i].PaymentFrom,// online // cash //cheque
        comment: Ids[i].comment,  // comment 
        GullakImage: Ids[i].GullakImage,
      }
      this.successlist.push(this.GullakPendingDc);
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Change the Status from pending to Success?',
      accept: () => {
        
        this.blocked = true;
        
        this.gullakService.ChangePendingV2(this.successlist).subscribe(result => {
          this.blocked = false;
          if (result) {
            // success message                            
            this.messageService.add({ severity: 'success', summary: 'Status Updated Successfully!', detail: '' });
          } else {
            // fail message
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
        this.ngOnInit();
      },
      reject: () => {
        
        this.blocked = true;
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Your Status is Canceled!', detail: '' });
      }
    });
  }

  fl(Ids) {
    // this.sucess = false;
    // this.fail = true;
    this.successlist = [];
    for (var i in Ids) {
      this.GullakPendingDc = {
        id: Ids[i].Id,
        CustomerId: Ids[i].CustomerId,
        GullakId: Ids[i].GullakId,
        GatewayTransId: Ids[i].GatewayTransId, // cheque number // online trX Number 
        status: "Fail",
        Amount: Ids[i].amount,
        GatewayRequest: Ids[i].GatewayRequest,// bank name // online payment Details      
        PaymentFrom: Ids[i].PaymentFrom,// online // cash //cheque
        comment: Ids[i].comment,  // comment 
        GullakImage: Ids[i].GullakImage,
      }
      this.successlist.push(this.GullakPendingDc);
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Change the Status from Pending to Fail?',
      accept: () => {
        
        this.blocked = true;
        
        this.gullakService.ChangePendingV2(this.successlist).subscribe(result => {
          this.blocked = false;
          if (result) {
            // success message                            
            this.messageService.add({ severity: 'success', summary: 'Status Updated Successfully!', detail: '' });
          } else {
            // fail message
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
        this.ngOnInit();
      },
      reject: () => {
        
        this.blocked = true;
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Your Status is Canceled!', detail: '' });
      }
    });
  }

  refresh() {
    this.gullakService.getPendingStatus().subscribe(x => {
      
      this.pendingresult = x;
      console.log("x:", x);
    })
  }

  getData(rowData) {
    
    rowData.IsSelected = !rowData.IsSelected;
    console.log('ir is: ', rowData);
    if (rowData.IsSelected) {
      this.Ids.push(rowData);
      if (this.Ids.length > 0) {
        this.sucess = true;
        this.fail = true;
      }

      var b = this.Ids;
      this.isSelectedIds.push(rowData.IsSelected);
      console.log('dssdds', this.Ids);
      console.log('isSelectedIds', this.isSelectedIds);
      console.log('dddd', b);
    } else {
      let index = this.Ids.indexOf(rowData.Id);
      this.Ids.splice(index, 1);
      console.log('splice', this.Ids);
    }
    if (this.Ids.length == 0) {
      this.sucess = false;
      this.fail = false;
    }
    if (rowData.IsSelected == true) {
      this.isSelect = rowData.IsSelected;
      if (this.isSelect == false) {
        this.Ids == [];
      }
    }

  }

  Statussuccess(rowdata) {
    
    if (rowdata.success == true) {

      this.GullakPendingDc = {
        id: this.Id,
        CustomerId: this.CustomerId,
        GullakId: rowdata.GullakId,
        GatewayTransId: rowdata.GatewayTransId, // cheque number // online trX Number 
        status: "Success",
        Amount: rowdata.amount,
        GatewayRequest: rowdata.GatewayRequest,// bank name // online payment Details      
        PaymentFrom: rowdata.PaymentFrom,// online // cash //cheque
        comment: rowdata.comment,  // comment 
        GullakImage: rowdata.GullakImage,
      }
    }
    if (rowdata.fail == true) {

      this.GullakPendingDc = {
        id: this.Id,
        CustomerId: this.CustomerId,
        GullakId: rowdata.GullakId,
        GatewayTransId: rowdata.GatewayTransId, // cheque number // online trX Number 
        status: "Fail",
        Amount: rowdata.amount,
        GatewayRequest: rowdata.GatewayRequest,// bank name // online payment Details      
        PaymentFrom: rowdata.PaymentFrom,// online // cash //cheque
        comment: rowdata.comment,  // comment 
        GullakImage: rowdata.GullakImage,
      }
    }

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        
        this.blocked = true;
        
        this.gullakService.ChangePendingStatusV2(this.GullakPendingDc).subscribe(result => {
          this.blocked = false;
          if (result) {
            // success message                            
            this.messageService.add({ severity: 'success', summary: 'Status Updated Successfully!', detail: '' });
          } else {
            // fail message
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });

      },
      reject: () => {
        
        this.blocked = true;
        rowdata.success = false;
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'Your Status is Canceled!', detail: '' });
      }
    });
  }


}

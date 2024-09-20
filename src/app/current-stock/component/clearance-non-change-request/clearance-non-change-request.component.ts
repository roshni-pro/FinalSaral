import { Component, OnInit } from '@angular/core';
import { ClearanceNonChangeRequestService } from 'app/current-stock/services/clearance-non-change-request.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-clearance-non-change-request',
  templateUrl: './clearance-non-change-request.component.html',
  styleUrls: ['./clearance-non-change-request.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ClearanceNonChangeRequestComponent implements OnInit {
  entity: any;
  Id: number;
  SelectedStatus: any = {
    "code": ''
  }
  isLoading: boolean
  SearchedData: any
  IsHistory: boolean = false;
  IsOpen: boolean = false;
  status: any
  cols: any[];
  dialogData: any = []
  Data: any
  apData: any
  comment: string = ''
  ctrlstatus: any
  controlStatus: any
  skip:number;
  take:number
  totalRecords:number
  filter:string=""


  constructor(
    private _service: ClearanceNonChangeRequestService,
    private _msg: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.filter=""
    this.isLoading = false
    
    this.entity = 'ClNSShelfConfigurationTemp';
    
    this.status = [
      { name: 'Pending', code: 'Pending' },
      { name: 'Approved', code: 'Approved' },
      { name: 'Rejected', code: 'Rejected' }
    ]
    
    this.cols = [
      { field: 'RequestedBy', header: 'RequestedBy' },
      { field: 'CategoryName', header: 'Category' },
      { field: 'SubCategoryName', header: 'Subcategory' },
      { field: 'BrandName', header: 'Brand' },
      { field: 'ItemNumber', header: 'ItemNo.' },
      { field: 'Itemname', header: 'Item Name' },
      { field: 'Status', header: 'Status' }
    ];

    this.ctrlstatus = [
      { name: 'Approved', code: 'Approved' },
      { name: 'Rejected', code: 'Rejected' }
    ]
  }

  getHistory(req) {
    this.Id = req.Id
    this.IsHistory = true
  }

  openDialog(req) {
    this.comment = '';
    this.dialogData = []
    this.apData = req;
    this.isLoading = true;
    this._service.popupData(this.apData.Id).subscribe(res => {
      this.Data = res;
      if (res != undefined) {
        res.forEach(e => {
          this.Data = {
            "Id": req.Id,
            "RequestedBy": req.RequestedBy,
            "CategoryName": req.CategoryName,
            "SubCategoryName": req.SubCategoryName,
            "Brand": req.BrandName,
            "ItemNumber": req.ItemNumber,
            "Itemname": req.Itemname,
            "Status": req.Status,
            "comment": e.RejectComment ? e.RejectComment : '',
            "RequestedClearanceShelfLife": e.ReqClearanceShelfLifeFrom + '% -' + e.ReqClearanceShelfLifeTo + '% ',
            "RequestedNonsellShelfLife": e.ReqNonSellShelfLifeFrom + '% -' + e.ReqNonSellShelfLifeTo + '% ',
          }
          this.comment = this.Data.comment ? this.Data.comment : '';
          console.log(this.comment);
          this.dialogData.push(this.Data)
          this.isLoading = false;
        })
      }
    })
    this.isLoading = false
    this.IsOpen = true;
  }

  load(event) {
    this.filter=this.filter?this.filter:""
    this.skip = event.first;
    this.take = event.rows;
   
    if(this.SelectedStatus.code!=""){
      this.SearchedData=[];
      this.globalSearch();
    } 
  }
  globalSearch(){
    this.isLoading = true
    this._service.GetData(this.SelectedStatus.code,this.skip,this.take,this.filter).subscribe((res: any) => {
      if (res.ApprovePageSearchList.length == 0) {
        this.showError("Data not Found!");
        this.isLoading = false
      }
      else {
        this.SearchedData = res.ApprovePageSearchList;
        this.totalRecords=res.TotalRecords;
        this.isLoading = false
      }
    })
    this.isLoading = false
  }
  Search() {
    this.SearchedData = []
    // this.filter=this.filter?this.filter:""
    if(this.filter==null ||this.filter==undefined){
      this.filter=""
    }
    else{
    }
    if (this.SelectedStatus == undefined || this.SelectedStatus.code == "") {
      this.showError("Select Status!")
    }
    else {
      this.isLoading = true
      this._service.GetData(this.SelectedStatus.code,this.skip,this.take,this.filter).subscribe((res: any) => {
        // if (res || res.ApprovePageSearchList.length == 0) {
          // }
          // else {
            console.log(res);
            
            this.SearchedData = res.ApprovePageSearchList;
            this.totalRecords=res.TotalRecords;
            this.isLoading = false
            // }
            
            if(this.SearchedData.length==0){
                this.showError("Data not Found!");
                this.isLoading = false
        }
      })
      this.isLoading = false
      this.IsOpen = false;
    }
  }

  ApproveReq() {
    if (this.controlStatus == undefined || this.controlStatus.code == null) {
      this.showError("select status")
    }
    else if (this.controlStatus.code == 'Rejected' && this.comment == "") {
      this.showError("Add comment !");
    }
    else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.apData.comment = '';
          console.log(this.apData);
          this.apData = {
            "Id": this.apData.Id,
            "Status": this.controlStatus.code,
            "comment": this.comment ? this.comment : null
          }
          this.isLoading = true
          this._service.ApproveRequest(this.apData).subscribe((res: any) => {
            console.log(res);
            if (res.Status == true) {
              this._msg.add({ severity: 'info', summary: 'Confirmed', detail: res.Message });
              this.isLoading = false
              this.controlStatus = [];
              this.Search();
            }
            else {
              this._msg.add({ severity: 'error', summary: 'Rejected', detail: res.Message });
              this.isLoading = false
            }
          })
        },
        reject: () => {
          //this._msg.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
        }
      });
    }
  }

  clear() {
    this.SelectedStatus = [];
    this.SearchedData = [];
  }

  showError(msg) {
    this._msg.add({ severity: 'error', summary: 'Error', detail: msg });
  }
  showSuccess(msg) {
    this._msg.add({ severity: 'success', summary: 'Success', detail: msg });
  }
}

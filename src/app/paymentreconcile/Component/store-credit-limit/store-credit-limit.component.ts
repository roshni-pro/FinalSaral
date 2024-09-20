import { Component, OnInit } from '@angular/core';
import { UpiTransactionDetailsServiceService } from '../upi-transaction-details-service.service';
import { StoreService } from 'app/store/services/store.service';
import { WarehouseQuadrantCustomerTypeServiceService } from 'app/item/services/warehouse-quadrant-customer-type-service.service';
import { ConfirmationService } from 'primeng/api';
import { event } from 'jquery';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';

@Component({
  selector: 'app-store-credit-limit',
  templateUrl: './store-credit-limit.component.html',
  styleUrls: ['./store-credit-limit.component.scss']
})
export class StoreCreditLimitComponent implements OnInit {
  isLoading: boolean = false;
  filenames: any;
  file: File[];
  filepath: File[];
  uploadPopUp: boolean = false;
  allStoreList: any
  AddStoreList: any
  id: any;
  amount: any;
  SearchHit: boolean = false;
  first: number = 0;
  totalRecords: number = 0;
  lo: boolean = false;
  itemLists: any;
  selecteditem: any;
  selectedStore: any;
  Storeid: any[];
  AddpopUpDialog: boolean = false;
  SelectedStore: any;
  SelectedCustomer: any;
  SelectedCreditLimit: any;
  SelectedDueDays: any;
  SelectedSkcode: any;
  SelectedCreditlimit: any;
  SelectedShopName: any;
  customerlist: any;
  entity:any;
  roleName:any;
  roleList:any;
  roleListarry:boolean=false;

  constructor(private UpiTransactionService: UpiTransactionDetailsServiceService,private expoerService:ExportServiceService,
    private confirmationService: ConfirmationService,private exportservice:ExportServiceService, private peoplePilot: PepolePilotService) { 
      this.entity = "StoreCreditLimit";

    }

  ngOnInit() {
    this.getStore()

    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      
      for (var i in this.roleList) {
        if (this.roleList[i] == 'Paylater Configuration' ) {
          this.roleListarry = true;
        }
        
      }
      
      localStorage.removeItem('role');

    });
  }


  getStore() {
    this.isLoading = true;
    this.UpiTransactionService.GetStoreList().subscribe((res) => {
      this.allStoreList = res;
      this.isLoading = false;
    })
  }
  AddPopUp() {
    this.AddpopUpDialog = true;
    this.stores()
  }
  AddCancel() {
    this.SelectedStore='';
    this.SelectedShopName='';
    this.SelectedCreditlimit='';
    this.SelectedDueDays=''
  }

  

  stores() {
    this.UpiTransactionService.AllStore().subscribe((result: any) => {
      console.log(result, 'addstorelist');
      this.AddStoreList = result
    })
  }

  SeachAdd() {
    if (this.SelectedSkcode == undefined || this.SelectedSkcode == null || this.SelectedSkcode == "") {
      alert("Please Enter Skcode");
      return false;
    }
    this.UpiTransactionService.GetSkCodeCustomerList(this.SelectedSkcode).subscribe((res) => {
      this.customerlist = res
      console.log(this.customerlist, 'GetSkCodeCustomerList');
      this.customerlist.forEach(element => {
        element.fullname = element.Skcode + ' - ' + element.ShopName
      });
    })
  }
  Cancel()
  {
    this.SelectedStore='';
    this.SelectedShopName='';
    this.SelectedCreditlimit='';
    this.SelectedDueDays='';
    this.SelectedSkcode='';
  }

  SaveAdd() {
    if (this.SelectedStore == undefined || this.SelectedStore == null || this.SelectedStore == "") {
      alert("Please Select Store");
      return false;
    }
    if (this.SelectedShopName == undefined || this.SelectedShopName == null || this.SelectedShopName == "") {
      alert("Please Select ShopName");
      return false;
    }
    if (this.SelectedCreditlimit == undefined || this.SelectedCreditlimit == null || this.SelectedCreditlimit == "") {
      alert(" Please Enter Creditlimit");
      return false;
    }
    if (this.SelectedDueDays == undefined || this.SelectedDueDays == null || this.SelectedDueDays == "") {
      alert(" Please Enter DueDays");
      return false;
    }
    const payload =
    {
      StoreId: this.SelectedStore.Id,
      CustomerId: this.SelectedShopName.CustomerId,
      CreditLimit: this.SelectedCreditlimit,
      DueDays: this.SelectedDueDays
    }
this.isLoading=false;
    this.UpiTransactionService.AddCustomerLimit(payload).subscribe(result => {
if(result.Status==true)
{
  alert(result.Message);
  this.isLoading=false;
  this.AddpopUpDialog=false
  this.SelectedStore='';
  this.SelectedShopName='';
  this.SelectedCreditlimit='';
  this.SelectedDueDays='';
  this.SelectedSkcode=''

}else
{
  alert(result.Message);
  this.isLoading=false;
  this.AddpopUpDialog=false
  this.SelectedShopName='';
  this.SelectedCreditlimit='';
  this.SelectedDueDays='';
}
    })
  }

  load(event) {
    this.lo = true;
    this.SearchList(event);
  }
  ForSearchHit() {
    this.SearchHit = true;
    this.first = 0;
    this.totalRecords = 0;
  }

  uploadbtn() {
    this.uploadPopUp = true;
  }

  SearchList(event) {
    if ((this.selectedStore == undefined && this.selecteditem == undefined) && (this.lo == false || this.SearchHit == true)) {
      alert("Please Select at least one field"); return false;
    }
    this.Storeid = []
    if (this.selectedStore != undefined) {
      this.selectedStore.forEach((x: any) => {
        this.Storeid.push(x.StoreId)
      })
    }
    if (this.SearchHit == true) {
      const payload = {
        "StoreId": this.Storeid ? this.Storeid : [],
        "SkCode": this.selecteditem ? this.selecteditem : null,
        "Skip": event.first ? event.first : 0,
        "Take": event.rows ? event.rows : 10,
        "Status": 0
      }
      this.isLoading = true;
      this.UpiTransactionService.SearchCreditList(payload).subscribe((res: any) => {
        if (res.length > 0) {
          this.itemLists = res;
          console.log(this.itemLists);
          this.isLoading = false;
          this.totalRecords = res[0].TotalCount;
        } else {
          alert("No Data Found!");
          this.isLoading = false;
          this.itemLists = [];
          this.totalRecords = 0;
        }
      })
    }
  }
  
  Export(event)
  {
    if ((this.selectedStore == undefined) && (this.lo == false || this.SearchHit == true)) {
      alert("Please Select selected Store"); return false;
    }
    this.Storeid = []
    if (this.selectedStore != undefined) {
      this.selectedStore.forEach((x: any) => {
        this.Storeid.push(x.StoreId)
      })
    }
    if (this.SearchHit == true) {
      const payload = {
        "StoreId": this.Storeid ? this.Storeid : [],
        "SkCode": this.selecteditem ? this.selecteditem : null,
        "Skip": event.first ? event.first : 0,
        "Take": event.rows ? event.rows : 10,
        "Status": 0
      }
      this.isLoading = true;
      this.UpiTransactionService.ExportCreditList(payload).subscribe((res: any) => {
        if (res.length > 0) {
          this.itemLists = res;
          console.log(this.itemLists);
          this.isLoading = false;
          var ExportData = this.itemLists.map(function (elem) {
            return {
              'Skcode':elem.SkCode,
              'CustomerName':elem.CustomerName,
              'Mobile':elem.Mobile,
              'StoreName':elem.StoreName,
              'CreditLimit':elem.CreditLimit,
              'UsedCreditLimit':elem.UsedCreaditLimit,
              'RemainingAmount':elem.AvailableRemainingAmount,
              'IsActive':elem.IsActive,
           
            }
          });
          this.exportservice.exportAsExcelFile(ExportData,"StoreLimitData")
          // this.expoerService.exportAsExcelFile(this.itemLists, 'ExportFile');
          // this.totalRecords = res[0].TotalCount;
        } else {
          alert("No Data Found!");
          this.isLoading = false;
          this.itemLists = [];
          this.totalRecords = 0;
        }

      })
    }
  }

  ActiveInactive(data) {
    this.id = data.Id;
    this.amount = data.CreditLimit
    this.confirmationService.confirm({
      message: 'Are you sure that you want to update?',
      accept: () => {
        this.isLoading = true;
        this.UpiTransactionService.EditCreditList(this.id, this.amount, data.IsActive).subscribe(x => {
          console.log(x);

          if (x == 'Updated Successfully') {
            alert(x)
            this.isLoading = false;
            this.SearchList(null)
          } else {
            alert(x)
            this.isLoading = false;
          }
        })
      },
      reject: () => {
        data.IsActive = data.IsActive == true ? false : true
      }
    });
  }
 
  UpdateCraditLimit(data) {
    if (data.UsedCreaditLimit > data.CreditLimit) {
      alert('CreditLimit Can Not be Smaller than Used Limit');
      this.SearchList(event);
      return false;
    }
    this.id = data.Id;
    this.amount = data.CreditLimit
    this.confirmationService.confirm({
      message: 'Are you sure that you want to update?',
      accept: () => {
        this.isLoading = true;
        this.UpiTransactionService.EditCreditList(this.id, this.amount, data.IsActive).subscribe(x => {
          console.log(x);

          if (x == 'Updated Successfully') {
            alert(x)
            this.isLoading = false;
            this.SearchList(null)
          } else {
            alert(x)
            this.isLoading = false;
          }
        })
      },
      reject: () => {
        this.SearchList(event)

      }
    });
  }

  DownloadSampleFile() {
    this.isLoading = true;
    this.UpiTransactionService.DownloadSampleFile().subscribe((result: any) => {
      if (result != null) {
        this.isLoading = false;
        window.open(result);
      }
    })
  }

  onUpload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.filepath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
    }
  }

  Uploader() {
    if (this.file == undefined || this.file.length == 0) {
      alert("Please upload File");
      return false;
    }
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.filenames = this.file[0].name.split('.')
    this.isLoading = true;
    this.UpiTransactionService.Uploader(formData).subscribe((result: any) => {
      console.log(result, "result");
      if (result == 'uploaded Successfully') {
        this.file = [];
        alert(result);
        this.uploadPopUp = false;
        this.isLoading = false;
        let fileInput = document.getElementById('myInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      }
      else {
        alert(result);
        this.uploadPopUp = false;
        this.isLoading = false;
        let fileInput = document.getElementById('myInput') as HTMLInputElement;
        fileInput.value = '';
      }
    })
  }
  cancell() {
    let fileInput = document.getElementById('myInput') as HTMLInputElement;
    fileInput.value = '';
  }

  space(event: any) {
    if ( event.code === 'Space') {
      event.preventDefault();
    }
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\ ]/; // Remove the minus sign from the pattern
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  historyId:any;
  historyDisplay:boolean=false;
  history(historyId){
    this.historyId=historyId
    this.historyDisplay=true;
  }
}

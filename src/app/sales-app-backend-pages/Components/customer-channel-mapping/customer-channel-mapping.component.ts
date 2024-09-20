import { Component, OnInit } from '@angular/core';
import { ClusterStoreService } from 'app/cluster/services/cluster-store.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';
import { ClusterService } from 'app/shared/services/cluster.service';
import { Console } from 'console';


@Component({
  selector: 'app-customer-channel-mapping',
  templateUrl: './customer-channel-mapping.component.html',
  styleUrls: ['./customer-channel-mapping.component.scss']
})
export class CustomerChannelMappingComponent implements OnInit {

  constructor(private customerService: CustomerService, private exportService: ExportServiceService, private clusterService: ClusterService,
    private ClusterStoreService: ClusterStoreService, private msg: MessageService) { }

  ngOnInit() {
    this.CustomerChannelTypeList();
    this.GetStore();
    this.Search();
  }

  SelectedSkcode: any
  ChannelMasterId: any
  ChannelTypeList: any
  blocked: boolean = false;
  popupExport: boolean = false
  popupUpload: boolean = false
  Pstoreid: any
  PchannelId: any
  storeList: any
  op: boolean = true;
  ViewList: any
  isEditing: boolean = false;
  isShow: boolean = false;
  ChannelID: any
  IsAddChannel:boolean = false;
  Skcode:any
  CustomerChannel:any
  Store:any

  CustomerChannelTypeList() {
    this.customerService.CustomerChannelTypeList().subscribe(res => {
      this.ChannelTypeList = res;
      console.log(this.ChannelTypeList);
    })
  }
  GetStore() {
    this.ClusterStoreService.getStoreList().subscribe(res => {
      this.storeList = res;
    })
  }

  Search() {
    debugger;
    this.isShow=false;
    if (this.SelectedSkcode == undefined) { this.showError("Select Skcode!") }
    else {
      this.blocked = true;
      this.customerService.GetSKCodeByStoreChannel(this.SelectedSkcode).subscribe(result => {
        if (result.length > 0) {
          this.ViewList = result;
          this.blocked=false;
          this.ViewList.forEach(element => {
            element.isEditing=false;
          });
          this.blocked = false;
          console.log(this.ViewList, 'result');
        }
        else {
          this.blocked=false;
          this.showError("Data Not Found!"); this.ViewList = undefined;
        }
      })
    }
  }


  onUpload(event) {
    const files = event.files[0];
    console.log(files);
    let file = new FormData();
    file.append("file", files)
    this.blocked = true;
    this.customerService.UploadCustomerChannelTypeFile(file).subscribe(
      res => {
        this.blocked = false;
        console.log(res)
        if (res.Status == false) {
          alert(res.msg);  this.popupUpload = false;    window.location.reload();
        } else {
          alert(res); this.popupUpload = false;  window.location.reload();
        }
      },
      err => {
        alert(err.error.ErrorMessage); this.popupUpload = false;
      })
  }


  Exports() {
    // debugger;
    if (this.Pstoreid == undefined) { this.showError("Select Store!") }
    else if (this.PchannelId == undefined || this.PchannelId.length == 0) { this.showError("Select Channel!") }

    if (this.PchannelId && this.Pstoreid) {
      let cid = [];
      this.PchannelId.forEach(ele => {
        cid.push(ele.ChannelMasterId)
      });

      const payload = {
        'ChannelMasterIds': cid,
        'Storeid': this.Pstoreid.Id
      }
      this.blocked = true;
      this.customerService.ExportStoreChannelSkCodes(payload).subscribe(res => {
        console.log(res); var exportdata = res;
        if (exportdata.length > 0) { this.exportService.exportAsExcelFile(exportdata, "Export Store Channel SkCodes") }
        else { this.showError("Data Not Found!") }
        this.Pstoreid = undefined;
        this.PchannelId = undefined;
        this.popupExport = false;
        this.blocked = false;
      })

    }
  }

  rowExecutiveList(rowData) {
    // debugger
    rowData.isEditing = true;
    var channelName=rowData.ChannelType
    channelName = this.ChannelTypeList.filter(x => { return x.ChannelType == channelName });
    this.ChannelID = channelName[0];
    this.isShow=true;

  }

  onRowEditSave(rowData, status) {
    //  debugger;
    if (status != null) {
      const payload = {
        "Id": rowData.Id,
        "CustomerId": rowData.CustomerId,
        "SKCode": rowData.SKCode,
        "storeid": rowData.StoreId,
        "ChannelMasterId": this.ChannelID.ChannelMasterId,
        "IsDeleted": status
      }
      console.log(payload);
      this.blocked = true;
      this.customerService.Add_Update_Delete_CustomerMapping(payload).subscribe(res => {
        console.log(res);
        this.blocked = false;
        if (res.Status) {
          this.showSuccess(res.Message)
          rowData.isEditing = false;
          this.Search();
        } else {
          this.showError(res.Message)
          rowData.isEditing = false;
        }
      })
    } else {
      rowData.isEditing = false;;
    }
    this.isShow=false;
  }



  DownLoadSampleFile() {
    {
      let arr = [];
      arr.push({
        'SKCode': null,
        'ChannelType': null,
        'Store': null
      })
      this.exportService.exportAsExcelFile(arr, "Sample Channel File")
    }
  }
  AddStoreList:any
  stores() {
    this.customerService.AllStore().subscribe((result: any) => {
      console.log(result, 'addstorelist');
      this.AddStoreList = result
    })
  }

  SaveChannel()
  {debugger
      if(this.Skcode == null || this.Skcode == undefined)
      {
        this.showError("Enter SkCode");
        return false;
      }
      else if(this.Store == null || this.Store == undefined)
      {
        this.showError("Select Store");
        return false;
      }
      else if(this.CustomerChannel == null || this.CustomerChannel == undefined)
      {
        this.showError("Select Channel");
        return false;
      }
      let SID = [];
      this.Store.forEach(ele => {
        SID.push(ele.Id)
      });
      const payload = {
        "SKCode":this.Skcode,
        "StoreId": SID,
        "ChannelId": this.CustomerChannel.ChannelMasterId
      }
      console.log(payload,"payload")
      //return false
      this.customerService.AddChannel(payload).subscribe((result: any) => {
        console.log(result, 'addstorelist');
        if(result != null && result.Status)
        {
          this.showSuccess(result.Message)
          this.IsAddChannel = false;
          this.Skcode = undefined;
          this.CustomerChannel = undefined;
          this.Store = undefined;
        }
        else
          this.showError(result.Message)
      })
  }

  AddChannel(){
    this.IsAddChannel = true;
    this.stores();
  }
   cancel() {
    this.IsAddChannel = false;
    this.Skcode = undefined;
    this.CustomerChannel = undefined;
    this.Store = undefined;
  }

  export() {
    this.popupExport = true;
  }

  upload() {
    this.popupUpload = true
  }

  showError(msg1: string) {
    this.msg.add({ severity: "error", summary: "Error", detail: msg1 });
  }
  showSuccess(msg1: string) {
    this.msg.add({ severity: "success", summary: "Success", detail: msg1 });
  }
}

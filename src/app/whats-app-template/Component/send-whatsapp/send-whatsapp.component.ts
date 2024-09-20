import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { WhatsAppTemplateService } from 'app/whats-app-template/Service/whats-app-template.service';
import { LoaderService } from 'app/shared/services/loader.service';
import { async } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-send-whatsapp',
  templateUrl: './send-whatsapp.component.html',
  styleUrls: ['./send-whatsapp.component.scss']
})
export class SendWhatsappComponent implements OnInit {

  TemplateList: any[] = [];
  selectedTemplateObj = {
    TemplateName: '',
    TemplateDescription: '',
    TemplateId: null
  };

  cityList: any;
  selectedCitiesObj: any[] = [];

  warehouseList: any[] = [];
  selectedWarehouseObj: any[] = [];


  openAddPopup: boolean = false;


  defaultGroupList: any[] = [
    { GroupName: 'WithoutKPPAndRDS', GroupID: 1 },
    { GroupName: 'OnlyKPP', GroupID: 2 },
    { GroupName: 'OnlyRDS', GroupID: 3 },
    { GroupName: 'Level 0', GroupID: 4 },
    { GroupName: 'Level 1', GroupID: 5 },
    { GroupName: 'Level 2', GroupID: 6 },
    { GroupName: 'Level 3', GroupID: 7 },
    { GroupName: 'Level 4', GroupID: 8 },
    { GroupName: 'Level 5', GroupID: 9 }
  ];
  groupList: any[] = [];
  selectedGroupObj: any[] = [];
  isGroupListLoading: boolean = false;

  payload: sendWhatsAppDC = {
    Id: 0,
    TemplateId: null,
    CityIds: [],
    WarehouseIds: [],
    GroupIds: [],
    NotificationName: '',
    IsSend: false,

    templateName: '',
    templateDescription: ''
  }

  whatsAppGroupList: any[] = [];
  whatsAppGroupListTotalRecords: number = 0;
  constructor(private whatsAppTemplateService: WhatsAppTemplateService,
    private _service: InventoryforcastserService,
    private loaderService: LoaderService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    //for popup
    // this.GetAllTemplateList();
    this.GetAllTemplateList();
    this.getCityList();
  }

  async GetAllTemplateList() {
    let res: any = await this.whatsAppTemplateService.WATemplateList().toPromise();
    console.log("all templte list", res);
    if (res) {
      this.TemplateList = res;
    } else {
      this.TemplateList = [];
    }
  }

  setDescription() {
    this.payload.TemplateId = this.selectedTemplateObj.TemplateId;
    // console.log(this.payload);
  }

  getCityList() {
    this._service.getCityList().subscribe((res: any) => {
      console.log("all cities", res);
      this.cityList = res;
    })
  }

  setCities() {
    this.payload.CityIds = [];
    this.selectedWarehouseObj = [];
    this.selectedCitiesObj.forEach((element: any) => {
      this.payload.CityIds.push(element.Cityid);
    });
    this.getMultiHubList(this.payload.CityIds)
    console.log("payload after city selection", this.payload);
  }

  async getMultiHubList(cityIds: any[]) {
    this.warehouseList = [];
    let res = await this._service.getMultiHubList(cityIds).toPromise()
    console.log("warehouse list", res);
    if (res) {
      this.warehouseList = res.filter(x => x.IsKPP === false)
    } else {
      this.warehouseList = [];
    }

  }

  setWarehouse() {
    console.log("selectedWarehouseObj", this.selectedWarehouseObj);
    this.payload.WarehouseIds = [];
    this.selectedWarehouseObj.forEach((element: any) => {
      this.payload.WarehouseIds.push(element.WarehouseId);
    });
    this.getGroupList();
    console.log("payload after warehouse selection", this.payload);
  }

  async getGroupList() {
    let warehouseIds: any[] = [];
    this.isGroupListLoading = true;

    this.payload.WarehouseIds.forEach((ele: any) => {
      warehouseIds.push(ele);
    });

    var res: any = await this.whatsAppTemplateService.getGroupList(warehouseIds).toPromise();
    console.log("Group List", res);
    if (res) {
      if (res.length > 0) {
        this.groupList = this.defaultGroupList.concat(res);
      } else {
        this.groupList = this.defaultGroupList;
      }
      this.isGroupListLoading = false;
    }

    console.log("groupList list", this.groupList);
  }

  setGroupIDs() {
    // console.log(this.selectedGroupObj);
    this.payload.GroupIds = [];
    this.selectedGroupObj.forEach((element: any) => {
      this.payload.GroupIds.push(element.GroupID);
    });
  }

  save() {

    this.payload.GroupIds = this.payload.GroupIds.toString();
    this.payload.CityIds = this.payload.CityIds.toString();
    this.payload.WarehouseIds = this.payload.WarehouseIds.toString();

    console.log("payload on save", this.payload);

    if (this.payload.GroupIds == '') {
      alert("Please Select Groups");
      return;
    }

    if (this.payload.TemplateId == null || this.payload.TemplateId == 0 || this.payload.TemplateId == undefined) {
      alert("Please Select a Template");
      return;
    }

    if (this.payload.NotificationName.trim() == '') {
      alert("Please Enter Notification Name");
      return;
    } 
    this.payload.NotificationName = this.payload.NotificationName.trim();
    this.loaderService.loading(true);
    this.whatsAppTemplateService.InsertWhatsAppGrpNotify(this.payload).subscribe((res: any) => {
      console.log("save res", res);
      if (res && res.Status) {
        this.whatsAppGroupNotificationList(this.skip, this.take);
        alert(res.Message);
        this.loaderService.loading(false);
        this.openAddPopup = false;
        this.clearPopUp();
      }
      else {
        this.loaderService.loading(false);
        alert("Cannot save, Please Try Again");
      }
    });

  }

  clearPopUp() {

    this.payload.CityIds = [];
    this.payload.GroupIds = [];
    this.payload.NotificationName = '';
    this.payload.TemplateId = 0;
    this.payload.WarehouseIds = [];
    this.payload.templateName = '';
    this.payload.templateDescription = '';

    this.selectedGroupObj = [];
    this.selectedCitiesObj = [];
    this.selectedTemplateObj = {
      TemplateName: '',
      TemplateDescription: '',
      TemplateId: null
    };

    this.selectedWarehouseObj = [];

    this.warehouseList = [];
    this.groupList = this.defaultGroupList;

    this.openAddPopup = false;
  }



  openToAdd() {
    this.openAddPopup = true;
  }


  skip = 0;
  take = 10;
  load(event) {
    console.log(event);
    var Last = event.first ? event.first + event.rows : 10;
    let pageNo = event.rows ? Last / event.rows : Last / 10;
    this.skip = (pageNo - 1) * 10;
    this.take = event && event.rows ? event.rows : 10;
    
    this.whatsAppGroupNotificationList(this.skip, this.take);
  }

  whatsAppGroupNotificationList(skip: number, take: number) {
    this.whatsAppTemplateService.whatsAppGroupNotificationList(skip, take).subscribe(async (res: any) => {
      console.log("get res", res);
      if (res && res.whatsappGroupNotifDcs && res.whatsappGroupNotifDcs.length > 0) {
        this.whatsAppGroupList = res.whatsappGroupNotifDcs;
        this.whatsAppGroupListTotalRecords = res.TotalCount;
        debugger
        await this.GetAllTemplateList();
        console.log(this.TemplateList);

        this.whatsAppGroupList.forEach((Notification: any) => {
          let temp = this.TemplateList.find(x => x.TemplateId == Notification.TemplateId);
          if (temp != undefined) {
            Notification.templateName = temp.TemplateName;
            Notification.templateDescription = temp.TemplateDescription;
          }
        });

      } else {
        this.whatsAppGroupList = [];
        this.whatsAppGroupListTotalRecords = 0;
      }
    });

  }

  delete(id: number) {
    this.whatsAppTemplateService.DeleteWhatsAppGroupNotificationMasters(id).subscribe((res: any) => {
      console.log("delete res", res);
      if (res && res.Msg == "Deleted Successfully") {
        alert("Deleted Successfully");
        this.whatsAppGroupNotificationList(this.skip, this.take);
      } else {
        alert("Failed to delete, Please try again");
      }
    });
  }

  SendNotification(id: number) {
    this.loaderService.loading(true);
    this.whatsAppTemplateService.SendNotification(id).subscribe((res: any) => {
      console.log("SendNotification res", res);
      if (res) {
        this.loaderService.loading(false);
        alert("Sent Successfully");
        this.whatsAppGroupNotificationList(this.skip, this.take);
      } else {
        this.loaderService.loading(false);
        alert("Something went wrong, Please try again");
      }
    });
  }

  async openPopupInEditMode(item) {

    // console.log(this.selectedCitiesObj, this.selectedTemplateObj, this.selectedWarehouseObj, this.selectedGroupObj, item.NotificationName);

    this.loaderService.loading(true);
    this.payload.NotificationName = item.NotificationName;
    this.payload.Id = item.Id;
    this.payload.TemplateId = item.TemplateId;
    this.payload.IsSend = false;

    debugger

    this.payload.CityIds = item.CityIds ? item.CityIds.split(',').map(x => parseInt(x)) : [];
    this.selectedCitiesObj = [];
    this.payload.CityIds.forEach(element => {
      let obj = this.cityList.find(x => x.Cityid == element);
      this.selectedCitiesObj.push(obj)
    });

    await this.getMultiHubList(this.payload.CityIds);
    this.payload.WarehouseIds = item.WarehouseIds ? item.WarehouseIds.split(',').map(x => parseInt(x)) : [];
    this.selectedWarehouseObj = [];
    this.payload.WarehouseIds.forEach(element => {
      let obj = this.warehouseList.find(x => x.WarehouseId == element);
      this.selectedWarehouseObj.push(obj)
    });

    await this.getGroupList();
    this.payload.GroupIds = item.GroupIds ? item.GroupIds.split(',').map(x => parseInt(x)) : [];
    this.selectedGroupObj = [];
    this.payload.GroupIds.forEach((element: any) => {
      let obj = this.groupList.find(x => x.GroupID == element);
      this.selectedGroupObj.push(obj)
    });

    if (this.TemplateList && this.TemplateList.length > 0) {
      this.selectedTemplateObj = this.TemplateList.find(x => x.TemplateId == item.TemplateId);
    } else {
      this.selectedTemplateObj = {
        TemplateName: '',
        TemplateDescription: '',
        TemplateId: null
      };
    }
    console.log(item, this.payload);

    this.loaderService.loading(false);
    this.openAddPopup = true;


  }

  confirm(ID) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.delete(ID);
        }
    });
}


}

interface sendWhatsAppDC {
  TemplateId: number | null,
  CityIds: any,
  WarehouseIds: any,
  GroupIds: any,
  NotificationName: string
  Id: number;
  IsSend: boolean,

  templateName: string,
  templateDescription: string
}

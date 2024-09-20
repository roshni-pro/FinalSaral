import { Component, OnInit } from '@angular/core';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { environment } from 'environments/environment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AppStartupPopupsDc } from 'app/shared/interface/trade/app-startup-popups-dc';
import * as moment from 'moment';

@Component({
  selector: 'app-app-startup-popups',
  templateUrl: './app-startup-popups.component.html',
  styleUrls: ['./app-startup-popups.component.scss']
})
export class AppStartupPopupsComponent implements OnInit {
  cityList: any[];
  popuplist: any;
  tradepopuplist: any;
  file: any;
  fileB: any;
  blocked: boolean;
  minDateValue: any;
  public ImageRelativePath;
  ItemImage: any;
  isAdd: boolean;
  apiURL: string;
  isUpload: boolean;
  rangeDates: Date[];
  AppStartupPopups: AppStartupPopupsDc;
  baseURL: any;
  constructor(private ItemServices: TradeitemmasterService,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.popuplist = {};
    this.isAdd = true;
    this.baseURL = environment.tradeapiURL;
  }

  ngOnInit() {
    this.popuplist.urlPath=null;
    this.minDateValue = new Date();
    console.log('this.this.minDateValue', this.minDateValue);

    this.isUpload = true;
    this.ItemServices.GetCityV2().subscribe(result => {
      this.cityList = result;
      this.onInitialize(this.cityList);
      console.log('this.cityList: ', this.cityList);
    });


    this.AppStartupPopups = {
      CityId: null,
      StartDate: null,
      EndDate: null,
      URL:null,
      ImageRelativePath: null,
      IsActive: false,
      CreatedDate: null
    }

  }

  onInitialize(cityList) {
    this.ItemServices.GetAppStartupPopups().subscribe(result => {
      this.tradepopuplist = result;
      for (var i = 0; i < this.tradepopuplist.length; i++) {
        for (var j = 0; j < this.cityList.length; j++) {
          if (this.tradepopuplist[i].CityId == this.cityList[j].Id) {
            this.tradepopuplist[i].City = this.cityList[j].City;
            this.tradepopuplist[i].ImageRelativePath = this.baseURL + this.tradepopuplist[i].ImageRelativePath;
          }
        }
      }
    })
  }

  uploadItem(file: File[]) {
    this.file = file;
    this.isUpload = false;
    var reader = new FileReader();
    this.ImageRelativePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      //this.imgURL = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }

  uploaderItem() {
    this.blocked = true;

    let formData = new FormData();
    formData.append('file', this.file[0])
    formData.append('url', this.apiURL)
    console.log("formdata", formData);
    this.ItemServices.UploadStartupPopup(formData).subscribe(result => {
      this.blocked = false;
      if (result) {
        this.blocked = false;
        this.isAdd = false;
        this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
        this.popuplist.ImageRelativePath = result;
        this.ImageRelativePath = this.baseURL + result;
        this.isUpload = true;
        console.log(this.popuplist.ImageRelativePath);
      }
      this.blocked = false;

    });
  }

  onSave(popuplist) {
    this.blocked = true;
    console.log("App Popuplist Data:", popuplist);
    this.AppStartupPopups.StartDate = this.rangeDates[0];
    this.AppStartupPopups.EndDate = this.rangeDates[1];
    this.AppStartupPopups.CityId = popuplist.Id;
    this.AppStartupPopups.IsActive = popuplist.IsActive;
    this.AppStartupPopups.URL=popuplist.urlPath;
    this.AppStartupPopups.ImageRelativePath = this.popuplist.ImageRelativePath;
    this.ItemServices.AddAppStartupPopups(this.AppStartupPopups).subscribe(result => {

      if (!result) {
        this.blocked = false;
        this.messageService.add({ severity: 'error', summary: 'an Active Image for this date range and city is already added !! please fill the form again!', detail: '' });
        setTimeout(() => {
          window.location.reload();
        }, 4000);

      } else {
        this.blocked = false;

        this.messageService.add({ severity: 'success', summary: 'popup-List Add Successfully!', detail: '' });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });


  }

  //for Active/Inactive Popup list 
  activepopup(Popupdata) {
    
    console.log("PopupList", Popupdata);
    this.confirmationService.confirm({
      message: 'Are you sure.You want to active for given City? because,it is a way to directly connecting  with End users.Creator is only responsible for this. Please make sure all the details added by you are correct and verified !!',
      accept: () => {
        this.ItemServices.UpdateAppStartupPopups(Popupdata).subscribe(result => {
          if (!result) {
            this.blocked = false;
            this.messageService.add({ severity: 'error', summary: 'an Active Image for this date range and city is already exits !!', detail: '' });
            setTimeout(() => {
              window.location.reload();
            }, 4000);

          } else {
            this.messageService.add({ severity: 'success', summary: 'Done!', detail: '' });
            console.log("resault nmmmt maya dellkjh lo");
            this.ngOnInit();
          }


        })
      },
      reject: () => {     
          window.location.reload();        
      
      }
    });
  }




}

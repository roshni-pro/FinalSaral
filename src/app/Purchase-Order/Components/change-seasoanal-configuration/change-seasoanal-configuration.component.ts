import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { Item } from 'app/category-master/components/sale-default-category/sale-default-category.component';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { Console, log } from 'console';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { element } from 'protractor';

@Component({
  selector: 'app-change-seasoanal-configuration',
  templateUrl: './change-seasoanal-configuration.component.html',
  styleUrls: ['./change-seasoanal-configuration.component.scss']
})
export class ChangeSeasoanalConfigurationComponent implements OnInit {
  Seasonlist: any;
  checked: boolean = true;
  isLoading: boolean = false;
  EditPopup: boolean = false;
  AddPopup: boolean = false;
  SelectedEndDate: any;
  SelectedFormDate: any;
  personids: any;
  fmonth: any;
  tmonth: any;
  seasonname: any;
  fromdate: any;
  todate: any;
  SeasonName: any;
  HistoryPopUp: boolean = false;
  ChangeSeasonalHistoryList: any
  EditHQMaster: boolean = false;
  roleName: any;
  roleList: any;
  SeasonIds: any;
  constructor(private router: Router, private podashboardserviceService: PodashboardserviceService,
    private peoplePilot: PepolePilotService, private confirmationService: ConfirmationService) { }
  depolistarry: any;
  ngOnInit() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      this.depolistarry = this.roleList.filter(x => x == 'HQ Master login');
      if (this.depolistarry.length > 0) {
        this.EditHQMaster = true;
      }
      else {
        this.EditHQMaster = false;
      }
      //else 
      // {
      //   this.EditHQMaster = false;
      // }

      this.getseasonconfig();
    });

  }

  getseasonconfig() {
    this.isLoading = true;
    this.podashboardserviceService.getAllConfig().subscribe(res => {
      if (res.length > 0) {
        this.isLoading = false;
        this.Seasonlist = res;
        console.log(this.Seasonlist, "Seasonlist");

        this.Seasonlist.forEach((element) => {
          if (this.EditHQMaster == true) {
            element.Isedit = true;
          }
          else if (element.IsEditDisabled == true) {
            element.Isedit = false;
          }
          else {
            element.Isedit = true;
          }
        })
      } else {
        alert("No Data Found!");
        this.isLoading = false;
      }
    })
  }

  edit(item) {
    this.personids = item.SeasonId;
    this.SeasonName = item.SeasonName;
    this.SelectedFormDate = item.FromMonthDate ? moment(item.FromMonthDate).format("MM") : "";
    this.SelectedEndDate = item.TOMonthDate ? moment(item.TOMonthDate).format("MM") : "";
    this.EditPopup = true;
  }

  SaveChanges() {
    this.isLoading = true;
    this.SelectedFormDate = this.SelectedFormDate ? moment(this.SelectedFormDate).format("MM") : "";
    this.SelectedEndDate = this.SelectedEndDate ? moment(this.SelectedEndDate).format("MM") : "";
    console.log(this.SelectedFormDate);
    console.log(this.SelectedEndDate);
    if (this.SelectedFormDate == undefined || this.SelectedFormDate == null) {
      alert("Please Select From Month");
      return false;
    }
    else if (this.SelectedEndDate == undefined || this.SelectedEndDate == null) {
      alert("Please Select End Month");
      return false;
    }
    if (this.SelectedFormDate != undefined && this.SelectedEndDate != undefined) {

      this.podashboardserviceService.EditSeasonConfig(this.personids, this.SelectedFormDate, this.SelectedEndDate).subscribe(res => {
        if (res.length > 0) {
          alert(res)
          console.log(res, "editSave");
          this.EditPopup = false;
          this.isLoading = false;
          this.getseasonconfig();
        } else {
          alert(res)
          this.EditPopup = false;
          this.isLoading = false;
          this.getseasonconfig();
        }
      })
    }
  }

  History(hist) {
    this.personids = hist.SeasonId;
    this.isLoading = true;
    this.podashboardserviceService.GetSeasonalConfigHistory(this.personids).subscribe(result => {
      if (result.length > 0) {
        this.isLoading = false;
        this.ChangeSeasonalHistoryList = result;
        console.log(this.ChangeSeasonalHistoryList, "ChangeSeasonalHistoryList");
        this.HistoryPopUp = true;
      }
      else {
        this.isLoading = false;
        this.ChangeSeasonalHistoryList = [];
      }
    })


  }

  Add() {
    this.AddPopup = true;
  }
  cancel() {
    this.SelectedFormDate = undefined;
    this.SelectedEndDate = undefined;
  }

  onBackClick() {
    this.router.navigateByUrl('/layout/Purchase-Order/po-stop-configuration');
  }
  addcancel() {
    this.seasonname = undefined;
    this.fromdate = undefined;
    this.todate = undefined;
  }

  addseason(checked) {
    if (this.seasonname == undefined || this.seasonname == null || this.seasonname == '') {
      alert("Please Enter Season Name");
      return false;
    } else if (this.fromdate == undefined || this.fromdate == null || this.fromdate == '') {
      alert("Please Select From Month");
      return false;
    } else if (this.todate == undefined || this.todate == null || this.todate == '') {
      alert("Please Select To Month");
      return false;
    }
    this.fmonth = this.fromdate ? moment(this.fromdate).format("MM") : "";
    this.tmonth = this.todate ? moment(this.todate).format("MM") : "";
    if (this.seasonname != undefined && this.fmonth != undefined && this.tmonth != undefined && checked != undefined) {
      this.isLoading = true;
      this.podashboardserviceService.AddnewSeasonConfig(this.seasonname, this.fmonth, this.tmonth, checked).subscribe(res => {
        alert(res);
        this.getseasonconfig();
        this.AddPopup = false;
        this.isLoading = false;
        this.seasonname = undefined;
        this.fromdate = undefined;
        this.todate = undefined;
      })
    }
  }

  Seasonal(item) {
    this.SeasonIds = item.SeasonId;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.isLoading = true;
        this.podashboardserviceService.Inactiveseasonalconfig(this.SeasonIds, item.IsActive).subscribe(res => {
          if (res.Status == true) {
            alert(res.Data);
            this.isLoading = false;
          } else {
            alert(res.Data);
            this.isLoading = false;
          }
        })
      },
      reject: () => {
        this.isLoading = false;
        item.IsActive = !item.IsActive
      }
    });
  }
}

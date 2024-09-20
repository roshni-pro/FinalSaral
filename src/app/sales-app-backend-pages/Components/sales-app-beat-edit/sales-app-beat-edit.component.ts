import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { data } from 'jquery';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-app-beat-edit',
  templateUrl: './sales-app-beat-edit.component.html',
  styleUrls: ['./sales-app-beat-edit.component.scss']
})
export class SalesAppBeatEditComponent implements OnInit {


  BeatEditList: any[] = [];
  FromDate: any[] = [];
  ToDate: any[] = [];
  constructor(private SalesAppServiceService: SalesAppServiceService, public datepipe: DatePipe,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.DateList()
    this.GetBeatEditData()
  }

  IsAnytime: boolean = false
  GetBeatEditData() {
    this.SalesAppServiceService.GetBeatEdit().subscribe(x => {
      if (x.Status) {
        this.BeatEditList = x.Data != null ? x.Data : [];
        if (this.BeatEditList.length > 0) {
          this.BeatEditList.forEach((element: any) => {
            element.FromDate1 = {
              "id": element.FromDate,
              "name": element.FromDate
            }
            element.ToDate1 = {
              "id": element.ToDate,
              "name": element.ToDate
            }
            element.TodateList = this.FromDate.filter(x=>{
              if(x.id>element.FromDate)
              {
                return {
                  "id": x.id,
                  "name": x.name
                }
              }
            });
          });
        }
        console.log(this.FromDate);
        console.log(this.BeatEditList);

      }
      else {
        this.showError(x.Message);
      }
    })
  }

  Save() {
          var CheckDate = true
          this.BeatEditList.forEach(el => {
            if(!el.IsAnytime)
            {
              if(el.FromDate1==null || el.FromDate1 == undefined)
              {
                CheckDate = false;
                  this.showError("Please Enter FromDate");
              }
              else if(el.ToDate1==null || el.ToDate1 == undefined)
              {
                CheckDate = false;
                return this.showError("Please Enter ToDate");
              }   
              
            }
          });
    if(CheckDate)
    {
          console.log("this.IsAnytime", this.BeatEditList);
          this.BeatEditList.forEach((x:any)=>{
             x.FromDate = x.FromDate1== null ? 0: x.FromDate1.id,
             x.ToDate = x.ToDate1==null ? 0:x.ToDate1.id
          })

          this.SalesAppServiceService.SaveBeatEdit(this.BeatEditList).subscribe(x=>{
            if(x.Status)
            {
              this.showSuccessfull(x.Message);
            }
            else{
              this.showError(x.Message);
            }
          })
      }
  }

  OnToggleChange(Obj:any,indexs:number)
  {
    this.BeatEditList.forEach((x,index)=>{
      if(index == indexs)
      {
        x.FromDate1 = null,
        x.ToDate1  = null,
        x.TodateList = []
      }
    });
  }

  DateChange(Obj:any,indexs:number) {debugger
    this.BeatEditList.forEach((x,index)=>{
      if(index == indexs)
      {
        x.ToDate1  = null,
        x.TodateList = this.FromDate.filter((y)=>{
          if(y.id>=Obj.FromDate1.id)
          {
            return {
              "id": y.id,
              "name": y.name
            }
          }
        });
      }
    });
    console.log("this.IsAnytime", this.BeatEditList);
  }
  DateList() {
    var date = new Date();
    var lastDay = this.datepipe.transform(new Date(date.getFullYear(), date.getMonth() + 1, 0),'dd');
    for (var i = 1; i <= parseInt(lastDay); i++) {
      var obj = {
        "id": i,
        "name": i
      }
      this.FromDate.push(obj);
    }
    this.ToDate = this.FromDate;
    console.log("this.FromDate", this.FromDate);
  }

  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail:msg});
  }

}

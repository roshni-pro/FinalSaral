import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import {  ConfirmationService, MessageService } from 'primeng/api';
import {MenuItem} from 'primeng/api';
import { ItemClassificationIncentiveReportService } from 'app/sales-app-backend-pages/Services/item-classification-incentive-report.service';
import { AttendanceRulesService } from 'app/sales-app-backend-pages/Services/attendance-rules.service';
import { CustomerService } from 'app/shared/services/customer.service';


@Component({
  selector: 'app-attendance-rules',
  templateUrl: './attendance-rules.component.html',
  styleUrls: ['./attendance-rules.component.scss']
})

export class AttendanceRulesComponent implements OnInit {
 
  constructor( private router : Router,private _service :ItemClassificationIncentiveReportService,
   private salesAtRule: AttendanceRulesService,private msg:MessageService,private confirmationService:ConfirmationService,
   private customerService:CustomerService ) { }
  
 @Output() SalesAttendanceEvent = new EventEmitter<boolean>();

 itemst: MenuItem[];
 itemstGlobal:  MenuItem[];
 CID:any
 Cities:any[]=[]
 IsShowClist:any
 IsDisable:boolean
 IsShow:boolean=true
 display:boolean;
 CreatedDate:boolean
 StoreList:any
 StoreId:any;
 ChannelMasterId;any
 ngOnInit() {
  //this.getStore();
  this.CustomerChannelTypeList();
   this.itemst = [
     {
       items: [
         {
           label: 'Edit',
           icon: 'pi pi-eye',
           command: () => {
             this.GlobalEdit('Edit');
           },
         },
         {
           label: 'Duplicate',
           icon: 'pi pi-copy',
           command: () => {
             this.GlobalEdit('Duplicate');
           },
         },
         {
           label: 'Delete',
           icon: 'pi pi-trash',
           command: () => {
             this.DeleteCatalogConfigByCityId();
           },
         },
       ],
     },
   ];
   this.itemstGlobal = [
     {
       items: [
         {
           label: 'Edit',
           icon: 'pi pi-eye',
           command: () => {
             this.GlobalEdit('GlobalEdit');
           },
         },
       ],
     },
   ];
 }

  chageStore(ChannelMasterId){debugger //aarti
    this.salesAtRule.getAttendanceCityList(ChannelMasterId.ChannelMasterId).subscribe(res=>{
      console.log(res);
      if(res.Status==true)
      {this.Cities = res.Data ;}
      console.log("getConfigCityList",this.Cities);   
    })
    console.log(this.StoreId);
  }
  
 getStore(){
    this.StoreList=[]
    this._service.GetStoreList().subscribe(res=>{
      this.StoreList=res;
    })
  }
  
 GlobalEdit(type:any)
 {
  this.router.navigateByUrl("layout/salesApp/AttendanceTA/DA_Rules/"+this.ChannelMasterId.ChannelMasterId+'/'+this.selectedTypeData.AttendaceConfigId+'/'+this.IsShow+'/'+type);  
 }



 async cityStatusChange(city:any)
 {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.salesAtRule.ActiveInactiveCity(city.AttendaceConfigId,city.IsActive).subscribe(res=>
    {
       console.log("aceptted",res);
       if (res.Status) {
        if(city.IsActive==true) alert("This attendance configuration will get enabled at 12 midnight.");
        else alert("This attendance configuration will get disabled at 12 midnight.");
      } 
    })     
    },
    reject: () => {
      city.IsActive = !city.IsActive;
    }
  });
  //  debugger;
  //  if (confirm("Are you sure that you want to proceed?") == true) {
  //   debugger
  //   await this.salesAtRule.ActiveInactiveCity(city.AttendaceConfigId,city.IsActive).subscribe(res=>
  //     {
  //       console.log("sd",res)
  //      if(res.Status==true){
  //       city.IsActive = city.IsActive;
  //       // if(city.IsActive==true){       
  //       //   console.log("aceptted",res.Message);
  //       //   this.showSuccess(res.Message)
  //       //   alert("This attendance configuration will get enabled at 12 midnight.")
  //       // }
  //       // else{     
  //       //   console.log("aceptted",res.Message);
  //       //   this.showSuccess(res.Message)
  //       //   alert("This attendance configuration will get disabled at 12 midnight.")
  //       // }
  //       } 
  //     })
  // } else {
  //   debugger;
  //   city.IsActive = !city.IsActive;
  //   //return false;
  // }
 }

 CreateNew() { 
  debugger; 
  console.log(this.ChannelMasterId);
   if(this.ChannelMasterId!=undefined) {
    this.salesAtRule.changeMessage(this.ChannelMasterId);
    this.SalesAttendanceEvent.emit(true);
  }
  else this.showError("select Channel first")
 }

 DeleteCatalogConfigByCityId()
 {
  debugger;
  if (confirm("Are you sure that you want to proceed?") == true) {
    debugger
    this.salesAtRule.DeleteAttendanceConfigById(this.selectedTypeData.AttendaceConfigId).subscribe(res=>
      {
         console.log("aceptted",res);
         if(res.Status==true) this.showSuccess(res.Message);
        else this.showError(res.Message);
        this.chageStore(this.ChannelMasterId)
      })
  } else {
    return false;
  }
 }

 selectedTypeData:any
 onClickMenu(cityId,city)
 {
  debugger;
   this.CID=cityId
  this.selectedTypeData=city
 }

 showError(msg1:string){
  this.msg.add({severity:'error', summary: 'Error', detail:msg1});
}
showSuccess(msg1:string){
  this.msg.add({severity:'success', summary: 'Success', detail:msg1});
}
 
ChannelTypeList:any
CustomerChannelTypeList(){
  debugger;
  this.customerService.CustomerChannelTypeList().subscribe(res=>{
    console.log(res);      
    this.ChannelTypeList=res;
  })
}

}




import { Component, OnInit,Directive, Input,Output } from '@angular/core';
import { Observable } from 'rxjs';
import {DateFormatorService} from '../../../shared/services/date-formator.service'
import {KisanDanService} from '../../../shared/services/kisan-dan.service'
import {ExecutivelistbywareidService} from '../../../shared/services/executivelistbywareid.service'
import { stringify } from '@angular/compiler/src/util';
// import {GoogleMapsAPIWrapper} from '@agm/core';
import { MouseEvent } from '@agm/core';
import { InfoWindow } from '@agm/core/services/google-maps-types' 
import * as XLSX from 'xlsx'; 
import { LoaderService } from 'app/shared/services/loader.service';
import { MessageService,ConfirmationService } from 'primeng/api';
import * as moment from 'moment';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-warehousemap',
  templateUrl: './warehousemap.component.html',
  styleUrls: ['./warehousemap.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class WarehousemapComponent implements OnInit {
  zoom: number = 12;
  warehouses:any=[]
  wareHouseId:any;
  excutiveId:any;
  excutiveData:any=[]
  excutiveRoute:any=[]
  date1:string=""
  custData:any=[]
  plannedArray=[]
  actualArray=[]
  starttime:any;
  startaddress:any;
  PlannedRoutesdata:any=[];
  ActualRoutesdata:any=[];
  skCodeP:string;
  skCodeA:string;
  latAstart :number;
  lngAStart :number;
  latA :number;
  lngA :number;
  dayP:string;
  ShippingAddressP:string;
  dayA:string;
  ShippingAddressA:string;
  visitedOnA:any;
  object:any=[];
  gpsLogs:any=[];
  warehouseId:any;
  isInvalid:boolean;
  yearRangeForCalender:any;
  WarehouseId:any;
  excutiveModel: any = {
    excutiveId: "",
    CDate: new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1),
    WarehouseId:""
  };
  wayPointA: any[];
  wayPointP: any[];
  public destinationlat: any;
  public destinationlg: any;
  public waypointsA:any=[];
  public waypointsP:any=[];
  public originA: any;
  public destinationA: any;
  public originP: any;
  public destinationP: any;
  followMarker: any;
  // markers:marker=[]
  map: any;
  markers: any=[];
  allMarkers: marker[];
  actualmarkers:any=[];
  allactualmarkers:marker[];
  icon = '/assets/img/logo/truck/';
  // lat: number = 22.691528333333334;
  // lng: number = 75.928793333333331;
  isShowDirection: boolean;
  /*name of the excel-file which will be downloaded. */ 
  fileName= 'ExcelSheet.xlsx';  
  wid:any
  constructor(private kisanDanService:KisanDanService,private s:ExecutivelistbywareidService,private dateFormatorService: DateFormatorService,
  private loaderService: LoaderService,private messageService : MessageService, private exportService: ExportServiceService) {
   
   }

  ngOnInit() {
    this.isShowDirection = false;
    this.getwareHouse();
    this.onChange(this.wareHouseId);
    // this.search(this.excutiveModel);
  
  }
 
 
  getwareHouse(){
    this.kisanDanService.WarehouseGetByID().subscribe(result => {
      this.warehouses = result;
      console.log(result,'res');
  })
  }

  
  onChange(WarehouseId){
    this.getwareHouse();
    this.warehouses.map(e=>{
      e.WarehouseId=WarehouseId;
      // e.WarehouseId=this.wareHouseId;
    })
    console.log(this.wareHouseId,'wareHouseId')
    this.wid=WarehouseId;
    this.s.getExcutiveByWarehouse(WarehouseId).subscribe(res=>{
      this.excutiveData=res;
      console.log(this.excutiveData,'excutiveData')
    })
  }

  onExcutiveChange(){
    this.excutiveData;
  }
  
  public renderOptions = {
    // suppressMarkers: false,
    // suppressInfoWindows: false,
    suppressMarkers: false,
    suppressInfoWindows: true,
    
  };
  public markerOptions = {
    origin: {
      infoWindow: 'Origin',
      icon: '',
      
    },
    waypoints: [
      
    ],
     

    destination: {
      infoWindow: 'Destination',
      icon: this.icon,
      
    },
  };
  //#endregion
  TableList:any=[]
  NotExist:any
  Exist:any
  CreatedDate :any
  ExecutiveName:any
  search(excutiveModel){
    debugger;
    this.ExecutiveName=this.excutiveData.filter(x=>x.ExecutiveId == this.excutiveModel.excutiveId);
    this.ExecutiveTrackingSalesData();
    this.loaderService.loading(true);
    let date= this.excutiveModel.CDate
    var newdate = date.split("/").reverse().join("-");
    // var newdate=moment(this.excutiveModel.CDate).format("YYYY-MM-DD");
    this.s.getExcutiveRoute(this.excutiveModel.excutiveId,newdate).subscribe(result=>{
      this.excutiveRoute=result;
      this.markers=[];this.ActualRoutesdata=[];this.actualmarkers=[];this.TableList=[];this.PlannedRoutesdata=[];this.ExportPlannedRoutesdata=[];
      if(this.excutiveRoute.Status==true){  
      this.messageService.add({severity:'success', summary: 'Customer Found',});
      this.gpsLogs=this.excutiveRoute.customers[0];
      this.PlannedRoutesdata=this.excutiveRoute.customers[0].PlannedRoutes;
      this.ActualRoutesdata=this.excutiveRoute.customers[0].ActualRoutes;
      this.latAstart=this.excutiveRoute.customers[0].DayStartLat;/**origin */
      this.lngAStart=this.excutiveRoute.customers[0].DayStartLng;/**origin */
      this.starttime=this.excutiveRoute.customers[0].DayStartTime;
      this.startaddress=this.excutiveRoute.customers[0].DayStartAddress;

      this.loaderService.loading(false);
      this.TableList=[];
      console.log("this.PlannedRoutesdata",this.PlannedRoutesdata);
      console.log("this.ActualRoutesdata",this.ActualRoutesdata);
      
      if(this.ActualRoutesdata!=null){
        this.PlannedRoutesdata.forEach(p=> {
        this.ActualRoutesdata.forEach(a => {
          if(p.Skcode==a.Skcode)
            {
              let obj ={
                  'lat':p.lat,
                  'lng':p.lg,
                  'ExecutiveId':a.ExecutiveId,
                  'Name':a.Name,
                  'WarehouseName':a.WarehouseName,
                  'ClusterName':a.ClusterName,
                  'Skcode':a.Skcode,
                  'ShopName':a.ShopName,
                  'Mobile':a.Mobile,
                  'VisitedOn':a.VisitedOn,
                  'CheckIn':a.CheckIn == null ?0: a.CheckIn,
                  'CheckOut':a.CheckOut==null ? 0 : a.CheckOut,
                  'IsBeat':a.IsBeat,
                  'IsVisited':a.IsVisited,
                  'ExecutiveName':this.ExecutiveName[0].ExecutiveName,
                  'City':a.City,
                  'CreatedDate':newdate,//this.CreatedDate,
                  'Day':a.Day
              }
              this.TableList.push(obj);
            }
            })
          });
          this.PlannedRoutesdata.forEach(p=> {
              this.Exist=this.TableList.filter(x=>x.Skcode==p.Skcode);
              if(this.Exist.length>0)
                {
                return
              }
              else
              {
                let obj ={
                    'lat':p.lat,
                    'lng':p.lg,
                    'ExecutiveId':p.ExecutiveId,
                    'Name':p.Name,
                    'WarehouseName':p.WarehouseName,
                    'ClusterName':p.ClusterName,
                    'Skcode':p.Skcode,
                    'ShopName':p.ShopName,
                    'Mobile':p.Mobile,
                    'VisitedOn':p.VisitedOn,
                    'CheckIn':0,
                    'CheckOut':0,
                    'IsBeat':true,
                    'IsVisited':p.IsVisited,
                    'ExecutiveName':this.ExecutiveName[0].ExecutiveName,
                    'City':p.City,
                    'CreatedDate': newdate,//this.CreatedDate,
                    'Day':p.Day
                }
                this.TableList.push(obj);
              }
          });
          var beat = this.ActualRoutesdata.filter(x=>x.IsBeat==false);
          beat.forEach(b => {
            let obj ={
                'lat':b.lat,
                'lng':b.lg,
                'ExecutiveId':b.ExecutiveId,
                'Name':b.Name,
                'WarehouseName':b.WarehouseName,
                'ClusterName':b.ClusterName,
                'Skcode':b.Skcode,
                'ShopName':b.ShopName,
                'Mobile':b.Mobile,
                'VisitedOn':b.VisitedOn,
                'CheckIn':b.CheckIn == null ?0: b.CheckIn,
                'CheckOut':b.CheckOut==null ? 0 : b.CheckOut,
                'IsBeat':false,//b.IsBeat,
                'IsVisited':b.IsVisited,
                'ExecutiveName':this.ExecutiveName[0].ExecutiveName,
                'City':b.City,
                'CreatedDate': newdate,//this.CreatedDate,
                'Day':b.Day
            }
            this.TableList.push(obj);
          });
          console.log("TableList",this.TableList);
          
      }else{
        this.TableList = this.PlannedRoutesdata;
      }
            
          /** planned route start*/
          this.wayPointP = [];
          this.PlannedRoutesdata.forEach(item => {
            this.wayPointP.push({
              location: { lat: Number(item.lat), lng: Number(item.lg)},
              stopover: false,
            })
            let obj ={
              location: { lat: Number(item.lat), lng: Number(item.lg)},
              

            }
            this.waypointsP.push(obj);
          });
         
          this.originP = { lat: this.wayPointP[0].location.lat, lng: this.wayPointP[0].location.lng,day:this.wayPointP[0].location.day};
          this.destinationP = { lat: this.wayPointP[this.wayPointP.length - 1].location.lat, lng: this.wayPointP[this.wayPointP.length - 1].location.lng,day:this.wayPointP[this.wayPointP.length - 1].location.day };
           this.waypointsP.splice(0,1); 
           this.waypointsP.splice(this.waypointsP.length-1,1); 
      
          
          /** actual route start*/
          this.wayPointA = [];
          if(this.ActualRoutesdata!=null){
            this.ActualRoutesdata.forEach(i => {
            this.wayPointA.push({
              location: { lat: Number(i.lat), lng: Number(i.lg), day:String(i.Day) },
              stopover: false,
              
            })
              let obj ={
                location: { lat: Number(i.lat), lng: Number(i.lg), day:String(i.Day)},
              }
              this.waypointsA.push(obj);
            });
            // console.log('this.wayPointA: ', this.wayPointA);
            // console.log('this.waypointsA: ', this.waypointsA);
            this.originA = { lat: this.wayPointA[0].location.lat, lng: this.wayPointA[0].location.lng, day:this.wayPointA[0].location.day };
            this.destinationA = { lat: this.wayPointA[this.wayPointA.length - 1].location.lat, lng: this.wayPointA[this.wayPointA.length - 1].location.lng, day:this.wayPointA[this.wayPointA.length - 1].location.day };
            this.waypointsA.splice(0,1); 
            this.waypointsA.splice(this.waypointsA.length-1,1); 
            this.markerOptions=this.markerOptions;
          }
      /** actual route end*/
      let counter=0
        this.PlannedRoutesdata.forEach(e => {  
        this.markers.push({  
        draggable: false,
        icon: this.icon + counter + '.png',
        lat: e.lat,
        lng: e.lg,
        label: (e.Skcode ? (e.Skcode + ' ') : '') + (e.Day ? (e.Day + ' ') : '') + (e.ShippingAddress ? ('(' + e.ShippingAddress + ')') : ''),
        id: e.ShopName
      });
    });
      this.allMarkers = JSON.parse(JSON.stringify(this.markers));
       console.log('allMakers2',this.allMarkers);
   

      /**custome address for actual */

      this.ActualRoutesdata.forEach(el => {  
        this.actualmarkers.push({  
        draggable: false,
        icon: this.icon + counter + '.png',
        lat: el.ExecLat,
        lng: el.ExecLng,
        label: (el.Skcode ? (el.Skcode + ' , ') : '') + (el.Day ? (el.Day + ' , ') : '') + (el.ShippingAddress ? ('(' + el.ShippingAddress + ')') : ''),
        id: el.ShopName
      });
    });
      this.allactualmarkers = JSON.parse(JSON.stringify(this.actualmarkers));
      console.log('actualmarkers',this.allactualmarkers);
      
    
      // console.log(this.plannedArray,'array')
      this.PlannedRoutesdata.forEach(x => {
          this.skCodeP=x.Skcode;
          this.destinationlat=x.lat;
          this.destinationlg=x.lg;
          this.dayP=x.Day;
          this.ShippingAddressP=x.ShippingAddress;
        });
      
      
     
      this.ActualRoutesdata.forEach(y => {
        this.skCodeA=y.Skcode;
        this.latA=y.lat;
        this.lngA=y.lg;
        this.dayA=y.Day;
        this.ShippingAddressA=y.ShippingAddress;
        this.visitedOnA=y.VisitedOn;
      });
      // console.log(this.excutiveRoute,'excu')
      // console.log(this.ActualRoutesdata,'ActualRoutesdata')
      }else{
        this.loaderService.loading(false);
        this.messageService.add({ severity: 'error', summary: 'No Customer Found', detail: '' });
        this.PlannedRoutesdata='';
        this.starttime='';
        this.startaddress='';
        this.TableList=[];
      }
    },error=>{
         })
        //  this.onChange(this.wareHouseId);
        //  this.onExcutiveChange();
  }


  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

  clickedMarker(label: string, index: number) {
    alert(`clicked the marker: ${label || index}`)
    console.log(`clicked the marker: ${label || index}`)
  }
  
  
  ExportPlannedRoutesdata: any = [];

  exportexcel(): void {
    // this.loaderService.loading(true);
    // /* table id is passed over here */   
    // let element = document.getElementById('excel-table'); 
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    // XLSX.writeFile(wb, this.fileName);
    // // this.loaderService.loading(false);

    if (this.TableList != null) {
      this.ExportPlannedRoutesdata = [];
      this.TableList.forEach(e => {
        this.ExportPlannedRoutesdata.push({
          lat:e.lat,
          lng:e.lng ==undefined ? e.lg : e.lng,
          Employee_Code:e.ExecutiveId,
          ExecutiveName:e.ExecutiveName!=undefined ? e.ExecutiveName : this.ExecutiveName[0].ExecutiveName,
          Date:e.CreatedDate!=null  && e.CreatedDate!=undefined && e.CreatedDate != '0001-01-01T00:00:00Z' ?e.CreatedDate :  this.excutiveModel.CDate.split("/").reverse().join("-")  ,
          City: e.City,
          WarehouseName: e.WarehouseName,
          ClusterName: e.ClusterName,
          Skcode: e.Skcode,
          Day: e.Day,
          ShopName: e.ShopName,
          Name:e.Name,
          IsVisited: e.IsBeat==true || e.IsVisited==false ?'Yes' : 'No',
          Beat_Customer:e.IsBeat==true ? 'Yes' : 'No',
          // IsAssigned: e.IsAssigned,
          CheckIn_Time :e.CheckIn!=0 && e.CheckIn!=undefined ?  moment(e.CheckIn).format('HH:mm:ss'):'--',
          CheckOut_Time:e.CheckOut!=0 && e.CheckOut!=undefined?  moment(e.CheckOut).format('HH:mm:ss'):'--', 
          Visit_Duration:this.calculateDiff(e)
        });
      });
      this.exportService.exportAsExcelFile(this.ExportPlannedRoutesdata, 'PlannedRoutData');
    }
  }
  calculateDiff(sentDate) {
    if(sentDate.CheckOut && sentDate.CheckIn){
      let date1 = sentDate.CheckOut ? new Date(sentDate.CheckOut):new Date();
      let date2 = sentDate.CheckIn ? new Date(sentDate.CheckIn) : new Date(); 
      let differenceInTime = date1.getTime() - date2.getTime();
      let seconds = Math.abs(Math.floor(differenceInTime / 1000));
      let hours = Math.floor(seconds / 3600);
      let minutes = Math.floor((seconds % 3600) / 60);
      seconds = seconds % 60;
      let formattedTime = `${hours}:${minutes}:${seconds}`;
      return formattedTime;    
    }
  }

  FirstCheckIn:any
  LastCheckOut:any
  status :any
  TADA:any
  Attendance:any
  AttendenceDetailDCs:any
  DashboardDcs:any
  TodayDashboardDcs:any
  YesterdayDashboardDcs:any
  isShow:boolean=false;
  TodayData:any[]=[];

  ExecutiveTrackingSalesData(){
    let date= this.excutiveModel.CDate
    var newdate = date.split("/").reverse().join("-");
    this.s.ExecutiveTrackingSalesData(this.excutiveModel.excutiveId,this.wid,newdate).subscribe((res:any)=>{
      console.log(res);   
      this.TodayData=[];
      this.AttendenceDetailDCs=res.AttendenceDetailDCs;
      this.TodayDashboardDcs=res.TodayDashboardDcs;
      if(this.AttendenceDetailDCs==null){
        this.FirstCheckIn=""
        this.LastCheckOut=""
        this.TADA=""
        this.CreatedDate=""
        this.Attendance='Absent'
        this.status=""
      }else{
        this.FirstCheckIn=  this.AttendenceDetailDCs.FirstCheckIn ? moment(this.AttendenceDetailDCs.FirstCheckIn, 'HH:mm:ss.SSSSSSS').format('h:mm:ss a') : ""; //moment(this.AttendenceDetailDCs.FirstCheckIn).format('MM/DD/YYYY HH:mm:ss');
        this.LastCheckOut=  this.AttendenceDetailDCs.LastCheckOut ? moment(this.AttendenceDetailDCs.LastCheckOut, 'HH:mm:ss.SSSSSSS').format('h:mm:ss a') : ""; //moment(this.AttendenceDetailDCs.LastCheckOut).format('HH:mm:ss');
        this.TADA=this.AttendenceDetailDCs.TADA;
        this.CreatedDate=res.CreatedDate;
        this.Attendance = this.AttendenceDetailDCs.IsPresent && !this.AttendenceDetailDCs.IsLate ? 'Present' : !this.AttendenceDetailDCs.IsPresent && this.AttendenceDetailDCs.IsLate ? 'Late' : !this.AttendenceDetailDCs.IsPresent && !this.AttendenceDetailDCs.IsLate ? 'Absent' : 'Late';
        this.status = !this.AttendenceDetailDCs.IsPresent && !this.AttendenceDetailDCs.IsLate ? '' : this.AttendenceDetailDCs.Status;

      }
      this.Show()
    })
  }


  Show(){
    if(this.TodayDashboardDcs != undefined)
    {   
      let to={
      'TodayVisitPlanned':this.TodayDashboardDcs.TodayVisitPlanned,
      'TodayExtraVisit':this.TodayDashboardDcs.TodayExtraVisit,
      'TodayProductiveCall':this.TodayDashboardDcs.TodayProductiveCall,
      'TodayExtraCall':this.TodayDashboardDcs.TodayExtraCall,
      'TodayBeatSales':this.TodayDashboardDcs.TodayBeatSales,
      'TodayExtraSales':this.TodayDashboardDcs.TodayExtraSales,
      'TodayBeatOrder':this.TodayDashboardDcs.TodayBeatOrder,
      'TodayExtraOrder':this.TodayDashboardDcs.TodayExtraOrder,
      'TodayTotalCall':this.TodayDashboardDcs.TodayTotalCall,
      }
      this.TodayData.push(to);
     }
  }
}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  icon: string;
  id: string;
}

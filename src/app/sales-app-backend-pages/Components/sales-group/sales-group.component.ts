import { Component, OnInit } from '@angular/core';
import {SalesAppServiceService} from '../../Services/sales-app-service.service'
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { from } from 'rxjs';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-sales-group',
  templateUrl: './sales-group.component.html',
  styleUrls: ['./sales-group.component.scss']
})

export class SalesGroupComponent implements OnInit {

  display:boolean = false;
  salesGroupList:any;
  salesCustomerList:any;
  GroupList:any;
  groupname:any;
  storename:any;
  CoustomerList:any[]=[];
  value2:any
  Showupload:boolean=false;
  editedDateValue:any;
  StoreList:any;
  value3={value:0};
  SystemType:any[];
  //ApplicationType:any[];
  SegmentNameList:any[];
  Appname:any;
  Segment:any;
  entity:any;
  constructor(private salesServices:SalesAppServiceService,private msg:MessageService,public datepipe: DatePipe,private router:Router,private exportserv:ExportServiceService) 
  { this.entity = "SalesGroup";
  this.SystemType = [
    {name: 'System Group', value: 1},
    {name: 'Store Group', value: 2},
    {name: 'CRM Group', value: 3}
    ];
  // this.ApplicationType = [
  //   {name: 'Retailer App', value: 1},
  //   {name: 'Sales App', value: 2},
  //   {name: 'Both App', value: 2}
  //   ];
   }

  ngOnInit() { }

  GroupTypeSelect(GroupTypeDetails){
    if(GroupTypeDetails.value==3){
      this.getSegmentList();
    }else if(GroupTypeDetails.value==2){
      this.getStoreList();
    }else return
  }
  
  getSegmentList(){
    this.salesServices.CRMSubGroupList().subscribe(result=>{
      this.SegmentNameList=result;
    })
  }

  getStoreList(){
    this.salesServices.GetStoreList().subscribe(result=>{
      this.StoreList=result;
    })
  }

  uplaodGoupName:any;
  uploadStoreName:any;
  OnuploadIcon(rowData){
    this.uplaodGoupName=rowData.GroupName;
    this.uploadStoreName=rowData.StoreName
    this.Showupload=true;  
  }

  mindate:any;
  checked:any;
  OneditGroup(rowData){   
    if(this.checked==undefined){
      // this.editedDateValue=this.datepipe.transform(rowData.ValidityDate, 'yyyy-MM-dd');
      // this.editedDateValue =new Date(this.editedDateValue).toISOString().split('T')[0];  
      this.editedDateValue =new Date(rowData.ValidityDate)
      this.mindate=new Date()
      rowData.check=true;
      this.checked=true;
    }
    else{
      this.showError("please update previous date");
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      return;
    }
  }

  OnUpdateGroup(rowData){
    rowData.check=false;
    this.checked=undefined;
    this.editedDateValue=this.datepipe.transform(this.editedDateValue,'MM-dd-yyyy');
    if(confirm("Do you want to proceed for Validity Date "+this.editedDateValue+" ?")){
      this.salesServices.EditGroup(rowData.GroupId,this.editedDateValue).subscribe(res=>{
        //console.log(res)
        if(res) {
          rowData.ValidityDate=this.editedDateValue;
        }
        else {
          this.showError("something went wrong!");  
        }
      })  
    }
  }

  skip:number;
  take:number
  totalRecords:number
  TotalGroupCount:number
  load(event) {
    this.checked=undefined;
    this.take = event.rows;
    this.skip = event.first; 
    if(event.globalFilter){
      this.salesServices.SearchGroups(event.globalFilter,this.skip,this.take).subscribe(res=>{
        this.TotalGroupCount=res.TotalGroupCount;
        this.GroupList=[];
        this.GroupList=res.Group
        this.totalRecords = this.GroupList.length;
      })
    }else{
      this.salesServices.GetGroupsOnPageLoad(this.skip,this.take).subscribe(result => {  
        this.TotalGroupCount=result.TotalGroupCount;
        this.GroupList=result.Group;
        this.totalRecords=result.Group.length; 
      });
    }  
  }

  groupStatusChange(rowData){
    this.salesServices.GroupTypesStatus(rowData.GroupId,rowData.type).subscribe(result=>{
      console.log(result);
    })
  }

  blocked:boolean=false;
  GetAllGroups(){
    this.blocked=true;
    this.salesServices.GetGroupsOnPageLoad(this.skip,this.take).subscribe(result => {
      this.TotalGroupCount=result.TotalGroupCount;
      this.GroupList=result.Group;
      this.totalRecords=result.Group.length;
      this.blocked=false
    });
  }

  skip1:number;
  take1:number;
  first=0;
  GroupId:any
  TotalCustomerCount:number;
  Storeid:number;
  load1(event) {
    debugger
    this.take1 = event.rows;
    this.skip1 = event.first; 
    if(this.display){
      this.CoustomerList=[];
      this.salesServices.GetCustomers(this.GroupId,this.skip1 ,this.take1).subscribe(result => {
        console.log(result);
        
        this.salesCustomerList=result;
        this.TotalCustomerCount=this.salesCustomerList.TotalCustomerCount;
        if(this.salesCustomerList.Group.length==0) {
          this.showError("Data not Found");
        }else{
          this.display = true;
          this.CoustomerList=this.salesCustomerList.Group;
        }
      });
    }  //this.skip1=0 ;this.take1=10;this.TotalCustomerCount=0
  }

 
  dialogPopup(gname:any,sname:any,GroupId:any,Strid:any){
  debugger
    this.CoustomerList=[];
    this.groupname = gname;
    this.storename = sname;
    this.GroupId=GroupId;
    this.Storeid=Strid;
    this.skip1=0;
    this.take1=10;
    this.salesServices.GetCustomers(this.GroupId,this.skip1,this.take1).subscribe(res=>{
      console.log(res);  
      this.salesCustomerList=res;
      this.TotalCustomerCount=this.salesCustomerList.TotalCustomerCount;
      if(this.salesCustomerList.Group.length==0) {
        this.showError("Data not Found");
        document.body.scrollTop = 0;
        this.first=0;
        document.documentElement.scrollTop = 0;
      }else{
        this.display = true;
        this.first=0;
        this.CoustomerList=this.salesCustomerList.Group;
      }
    }) 
  }
  
  IsActive(data,cond){
    if(cond==1){
      data.IsActive=0;
      this.salesServices.isActive(data.GroupId,data.IsActive).subscribe(result =>{
        if(result) data.ValidityDate=result;
      });
    } 
    else{
      data.IsActive=1;
      this.salesServices.isActive(data.GroupId,data.IsActive).subscribe(result =>{
        if(result) data.ValidityDate=result;
      });
    } 
  }

  peopleId:any;
  storeId:number;
  Store:any;
  AddGroup(){
    var userId = localStorage.getItem("userid")
    if(!this.Appname) this.showError("Select App type First")
    else if(!this.value2) this.showError("Enter Group Name First")
    else if(!this.Store && this.value3.value==2) this.showError("Store Name required");
    else if(!this.Segment && this.value3.value==3) this.showError("Segment Name required");
    else{
      if(this.value3.value==1){//System Group
        this.peopleId=0;
        this.storeId=0;
      }else if(this.value3.value==3){//Segment Group
        this.peopleId=userId;
        this.storeId=-3;
      }else{ //Store Group
        this.peopleId=userId;
        this.storeId=this.Store.Id;
      }
      if(confirm("Do you want to proceed for this Group name "+this.value2+" ?")){
        var segName=null
        if(this.SegmentNameList!=undefined && this.Segment!=undefined){
        this.SegmentNameList.forEach(g=>{if(g.SegmentId==this.Segment.SegmentId) segName=g.SegmentName})}
        this.salesServices.AddGroup(this.value2,this.peopleId,this.storeId,this.Appname,this.Segment!=undefined?this.Segment.SegmentId:null,segName).subscribe(res=>{
          if(res =='Group Already Exists') this.showError("Group Already Exists!")
          else if(res==true){
            this.GetAllGroups();
            this.showSuccess("Added Succesfully")}
          else this.showError("Something went wrong!")
        })
        this.Clear();    
      }
    } 
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }

  omit_special_char(event){   
    var k;  
    k = event.charCode;
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  Clear(){
    this.value2='';
    this.Store='';
    this.Appname='';
    this.Segment='';
  }

  removeCustomer(CustomerData){ 
    if(confirm("Do you want to proceed ? "+CustomerData.Skcode)){
      this.salesServices.RemoveCustomer(this.GroupId,CustomerData.CustomerId).subscribe(res=>{
        //console.log(res);
        this.showSuccess("Remove successfully skcode "+CustomerData.Skcode);
        this.salesServices.GetCustomers(this.GroupId,0,10).subscribe(res=>{
          this.CoustomerList=[];
          var totransferData:any = res;
          this.CoustomerList=totransferData.Group;
        })
      })
    }
  }

  redirectAddCustomer(rowData){
    this.router.navigateByUrl('layout/salesApp/salesAddCustomers/'+rowData.storeName+'/'+rowData.GroupName);
  }
  Export(){
    var exportArray:any[] = [];
    this.blocked=true;
    this.salesServices.GetGroupsOnPageLoad(0,this.TotalGroupCount).subscribe(result => {
      this.blocked=false
      exportArray=result.Group;
      //console.log(exportArray);
      let b:any;
      var res = exportArray.map(function(a) {
        if(a.IsActive==1) b='Active';
        else b='Inactive'
        return {
          'Show on salesApp':a.type,
          'Group Type':a.StoreName!=null?a.StoreName:a.SegmentName,
          'Group Name': a.GroupName,
          'Created Date': a.CreatedDate,
          'Validity Date': a.ValidityDate,
          'Status':b
         };
       });
       this.exportserv.exportAsExcelFile(res,"GroupDataExcelFile")
    });
  }

  ExportCustomer(){
    this.salesServices.GetCustomers(this.GroupId,0,this.TotalCustomerCount).subscribe(res=>{   
      var list =res['Group'];
      list.forEach(element => {
        element.group=this.groupname,
        element.store=this.storename
      })
      var result = list.map(function(a) {
        return {
          'Store': a.group,
          'Group': a.store,
          'Skcode': a.Skcode,
          'ShopName': a.ShopName,
         };
       });
      this.exportserv.exportAsExcelFile(result,"CustomerDataExcelFile")
    })
  }

  uploadCustomers(event,form){
      const files = event.files[0];
      var file = new FormData();
      file.append("file", files)
      this.blocked = true;
      this.salesServices.uploadCustomersWithFile(file,this.uploadStoreName,this.uplaodGoupName).subscribe(res=>{
      this.blocked = false;
      if(res=="Record Uploaded Successfully!!"){ this.showSuccess("active users has been uploaded");
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      else this.showError(res);
    },(err: any) => {
      this.blocked = false;
      this.showError(err)})
      form.clear();
      this.Showupload=false;
  }

  ExportSampleFile(){
    var array=[{'SkCode':""}];
    this.exportserv.exportAsExcelFile(array,"CustomersExcelFile")
  }
  isHistory:any
  historyDetailid : number;
  History(d,e){
    debugger
    this.historyDetailid  = d.GroupId;
    this.isHistory=true;
    let list1 = [1, 6, 15, 10, 58, 2, 40];

from(list1).pipe(max((a,b)=>a-b)).subscribe(x => console.log(
   "The Max value is "+x)
);
  }
  



}

import { Component, OnInit, Input } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { GullakService } from 'app/shared/services/gullak/gullak.service';
import { GetGullak } from 'app/shared/interface/gullak/gullak';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-gullak',
  templateUrl: './gullak.component.html',
  styleUrls: ['./gullak.component.scss']
})
export class GullakComponent implements OnInit {
  WarehouseId : any;
  showGullak :boolean=false;
  getDataList:any[]
  warehouse : any;
  gullakList  : any[];
  GetGullak : GetGullak;
  DateFrom : Date;
  DateTo : Date;
  Skcode : any;
  totalRecords : number;
  blocked : boolean;
  pageSize: number;
  selectedRow : any;
  isDetails : boolean;
  selectedRowDetails: any;
  isInvalid : boolean;
  whForm : any;
  @Input() Id: any;

  exportgullak: any[];

  apiURL: string;
  // PeopleAll:any;
  User: any;
  comment: string;


  constructor(private warehouseService : WarehouseService, private gullakService : GullakService, private router: Router, private exportService: ExportServiceService, private route: ActivatedRoute,
    ) { 
    this.apiURL = environment.apiURL;
  }

  ngOnInit() {
    this.WarehouseId = '';

    this.warehouseService.getSpecificWarehouses().subscribe(result=>{
      this.warehouse = result;
      console.log('Warehouse:',this.warehouse)
    })
    this.pageSize = 1;

  }
  OnClick(whForm)
  {
    //console.log(this.Skcode);
    
    if(this.Skcode==null && this.Skcode==undefined || this.Skcode=='')
    {
      alert("Please Enter Skcode")
      return
    }
if(whForm.form.status == 'VALID')
{
    this.GetGullak = {
      Skip: 0,
      Take : this.pageSize,
      //warehouseid : this.WarehouseId,
      DateFrom : this.DateFrom,
      DateTo : this.DateTo,
      SKcode : this.Skcode,
  }

  this.blocked = true;
    this.gullakService.GetGullak(this.GetGullak).subscribe(result=>{
   
      console.log(result,"rrr");
      
      this.gullakList = result.GullakDTO;
      if(!result.Status)
      {
        alert(result.Message)
        this.blocked=false

        return 
      }
    else  if(this.gullakList.length==0)
      {
        //alert(result.Message)

        alert("Please add Gullak")
        this.showGullak=true
        this.blocked=false
        return
      }
      else
      {
        this.exportgullak =  this.gullakList;
      console.log('gullakList',this.gullakList);
      this.totalRecords = result.Count;
      this.showGullak=false
      this.Skcode=null
      this.blocked = false;
      
      return
      }
      
    })
}else
{
  this.isInvalid = true;
  this.blocked = false;
}

  }
  addGullakData(Skcode)
  {
    console.log(Skcode,"skcode");
    
    this.gullakService.addNewGullak(Skcode).subscribe(x=>
      {
        debugger
        if(x.Status)
        {
          alert(x.Message);
       // console.log(x,"xxx");
        this.GetGullak = {
          Skip: 0,
          Take : this.pageSize,
         // warehouseid : this.WarehouseId,
          DateFrom : this.DateFrom,
          DateTo : this.DateTo,
          SKcode : this.Skcode,
      }
      this.blocked = true;
        this.gullakService.GetGullak(this.GetGullak).subscribe(result=>{
          this.gullakList = result.GullakDTO;
        this.blocked=false
        this.showGullak=false
        return 
        })
        }
       
        else
        {
          alert(x.Message)
          this.showGullak=false;
        }
        
      })
  }   
  load(event) {
    
    this.GetGullak.Skip = event.first;
    this.GetGullak.Take = event.rows;
    this.OnClick(this.whForm);
  }

  openDetails(d,e,WarehouseId){
    
    this.selectedRowDetails  = d;
    
    if(this.selectedRow != undefined){
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    } 
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
    console.log(this.apiURL);
    

     window.open('/#/'+this.router.url+'/' + d.Id + '/' + d.CustomerId + '');

    //window.open(this.apiURL+'/layout/customer/gullak/' + d.Id + '/' + d.CustomerId)


    // this.router.navigateByUrl('layout/customer/gullakdetail/' + d.Id + '/' + d.CustomerId + '/' + WarehouseId);
  }
  
  ExportGullak(){
    let exportOrder=[];
    this.exportgullak.forEach(element => {
      exportOrder.push(
        {
      Id:element.Id,
      CreatedDate:element.CreatedDate,
      ModifiedDate:element.ModifiedDate,
      IsActive:element.IsActive,
      IsDeleted:element.IsDeleted,
      GullakCreatedBy:element.GullakCreatedBy,
      Warehouse:element.Warehouse,
      ModifiedBy:element.ModifiedBy,
      CustomerId:element.CustomerId,
      TotalAmount:element.TotalAmount,
      SKcode:element.SKcode,
      //Mobile:element.Mobile;
      ShopName:element.ShopName,
     // Name:element.Name;
      City:element.City
      })
    });
    this.exportService.exportAsExcelFile(exportOrder, 'exportgullak');
  }
}
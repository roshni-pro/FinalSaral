import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MastermakercheckerService } from 'app/shared/services/mastermakerchecker.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { config } from 'rxjs';
import { threadId } from 'worker_threads';
import {AddNewSupplier} from '../../../shared/interface/supplier/addnewsupplier'
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-newsupplierlist',
  templateUrl: './newsupplierlist.component.html',
  styleUrls: ['./newsupplierlist.component.scss']
})
export class NewsupplierlistComponent implements OnInit {
  @Input() supplierid: number;
  SupplierList:any=[];
  selectedSupplier: AddNewSupplier;
  Mastercheckerentity:any=[];
  Status:any[];
  skip: number = 0;
  take: number = 10;
  sstatus:any;
  supplierId:number;
  skcode:string;
  public displayBasic:boolean;
  historydata:any=[]
  disabled:boolean=false;
  blocked:boolean=false;
  TotalRecords:number=0
  first:number=0;
  constructor(private router:Router, private supplierService:SupplierService, private mastermakercheckerservice:MastermakercheckerService,private route:ActivatedRoute, private exportservice:ExportServiceService) { }

  ngOnInit() {
    this.sstatus="Approved"
    this.Status = new Array("Pending","Approved","Rejected");
    // this.getSupplierList(status, event);
   
  }
  addnew(){
    this.router.navigate(['/layout/supplier/SupplierOnboard']);
  }
  key:string
  getSupplierList(status, event){
    // debugger
    this.blocked=true;
    let Skip = event && event.first ? event.first : 0
    let Take =  event && event.rows ? event.rows : 10
    let KeyWord = this.key ? this.key : ""
    this.supplierService.GetSupplierList(this.sstatus, KeyWord, Skip, Take).subscribe(x=>{
      debugger;

      this.blocked=false ;
      this.SupplierList=x.data.SupplierOnBoardDC;
      this.TotalRecords=x.data.Totalcount
      console.log("supplierlist",this.SupplierList)
    })

    if(this.sstatus=="Pending"){
      this.disabled=true;
    }
    else{
      this.disabled=false;
    }
  }
  emp()
  {
    this.first = 0;
    this.TotalRecords=0;
  }


  load(event)
  {
    this.getSupplierList(status, event);
  }
  public SupplierInfoId:any;
  View(config){    
    this.SupplierInfoId=localStorage.setItem('config',config.id);
    localStorage.setItem('supplierId',config.SupplierId);
    this.router.navigate(['/layout/supplier/editsupplier']);    
  }

  addDpot(config){
    this.router.navigateByUrl("/layout/supplier/adddpot/"+config.SupplierId);
  }
  viewDepot(config){
    this.router.navigateByUrl('/layout/supplier/viewdepot/'+config.SupplierId);
  }

  getSupHistory(config){
    
    this.SupplierInfoId=localStorage.setItem('config',config.id);
    this.skcode=config.SUPPLIERCODES;
    this.supplierId=config.SupplierId;
    this.supplierService.getSupplierhistory(this.supplierId,this.skcode).subscribe(data=>{
      console.log(data,'history');
      this.historydata=data.data;
    })
  }

  history(config){
    this.displayBasic=true;
    this.getSupHistory(config);
  }
  keyword:any;
  CurentRes:any[]=[];
  data(x){
    this.keyword=x;
  }
  exportdata(x){
    
    this.blocked=true;
    this.supplierService.exportsupplierlist(x,this.key).subscribe(data=>{
      
      if(data != null && data.length>0)
      {
        
        const exportArry: any[] = data.map((x: any) => ({
          SupplierId:x.SupplierId,
          'Supplier Code':x.SUPPLIERCODES,
          'Supplier Name':x.Name,
          'GST No.':x.GstInNumber,
          'Pan Number':x.Pancard,
          ContactPersonName:x.ContactPerson,
          MobileNo:x.MobileNo,
          'Email Id':x.EmailId,
          'Selling Brand':x.SellingBrands,
          'Bank Name':x.Bank_Name,
          Bank_AC_No:x.Bank_AC_No,
          'Bank IFSC Code':x.Bank_Ifsc,
          'Bank Address':x.BankAddress,
          'Bank Pin Code':x.BankPINno,
          City:x.City,
          StateName:x.StateName,
          CityPincode:x.CityPincode,
          'Depo Name':x.DepoName,
          'BillingAddress':x.BillingAddress,
          FSSAI:x.FSSAI,
          'EstablishmentYear':x.EstablishmentYear,
          'StartedBusiness':x.StartedBusiness,
          'BussinessType':x.bussinessType,
          'PaymentTerms':x.PaymentTerms,
          Active:x.Statuss,
          MSMEType:x.MSMEType,

        }));
      // this.blocked=false
      // this.CurentRes=data;  
      // let str = JSON.stringify(this.CurentRes,(k, v) =>  v === null ? 0 : v);
      // let result = JSON.parse(str);
      // console.log("result",result);
      this.exportservice.exportAsExcelFile(exportArry,"Supplierlist");
      this.blocked=false;
      }
      else{
        this.blocked=false;
        alert("No Data Found");
      }
    })
  }


  exportfulldata(){
    this.blocked=true;
    
    this.supplierService.exportfullsupplierlist().subscribe(data=>{
      if(data != null && data.length>0)
      {
        const exportArry: any[] = data.map((x: any) => ({
          SupplierId:x.SupplierId,
          'Supplier Code':x.SUPPLIERCODES,
          'Supplier Name':x.Name,
          'GST No.':x.GstInNumber,
          'Pan Number':x.Pancard,
          ContactPersonName:x.ContactPerson,
          MobileNo:x.MobileNo,
          'Email Id':x.EmailId,
          'Selling Brand':x.SellingBrands,
          'Bank Name':x.Bank_Name,
          Bank_AC_No:x.Bank_AC_No,
          'Bank IFSC Code':x.Bank_Ifsc,
          'Bank Address':x.BankAddress,
          'Bank Pin Code':x.BankPINno,
          City:x.City,
          StateName:x.StateName,
          CityPincode:x.CityPincode,
          'Depo Name':x.DepoName,
          'BillingAddress':x.BillingAddress,
          FSSAI:x.FSSAI,
          'EstablishmentYear':x.EstablishmentYear,
          'StartedBusiness':x.StartedBusiness,
          'BussinessType':x.bussinessType,
          'PaymentTerms':x.PaymentTerms,
          Active:x.Statuss,
          MSMEType:x.MSMEType,
        }));
      this.exportservice.exportAsExcelFile(exportArry,"FullSupplierList");
      this.blocked=false;
      }
      else{
        this.blocked=false;
        alert("No Data Found");
      }
    })
  }
}

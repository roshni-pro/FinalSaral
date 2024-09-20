import { Component, OnInit, Input } from '@angular/core';
import { Vendor } from 'app/expense/interfaces/vendor';
import { ExpenseService } from 'app/expense/services/expense.service';
import { WorkingCompanyService } from 'app/expense/services/working-company.service';
import { WorkingLocationService } from 'app/expense/services/working-location.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { VendorService } from 'app/expense/services/vendor.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-vendor',
  templateUrl: './manage-vendor.component.html',
  styleUrls: ['./manage-vendor.component.scss']
})
export class ManageVendorComponent implements OnInit {

  constructor(private expenseService:ExpenseService,
    private workingCompanyService:WorkingCompanyService,
    private workingLocationService:WorkingLocationService,
    private pepolePilotService:PepolePilotService,
    private vendorService:VendorService,
    private messageService:MessageService,
    private route: ActivatedRoute,
    ) { }
  departmentList:any[];
  workingCompanyList:any[];
  workingLocationList:any[];
  stateList:any[];
  vendor:Vendor;
  expenseTDSList:any[];
  selectedTDS:any;
  isInvalid:any;
  @Input() Id: number; 
  ngOnInit() {
  this.vendor=this.initializeVendor();
  this.getAllDepartmentList();
  this.getWorkingCompanyList();
  this.getWorkingLocationList();
  this.getStateList();
  this.isInvalid=false;
  this.selectedTDS=null;
  this.Id = Number(this.route.snapshot.paramMap.get("Id"));
  if(this.Id>0){
  this.getVendorById();
  }

  }
  initializeVendor():Vendor{
    let vendor : Vendor = {
      Id: 0,
      StateId: null,
      AddressOne: '',
      AddressTwo: '',
      VendorType: null,
      Name: '',
      Code: '',
      DepartmentId:null,
      WorkingLocationId: null,
      WorkingCompanyId:null,
      IsTDSApplied: false,
      ExpenseTDSMasterID:null,
      CreatedBy:null,
      DepartmentName:'',
      WorkingCompanyName:'',
      WorkingLocationName:'',
      StateName:'',
      ExpenseTDSMasterName:''
    }
    return vendor;


  }
  getAllDepartmentList(){
    this.expenseService.getDepartment().subscribe(y => {
    this.departmentList = y;
    console.log('department list is: ', y);
  });
  }
  getWorkingCompanyList() {
    this.workingCompanyService.getAll().subscribe(x => {
      this.workingCompanyList = x;
      console.log(' this.workingCompanyList: ', this.workingCompanyList);
    });
  }
  getWorkingLocationList() {
    this.workingLocationService.getAll().subscribe(x => {
      this.workingLocationList = x;
      console.log(' this.workingLocationList: ', this.workingLocationList);
    });
  }
  getStateList(){
  this.pepolePilotService.States().subscribe(result => {
    this.stateList = result;
    console.log('this.stateList :', result);
  });
}
 getExpenseTDSList(){
  this.vendorService.GetExpenseTDS().subscribe(result => {
    this.expenseTDSList = result;
    console.log('this.expenseTDSList :', result);
  });

 }
 onChangeIsTDSApplied(){
   if(this.vendor.IsTDSApplied){
    this.getExpenseTDSList();
   }else{
    this.expenseTDSList=null;
   }
 }
 onCancelVendor(){
 this.ngOnInit();

 }

 onSaveVendor(addvendoreForm){
   
  if (addvendoreForm.form.status == "VALID") {
     if(this.vendor.IsTDSApplied ){
      if(this.vendor.ExpenseTDSMasterID==null){
        this.messageService.add({ severity: 'error', summary: 'Please Select Expense TDS Master', detail: '' });
      }else{
       this.addVendor();
      }
    }
     else{
      this.addVendor();
     }
    
   }else{
    this.isInvalid = true;

   }
 }
 addVendor(){
   this.vendorService.AddVendor(this.vendor).subscribe(result=>{
    this.vendor=result;
    if(this.vendor.Id>0){
    this.messageService.add({ severity: 'success', summary: 'Add Successfully', detail: '' });
    this.ngOnInit();
    }
    });   
 }
 getVendorById(){
  this.vendorService.GetVendorById(this.Id).subscribe(result=>{
    this.vendor=result;
    });   

 }
}

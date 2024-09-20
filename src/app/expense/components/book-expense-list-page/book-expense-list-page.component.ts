import { Component, OnInit } from '@angular/core';
import { BookExpensePager } from 'app/expense/interfaces/book-expense';
import { BookExpenseService } from 'app/expense/services/book-expense.service';
import { DepartmentService } from 'app/shared/services/department.service';
import { WorkingCompanyService } from 'app/expense/services/working-company.service';
import { WorkingLocationService } from 'app/expense/services/working-location.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-expense-list-page',
  templateUrl: './book-expense-list-page.component.html',
  styleUrls: ['./book-expense-list-page.component.scss']
})
export class BookExpenseListPageComponent implements OnInit {
  BookExpensePager : BookExpensePager;
  pagerList : any;
  data : any;
  totalRecords: number;
  isOpenPopupPayments : boolean;
  deptList : any;
  workingcompanyList : any;
  workinglocationList : any;
  DepartmentId : any;
  WorkingCompanyId : any;
  WorkingLocationId : any;
  Id : any;
  viewdata : any;

  constructor(private bookexpenseService : BookExpenseService, private departmentService : DepartmentService,private workingCompanyService : WorkingCompanyService,private workinglocationService : WorkingLocationService,private router : Router, private confirmationService: ConfirmationService,private messageService : MessageService) {
   this.viewdata = {};
   }

  ngOnInit() {
    this.BookExpensePager = {
        SkipCount: 0,
        Take : 10,
        Filter : '',
        DepartmentId : null,
        WorkingCompanyId : null,
        WorkingLocatiponID : null,
    }
    this.DepartmentId ='';
    this.WorkingCompanyId = '';
    this.WorkingLocationId = '';

    // this.bookexpenseService.GetPage(this.BookExpensePager).subscribe(result => {
    //   this.pagerList = result;
    //   this.totalRecords = result.Count;
    //   console.log('pagerList:', this.pagerList);
    // });

    this.departmentService.GetAllDepartment().subscribe(result => {
      this.deptList = result;
    });
    
    this.workingCompanyService.getAll().subscribe(result => {
      this.workingcompanyList = result;
      console.log('this.workingcompanyList::', this.workingcompanyList);
    });

    this.workinglocationService.getAll().subscribe(result => {
      this.workinglocationList = result;
      console.log('this.workinglocationList::', this.workinglocationList);
    });
     

  }

  
  load(event,DepartmentId,WorkingCompanyId,WorkingLocationId) {
    
    this.BookExpensePager.SkipCount = event.first;
    this.BookExpensePager.Take = event.rows;
    this.BookExpensePager.DepartmentId = DepartmentId;
    this.BookExpensePager.Filter = this.BookExpensePager.Filter;
    this.BookExpensePager.WorkingCompanyId = WorkingCompanyId;
    this.BookExpensePager.WorkingLocatiponID = WorkingLocationId;
    
    this.bookexpenseService.GetPage(this.BookExpensePager).subscribe(result => {
      this.pagerList = result.PageList;
      console.log('this.pagerList::', result.PageList);
      this.totalRecords = result.Count;

    })
  }
  // openDetails(d, e) {
  //   
  //   console.log('d::', d);
  //   this.isOpenPopupPayments = true;
  //   // this.GSTVerifiedRequestId = d.GSTVerifiedRequestId;
  //   // this.custgstService.GetDetailList(this.GSTVerifiedRequestId).subscribe(result => {
  //   //   this.DetailList = result;
  //   //   console.log('DetailList:', this.DetailList);
  //   // })
  // }

  viewbookexpense(rowData){

    
    this.isOpenPopupPayments = true;
    console.log('rowData:',rowData);
    this.bookexpenseService.GetViewData(rowData).subscribe(result=>{
      this.viewdata = result;//
console.log('GetViewdata:',this.viewdata);
    })
  }
  GetApproved(rowData){  
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Approved this Expense?क्या आप वाकई इस व्यय को स्वीकृत करना चाहते हैं?',
      accept: () => {
        console.log('Ischecked:',rowData.IsChecked);
      },
      reject: () => {
        rowData.IsChecked = !rowData.IsChecked;
        this.messageService.add({ severity: 'error', summary: 'Your Request for Approved Process is Canceled!अनुमोदित प्रक्रिया के लिए आपका अनुरोध रद्द कर दिया गया है?', detail: '' });
      }
     
    });
   
  }

  // search(DepartmentId,WorkingCompanyId,WorkingLocationId){
  //   console.log('DepartmentId:',DepartmentId);
  //   console.log('WorkingCompanyId:',WorkingCompanyId);
  //   console.log('WorkingLocationId:',WorkingLocationId);
  //   
  //   this.load(event,DepartmentId,WorkingCompanyId,WorkingLocationId) ;
  // }
  
  OnClick() {
    
    this.BookExpensePager = {
      SkipCount: 0,
      Take : 10,
      Filter : this.BookExpensePager.Filter,
      DepartmentId : this.DepartmentId,
      WorkingCompanyId : this.WorkingCompanyId,
      WorkingLocatiponID : this.WorkingLocationId,
  }
  
  this.bookexpenseService.GetPage(this.BookExpensePager).subscribe(result => {
    this.pagerList = result.PageList;
    console.log('this.pagerList::', result.PageList);
    this.totalRecords = result.Count;

  })
  }

  onCancel(rowData){
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Cancel this Activity?क्या आप वाकई इस गतिविधि को रद्द करना चाहते हैं?',
      accept: () => {
        
        console.log('Ischeidcked:',rowData.Id);
      }
     
    });
  }

  onAdd(){
    this.router.navigateByUrl('layout/expense/manage');
  }
 

}

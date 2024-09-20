import { Component, OnInit } from '@angular/core';
import { VendorService } from 'app/expense/services/vendor.service';
import { Vendor } from 'app/expense/interfaces/vendor';
import { VendorPager } from 'app/expense/interfaces/VendorPager';
import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  constructor(private vendorService:VendorService,
    private router:Router
    ) { }
  vendorList:Vendor[];
  paginator: VendorPager;
  totalCount:any;
  listdata:any;
  ngOnInit() {
     
  this.initializePaginator();
  }

  initializePaginator() {
    this.paginator = {
      SkipCount: 0,
      Take: 20
    };
  }

  loadLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.SkipCount = event.first;
        this.paginator.Take = event.rows;
        this.getData();
      }
    }, 100);
  }

  filter() {
    this.paginator.SkipCount = 0;
    this.paginator.Take = 20;
    this.getData();
  }
  getData(){
    this.vendorService.GetVendorList(this.paginator).subscribe(result=>{
       this.listdata=result;
      this.vendorList =   this.listdata.PageList;
      this.totalCount =   this.listdata.Count;
      }); 

  }
  redirectAddVendor(){
    this.router.navigateByUrl("layout/expense/managevendor");
  }
  redirectAndUpdateWithId(Id){
    this.router.navigateByUrl("layout/expense/managevendor/"+Id);


  }
}

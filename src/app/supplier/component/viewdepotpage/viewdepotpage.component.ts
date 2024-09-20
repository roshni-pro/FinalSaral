import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'app/shared/services/supplier.service';
import { debug, log } from 'console';
import {MessageService } from  'primeng/api';
@Component({
  selector: 'app-viewdepotpage',
  templateUrl: './viewdepotpage.component.html',
  styleUrls: ['./viewdepotpage.component.scss']
})
export class ViewdepotpageComponent implements OnInit {
  @Input() supplierid:number;
  public status:string;
  public dePotList=[];
  // SupplierID:any;
  skip: number = 0;
  take: number = 10;
  constructor(private router:Router, private supplierService:SupplierService,
   private route:ActivatedRoute, private MessageService:MessageService  ) { }

  ngOnInit() {
    debugger
    this.supplierid = Number(this.route.snapshot.paramMap.get("supplierid"));
    console.log("id",this.supplierid)
    // let info=localStorage.getItem('config');
    // this.SupplierID=info;
    // console.log(info,'info');
    this.getDepotListBySupID(this.supplierid);
  }

  // getDepotList(){
  //   this.status="Pending";
  //   this.supplierService.getDepotList(this.status).subscribe(data=>{
  //     this.dePotList=data.Data.data;
  //     console.log(this.dePotList,'dePotList');
  //   })
  // }

  getDepotListBySupID(SupplierID:number){
    
    this.supplierService.getDepotListBySupID(this.supplierid).subscribe(data=>{
        if(data){
           console.log(data,'dadat');
          this.dePotList=data.data;
          console.log(this.dePotList,'dePotList');
        }
        if(!data.data){
          this.MessageService.add({ severity: 'error', summary: "data not found", detail: '' });
        }
        })
  }
  dpotInfoId;
  depotDepoId;
  editDepot(config){
    this.dpotInfoId=localStorage.setItem('depotconfig',config.Id);
    this.depotDepoId= localStorage.setItem('depotdepid',config.DepoId);
    this.router.navigate(['/layout/supplier/editdepot'],config.Id+config.DepoId);
  }

}

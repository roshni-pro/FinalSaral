import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutBoundDeliveryMasterService } from 'app/Master/services/outbounddeliverymaster.service';
import { CityService } from 'app/shared/services/city.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-outbound-deliverylist',
  templateUrl: './outbound-deliverylist.component.html',
  styleUrls: ['./outbound-deliverylist.component.scss']
})
export class OutboundDeliverylistComponent implements OnInit {
  List:any=[
    {'name':'abc', 'id':1,'dboyname':'jjj'},
    {'name':'vnnv', 'id':2, 'dboyname':'kkk'},
    {'name':'jfj', 'id':2, 'dboyname':'khuuj'}
  ];
  skip: number ;
  take: number ;
  warehouseId:any;
  outBoundList=[];
  blocked:boolean;
  totalRecords:number;
  searchModel:any;
  cityList:any;
  masterwarehouseList:any;
  constructor( private router:Router, private outBoundDeliveryMasterService:OutBoundDeliveryMasterService,
    private cityService: CityService,private customerService: CustomerService, private confirmationService:ConfirmationService) {this.searchModel={}; }

  ngOnInit() {
    this.blocked=true;
   // this.getMappingList();
    this.searchModel.Cityid=[];
    this.searchModel.WarehouseId=[];
    this.cityService.getAllCityNew().subscribe(result => {
      this.cityList = result;
      // console.log(this.cityList);
      
      this.blocked=false;
    })
  }
  load(event) {
    this.blocked=true;
    var Last=  event.first ? event.first + event.rows : 10;
    this.skip=Last/ event.rows;
    this.take= event.rows;
    this.outBoundDeliveryMasterService.getMappingList(this.skip,this.take,this.searchModel.WarehouseId.value).subscribe(x=>
      {
        this.totalRecords = x.totalcount;
        this.outBoundList = x.outBoundList;
        this.blocked=false;
      })
  }
  getWarehouse(cityid) {
    this.customerService.getWareHouseByCityNew(cityid).subscribe(x => {
      this.masterwarehouseList = x
    })
  }
  gotoEditpage(config){
    // this.router.navigate(['/layout/master/edit-OutboundDelivery'+ rowData.Id]);
    
      this.router.navigateByUrl('layout/master/edit-OutboundDelivery/' + config.Id);
    
  }

  addVechile(){
    this.router.navigateByUrl('layout/master/OutboundDelivery');

  }

  clear(){
    this.blocked=true;
    this.searchModel.Cityid=[];
    this.searchModel.WarehouseId=[];
    this.search();
    this.blocked=false;
  }
  search(){
    this.blocked=true;
    this.outBoundDeliveryMasterService.getMappingList(this.skip,this.take,this.searchModel.WarehouseId.value).subscribe(data=>{
      this.totalRecords = data.totalcount;
      this.outBoundList = data.outBoundList;
      this.blocked=false;
    })
  }
  ActiveInactive(d,bool){
    this.blocked=true;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.outBoundDeliveryMasterService.postActivety(d.Id,bool).subscribe(res=>{
          console.log(res,'res');
          this.blocked=false;
          this.search();
        })
      }
    });
    this.blocked=false;
  }
}

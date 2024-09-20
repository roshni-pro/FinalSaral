import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ClusterService } from 'app/shared/services/cluster.service';
import { CityService } from 'app/shared/services/city.service';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-refresh-cluster-customer',
  templateUrl: './refresh-cluster-customer.component.html',
  styleUrls: ['./refresh-cluster-customer.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ], 
})
export class RefreshClusterCustomerComponent implements OnInit {
  cities: any;
  @Input() Cityid: any;
  cols: any[];
  refreshdataList : any;
  refreshList : any;
  clusterList : any;
  Active : any;
  Status : any;
  blocked: boolean;
  blockedstatus : boolean;
  cityId : any;
  @Input() cityid: any;
  constructor(private messageService: MessageService,  private route: ActivatedRoute,private clusterService: ClusterService, private router: Router, private modalService: NgbModal, private cityService: CityService, private confirmationService: ConfirmationService) {   this.refreshList = {}; }
  
  ngOnInit() {
  this.cityid = Number(this.route.snapshot.paramMap.get("CityId"));
if(this.cityid)
{
  this.Cityid=this.cityid;
}
    this.cols = [
     
      { field: 'RefreshDate', header: 'Refresh Date' },
  
      { field: 'CityName', header: 'City Name' },
      { field: 'RefreshCustomerCount', header: 'Refresh Customer Count' },
      { field: 'strStatus', header: 'Status' },
      { field: 'RefereshByName', header: 'Name of Refresher' },      


    ];

    console.log('Status :::', this.Status);
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
     
      console.log('cities[0] :::', this.cities[0]);
      for (var i in this.cities) {
        this.cities[i].CreatedDate = this.cities[i].CreatedDate ? moment(this.cities[i].CreatedDate).format('DD/MM/YYYY') : null

      }
    });

    this.clusterService.GetClusterRefreshData(this.cityid).subscribe(result =>{
      
      console.log('wait for some time1::', result);
      console.log('wait for some time2::', result[0].Status);
   
      this.refreshdataList = result;
      for (var i in this.refreshdataList) {
        this.refreshdataList[i].RefreshDate = this.refreshdataList[i].RefreshDate ? moment(this.refreshdataList[i].RefreshDate).format('DD/MM/YYYY --  HH:mm:ss') : null
 
      }
      console.log('result[0]refreshdataList :::', this.refreshdataList);
    });

  

  }

 

SearchRefreshData(Cityid){ 
  this.blocked = true;
  this.blockedstatus = true;
  this.clusterService.GetClusterRefreshData(Cityid).subscribe(result =>{
  
    this.refreshdataList = result;
    console.log('refreshdataListrefreshdataListrefreshdataList :::', this.refreshdataList);
     for (var i in this.refreshdataList) {
       this.refreshdataList[i].RefreshDate = this.refreshdataList[i].RefreshDate ? moment(this.refreshdataList[i].RefreshDate).format('DD/MM/YYYY HH:mm:ss') : null

     }
    this.blocked = false;
  })
}

refreshclustercustomerprocess(Cityid){
  console.log('Cityid :::', this.Cityid);
if(!Cityid){
  this.messageService.add({ severity: 'error', summary: 'Please Select City First!', detail: '' });
}
else{
  this.blocked = true;
  this.confirmationService.confirm({
          message: 'Are you sure to Refresh the Customer Data?',
          accept: () => {
            this.blocked = true;
            
            this.clusterService.GetClusterRefreshDataValidation(Cityid).subscribe(result => {
              console.log('GetClusterRefreshDataValidation:::',result.status);
             
             this.blockedstatus = result.status;
             this.blockedstatus =false;
              if(result.status)
              {         
                this.blockedstatus = true;     
                this.messageService.add({ severity: 'error', summary: 'Your referesh request is Already is in progress please check after some time.!', detail: '' });
              }
              else{
                
                  this.clusterService.RefereshCityCluster(Cityid).subscribe(result => {
                  // 
                    this.ngOnInit();
                    this.refreshList = result;
                    this.blocked = false;
                    console.log('refreshList :::', this.refreshList);
                    console.log('refreshList status :::', this.refreshList.status);
                  })
                  this.messageService.add({ severity: 'success', summary: 'Your Cluster customer referesh request proceed please check after some time.!', detail: '' });
              }
  });
    this.blocked = false;
    
  },
  reject: () => {
    this.blocked= true;
    this.blocked= false;
    this.messageService.add({ severity: 'error', summary: 'Your Request for Refresh the Customer Data is Canceled!', detail: '' });
  }

  });
    alert('Are You Sure Customer-Agent & Executive Mapping Is Done? Before Refresh Assure that Order Should Be in Pending Or Freeze Status');    
  
  
  }

 
}

onCancel() {  
  this.router.navigateByUrl('layout/warehouse/cluster');
}


}

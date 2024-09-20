import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import {  ConfirmationService, MessageService } from 'primeng/api';
import {MenuItem} from 'primeng/api';
// import {  PrimeNGConfig} from 'primeng/api';


import { LoaderService } from 'app/shared/services/loader.service';


@Component({
  selector: 'app-sales-app-config-catalog',
  templateUrl: './sales-app-config-catalog.component.html',
  styleUrls: ['./sales-app-config-catalog.component.scss']
})
export class SalesAppConfigCatalogComponent implements OnInit {

  constructor( private router : Router,private salesApp: SalesAppServiceService,private messageService: MessageService , private confirmationService: ConfirmationService ) { 
   }

  @Output() newItemEvent = new EventEmitter<boolean>();
  itemst: MenuItem[];
  itemstGlobal:  MenuItem[];
  CID:any
  Cities:any[]=[]
  IsShowClist:any
  IsDisable:boolean
  IsShow:boolean=true
  display:boolean;
  CreatedDate:boolean

  ngOnInit() {

    this.getConfigCityList();

    this.itemst = [
      {
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-eye',
            command: () => {
              this.GetCatalogConfigByCityId();
            },
          },
          {
            label: 'Duplicate',
            icon: 'pi pi-copy',
            command: () => {
              this.Update();
            },
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
              this.DeleteCatalogConfigByCityId();
            },
          },
        ],
      },
    ];


    this.itemstGlobal = [
      {
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-eye',
            command: () => {
              this.GlobalEdit();
            },
          },
          // {
          //   label: 'Duplicate',
          //   icon: 'pi pi-copy',
          //   command: () => {
          //     this.GlobalDuplicate();
          //   },
          // },
          // {
          //   label: 'Delete',
          //   icon: 'pi pi-trash',
          //   command: () => {
          //     this.DeleteCatalogConfigByCityId();
          //   },
          // },
        ],
      },
    ];

  }

  GlobalEdit()
  {
    // debugger;
    this.salesApp.GetCatalogConfigByCityId(0).subscribe(res=>
    {
      this.router.navigateByUrl("layout/salesApp/SalesAppConfigCatalogCreateNewComponent/"+0+'/'+this.IsShow );          
    }) 
  }

  GlobalDuplicate()
  {
    // debugger;
    this.salesApp.GetCatalogConfigByCityId(0).subscribe(res=>
    {
      this.router.navigateByUrl("layout/salesApp/SalesAppConfigCatalogCreateNewComponent/"+0+'/'+this.IsShow );          
    }) 
  }
 
  cityStatusChange(city:any)
  {
    // debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      
      accept: () => {
       
        this.salesApp.CityStatusChange(city.Cityid,city.IsDisable).subscribe(res=>
      {
         console.log("aceptted",res);
         if (res.IsDisable) {
          alert("status c e")
        } 
      })     
      },
      reject: () => {
        city.IsDisable = !city.IsDisable;
      }
    });
  }

  getConfigCityList()
  {
    // debugger;
    this.IsShowClist=[]
    this.salesApp.getConfigCityList().subscribe(res=>
    {
      this.Cities = res;
      console.log("getConfigCityList",this.Cities);
      
      this.IsDisable =res.IsDisable

    })      
  }

  CreateNew() {
    // debugger;
    this.newItemEvent.emit(true);
  }


  GetCatalogConfigByCityId()
  {
    // debugger;
    this.salesApp.GetCatalogConfigByCityId(this.CID).subscribe(res=>
    {
      this.router.navigateByUrl("layout/salesApp/SalesAppConfigCatalogCreateNewComponent/"+this.CID+'/'+this.IsShow );          
    }) 
  }

  Update()
  {
    // debugger; 
    this.salesApp.GetCatalogConfigByCityId(this.CID).subscribe(res=>
    {
      console.log(res,"res");
      this.router.navigateByUrl("layout/salesApp/SalesAppConfigCatalogCreateNewComponent/"+this.CID+'/'+false );
      console.log("ttt",res);           
    }) 
  }

  DeleteCatalogConfigByCityId()
  {
    // debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      
      accept: () => {
       
        this.salesApp.DeleteCatalogConfigByCityId(this.CID).subscribe(res=>
      {
         console.log("aceptted",res);
         if(res.Status==true)
           {
             alert(res.Message);
             this.getConfigCityList();
           }    
      })     
      },
      reject: () => {
        alert("city not deleted")
      }
    });

    // this.salesApp.DeleteCatalogConfigByCityId(this.CID).subscribe(res=>
    // {
    //   console.log(res);
    //   if(res.Status==true)
    //   {
    //     alert(res.Message);
    //     this.getConfigCityList();
    //   }        
    //   else if(res.Status==false)
    //   {
    //     alert(res.Message)
    //   }
    // })
  }
  
  onClickMenu(cityId)
  {
    // debugger;
    this.CID=cityId
  }
}


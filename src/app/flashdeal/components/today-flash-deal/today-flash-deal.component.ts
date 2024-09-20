import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { FlashdealService } from 'app/shared/services/flashdeal.service';
import * as moment from 'moment';

@Component({
  selector: 'app-today-flash-deal',
  templateUrl: './today-flash-deal.component.html',
  styleUrls: ['./today-flash-deal.component.scss']
})
export class TodayFlashDealComponent implements OnInit {
  hubList : any;
  cols : any;
  WarehouseId : any;
  itemname:any;
  StartDate:any;
  EndDate:any;
  flashdeallist:any;
  searchModel:any;
  constructor(private warehouseService:WarehouseService ,private flashdealService: FlashdealService) { }

  ngOnInit() {
   this.WarehouseId="";
   
   this.cols = [
      { field: 'itemname', header: 'ItemName' },
      { field: 'FlashDealSpecialPrice', header: 'FlashDeal Price' },
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'OfferQtyAvaiable', header: 'OfferQty Avaiable' },
      { field: 'OfferStartTime', header: 'Offer StartTime' },
      { field: 'OfferEndTime', header: 'Offer EndTime' },
      { field: 'Active', header: 'Active' },
     
    ];
    
    console.log('cols : ', this.cols);


    this.warehouseService.GetAllWarehouse().subscribe(result => {
      
      this.hubList = result;
    })
    //  this.flashdealService.GetTodayFlashDeal(this.WarehouseId,this.itemname,this.StartDate,this.EndDate).subscribe(result =>{
    //   
   
    //   this.flashdeallist =result;
    //  console.log (this.flashdeallist + 'gfdg')
    // })

  }
     getlist(){
    this.flashdealService.GetTodayFlashDeal(this.WarehouseId,this.itemname,this.StartDate,this.EndDate).subscribe(result =>{
       
    this.flashdeallist =result;
    console.log (this.flashdeallist + 'gfdg')
    })
    }

    search(){
      let data = this.convertSearchData();

      var FromDate = this.StartDate ? moment(this.StartDate).format('YYYY-MM-DD') : null
      var ToDate = this.EndDate ? moment(this.EndDate).format('YYYY-MM-DD') : null
       this.flashdealService.GetTodayFlashDeal(this.WarehouseId,this.itemname,FromDate,ToDate).subscribe(result =>{
           
        this.flashdeallist =result;  
        for(var i in this.flashdeallist){
          this.flashdeallist[i].OfferStartTime = this.flashdeallist[i].OfferStartTime ? moment(this.flashdeallist[i].OfferStartTime).format('DD/MM/YYYY') : null
          this.flashdeallist[i].OfferEndTime = this.flashdeallist[i].OfferEndTime ? moment(this.flashdeallist[i].OfferEndTime).format('DD/MM/YYYY') : null
          }    
         console.log (this.flashdeallist + 'gfdg')
       })

    }
  convertSearchData() {
    let data = {
      WarehouseId: this.WarehouseId,
      StartDate: this.StartDate ? new Date(this.StartDate) : null,
      EndDate: this.EndDate ? new Date(this.EndDate) : null, 
       
      
      
       
    };
    return data;
  }

  

}

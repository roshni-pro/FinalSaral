import { SectionItem } from './../../SectionItem';
import { AppHomeService } from 'app/shared/services/appHome.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flash-deal',
  templateUrl: './flash-deal.component.html',
  styleUrls: ['./flash-deal.component.scss']
})
export class FlashDealComponent implements OnInit, OnChanges {

  @Input() mainimage: any;
  @Input() indexOfItem: any;
  @Input() BaseCategories: any;
  @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @Input() j: any;
  @Input() showMobileView: any;
  @Input() currentToggleIndex: any;
  @Input() RedirectionID: any;
  @Output() addNewSection = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() removeTile = new EventEmitter();
  MoqList = [];

  constructor(private appphomeservice: AppHomeService) { }

  ngOnInit() {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.MoqList=[];
    simpleChanges && simpleChanges.RedirectionID && simpleChanges.RedirectionID.currentValue ?
      this.appphomeservice.getMOQByItemId(simpleChanges.RedirectionID.currentValue).subscribe(result => {
        this.MoqList = result;     
     console.log( this.MoqList);
      })



      : ''
    
      
  }

  MOQprice(){
    this.MoqList.forEach(el=>{
      if(el.MinOrderQty==this.mainimage.MOQ){
        this.mainimage.UnitPrice=el.UnitPrice;
        this.mainimage.PurchasePrice=el.PurchasePrice;
        this.mainimage.SellingSku=el.SellingSku;
        this.mainimage.MRP=el.MRP;
      }
    })
  }


  Add(){
    if(this.mainimage.MOQ &&this.mainimage.FlashDealQtyAvaiable && this.mainimage.FlashDealMaxQtyPersonCanTake){
      if(this.mainimage.MOQ){
        if(this.mainimage.FlashDealQtyAvaiable%this.mainimage.MOQ!=0){
          Swal.fire("total quantity must be multiple of moq")
        }
  
        if(this.mainimage.FlashDealMaxQtyPersonCanTake%this.mainimage.MOQ!=0){
          Swal.fire("maximum quantity must be multiple of moq")
        }
        
      }
    }
    else{
      Swal.fire("please fill valid details")
    }
  }
 
}

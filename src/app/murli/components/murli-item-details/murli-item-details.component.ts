import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'app/shared/services/item.service';
import { MurliService } from 'app/shared/services/murli.service';
import { ItemMasterService } from 'app/shared/services/item-master.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
@Component({
  selector: 'app-murli-item-details',
  templateUrl: './murli-item-details.component.html',
  styleUrls: ['./murli-item-details.component.scss']
})
export class MurliItemDetailsComponent implements OnInit {

    constructor(private messageService:MessageService,private itemService: ItemService,private murliService: MurliService,private itemmasterservice:ItemMasterService,private router : Router, private modalService: NgbModal,
      private route: ActivatedRoute) { }
      startDate:any;
      endDate:any;
      closeResult: string;
      isopen : boolean
      @Input() WarehouseId: number; 
      cols2: any[];
      loading: boolean;
      totalRecords: number;
      pageSize: number;
      selectedRow : any;
      selectedRowDetails: any;
      ItemList : any;
      cols: any[];
      isDetails:boolean;
      warehouseId:any;
      data:any;
      concateItems:any;
      language:string;
      convertItemDetails:any;
      itemName:any;
      hindiText:any;
      warehouseItemList:any[];
      itemDetails:any;
      fromDate:any;
      ToDate:any;
      example:string='<speak>शॉपकिरणा लाये है आप के लिए आकर्षक उपहार<break time="3s"/>. <say-as interpret-as="cardinal">१००० </say-as>रुपये की खरीद पर पाइये १० रुपये की छूट. धन्यवाद  </speak>' 
    ngOnInit() {
      this.startDate=null;
      this.endDate=null;
      this.language='hi';
      this.WarehouseId = Number(this.route.snapshot.paramMap.get("WarehouseId"));
        this.isDetails = false;
         this.cols = [
           { field: 'MurliItemId', header: 'Id' },
           { field: 'itemname', header: 'Item Name' },
           { field: 'Number', header: 'Item Number' },
           { field: 'MRP', header: 'MRP' },
           { field: 'UnitPrice', header: 'Unit Price' },
          ];
     
     this.murliService.GetWarehousedata(this.WarehouseId).subscribe(result=>{
       console.log("WarehouseId",this.WarehouseId);
       this.ItemList=result;
       this.concateItems=[];
       for(var i=0;i<this.ItemList.length;i++){
        this.concateItems  +=  this.ItemList[i].itemname; 
       }
     });
    }
    addItems(){
      if(this.itemDetails==undefined ){
        this.messageService.add({ severity: 'error', summary: 'Please select  any Item!', detail: '' });
      }else{
      this.murliService.PostMurliItem(this.itemDetails.ItemId).subscribe(result => {
        this.ItemList=result;
        this.messageService.add({ severity: 'success', summary: 'Add Successfully!', detail: '' });
        this.ngOnInit()
      });
    }
    }
    remove(data){
      this.murliService.DeleteItemdata(data.MurliItemId).subscribe(result=>{
        console.log("WarehouseId",this.WarehouseId);
         this.ItemList=result;
         this.messageService.add({ severity: 'success', summary: 'Remove Successfully!', detail: '' });
       
       });

    }
  
    convertHindi  (){
      if(this.concateItems==undefined && this.concateItems==null){
        this.messageService.add({ severity: 'error', summary: 'Please enter murli text!', detail: '' });
      }else{

      this.murliService.ConvertItemdata(this.concateItems,this.language,this.WarehouseId).subscribe(result=>{
        this.hindiText=result;
        this.messageService.add({ severity: 'success', summary: 'Convert Hindi Successfully!', detail: '' });
      });
    }

    }
    convertAudio  (){
      
     if(this.startDate!=null && this.endDate!=null){
      this.fromDate = this.startDate ? moment(this.startDate).format('MM/DD/YYYY') : null
      this.ToDate = this.endDate ? moment(this.endDate).format('MM/DD/YYYY') : null
      if(this.fromDate== this.ToDate){
     
      this.startDate = this.startDate ? moment(this.startDate).format('MM/DD/YYYY HH:mm:ss') : null
      this.endDate = this.endDate ? moment(this.endDate).format('MM/DD/YYYY HH:mm:ss') : null
      
      if(this.startDate<this.endDate){
         
      if(this.hindiText==undefined && this.hindiText==null){
        this.messageService.add({ severity: 'error', summary: 'Please enter  hindi text!', detail: '' });
      }else{
       this.murliService.ConvertAudio(this.hindiText,this.WarehouseId,this.startDate,this.endDate).subscribe(result=>{
         
         if(result.Deleted==true){
        
         this.messageService.add({ severity: 'error', summary: 'Already add for this time Murli audio!', detail: '' });

        }else{
        this.convertItemDetails=result;
        this.router.navigateByUrl("layout/murli/murli");
      }
        //this.messageService.add({ severity: 'success', summary: 'Convert Audio Successfully!', detail: '' });
       
      });
    }
  }else{

    this.messageService.add({ severity: 'error', summary: 'Please enter to date greater than from date!', detail: '' });
  }
  }else{
    this.messageService.add({ severity: 'error', summary: 'Please select same  Date!', detail: '' });

  }
    }else{

      this.messageService.add({ severity: 'error', summary: 'Please select Date!', detail: '' });
    }

    }
    getItemList(event) {
      if (event.query.length > 2) {
        this.murliService.GetWarehouseItem(event.query,this.WarehouseId)
          .subscribe(result => {
            this.warehouseItemList=result;
            console.log('this.warehouseItemList :', this.warehouseItemList);
          });
      }
  
    }
    
  }

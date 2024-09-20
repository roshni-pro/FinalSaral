import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemBarcodedDc } from 'app/item/interface/item-barcoded-dc';
import { ItemService } from 'app/shared/services/item.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-batch-code',
  templateUrl: './add-batch-code.component.html',
  styleUrls: ['./add-batch-code.component.scss']
})
export class AddBatchCodeComponent implements OnInit {
  @Input() details: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  itemBarcodedDc : ItemBarcodedDc;
  itembarcodeList : any;
  isAdd : boolean = false;
  barCodeData : any; 
  blocked: boolean = false;
  isInvalid : boolean = false;
  constructor(private itemService : ItemService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { this.barCodeData = {};}

  ngOnInit() {
    this.blocked = true;
    this.itemService.getItemBarcodes(this.details.Number).subscribe(x=>{
      this.blocked = false;
      this.itembarcodeList = x;
    })
  }
  onAddBarCode(){      
    this.barCodeData = [];
    this.isInvalid = false;
    this.barCodeData.IsActive = true;
    this.isAdd = true;
  }
  onSaveBarCode(){
    if(this.barCodeData.Barcode != null){
      this.barCodeData.Barcode = this.barCodeData.Barcode.replace(/\s/g, '');
      if(this.barCodeData.Barcode.length >= 8){
        this.isInvalid = false;
        this.blocked = true;
      this.itemBarcodedDc={
        Id : 0,
        Barcode : this.barCodeData.Barcode,
        IsActive : true,
        ItemNumber : this.details.Number
      }
      this.itemService.addItemBarcode(this.itemBarcodedDc).subscribe(x=>{
        this.blocked = false;
        if(x == true)
        {
          this.isAdd = false;
          this.ngOnInit();
        }else{
          this.messageService.add({ severity: 'error', summary: 'Already Exists!!!', detail: '' });         
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Barcode should be atleast 8 digits!!!', detail: '' });     
      this.isInvalid = true;  
    }
      }else{
          alert('Enter Barcode!');
      }
  }

  onClose(){
    this.barCodeData=[];
    this.isAdd = false;
  }

  onDelete(rowData){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.itemService.DeleteItemBarcodes(rowData.ItemNumber, rowData.Barcode).subscribe(res=>{
          console.log(res);
            this.ngOnInit();
              },
              err=>{
                  alert("Error - Please Try again");
              })
          },
          reject: () => {
              this.ngOnInit();
          }
        });
  }
  onGenerateBarCode(){
    this.blocked = true;
    this.itemService.generateBarcode(this.details.Number).subscribe(x=>{
      this.blocked = false;
      if(x == true)
      {
        this.ngOnInit();
      }else{
        this.messageService.add({ severity: 'error', summary: 'Already Exists!!!', detail: '' });         
      }
    })
  }
}

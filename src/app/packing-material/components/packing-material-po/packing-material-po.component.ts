import { Component, OnInit, ViewChild } from '@angular/core';
import { PackingMaterialService } from 'app/shared/services/packing-material.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { rejects } from 'assert';
import { Table } from 'primeng/table';
import { first, last } from 'rxjs/operators';

@Component({
  selector: 'app-packing-material-po',
  templateUrl: './packing-material-po.component.html',
  styleUrls: ['./packing-material-po.component.scss']
})
export class PackingMaterialPOComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  isAddPo : boolean = false;
  cols : any;
  MaterialPOList:any;
  RemainingQTy : any;
  file : any;
  imagePath:any;
  imgURL : any;
  invoiceImage : any;
  RecivedQTy : any;
  isGRApproval : boolean = false;
  packingID : any;
  totalRecords :any;
  constructor(private packingmaterialService : PackingMaterialService ,private confirmationService : ConfirmationService , private messageService : MessageService) { }

  ngOnInit() {
    this.cols = [
      { field: 'PackingId', header: 'PackingId' },
      { field: 'BagName', header: 'BagName' },
      { field: 'SupplierName', header: 'SupplierName' },
      { field: 'UnitOfMeasurement', header: 'UnitOfMeasurement' },
      { field: 'Quantity', header: 'Quantity' },
      { field: 'UnitPrice', header: 'UnitPrice' },
      { field: 'TotalPrice', header: 'TotalPrice' },
      { field: 'GRReceivedQuantity', header: 'ReceivedQTY' },
    ]
   
  }
  load(event){
    
    var First = event.first + 1;//(event.first == 0 || event.first) ? event.first  : 0;
    var Last = event.rows ? event.first + event.rows : 3;

    this.packingmaterialService.GetPackingMaterialPoList(First,Last).subscribe(result=>{
      
      console.log(result);
      this.MaterialPOList = result.ListGetPackingMaterialDetails;
      this.totalRecords = result.TotalCount 
      
    })

  }

  AddPo(){
    this.isAddPo = true;
  }
  isdetailsclose(){
    this.isAddPo = false;
    this.isGRApproval = false;
    // this.ngOnInit();
    this.dataTableComponent.reset();
  }
  gr(row){
    
    this.RemainingQTy = row.Quantity - row.GRReceivedQuantity;
    var pk = row.PackingId;
    var unitPrice = row.UnitPrice;
    console.log(pk)
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.file && this.RecivedQTy) {
          let formData = new FormData();
          formData.append('file', this.file[0])
          formData.append('Quantity', this.RecivedQTy);
          formData.append('PackageId', pk);
          formData.append('UnitPrice', unitPrice);
         var a = formData.get('file');
         var b = formData.get('Quantity');
         var c = formData.get('PackageId');
         console.log(a)
         console.log(b)
         console.log(c)
          this.packingmaterialService.InsertGRPackingMaterial(formData).subscribe(result=>{
            console.log(result);
            this.messageService.add({ severity: 'success', summary: "Good Recived", detail: '' });
            this.RecivedQTy = null;
            this.imgURL = null;
            this.file = [];
            this.imagePath = null;
            this.dataTableComponent.reset();
           

          },(err)=>{
            this.messageService.add({ severity: 'error', summary: "error", detail: '' });
          })
        }


      },
      reject:() => {
        this.RecivedQTy = null;
        this.imgURL = null;
        this.file = [];
        this.imagePath = null;
        this.dataTableComponent.reset();
      }
    });
  }
  
  open(row){
    console.log(row);
    this.packingID = row.PackingId;
    this.isGRApproval = true;

  }

  upload(file: File[]) {
    
      this.file = file;
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
      (success) => {
        alert("image uploaded successfully")
  
      };
  
  
    }

    uploadImage(){
      
        if (this.file) {
          let formData = new FormData();
          formData.append('file', this.file[0])
          console.log(formData);
        }
    
    

   }
  
}

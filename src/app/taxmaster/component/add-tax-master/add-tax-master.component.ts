import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaxMasterService } from 'app/shared/services/tax-master.service';
import { Router } from '@angular/router';
import * as moment from 'moment'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-tax-master',
  templateUrl: './add-tax-master.component.html',
  styleUrls: ['./add-tax-master.component.scss']
})
export class AddTaxMasterComponent implements OnInit {
  @Input() TaxID : any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  taxMaster : any
  constructor(private taxMasterService:TaxMasterService,private router:Router,private messageService: MessageService) { this.taxMaster = {}}

  ngOnInit() {

    this.isInvalid = false;
      if(this.TaxID){
        this.taxMaster = this.TaxID;
        
      }


  }

  onclick(taxmasterForm:any){
    console.log('taxmasterForm: ', taxmasterForm);
    if (taxmasterForm.form.status == "VALID") {
    if(this.TaxID == null){
      this.taxMaster.CreatedDate = moment( this.taxMaster.CreatedDate , "DD/MM/YYYY");
      this.taxMasterService.addTaxMaster(this.taxMaster).subscribe(result => {
      this.router.navigateByUrl('/layout/taxmaster/taxmaster');
        this.messageService.add({severity:'success', summary: 'Save Successfully!', detail:''});
  
       // this.refreshParent.emit(false);
       // this.router.navigateByUrl('/layout/taxmaster/taxmaster');
       // this.expanded = false;
      },
      (err)=>{
        
        this.messageService.add({severity:'success', summary: 'error!', detail:''});
     
      });
    }else{
      this.taxMaster.CreatedDate = moment( this.taxMaster.CreatedDate ,"DD/MM/YYYY");
      this.taxMasterService.UpdateTaxMaster(this.taxMaster).subscribe(result => {
        console.log(this.taxMaster);
        this.refreshParent.emit(false);
        this.messageService.add({severity:'success', summary: 'Saveee Successfully!', detail:''});
        
      //  this.router.navigateByUrl('/layout/taxmaster/taxmaster');
       this.refreshParent.emit(false);
       // this.expanded = false;
      },
      (err)=>{
        
        this.messageService.add({severity:'success', summary: 'error!', detail:''});
      });
    }
  }else{
    this.isInvalid = true;
    this.messageService.add({severity:'success', summary: 'error!', detail:''});
  }
 
}
onCancel(){
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/taxmaster/taxmaster');
  }

}

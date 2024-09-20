import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaxGroupService } from 'app/shared/services/tax-group.service';
import { Router } from '@angular/router';
import { TaxMasterService } from 'app/shared/services/tax-master.service'
import { MessageService } from 'primeng/api';
import * as moment from 'moment'
import { resolveAny } from 'dns';

@Component({
  selector: 'app-add-tax-group',
  templateUrl: './add-tax-group.component.html',
  styleUrls: ['./add-tax-group.component.scss']
})
export class AddTaxGroupComponent implements OnInit {
  @Input() GruopID: any
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  taxGroup: any
  taxList: any
  isInvalid: boolean;
  expanded: boolean;
  taxgroupdetail : any;
  taxgroups : any;
  taxgroupss : any;
  taxgroup : any[];
  TaxID : any;
  taxdetail : any;
  constructor(private taxGroupService: TaxGroupService, private taxservice: TaxMasterService, private router: Router, private messageService: MessageService) { this.taxGroup = {} }

  ngOnInit() {
    // if(this.GruopID){
    //   this.taxGroupService.GetByID(this.GruopID).subscribe(result => {
    //     this.taxGroup = result;
    //    console.log('taxgroup'+this.taxGroup);

    //   })
    //   }    
    this.isInvalid = false;

    if (this.GruopID) {
      this.taxGroup = this.GruopID;

    }


    this.taxservice.GetAllTaxMaster().subscribe(result => {
      
      this.taxList = result;
// console.log('result TaxID' ,result[0].TaxID);
    })

    if (this.GruopID) {
      this.taxGroup = this.GruopID;

    }
  }




  onclick(taxgroupForm: any) {
    console.log('taxgroupForm: ', taxgroupForm);
    if (taxgroupForm.form.status == "VALID") {
      if (this.GruopID == null) {
        console.log(this.taxGroup);
       // console.log('');
        this.taxGroup.CreatedDate = moment(this.taxGroup.CreatedDate, "DD/MM/YYYY");
        this.taxGroupService.addTaxGroup(this.taxGroup).subscribe(result => {
          
          this.taxgroup= result;
          if(result.GruopID != 0){      
            
            // this.taxgroup.forEach(item => {
              this.taxgroupss =[];
               this.taxgroups = {                 
                  GruopID : result.GruopID,            
                  TaxID : this.taxdetail,

                }              
                this.taxgroupss.push(this.taxgroups);
                this.taxGroupService.addTaxGroupDetail(this.taxgroupss).subscribe(result => {
                  
                  this.taxgroupdetail = result;
                  console.log('taxgroupdetail', result);
                });
                
              //});
            }
            // this.taxGroupService.addTaxGroupDetail(this.taxdetail).subscribe(result => {
            //   
            //   this.taxgroupdetail = result;
            //   console.log('taxgroupdetail', result);
            // });

            this.router.navigateByUrl('/layout/taxmaster/taxgroup');//Ridz
          this.messageService.add({ severity: 'success', summary: 'Save Successfully!', detail: '' });
          
          // this.router.navigateByUrl('/layout/taxmaster/taxgroup');//pz
          // this.expanded = false;
        },
          (err) => {
            alert("error")
            this.messageService.add({ severity: 'success', summary: 'error!', detail: '' });
          });
      } else {
        this.taxGroup.CreatedDate = moment(this.taxGroup.CreatedDate, "DD/MM/YYYY");
        this.taxGroupService.PutTax(this.taxGroup).subscribe(result => {
          console.log(this.taxGroup);
        
          this.refreshParent.emit();
          this.messageService.add({ severity: 'success', summary: 'Save Successfully!', detail: '' });
        
          
         
          // this.router.navigateByUrl('/layout/taxmaster/taxgroup');//pz

    
        },
          (err) => {
            alert("error")
            this.messageService.add({ severity: 'success', summary: 'error!', detail: '' });

          });
      }
    } else {
      this.isInvalid = true;
    }


  }

  onsearch(tax){
    
    this.taxGroup.TaxName = [];
    this.taxdetail =tax;

    if(this.taxdetail && this.taxdetail.length > 0){
      this.taxGroup.TaxName = this.taxdetail.filter(x => {return x.Selected == true}) 
    }
    this.TaxID = tax.TaxID;
    console.log('tax.TaxID; ::: ',tax.TaxID);
  }

  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/taxmaster/taxgroup');
  }
}
import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { LedgerConfigurationHeplerService } from 'app/shared/services/ledger-configuration/ledger-configuration-hepler.service';
import { LedgerConfigurationService } from 'app/shared/services/ledger-configuration/ledger-configuration.service';
import { AccountLedgerTypeService } from 'app/shared/services/ledger-configuration/account-ledger-type.service';
import { LadgerService } from 'app/shared/services/ladger.service';
import { LedgerConfigurationMasterVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-master-vm';
import { LedgerConfigurationDetailsVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-details-vm';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LedgerConfigurationParameterVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-parameter-vm';
import { LedgerConfigurationMasterConditionVM } from 'app/shared/interface/ledger-configuration/ledger-configuration-master-condition-vm';
import { Router } from '@angular/router';
@Component({
  selector: 'app-developer-configuration',
  templateUrl: './developer-configuration.component.html',
  styleUrls: ['./developer-configuration.component.scss']
})
export class DeveloperConfigurationComponent implements OnInit {
  @Output() isdetailsclose = new EventEmitter<boolean>();
  ledgerConfigurationMaster: LedgerConfigurationMasterVM;
  editableLedgerConfigurationDetail: LedgerConfigurationDetailsVM;
  isEditDeveloperConfiguration: boolean;
  ledgerConfigurationParameters: LedgerConfigurationParameterVM;
  ledgerConfigurationMasterConditions: LedgerConfigurationMasterConditionVM;
  isEditConditionDeveloperConfiguration:boolean;
  IsEditModeShow: boolean;
  isInvalid: boolean;
  isOpenPopup: boolean;
  isOpenPopupUpdate: boolean;
  Id:any;
  ledgerConfigurationRemoveParameters: LedgerConfigurationParameterVM;
  ledgerConfigurationDetails:any;
  ledgerConfigurationParameter:any
  constructor(private ledgerConfigurationHelperService: LedgerConfigurationHeplerService,
    private ledgerConfigurationService: LedgerConfigurationService,
    private accountLedgerTypeService: AccountLedgerTypeService,
    private ledgerService: LadgerService,
    private messageService: MessageService,
    private router:Router,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {

    this.intializeparameter();
    this.intializecondition();
    this.isInvalid = false;
    this.IsEditModeShow = false;
    this.isEditDeveloperConfiguration = false;
    this.isEditConditionDeveloperConfiguration=false;
    this.ledgerConfigurationHelperService.ledgerConfigurationMaster.subscribe(x => {
      
      this.ledgerConfigurationMaster = x;
      console.log('this.ledgerConfigurationMaster: ', this.ledgerConfigurationMaster);
    });
  }

  edit(detail: LedgerConfigurationDetailsVM) {
    
    this.editableLedgerConfigurationDetail = detail;
    this.isEditDeveloperConfiguration = true;
    
    this.isOpenPopup = true;

  }
  updateEntity() {
    this.ledgerConfigurationService.updateEntityName(this.ledgerConfigurationMaster).subscribe(x => {
      this.ledgerConfigurationMaster = x;
      this.messageService.add({ severity: 'success', summary: 'Successfully update Entity Nmae!', detail: '' });
      this.ngOnInit();
    });

  }
  addparam(row) {
    
    if (row.ParameterName == null || row.ParameterName=="" ) {
      this.messageService.add({ severity: 'error', summary: 'Please enter Parameter Name!', detail: '' });
    } else if (row.PropertyName == null || row.PropertyName=="") {
      this.messageService.add({ severity: 'error', summary: 'Please enter Property Name!', detail: '' });
    } else {
      this.ledgerConfigurationParameters = row;
      this.ledgerConfigurationParameters.IsShowAdd = false;
      this.ledgerConfigurationParameters.LedgerConfigurationDetailId = this.editableLedgerConfigurationDetail.Id;
      this.ledgerConfigurationService.addParamEntry(this.ledgerConfigurationParameters).subscribe(x => {
        
        this.ledgerConfigurationParameters = x;
        this.ledgerConfigurationRemoveParameters= this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.filter(x=>x.Id==0)[0];
        
        this.editableLedgerConfigurationDetail.ledgerConfigurationParameters = this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.filter(x=> x.Id!=0);
        
        //  this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.pop( this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.filter(x=>x.Id==0)[0]);
        this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.push( this.ledgerConfigurationParameters);
        this.edit(this.editableLedgerConfigurationDetail);
        this.messageService.add({ severity: 'success', summary: 'Successfully update Parameter data!', detail: '' });

      });

    }

  }
  editMode(row) {
    
    this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.forEach(paramdata => {
      if (row.Id == paramdata.Id) {
        paramdata.IsShowAdd = true;
      }

    });
  }

  addNNewParam() {
    
    this.intializeparameter();
    this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.splice(0, 0, this.ledgerConfigurationParameters);
    this.editableLedgerConfigurationDetail.ledgerConfigurationParameters[0].IsShowAdd = true;
  }

  save(detailForm:any){
      
    if (detailForm.form.status == "VALID") {
      if ( this.editableLedgerConfigurationDetail.IsSPUsed) {
        if (this.editableLedgerConfigurationDetail.SPName == null) {
          this.messageService.add({ severity: 'error', summary: 'Please enter your SP!', detail: '' });
          return;
        }
        if ( this.editableLedgerConfigurationDetail.IsPublished) {
          
        }
      }else if(this.editableLedgerConfigurationDetail.Query==null){
        this.messageService.add({ severity: 'error', summary: 'Please enter your Query!', detail: '' });
        return;
      }
      this.ledgerConfigurationService.saveDetails(this.editableLedgerConfigurationDetail).subscribe(x => {
        this.editableLedgerConfigurationDetail=x;
        console.log("x:" , x);
        
         this.isOpenPopup = false;
         this.editableLedgerConfigurationDetail=x;
         this.isEditDeveloperConfiguration = false;
        // this.isOpenPopupUpdate = false;
        this.isdetailsclose.emit(false);
        
       // this.router.navigateByUrl('layout/ledgerconfiguration/ledgerconfigurationdetails/' + this.ledgerConfigurationMaster.Id);
        this.messageService.add({ severity: 'success', summary: 'Ledger Configuration Master Add Successfully!', detail: '' });
      
   
      });
    
    } else {
      this.isInvalid = true;

    }
    
  }
  intializeparameter(){
    this.ledgerConfigurationParameters = {
      Id: 0,
      LedgerConfigurationDetailId: 0,
      ClassName: null,
      ParameterName: null,
      PropertyName: null,
      IsShowAdd: false

    }

  }

  editcondition(Id: any) {
    
    this.ledgerConfigurationMasterConditions= this.ledgerConfigurationMaster.ledgerConfigurationMasterConditions.find(x=>x.Id==Id);
    this.isEditConditionDeveloperConfiguration=true;

  }
  addCondition(){
    this.intializecondition();
    this.isEditConditionDeveloperConfiguration=true;
  }
  saveCondition(conditionForm:any){
    
    if (conditionForm.form.status == "VALID") {
      this.ledgerConfigurationMasterConditions.LedgerConfigurationMasterId=this.ledgerConfigurationMaster.Id;
      this.ledgerConfigurationService.saveCondition(this.ledgerConfigurationMasterConditions).subscribe(x => {
        this.ledgerConfigurationMasterConditions=x;
      
        this.messageService.add({ severity: 'success', summary: 'Successfully update Condition data!', detail: '' });
        this.isEditConditionDeveloperConfiguration=false;
      });
    
    }else {
      this.isInvalid = true;

    }


  }
  intializecondition(){
    this.ledgerConfigurationMasterConditions={
    Id: 0,
    LedgerConfigurationMasterId:0,
    PropertyName: null,
    PropertyType: null,
    OldValue: null,
    NewValue: null,
    OtherValue: null,
    Operator: '',    // EqualTo  LessThanEqualTo  GreaterThanEqualTo  LessThan  GreaterThan
    MergeOperator: null,
    IsOtherValue: false,
    IsOldValueAnything: false,
    IsActive:false,
    CreatedBy:0
    }
}

DeleteParam(row)
{
  
     this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.editableLedgerConfigurationDetail.ledgerConfigurationParameters.forEach(paramdata => {
          if (row.Id == paramdata.Id) {
            this.ledgerConfigurationService.delete(row.Id).subscribe(result => {
              this.ledgerConfigurationMaster = row;
              
              this.isEditDeveloperConfiguration = false;
              // this.isOpenPopupUpdate = false;
              this.messageService.add({ severity: 'success', summary: 'Ledger parameters deleted Successfully!', detail: '' });
              this.ngOnInit();
              this.isdetailsclose.emit(false);
              // window.location.reload()
              
             //this.router.navigateByUrl('layout/ledgerconfiguration/ledgerconfigurationdetails/' + this.ledgerConfigurationMaster.Id);
           
            
          
          })
          
        }
        });

    


}

})
}
}

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HistoryService } from 'app/shared/services/history.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild('table', { static: false }) table: ElementRef;
  @Input() entity : any;
  @Input() id : any;
  EntityHistory: any;
  isHistory : any
  exportBtnHide : boolean = false;
  statusPicker : any;
  statusField : any[]=[];
  FieldName : any;
  NewValue : any;
  OldValue : any;
  // @Input() dHistory : any 
  StateHistory:boolean=false
  PriorityWarehouseStore:boolean=false;
  constructor(private historyService : HistoryService , private exportService : ExportServiceService,private salesApp: SalesAppServiceService
    ,private warehouseService: WarehouseService
  ) { this.EntityHistory = {} }
  StoreList:any
  ngOnInit() {
    if(this.entity == 'ForecastInventoryDay' )
    {
      debugger;
      this.StateHistory=true
      this.isHistory=false
      this.historyService.getHistory(this.entity , this.id).subscribe(result => {
        debugger;
        console.log("ewfrewf",result);
        this.EntityHistory = result;
        var pass:any[]=[];
        if(result.FieldNames)
        {
          result.FieldNames.forEach(x=>{   
          if( x== "InventoryDays" ){ pass.push(x); }
        })
      }
       this.EntityHistory.FieldNames=pass
       for(var k in this.EntityHistory.AuditHistory)
        {
         this.statusPicker = this.EntityHistory.AuditHistory[k];
           var statusFields = this.statusPicker.AuditFields
            var data=statusFields.filter(x=>{ 
             return  ( x.FieldName=="InventoryDays" )  
            })
            this.statusField.push(data);
        }
      })
      return false;
    }

    else if(this.entity == 'State' )
    {
      debugger;
      this.StateHistory=true
      this.isHistory=false
      this.historyService.getHistory(this.entity , this.id).subscribe(result => {
        debugger;
        console.log("ewfrewf",result);
        this.EntityHistory = result;
        var pass:any[]=[];
        result.FieldNames.forEach(x=>{   
          if( x== "StateName" ){ pass.push(x); }
          if( x==  "IntrastateAmount" ){ pass.push(x); }
          if( x==  "InterstateAmount"){  pass.push(x);  }
        })
       this.EntityHistory.FieldNames=pass
       for(var k in this.EntityHistory.AuditHistory)
        {
         this.statusPicker = this.EntityHistory.AuditHistory[k];
           var statusFields = this.statusPicker.AuditFields
            var data=statusFields.filter(x=>{ 
             return  ( x.FieldName=="InterstateAmount" ||  x.FieldName=="IntrastateAmount" || x.FieldName=="StateName")   
            })
            this.statusField.push(data);
        }
        // console.log("final",this.statusField)
        // console.log(this.EntityHistory.AuditHistory)
      })
      return false;
    }
    else if(this.entity=="PriorityWarehouseStore"){
      this.StateHistory=false
      this.isHistory=true
      this.historyService.getHistory(this.entity , this.id).subscribe(result => {
        debugger;
        this.salesApp.GetStoreList().subscribe(data => {
          this.warehouseService.getWarehouseCommon().subscribe((WareRes:any) => {          
          this.StoreList=data;
          console.log("ewfrewf",result);
          this.isHistory = true;
          this.EntityHistory = result;
          if(this.entity == 'PriorityWarehouseStore')
            {
            for(var k in this.EntityHistory.AuditHistory)
              {
                this.statusPicker = this.EntityHistory.AuditHistory[k];
                for(var j in this.statusPicker)
                  {
                    WareRes.forEach(e => {
                      
                      this.StoreList.forEach(data => {
                        this.statusField = this.statusPicker.AuditFields;
                        this.FieldName = this.statusField[7].FieldName;
                        this.NewValue = this.statusField[7].NewValue;
                        this.OldValue = this.statusField[7].OldValue;
                        if(data.Id==this.statusField[7].NewValue){
                          this.statusField[7].NewValue=(data.Name);
                        }
                      })                
                      if(e.value==this.statusField[8].NewValue){
                        this.statusField[8].NewValue=(e.label);
                      }
                    });
                  }
                }
                console.log(this.statusField);
                
              }
            })
          })
              // var pass:any[]=[];
              // result.FieldNames.forEach(x=>{  
        //   if( x== "User" ){ pass.push(x); }
        //   if( x== "Audit Timestamp" ){ pass.push(x); }
        //   if( x== "IsActive" ){ pass.push(x); }
        //   if( x==  "IsDeleted" ){ pass.push(x); }
        //   if( x==  "ModifiedBy"){  pass.push(x);  }
        //   if( x==  "ModifiedDate"){  pass.push(x);  }
        //   if( x==  "StoreConfigpercentage"){  pass.push(x);  }
        //   if( x==  "StoreId"){  pass.push(x);  }
        //   if( x==  "WarehouseId"){  pass.push(x);  }
        // })
        // this.EntityHistory.FieldNames=pass
        // var t = pass
        // this.statusPicker=[];
        // this.EntityHistory.FieldNames.forEach(k => {
        //   console.log("k",k);
        //   this.statusPicker.push(k);
        //   console.log("dsds",this.statusPicker);
        //     // var statusFields = this.statusPicker.AuditFields  
        //   });
        //   // var data=this.statusPicker.filter(x=>{ 
        //   //  ( x.FieldName=="User" ||  x.FieldName=="Audit Timestamp" || x.FieldName=="IsActive"|| x.FieldName=="IsDeleted"|| x.FieldName=="ModifiedBy"|| x.FieldName=="ModifiedDate"
        //   //  || x.FieldName=="StoreConfigpercentage"|| x.FieldName=="StoreId"|| x.FieldName=="WarehouseId")   
        //   // })
        //   // this.statusField=(this.statusPicker);
        //   // console.log(data);          
        //   console.log(this.statusField);
          
      })  
      return false;   
    }
    else{
      this.PriorityWarehouseStore=false;
      this.isHistory = true;
      if(this.entity == 'OrderPickerDetails' || this.entity == 'OrderConcern')
      {
        this.exportBtnHide = true;
      }
      this.historyService.getHistory(this.entity , this.id).subscribe(result => {
        debugger;
        console.log(result);
        
        if(result == null || result.AuditEntity == null){
          this.isHistory = false;
        }else{
          this.isHistory = true;
          this.EntityHistory = result;
          if(this.entity == 'OrderPickerDetails')
          {
            for(var k in this.EntityHistory.AuditHistory)
          {
            this.statusPicker = this.EntityHistory.AuditHistory[k];
            for(var j in this.statusPicker)
            {
            this.statusField = this.statusPicker.AuditFields;
            this.FieldName = this.statusField[10].FieldName;
            this.NewValue = this.statusField[10].NewValue;
            this.OldValue = this.statusField[10].OldValue;
             
              if(this.NewValue == 0 || this.OldValue == 0)
              {
                
                if(this.NewValue == 0)
                {
                  this.statusField[10].NewValue = 'No Action';
                }
                if(this.OldValue == 0)
                {
                  this.statusField[10].OldValue = 'No Action';
                }              
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker =  this.statusPicker.AuditFields;
              }
              
              if(this.NewValue == 1 || this.OldValue == 1)
              {
                
                if(this.NewValue == 1)
                {
                  this.statusField[10].NewValue = 'Picker Accept';
                }
                if(this.OldValue == 1)
                {
                  this.statusField[10].OldValue = 'Picker Accept';
                }     
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker =  this.statusPicker.AuditFields;
              }
              if(this.NewValue == 2 || this.OldValue == 2)
              {
                
                if(this.NewValue == 2)
                {
                  this.statusField[10].NewValue = 'Approver Approved';
                }
                if(this.OldValue == 2)
                {
                  this.statusField[10].OldValue = 'Approver Approved';
                }  
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker =  this.statusPicker.AuditFields;
              }
              if(this.NewValue == 3 || this.OldValue == 3)
              {
                
                if(this.NewValue == 3)
                {
                  this.statusField[10].NewValue = 'Picker Reject';
                }
                if(this.OldValue == 3)
                {
                  this.statusField[10].OldValue = 'Picker Reject';
                }  
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker =  this.statusPicker.AuditFields;
              }
              if(this.NewValue == 4 || this.OldValue == 4)
              {
                
                if(this.NewValue == 4)
                {
                  this.statusField[10].NewValue = 'Approver Reject';
                }
                if(this.OldValue == 4)
                {
                  this.statusField[10].OldValue = 'Approver Reject';
                }  
                this.statusPicker.AuditFields = this.statusField;
                this.statusPicker =  this.statusPicker.AuditFields;
              }
          }
        }
          }
        }
        
      })
    }
  }
onExport(){
  
      this.exportService.ExportToExcel(this.table,"history_data");
}

}

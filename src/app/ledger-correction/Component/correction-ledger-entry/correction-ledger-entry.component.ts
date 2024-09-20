import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api'
import { LedgerCorrectionService } from 'app/ledger-correction/Services/ledger-correction.service';
import {MessageService} from 'primeng/api';
import { isThursday } from 'date-fns';
@Component({
  selector: 'app-correction-ledger-entry',
  templateUrl: './correction-ledger-entry.component.html',
  styleUrls: ['./correction-ledger-entry.component.scss']
})
export class CorrectionLedgerEntryComponent implements OnInit {
  selectType:any;
  selectDataType:any;
  SKCODE:any;
  status:any=""
  addDataInTbl:any
  addDataInTb:Boolean=false
  ItemList:boolean=false
  selectedOrderId:number=0
  obj:any
  displayModal:boolean=false
  blocked:boolean=false
  showOrder:boolean=false
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private ledgerCorrectionServices:LedgerCorrectionService) { }

  ngOnInit() {
    this.ledgerCorrectionServices.getLedgerIsssueTypeList().subscribe(res=>
      {
        this.selectType = res;
      });
    this.GetData()
  }
  LedgerIsssue(selectDataType)
  {
    debugger
     this.showOrder=false
     console.log(selectDataType)
     if(selectDataType.LedgerIsssueTypeLabel=='Sales Exist But Receipt Not Exist')
     {
      this.showOrder=true
     }
     else if(selectDataType.LedgerIsssueTypeLabel=='Receipt Exist But Sales Not Exist')
     {
      this.showOrder=true
     }
  }
  orderIdd:number=0
showDialog() {
  this.displayModal = true;
  this.GetHistroyData()
}
  addData()
  {
    //debugger
    this.orderIdd=0
    // this.selectedOrderId=null
    if(this.selectDataType==null)
    {
     this.showError("Please Select Ledger Issue Type")
      return false
    }
    if(this.SKCODE==null)
    {
      this.showError("Please Enter SKCode")
      return false
    }
    if(this.selectDataType.LedgerIsssueTypeLabel=='Sales Exist But Receipt Not Exist')
    {
      this.orderIdd=this.selectedOrderId
    }
    else if(this.selectDataType.LedgerIsssueTypeLabel=='Receipt Exist But Sales Not Exist')
    {
      this.orderIdd=this.selectedOrderId
    }
    this.obj=
      {
        ActionType:this.selectDataType.LedgerIsssueTypeLabel,
        SkCode:this.SKCODE,
        orderId:this.orderIdd,
        Status:this.status,
      }
      console.log(this.obj);
    this.addDataInTbl.forEach(element => {
      if(element.SkCode == this.obj.SkCode && element.ActionType == this.obj.ActionType)
      {
        this.addDataInTb=true
      }
    });
   
  if(this.obj.Id == undefined && this.addDataInTb == false)
  {
    this.addDataInTbl.push(this.obj);
    this.showSuccess("Record Inserted")
    this.selectDataType=null
    this.SKCODE=null
    console.log(this.addDataInTbl,"addDataInTbl")
  }
  else
  {
 this.showError("Already Exist Record")
    this.addDataInTb=false
    this.SKCODE=null
    this.selectDataType=null
  }    
   }
   confirm1(obj,rowIndex) {
    console.log(obj,rowIndex);
    
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.Remove(obj,rowIndex)
        },
        reject: () => {
         
        }
    });
}

   Remove(obj,rowIndex)
   {
    debugger
    var data=[]
    if(obj.Id== undefined)
    {
      // this.addDataInTbl=this.addDataInTbl.filter(x=>x.Id!=obj.Id)
       this.addDataInTbl.forEach((element,index) => {
        if(index!=rowIndex)
        {
          data.push(element);
        }
      });
      this.addDataInTbl = data;
    }
    else
    {
      this.blocked=true
    this.ledgerCorrectionServices.DeleteLedgerData(obj.Id).subscribe(res=>
      {
        debugger;
        if(res==true)
        {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.showSuccess("Record Deleted")
          this.GetData()
        }
        this.blocked=false
        
      })
   }
  }

  saveData()
   {
   this.addDataInTbl.forEach(element => {
   if(element.Id == undefined ) 
   {
    this.ItemList=true
   }
  });
  if(this.ItemList == true)
  {
    this.blocked=true
  this.ledgerCorrectionServices.LedgerCorrectionSaveService(this.addDataInTbl).subscribe(res=>
    {
        console.log(res);
        if(res == true)
        {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.showSuccess("Data Saved SuccessFully")
          this.GetData()
          this.ItemList=false
          this.SKCODE=""
          this.selectDataType=""
          this.blocked=false
        }
    })
  }
  else
  {
  //  this.showError("Data Not Found")
  alert("No Data Found")
  }
  }
   GetData()
   {
    debugger
    this.blocked=true
    this.ledgerCorrectionServices.GetledgerData().subscribe(res=>
      {

        this.addDataInTbl=res
        this.blocked=false
        this.addDataInTbl.forEach(x=>
          {
            if(x.ActionType=='Sales Exist But Receipt Not Exist')
            {
              x.Combine=x.SkCode.split("~")
              x.orderId=x.Combine[0],
              x.SkCode=x.Combine[1]
            }
          })    
      })
     
   }
   showSuccess(msg:string) {
    this.messageService.add({severity:'success', summary: 'Success',detail:msg});
}
showError(msg:string) {
  this.messageService.add({severity:'error', summary: 'Error' ,detail:msg});
}
Process()
{
  debugger
  this.blocked=true
  this.ledgerCorrectionServices.GetProcessData().subscribe(res=>{
    console.log(res);
    this.blocked=false
    if(res!=null)
    {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.showSuccess("Process Done")
    }    
  })
}
histroyData:any
GetHistroyData()
{
  this.blocked=true
  this.ledgerCorrectionServices.GetHistroyledgerData().subscribe(res=>
    {
      console.log(res);
      this.histroyData=res
      this.blocked=false
      this.histroyData.forEach(x=>
        {
          if(x.ActionType=='Sales Exist But Receipt Not Exist')
          {
            console.log(x.SkCode,"SkCode");
            x.Combine=x.SkCode.split("~")
            x.orderId=x.Combine[0],
            x.SkCode=x.Combine[1]
          }
        })    
    })
}
 
}

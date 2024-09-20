import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-sales-app-checkout',
  templateUrl: './sales-app-checkout.component.html',
  styleUrls: ['./sales-app-checkout.component.scss']
})
export class SalesAppCheckoutComponent implements OnInit {
  addDataInTbl: any[] = [];
  comment: any;
  dataa:any;
  id:number=0;
  getData:any[];
  DataComments:any[]=[];
  showSave:boolean=false
  constructor(private SalesAppServiceService:SalesAppServiceService, private confirmationService:ConfirmationService, private messageService : MessageService ) { }

  ngOnInit() {
    this.getAllData();
  }

getAllData()
{
this.SalesAppServiceService.GetAllData().subscribe(x=>
  {
    this.addDataInTbl=x.Data;
    console.log(this.addDataInTbl);
    if(this.addDataInTbl != null)
    {
      this.showSave=true
    }
    
  })
}

showSuccessfull(msg: string) {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
}
showError(msg: string) {
  this.messageService.add({ severity: 'info', summary: 'info', detail: msg });

}
showerror(msg: string) {
  this.messageService.add({ severity: 'warn', summary: 'warn', detail: msg });

}
space(event) {
  if (event.target.selectionStart === 0 && event.code === 'Space') {
    event.preventDefault();
  }
}
DataComment : any[]=[];
flag:boolean=false
addData()
  {
    this.flag=false
    if(this.addDataInTbl)
    {
    this.addDataInTbl.forEach(x=>
      {
        //alert(typeof(x.Comment))
        if(x.Comment.toUpperCase()==this.comment.toUpperCase() || x.Comment.trim()==this.comment.trim() || x.Comment.toUpperCase().trim()==this.comment.toUpperCase().trim())
        {
          this.showError("Data Already Exists")
          console.log("ShowError");
          this.flag=true
          
          return false
        }
       
      }
      )
    }
    if(!this.flag)
    {
    const payload =
    {
      Id :this.id,
      Comment: this.comment,
      Sequence:0
    }
    console.log(payload,"Payload");
    if(this.addDataInTbl==null){
      this.addDataInTbl=[];
      this.addDataInTbl.push(payload);
    }else{
      this.addDataInTbl.push(payload);
      this.showSuccessfull("Data Added Successfully");
    }
    console.log("push",this.addDataInTbl);
    this.comment=null
    this.showSave=true
   
  }
  }

  saveData(event)
   {

     this.addDataInTbl.forEach((element:any,index) => {
      element.Sequence = index + 1;
    });
   console.log(this.addDataInTbl);
    this.SalesAppServiceService.getDataSave(this.addDataInTbl).subscribe(result => {
       console.log(result);
      //  alert("data saved successfully")
       this.showSuccessfull("Data Saved Successfully");
       this.getAllData();
      })
    
    }


  Remove(rowdata,indexs) {

  
    console.log(rowdata.Sequence,"ssf");
    if(rowdata.Id>0)
    {
    this.SalesAppServiceService.RemoveData(rowdata.Id).subscribe(res=>
      {
        if(res.Status)
        {
          this.addDataInTbl= this.addDataInTbl.filter(x=>x.Id!=rowdata.Id)
        }
        this.showError("Data Deleted Successfully")
        // alert("data deleted successfully") Data Deleted Successfully
      })
    }
    else{
      this.addDataInTbl.forEach((a,index)=>{
        if(index+1!=indexs)
        {
          this.DataComments.push(a);
          console.log(index);
        }
      })
      this.addDataInTbl = this.DataComments;
      this.DataComments =[]
      this.showerror("Data Deleted Successfully")
    }
    if(this.addDataInTbl.length == 0 || this.addDataInTbl == undefined)
    {
      this.showSave = false
    }
    //this.showerror("Data Deleted Successfully")
    //alert("data deleted successfully")
    console.log(this.addDataInTbl);

  }

}

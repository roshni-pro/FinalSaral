import { Component, OnInit } from '@angular/core';
import { RequestApproveService } from 'app/shared/services/request-approve.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-request-to-be-approved',
  templateUrl: './request-to-be-approved.component.html',
  styleUrls: ['./request-to-be-approved.component.scss'],
  providers: [MessageService]
})
export class RequestToBeApprovedComponent implements OnInit {

  lstData: any[];
  
  
  constructor(public requestapproveservice: RequestApproveService,private messageService: MessageService) { }

  ngOnInit() {
     this.requestapproveservice.GetRequests().subscribe(result => {
    
      this.lstData = result;
      if(this.lstData && this.lstData.length >0){
        this.lstData.forEach(item=>{
          console.log("item:", item);
          if(item.Statuses=="Approved By Head" || item.Statuses=="Rejected By Head")//rejectReson
          {
              
             item.ApproveDisabled=true;
          }
          else{
           
            item.ApproveDisabled=false;
          }
          if(item.Statuses=="Approved By Head" || item.Statuses=="Rejected By Head")//rejectReson
          {
             item.RejectDisabled = true; 
              
          }
          else{
            item.RejectDisabled = false;
            
          }
        })
      }
      console.log('requestapproveservice:', result);
    });
  }
   
  UpdateByHead(data){
     

  

     console.log(data);
     this.requestapproveservice.UpdateStatus(data).subscribe(result => {
    
      this.ngOnInit();
    
      
    });
  }
  RejctByHead(data){
 if(data.rejectReason=='' || data.rejectReason==null)
 {
      alert('Please Provide Reason For Rejection');
      return;  

 }

    console.log(data);
    this.requestapproveservice.RejectByHead(data).subscribe(result => {
   
     this.ngOnInit();
   
    });

  }
 
}




 

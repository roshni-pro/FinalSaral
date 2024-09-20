import { Component, OnInit } from '@angular/core';
import { RequestApproveService } from 'app/shared/services/request-approve.service';

@Component({
  selector: 'app-user-access-dapproved',
  templateUrl: './user-access-dapproved.component.html',
  styleUrls: ['./user-access-dapproved.component.scss']
  
})
export class UserAccessDApprovedComponent implements OnInit {
lstData:any[];
  constructor(public requestapproveservice: RequestApproveService) { }

  ngOnInit() {

    this.requestapproveservice.GetRequestsUAC().subscribe(result => {
    
      this.lstData = result;
      if(this.lstData && this.lstData.length >0){
        this.lstData.forEach(item=>{
         if(item.UACStatus=="Approved By UAC" || item.UACStatus=="Rejected By UAC")//rejectReson
          {
              
             item.ApproveDisabled=true;
          }
          else{
           
            item.ApproveDisabled=false;
          }
          if(item.UACStatus=="Rejected By UAC" || item.UACStatus=="Approved By UAC" )//rejectReson
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
    this.requestapproveservice.UpdateStatusUAC(data).subscribe(result => {
   
     this.ngOnInit();
     
   });
 }
 RejctByHead(data){
  if(data.rejctReasonUAC=='' || data.rejctReasonUAC==null)
  {
 alert('Please Provide Reason For Rejection');
return;
 
  }
   console.log(data);
   this.requestapproveservice.RejectByUAC(data).subscribe(result => {
  
    this.ngOnInit();
   });

 }

}

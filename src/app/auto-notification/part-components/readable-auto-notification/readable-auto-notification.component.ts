import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AutoNotificationHelperService } from 'app/shared/services/auto-notification/auto-notification-helper.service';
import { AutoNotification } from 'app/shared/interface/auto-notification/auto-notification';
import { AutoNotificationService } from 'app/shared/services/auto-notification/auto-notification.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-readable-auto-notification',
  templateUrl: './readable-auto-notification.component.html',
  styleUrls: ['./readable-auto-notification.component.scss']
})
export class ReadableAutoNotificationComponent implements OnInit {
  autoNotification: AutoNotification;
  @Output() refreshParent = new EventEmitter(); 
@Output() isdetailsclose = new EventEmitter<boolean>(); 
blocked : boolean;
isInvalid : boolean;
autoNotificationTitle : any;
  constructor(private autoNotificationHelperService: AutoNotificationHelperService, 
    private confirmationService: ConfirmationService,
    private autoNotificationService: AutoNotificationService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.autoNotificationHelperService.autoNotification.subscribe(x => {
      this.autoNotification = x;
    });

    
  }

  saveNotification(masterForm : any) {
        
     if (masterForm.form.status == "VALID") {
       
       if(this.autoNotification.AutoNotificationTitle == ""){
         
        this.messageService.add({severity:'error', summary: 'Please Fill the Required Fields!', detail:''});
       }else{
    this.confirmationService.confirm({
      message: 'Are you sure You Want to Save The Data Because After Updated You Cannot Edit?',
      accept: () => {
               
        this.blocked= true;
    this.autoNotificationService.SaveAutoNotification(this.autoNotification).subscribe(x => {
      this.blocked= false;
      console.log('x::',x);
      console.log('xAutoNotificationTitle::',x.AutoNotificationTitle);
      // if(x !="Data Already Exist"){
        
if(x.AutoNotificationTitle != null){
  
  setTimeout(() => {
   

      this.messageService.add({ severity: 'success', summary: 'Your Manage Auto-Notifiocation Request is Updated!', detail: '' });
      // this.showMap = true;
  }, 100);
  this.router.navigateByUrl('layout/auto-notification/autoNotificationList');
      // this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
      // }
      // this.messageService.add({ severity: 'success', summary: 'Your Manage Auto-Notifiocation Request is Updated!', detail: '' });
    }
    // else if(x){
    //   this.messageService.add({ severity: 'success', summary: 'Your Manage Auto-Notifiocation Request is Updated!', detail: '' });
    // }
    else{
        this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
        // this.messageService.add({severity:'error', summary: 'Please Fill the Required Fields!', detail:''});
      }
    
    });
  },
  reject: () => {
    this.blocked= true;
    this.blocked= false;
    this.messageService.add({ severity: 'error', summary: 'Your Manage Auto-Notifiocation Request is Canceled!', detail: '' });

  }
  });
} 
}else {
  this.isInvalid = true;
  this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
}
}


onCancel() {
  this.isdetailsclose.emit(false);
  this.router.navigateByUrl('layout/auto-notification/autoNotificationList');

}

}

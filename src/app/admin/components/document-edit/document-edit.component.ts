import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import { DocumentService } from 'app/shared/services/document.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
  @Input() DocumentId: number;
  document : any;
  documentList : any;
  isInvalid: boolean;
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 
  constructor( private messageService : MessageService,private documentservice :DocumentService, private router : Router) { this.document = {}; }

  ngOnInit() {
    if(this.DocumentId){
      console.log(this.DocumentId)
      // this.documentservice.DocumentGetByID(this.DocumentId).subscribe(result => {
      //   this.document = result;
      //   this.document.CreatedDate = this.document.CreatedDate ? new Date(this.document.CreatedDate) : null;
       
      //   console.log('GetByID: ', this.document);
      // });
      
      if(this.DocumentId)
      {
        this.document = this.DocumentId;
      }
    }

     
    }

    keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;
  
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

    public inputValidator(event: any) {
      //console.log(event.target.value);
      const pattern = /^[a-zA-Z]*$/;   
      //let inputChar = String.fromCharCode(event.charCode)
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
        // invalid character, prevent input
  
      }
    }
  
    update(docEditForm: any) {
      console.log('docEditForm: ', docEditForm);
      if (docEditForm.form.status == "VALID") {
      console.log(this.document);
      if(this.DocumentId == null){
      this.documentservice.addDocument(this.document).subscribe(result => {
        console.log(result);

        if(result !="Already Exists"){
          this.router.navigateByUrl('layout/admin/document');
          this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
        }else{
          this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
        }
         // this.expanded = false;
        },

        
      // // //   this.router.navigateByUrl('layout/admin/document');
      // // //   this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
      // // //  // this.expanded = false;
      // // // },
      (err)=>{
      //  alert("error")
        this.messageService.add({severity:'error', summary: 'Error!', detail:''});
      });
    }else{
      this.documentservice.UpdateDocument(this.document).subscribe(result => {
        console.log(this.DocumentId);



        if(result !="Already Exists"){
          this.router.navigateByUrl('layout/admin/document');
          this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
        }else{
          this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
        }
         // this.expanded = false;
        },


      // // //  //this.router.navigateByUrl('layout/admin/document');
      // // //  this.messageService.add({severity:'success', summary: 'Update Successfully!', detail:''});
      // // //   this.refreshParent.emit();
      // // //  // this.expanded = false;
      // // // },
      (err)=>{
        //alert("error")
        this.messageService.add({severity:'error', summary: 'Error!', detail:''});
      });
    }
    }else{
      this.isInvalid = true;
      this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
    }
   

  }
  
  
  
 
  
    onCancel(){
      this.isdetailsclose.emit(false);
      this.router.navigateByUrl('layout/admin/document')
    }
  
    
   
  
  }
  

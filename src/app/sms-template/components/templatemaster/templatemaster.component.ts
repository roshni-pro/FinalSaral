import { Component, OnInit } from '@angular/core';
import { SmstemplateServiceService } from 'app/sms-template/services/smstemplate-service.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-templatemaster',
  templateUrl: './templatemaster.component.html',
  styleUrls: ['./templatemaster.component.scss']
})
export class TemplatemasterComponent implements OnInit {
  addDisplay:boolean=false;
  templateName:any;
  status:boolean=false;
  tempMastList:any;
  blocked:boolean;
  constructor(private service:SmstemplateServiceService,private confirmationService: ConfirmationService) { }
 
  ngOnInit() {
    this.showRecord();
  }

  AddData(){
    this.addDisplay = true;
    this.templateName = '';
    this.status = false;
    this.activeLabelStatus = false;
  }

  showRecord(){
    this.blocked = true;
    this.service.getTempMasteList().subscribe(
      (res) => {
        this.tempMastList = res;
        this.blocked = false;
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
     ) 
  }

  activeLabelStatus:boolean=false;
  chkStatus(event){
    if(event == true){
      this.activeLabelStatus = true;
    }else{
      this.activeLabelStatus = false;
    }
  }


  addRecordResp:any;
  addRecord(){

    if(!this.templateName){
      alert('Template Name Should Not be Blank');
      return false;
    }

    this.editTemplateName =  '';
    this.editStatus =  undefined;

    const payload={
      'TemplateName' : this.templateName,
      'IsActive' : this.status
    }

    this.blocked = true;
     this.service.addTempMaster(payload).subscribe(
      (res) => {
        if(res){
          this.addRecordResp = res;
          //console.log(this.addRecordResp);
          if(this.addRecordResp.Msg == 'Already Exist!!'){
            alert('Template Name Already exists')
          }else{
            alert('Data Saved Successfully')
          }
          this.addDisplay = false;
          this.blocked = false;
          this.showRecord();
        }
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
     ) 
  }

  editTemplateName:any;
  editStatus:any;
  editDetails:any;
  editDisplay:boolean=false;
  editId:number;
  editData(tempId){
    this.editId = tempId;
    this.templateName = '';
    this.status = undefined;
    this.editDisplay = true;
    this.editTemplateName =  '';
    this.editStatus =  undefined;
    this.service.getTempMasRecordById(this.editId).subscribe(
      (res) => {
        this.editDetails = res;
        this.editTemplateName =  this.editDetails.TemplateName;
        this.editStatus =  this.editDetails.IsActive;
      },
      (err) => {
        alert(err.error.ErrorMessage);
      }
    )
  }

  updateData(){
    const payload={
      'IsActive' : this.editStatus,
      'Id' : this.editId,
      'TemplateName' : this.editTemplateName
    }
   
    this.blocked = true;
    this.service.updateTempMaster(payload).subscribe(
      (res) => {
        if(res){
          alert('Data Updated Successfully')
          this.editDisplay = false;
          this.blocked = false;
          this.showRecord();
        }
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    )
  }

  deleteData(tempId){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action ?',
      accept: () => {
        this.blocked = true;
        this.service.deleteTempMasterId(tempId).subscribe(
          (res) => {
            this.blocked = false;
            this.showRecord();
          },
          (err) => {
            alert(err.error.ErrorMessage);
            this.blocked = false;
          }
        )
      }
    });
  }

  space(event) {
    if (event.target.selectionStart === 0 && event.code === 'Space') {
      event.preventDefault();
    }
  }

  omit_special_char(event)
  {   
    var k;  
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

}

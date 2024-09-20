import { Component, OnInit } from '@angular/core';
import {SmstemplateServiceService} from '../../services/smstemplate-service.service'
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.scss']
})
export class SmsTemplateComponent implements OnInit {
  AppEnum:any;
  selectedAppType:any;
  AppTypeList:any;
  display:boolean;
  PopAppt:any
  msg:any;
  PopTempt:any;
  addDLTID:any;
  blocked:boolean;
  IsActive:boolean;

  constructor(private smsService:SmstemplateServiceService,private msges:MessageService,private confirmationService: ConfirmationService) {
    this.AppEnum = [{Type:'Retailer App', code:1},
                    {Type:'Delivery App', code:2},
                    {Type:'Sales App', code:3},
                    {Type:'Sarthi App', code:4},
                    {Type:'Others', code:5}]
   }

  ngOnInit() {
    this.showList();
    this.showTemplateTypeList();
  }

  templateList:any;
  tempList:any;
  showTemplateTypeList(){
    this.blocked = true;
    this.smsService.getTempMasteList().subscribe(
      (res) => {
        this.tempList = res;
        this.templateList = this.tempList.filter(x => x.IsActive == true);
        this.blocked = false;
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    )
  }

  showList(){
    var listId=0;
    this.blocked = true;
    this.smsService.listByAppType(listId).subscribe(
      (res) => {
        this.AppTypeList = res;
        this.blocked = false;
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    )
  }


  selCode:any;
  getList(selData){ 
    this.selCode = selData.code
    this.blocked = true;
    this.smsService.listByAppType(this.selCode).subscribe(
      (res) => {
        this.AppTypeList = res;
        this.blocked = false;
      },
      (err) => {
        alert(err.error.ErrorMessage);
        this.blocked = false;
      }
    )
  }

  updatebtn:boolean;
  submitbtn:boolean;
  disableDropdown:boolean;
  selDropdownForAddCase:any;
  disabledVal:boolean=false;
  AddDialoag(){ 
    if(this.selectedAppType != undefined){
      this.selDropdownForAddCase = this.selectedAppType.code;
    }else{
      this.selDropdownForAddCase = '';
    }
    this.display=true;
    this.editDisplay=false;
    this.submitbtn=true;
    this.updatebtn=false;
    this.disableDropdown=true;
    this.PopAppt = this.AppEnum.filter(x => x.code == this.selDropdownForAddCase)[0];
    if(this.PopAppt){
      this.disabledVal = true;
    }else{
      this.disabledVal = false;

    }
    this.PopTempt = '';
    this.msg = '';
    this.addDLTID='';
    this.activeLabelStatus = false;
    this.IsActive = undefined;
    this.editPopAppt = '';
    this.editPopTempt = '';
    this.editmsg = '';
    this.editIsActive = undefined;
  }

  editRecordData:any;
  selVal:any;
  viewEdit:boolean=false;
  editId:any;
  editRecStatus:boolean=false;
  editDisplay:boolean;
  editPopAppt :any;
  editPopTempt : any;
  editmsg : any;
  editIsActive : any;
  editDLTID:any;
  EditDialoag(rowId){
    this.editDisplay=true;
    this.display = false;
    this.submitbtn=false;
    this.updatebtn=true;
    this.PopAppt = '';
    this.PopTempt = '';
    this.msg = '';
    this.IsActive = undefined;
    this.editPopAppt = '';
    this.editPopTempt = '';
    this.editmsg = '';
    this.editDLTID='';
    this.editIsActive = undefined;
    this.editId = rowId;
    this.smsService.getSmsTempRecordById(this.editId).subscribe(res => {
      console.log(res);
      this.editRecordData = res;
      this.editPopAppt = this.editRecordData.AppType;
      this.editPopTempt = this.editRecordData.TemplateType;
      this.editmsg = this.editRecordData.Template;
      this.editIsActive = this.editRecordData.IsActive;
      this.editDLTID = this.editRecordData.DLTID;
      this.editPopAppt = this.AppEnum.filter(x => x.code == this.editPopAppt)[0];
      this.editPopTempt = this.templateList.filter(x => x.TemplateName == this.editPopTempt)[0];
    })
  }

  activeLabelStatus:boolean=false;
  chkStatus(event){
    if(event == true){
      this.activeLabelStatus = true;
    }else{
      this.activeLabelStatus = false;
    }
  }
 
  saveResultDetails:any;
  Save(){
    
    if(!this.PopAppt){
      alert('Please Select App Type');
      return false;
    }
    if(!this.PopTempt){
      alert('Please Select Template Type');
      return false;
    }
    if(!this.addDLTID){
      alert('DLTID Should Not be Blank');
      return false;
    }
    if(!this.msg){
      alert('Message Should Not be Blank');
      return false;
    }

      var payload={
        "TemplateType" : this.PopTempt.TemplateName,
        "AppType" : this.PopAppt.code,
        "DLTID" : this.addDLTID,
        "Template" : this.msg,
        "IsActive" : this.IsActive,
      }

      this.blocked = true;
      this.smsService.addSmsTemplate(payload).subscribe(result=>{
        if(result){
          //console.log(result);
          this.saveResultDetails = result;
          if(this.saveResultDetails.Msg == 'Already Exist!!'){
            alert('Record Already exists')
          }else{
            alert('Data Saved Successfully')
          }
          
          this.display=false;
          this.blocked = false;
        }

        if(this.selCode != undefined){
          this.smsService.listByAppType(this.selCode).subscribe(
            (res) => {
              //console.log(res);
              this.AppTypeList = res;
            }
          )
        }else{
          this.showList();
        }
      })
  }


  Update(){
    // this.editmsg = '';
    // this.editIsActive = undefined;
    if(this.editPopTempt == undefined){
      alert('Please Select Template Type')
      return false;
    }

    if(!this.editDLTID){
      alert('DLTID Should Not be Blank');
      return false;
    }

    if(!this.editmsg){
      alert('Message Should Not be Blank');
      return false;
    }
    
    var payload={
      "Id": this.editId,
      "TemplateType" : this.editPopTempt.TemplateName,
      "AppType" : this.editPopAppt.code,
      "DLTID" : this.editDLTID,
      "Template" : this.editmsg,
      "IsActive" : this.editIsActive,
    }

    console.log(payload);
    this.blocked = true;
    this.smsService.updateSmsTemplate(payload).subscribe(res => {
        if(res){
          alert('Data Updated Successfully')
          this.editDisplay=false;
          this.blocked = false;
        }

        if(this.selCode != undefined){
          this.smsService.listByAppType(this.selCode).subscribe(
            (res) => {
              console.log(res);
              this.AppTypeList = res;
              this.blocked = false;
            }
          )
        }else{
          this.showList();
          this.blocked = false;
        }
      })
  }

  DeleteRecord(id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action ?',
      accept: () => {
        this.blocked = true;
        this.smsService.deleteSmsTempById(id).subscribe(
          (res) => {
            
            if(this.selCode != undefined){
              this.smsService.listByAppType(this.selCode).subscribe(
                (res) => {
                  //console.log(res);
                  this.AppTypeList = res;
                  this.blocked = false;
                }
              )
            }else{
              this.showList();
              this.blocked = false;
            }
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

  omit_special_char_and_text(event)
  {   
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  showError(msg1:string){
    this.msges.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msges.add({severity:'success', summary: 'Success', detail:msg1});
  }
}

import { Component, OnInit } from '@angular/core';
import { WhatsAppTemplateService } from 'app/whats-app-template/Service/whats-app-template.service'
import { ConfirmationService } from 'primeng/api'
import { MessageService } from 'primeng/api';
import { ViewChild, ElementRef } from '@angular/core';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-whats-app-template',
  templateUrl: './whats-app-template.component.html',
  styleUrls: ['./whats-app-template.component.scss']
})
export class WhatsAppTemplateComponent implements OnInit {
  @ViewChild('fileRef', null) fileUploader: ElementRef;
  showTemplate: boolean = true
  uploadedFiles: any[] = [];
  showPopError: boolean = false
  textareapopup: boolean = false;
  viewTemplateName: string
  viewTempDescription: string
  viewImg: any
  viewVariable: any
  blocked: boolean = false
  isUploaded: boolean = false;
  img: any
  addTempName: string = '';
  selectedTempName: string = '';
  imgPath: any
  tempDescription: string = '';
  showImg: boolean = false
  ViewTemp: boolean = false
  showEdit: boolean = false
  selectedTemplateType: any;
  textbox: boolean = false;
  varibleDropDownList: any
  dropdown: boolean = false
  file: any
  imageName: any
  TemplateList: any
  immagePath: any
  selectedTemplateName: any
  isTempNotSaved: boolean = false
  tempName: any
  tempLanguage: any
  templatesData: any
  tempType: any
  headVal: any
  bodyVal: string
  footerVal: any
  selectedLanguage: any
  selectedDescription: any
  showTemplate1: any
  WhatsAppTemplateVariableDetails: any[] = []
  WATemplateValConfigurationIdfirst: any
  WATemplateValConfigurationIdsecond: any
  VariableStaticValuefirst: any
  VariableStaticValuesecond: any
  secondDropDownVariable: any
  showVariabledrop: boolean = false
  showVariableString: boolean = true
  firstDropDownVariable: any
  firstVariabletxt: string = '';
  secondVariabletxt: string = '';
  Obj1: any
  Obj2: any
  imaageName: any
  tempPreview: any
  showUploader: boolean = false
  tempData1: any[] = []
  imagePath: any
  imgURL: any
  mediaArea: boolean = false
  tempVar: any
  baseURL: any;
  rowData: any
  totalVariables: varObj[] = [];
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private whatsAppTemplateService: WhatsAppTemplateService) {
    this.baseURL = environment.whatsappImageURL;
  }
  ngOnInit() {
    this.textareapopup = true
    this.GetAllTemplateList();
    this.GetvariableDropdownList();
    // if(){
    //   this.tempLanguage=='english'
  }
  addTemplate() {
    this.showTemplate = true
  }
  enableDropDown(item: any) {
    item.enableDropdown = !item.enableDropdown
    if (item.enableDropdown) {
      item.labelName = '';
    } else {
      item.dropDownSelection = {
        KeywordName: "",
        SQLQuary: "",
        WATemplateValConfigurationId: 0
      }
    }
  }
  ViewTemplate(data) {
    this.viewImg = null
    this.ViewTemp = true
    if (data) {
      this.rowData = data
      this.viewTemplateName = this.rowData.TemplateName
      this.viewTempDescription = this.rowData.TemplateDescription
      this.viewVariable = this.rowData.WhatsAppTemplateVariableDetails
      if (this.rowData.ImagePath != null) {
        this.viewImg = this.rowData.ImagePath
      }
      this.viewVariable.forEach(x => {
        if (x.WATemplateValConfigurationId > 0) {
          x.tempVar = this.varibleDropDownList.find(y => y.WATemplateValConfigurationId == x.WATemplateValConfigurationId).KeywordName
        }
      })
    }
  }

  showData() {
    if (this.selectedTemplateType.value == 'Standard') {
      this.textareapopup = true
      this.mediaArea = false
    }
    if (this.selectedTemplateType.value == 'Interactive') {
      this.textareapopup = false
      this.mediaArea = true
    }

  }


  enableUpload: boolean = false;
  upload(file: File[]) {
    console.log(file);
    this.enableUpload = false;
    this.isUploaded = false;
    debugger
    if (file && file[0].type != "image/jpeg") {
      alert("Only image/jpeg type is allowed");
      this.fileUploader.nativeElement.value = null;
      return;
    }
    if (file && ((file[0].size / 1024) / 1024) > 5) {
      alert("Image size is grater then 5 MB");
      this.fileUploader.nativeElement.value = null;
      return;
    }

    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.enableUpload = true;


    // (success) => {
    //   this.showPopError = true
    //   this.showSuccess("Image Uploaded Succesfully")
    // };
  }

  uploadIdProof() {
    this.isUploaded = false;

    // if (this.imagePath == undefined) {
    //   this.showPopError = true
    //   this.showError("Please Upload File")
    //   return
    // }
    debugger

    if (this.enableUpload == false) {
      alert("Please Choose Corret Image First")
    } else {
      if (this.file) {
        let formData = new FormData();
        formData.append('file', this.file[0])
        this.whatsAppTemplateService.uploadImageWATemplate(formData).subscribe(result => {
          // var imgPath = result.split(".")
          // if (imgPath[1] == 'pdf' || imgPath[1] == 'xlsx') {
          //   alert("Please Upload In Correct Format")
          //   this.isUploaded = false;
          //   return;
          // }
          // else {
          // }
          this.enableUpload = false;

          if (result != undefined) {
            this.immagePath = result;
            //this.people.Id_Proof = result;
            this.showPopError = true;
            this.isUploaded = true;
            
            this.showSuccess("Image Uploaded Succesfully")
            this.file = [];
          } else {
            this.showPopError = true;
            this.isUploaded = false;
            this.showError("Image Not Uploaded")
          }
        }, (err) => {
          this.showError("Error!")
        });
      } else {
        alert("Error - File Not Found")
      }
    }


  }
  getTemplateList() {
    this.blocked = true
    this.whatsAppTemplateService.getTemplateList().subscribe((res: any) => {
      this.blocked = false
      //debugger;
      this.templatesData = JSON.parse(res);
      this.tempData1 = this.templatesData.waba_templates
      this.tempData1.sort((a, b) => a.name.localeCompare(b.name))
    })
  }
  confirm1(Id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this template?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.DeleteTemplate(Id)
      },
      reject: () => {

      }
    });
  }

  AddNewTemplate() {


    this.WhatsAppTemplateVariableDetails = []

    debugger
    if (this.totalVariables.length > 0) {
      this.totalVariables.forEach((element: any, index: number) => {
        let obj = {
          'WATemplateValConfigurationId': element.enableDropdown == true ? element.dropDownSelection.WATemplateValConfigurationId : 0,
          'VariableStaticValue': element.enableDropdown == true ? null : element.labelName,
          'VariableType': '{{' + (index + 1).toString() + '}}'
        }
        this.WhatsAppTemplateVariableDetails.push(obj);
      });
    }


    if (this.selectedTemplateType == undefined) {
      alert("Please Select Template")
      // this.showPopError = true
      // this.showError("Please Select Template")
      return
    }

    this.addTempName = this.addTempName.trim();
    if (this.addTempName == "") {
      alert("Please Enter Template Name");
      return
    }

    if (!this.isUploaded && this.showUploader && this.immagePath == null) {
      alert("Please Upload Image before saving")
      return
    }

    if(this.showUploader == true ){
      if (this.immagePath == null || this.immagePath == undefined || this.immagePath == '') {
        alert("Please Upload Image");
        return
      }
    }




    let flag = 0;
    this.WhatsAppTemplateVariableDetails.forEach((ele: any) => {
      if ((ele.VariableStaticValue == null || ele.VariableStaticValue == '') && (ele.WATemplateValConfigurationId == undefined || ele.WATemplateValConfigurationId == 0)) {
        flag = 1;
      }
    })
    if (flag == 1) {
      alert("Please Enter all the fields");
      return;
    }
    if (this.immagePath != undefined) {
      this.imageName = this.immagePath.split("/")
      this.imaageName = this.imageName[1]
    }
    if (this.immagePath != undefined) {
      this.imgPath = this.baseURL + this.immagePath
    }
    const payload =
    {
      'TemplateName': this.selectedTempName,
      'Language': this.selectedTemplateType.language,
      'TemplateDescription': this.tempDescription,
      'ImageName': this.imaageName,
      'ImagePath': this.imgPath,
      'TemplateNewName': this.addTempName,
      'WhatsAppTemplateVariableDetails': this.WhatsAppTemplateVariableDetails
    }
    if (this.isTempNotSaved == false) {
      this.blocked = true
      this.whatsAppTemplateService.updateTemplateList(payload).subscribe((res: any) => {
        console.log(res, "resUpdate");
        this.blocked = false
        if (res.Status == true) {
          this.showTemplate1 = false;
          // this.showPopError = false
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.showSuccess("Save Template successfully")

          this.GetAllTemplateList()
          // alert("Saved Succesfully")
          this.Cancel();

        }
        else {
          debugger
          alert(res.Message)

          // alert()

        }

      })
    }
  }
  addTemplate1() {

    this.getTemplateList();
    this.showTemplate1 = true
    this.showUploader = false
    this.img = null
    this.showImg = false
    this.immagePath = null
    this.selectedTemplateType = undefined;
    this.addTempName = '';
    this.selectedTempName = '';
    this.tempDescription = '';
    this.showVariabledrop = false
    this.showVariableString = false
    this.totalVariables = [];
    if (this.fileUploader) {
      this.fileUploader.nativeElement.value = null;
    }
  }
  OnChangeTemplates(selectedTemplateType) {

    if (this.fileUploader) {
      this.fileUploader.nativeElement.value = null;
    }
    this.img = null
    this.showImg = false
    this.showVariableString = true
    this.showVariabledrop = false
    this.immagePath = null;
    
    this.enableUpload = false;
    this.isUploaded = false;


    this.showUploader = false
    this.selectedTempName = selectedTemplateType.name
    this.addTempName = this.selectedTempName
    selectedTemplateType.components.forEach(element => {
      if (element.format == 'IMAGE') {
        this.showUploader = true
      }
      if (element.type == 'HEADER' && element.text != undefined) {
        this.headVal = element.text == undefined ? '' : element.text
      }
      if (element.type == 'BODY' && element.text != undefined) {
        this.bodyVal = element.text == undefined ? '' : element.text
        this.totalVariables = [];
        console.log((this.bodyVal.match(/{{/g) || []).length);
        let totalVarsLength = (this.bodyVal.match(/{{/g) || []).length;
        for (let i = 0; i < totalVarsLength; i++) {
          this.totalVariables.push(
            {
              labelName: '',
              selectionDropdownList: this.varibleDropDownList,
              enableDropdown: false,
              dropDownSelection: ''
            }
          )
        }
      }
      if (element.type == 'FOOTER' && element.text != undefined) {
        this.footerVal = element.text == undefined ? '' : element.text
      }
    });
    this.headVal = this.headVal == undefined ? '' : this.headVal;
    this.bodyVal = this.bodyVal == undefined ? '' : this.bodyVal;
    this.footerVal = this.footerVal == undefined ? '' : this.footerVal;

    this.tempDescription = this.headVal + ' ' + this.bodyVal + ' ' + this.footerVal
    if (selectedTemplateType.components[0].format == 'IMAGE') {
      if (selectedTemplateType.components[0].example.header_handle[0] != null) {
        this.showImg = true
      }
      else {
        this.showImg = false
      }
    }
  }
  GetvariableDropdownList() {
    this.whatsAppTemplateService.DropDown().subscribe(res => {
      this.varibleDropDownList = res
      this.firstDropDownVariable = this.varibleDropDownList[0];
      this.secondDropDownVariable = this.varibleDropDownList[0];
    })
  }
  showVariableDropDown1() {
    this.textbox = !this.textbox;
    if (this.textbox == true) {
      this.secondVariabletxt = this.secondDropDownVariable.KeywordName;
    }
    if (this.textbox == false) {
      this.secondVariabletxt = ''
    }
  }
  Cancel() {
    this.showTemplate1 = false;
    this.selectedTemplateType = undefined;
    this.addTempName = '';
    this.selectedTempName = '';
    this.tempDescription = '';
    this.totalVariables = [];
    if (this.fileUploader) {
      this.fileUploader.nativeElement.value = null;
    }
  }
  GetAllTemplateList() {
    this.whatsAppTemplateService.WATemplateList().subscribe(res => {
      this.TemplateList = res
      this.blocked = false
    })
  }
  DeleteTemplate(Id) {
    this.blocked = true
    this.whatsAppTemplateService.DeleteTemplate(Id).subscribe(res => {
      this.blocked = false
      if (res == true) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.showPopError = false
        this.showSuccess("Template Deleted Successfully")
        this.GetAllTemplateList()
      }
      else {
        this.showPopError = false
        this.showError("Something Went Wrong")
      }
    })
  }
  showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
interface varObj {
  labelName: String,
  selectionDropdownList: any[],
  enableDropdown: boolean,
  dropDownSelection: any

}
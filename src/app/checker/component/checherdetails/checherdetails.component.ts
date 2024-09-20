import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MastermakercheckerService } from 'app/shared/services/mastermakerchecker.service';
import { ApproverSupplier } from 'app/checker/component/interface/approvesupplier'
import { ConfirmationService, MessageService } from 'primeng/api';
// import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'environments/environment';
import { activeDactivate } from 'app/checker/component/interface/approvesupplier'

import { Message } from 'primeng/api';
import { rejects } from 'assert';
import { image } from 'html2canvas/dist/types/css/types/image';
import { DialogModule } from 'primeng/dialog';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import * as moment from 'moment';
@Component({
  selector: 'app-checherdetails',
  templateUrl: './checherdetails.component.html',
  styleUrls: ['./checherdetails.component.scss'],
  providers: [ConfirmationService]
})
export class ChecherdetailsComponent implements OnInit {
  @ViewChild('closebutton', { static: false }) closebutton;
  img: any;
  activeDactivate: activeDactivate;
  action: ApproverSupplier;
  displayTabs: any[];
  closeResult: string;
  selectedSupplier: any[];
  Statusboolean: boolean;
  baseURL: any;
  isChecked: boolean = false;
  isCheckedfassi: boolean = false;
  isCheckedaddress: boolean = false;
  isCheckBankacimg: boolean = false;
  isCheckGSTnimg: boolean = false;
  isCheckmsmeimg: boolean = false;
  isCheckAgreementimg: boolean = false;
  isCheckedProprietorPanNumber: boolean = false;
  isCheckedActive: boolean;
  disabled: boolean = false;
  Proprietornamebytype: string;
  docName :string;
  imagelist: any[];
  display: boolean = false;
  
  sstatus:any;
  roleName: any;
  roleList: any;
  roleListarry: boolean = false;

  @Input() details: any;
  @Input() activeFields: any[];

  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();
  @Output() activeStatus = new EventEmitter<any>();
  @Output() deleteSelected = new EventEmitter<any>();

  constructor(private modalService: NgbModal,
    private approveService: MastermakercheckerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private peoplePilot: PepolePilotService,
    private supplierService:SupplierService) {
    this.baseURL = environment.apiURL;
    this.img = {};
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    console.log(this.details);    
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);
      
      for (var i in this.roleList) {
        if (this.roleList[i] == 'IC department lead' ) {
          this.roleListarry = true;
        }
      }
    });
    debugger
    // this.isCheckedfassi=false;
    // this.isCheckedaddress=false;
    // this.isChecked=false;
    {
      this.action = {
        id: this.details.id,
        supplierId: this.details.SupplierId,
        status: '',
        comments: '',
        userid: this.details.userid,
        PaymentTerms: this.details.PaymentTerms,
        SupplierType: this.details.SupplierType
      }
    }
    if (this.details.Status == "Approved") {
      this.isChecked = true;
      this.isCheckedfassi = true;
      this.isCheckedaddress = true;
      this.isCheckBankacimg = true;
      this.isCheckGSTnimg = true;
      this.isCheckmsmeimg = true;      
      this.isCheckAgreementimg=true;
      this.isCheckedProprietorPanNumber=true;
    }
    
    this.details.SupplierType

    if (this.details.TypeofFirm == 'Proprietor') {
      this.Proprietornamebytype = 'Proprietor';
    }
    else if (this.details.TypeofFirm == 'Partnership') {
      this.Proprietornamebytype = 'Partner';
    }
    else if (this.details.TypeofFirm == 'LLP') {
      this.Proprietornamebytype = 'Partner';
    }
    else if (this.details.TypeofFirm == 'Private Limited') {
      this.Proprietornamebytype = 'Director';
    }

    console.log("detailsof user",this.details);
    if(this.details.IsVerified==false && this.details.Active==true){
      this.sstatus='Active';
    }
    else if(this.details.IsVerified==false && this.details.Active==false){
      this.sstatus='InActive'
    }
    else if(this.details.IsVerified==true && this.details.Active==false){
      this.sstatus='Block'
    }
    
    this.SuppLastPoFirstGrDate();
    

  }

  ngOnChanges() {
    debugger
    this.displayTabs = [{ field: 'overview', bool: true },
    { field: 'edit-form', bool: false },
    { field: 'history', bool: false },
    ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
    console.log(this.activeFields);
    console.log(this.details, 'details');

  }

  activeTabClass: any[] = [
    {tabName:'overviewDisplay',isActive:true},
    {tabName:'editFormDisplay',isActive:false},
    {tabName:'historyDisplay',isActive:false},
  ];

  showDialog(img,name) {
    debugger
    let img1 = [];
    this.imagelist = [];
    this.docName='';
    if (img != null && img.length>0) {
      for (var i = 0; i < img.length; i++) {
        img1.push(this.baseURL + img[i]);
      }
      this.imagelist = img1;
      this.docName = name;
      this.display = true;
    }
    else{
      alert('No documents');
    }
  }
  switchActive(e,pageSelection) {
    // console.log(e.path);
    // $('.nav-link').removeClass('active');
    if(e.path){
      let navitem = e.path[2].children;
      for (var i = 0; i < navitem.length; i++) {
        navitem[i].firstChild.className = "nav-link";
      }
      e.path[0].className = "nav-link active";
    }
    this.activeTabClass.forEach((e: any)=>{
      if(pageSelection == e.tabName){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    })
  }

  closeDetails(isDetails: boolean) {
    this.isdetailsclose.emit(isDetails);
  }

  RefreshParent() {
    this.refreshParent.emit();
  }

  ToggleActivation(supplier) {
    this.activeStatus.emit(supplier);
  }

  onDelete(details) {
    this.deleteSelected.emit(details);
    this.closeDetails(false);
    this.modalService.dismissAll('done');
  }


  hideDisplayTabsContents() {
    for (var i = 0; i < this.displayTabs.length; i++) {
      this.displayTabs[i].bool = false;
    }
  }

  overviewDisplay(e) {
    this.switchActive(e,'overviewDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool = true;
  }

  editFormDisplay(e) {
    this.switchActive(e,'editFormDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool = true;
  }

  depoDisplay(e) {
    this.switchActive(e,'historyDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool = true;
  }


  myFunction(imgAll) {
    this.isChecked = true;
    if (imgAll.pannumberImage == true) {
      //alert('please verify image');
      this.isChecked = false;
      return;
    }
  }
  ProprietorpanVerify(ProprietorPanNumber) {
    debugger
    this.isCheckedProprietorPanNumber = true;
    if ( ProprietorPanNumber == null) {
      //alert('please verify image');
      this.isCheckedProprietorPanNumber = false;
      return;
    }
  }
  fassiChecked(imgAll) {
    debugger
    this.isCheckedfassi = true;
    if (imgAll.fassiImage == true) {
      //alert('please verify image');
      this.isCheckedfassi = false;
      return;
    }
  }
  myaddressCheck(imgAll) {
    this.isCheckedaddress = true;
    if (imgAll.addressImage == true) {
      // alert('please verify image');
      this.isCheckedaddress = false;
      return;
    }
  }

  bankimageCheck(imgAll) {
    debugger
    this.isCheckBankacimg = true;
    if (imgAll.bankacImage == true) {
      // alert('please verify image');
      this.isCheckBankacimg = false;
      return;
    }
  }

  gstnimageCheck(imgAll) {
    this.isCheckGSTnimg = true;
    if (imgAll.GSTNImage == true) {
      // alert('please verify image');
      this.isCheckGSTnimg = false;
      return;
    }
  }

  MsmeImageCheck(imgAll) {
    this.isCheckmsmeimg = true;
    if (imgAll.msmeImage == true) {
      // alert('please verify image');
      this.isCheckmsmeimg = false;
      return;
    }
  }

  
  AgreementimageCheck(imgAll) {
    debugger
    this.isCheckAgreementimg = true;
    if (imgAll.AgreementImage == true) {
      // alert('please verify image');
      this.isCheckAgreementimg = false;
      return;
    }
  }
  changePaymentterms(Suppliertypes) {
    debugger;


    if (Suppliertypes == "Advanced") {
      this.details.PaymentTerms = 0;
      this.disabled = true;
    }
    else {
      this.disabled = false;
    }

  }
  // approveAction(){
  //   if(this.isChecked==false && this.isCheckedfassi==false && this.isCheckedaddress==false){
  //     alert('please verifiy all images');
  //   }
  //   if(this.isChecked==true && this.isCheckedfassi==true && this.isCheckedaddress==true){
  //     this.action.status='Approved';
  //     console.log(this.details,'ssss');
  //     alert('status approved');
  //     this.approveService.ArAction(this.action).subscribe(result=>{
  //       console.log(result,'result');
  //       alert('Status Updated Successfully');
  //     })
  //   }
  // }

  RejectAction() {
    if (this.action.comments == "" || this.action.comments == undefined) {
      alert('please type comment')
      return false;
    }

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.action.status = 'Rejected';
        console.log(this.details, 'ssss');
        // alert('status Rejected');
        this.approveService.ArAction(this.action).subscribe(result => {
          console.log(result, 'result');
          this.closebutton.nativeElement.click();
          alert('Status Updated Successfully');
        })

      }
    })
  }
  msgs: Message[] = [];

  approveAction() {
    if (this.isChecked == false) {
      // alert('please verifiy all images');
      this.messageService.add({ severity: 'error', summary: "Please Verify  Pan Image", detail: '' });
      return false;
    } else if (this.isCheckedfassi == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  FASSI Image", detail: '' });
      return false;
    } else if (this.isCheckedaddress == false) {
      if(this.details.TypeofFirm =='Proprietor' || this.details.TypeofFirm=='Partnership' || this.details.TypeofFirm=='LLP'){
        this.messageService.add({ severity: 'error', summary: "Please Verify  Address Image", detail: '' });
      return false;
      }
      
    }
    else if (this.isCheckBankacimg == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  Bank AC Image", detail: '' });
      return false;
    }
    else if (this.isCheckGSTnimg == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  GSTN Image", detail: '' });
      return false;
    }
    else if (this.isCheckAgreementimg == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  Agreement Document", detail: '' });
      return false;
    }
    else if (this.isCheckedProprietorPanNumber == false && this.details.ProprietorPanNumber != null && this.details.TypeofFirm != 'Proprietor') {
      this.messageService.add({ severity: 'error', summary: "Please Verify  " + this.Proprietornamebytype + " Pan", detail: '' });
      return false;
    }
    else if (this.isCheckmsmeimg == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  MSME Image", detail: '' });
      return false;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {

        if (this.isChecked == true || this.isCheckedfassi == true || this.isCheckedaddress == true) {
          this.action.status = 'Approved';
          this.action.PaymentTerms = this.details.PaymentTerms;
          this.action.SupplierType = this.details.SupplierType;
          console.log(this.details, 'ssss');
          // alert('status approved');
          this.approveService.ArAction(this.action).subscribe(result => {
            console.log(result, 'result');
            this.closebutton.nativeElement.click();
            alert('Status Updated Successfully');
          })
        }
      },
      reject: () => {
        // this.action.status='Rejected';
        // console.log(this.details,'ssss');
        // alert('status Rejected');
        // this.approveService.ArAction(this.action).subscribe(result=>{
        //   console.log(result,'result');
        //   alert('Status Rejected Successfully');
        // })
      }
    });

  }

  GrDate:any
  PurchaseOrderId:any
  isposhow:boolean=false;
  SuppLastPoFirstGrDate(){
    debugger
    if(this.details.Status=='Approved' || this.details.Status=='Pending'){
      if(this.details.SupplierId>0){
        this.supplierService.SuppLastPoFirstGrDate(this.details.SupplierId).subscribe(res=>{
          console.log(res);
          this.isposhow=true;
          this.PurchaseOrderId=res.PurchaseOrderId;
          this.GrDate=moment(res.GrDate).format("YYYY/MM/DD");
        })
      }
    }else{this.isposhow=false;}
  }
}

import { Component, OnInit } from '@angular/core';
import { MastermakercheckerService } from 'app/shared/services/mastermakerchecker.service';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApproverSupplier, ApproverDpot, activeDactivate, activeDactivateDpot } from 'app/checker/component/interface/approvesupplier'
import { TurnAroundTimeComponent } from 'app/report/components/turn-around-time/turn-around-time.component';
import { SupplierService } from 'app/shared/services/supplier.service';
import { environment } from 'environments/environment';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { DialogModule } from 'primeng/dialog';
import { event } from 'jquery';
@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.scss']
})
export class ApproverComponent implements OnInit {
  activeDactivate: activeDactivate;
  actionDepo: ApproverDpot;
  activeDactivateDpot: activeDactivateDpot;
  Mastercheckerentity: any;

  Status: string[];
  CheckerList: any;
  CheckerList2: any[];
  entityname: any;
  sstatus: any;
  cols: any[];
  MakerData: any;
  ColumnArray: string[];
  list: any;
  PendingList: string[];
  IsShow: boolean;
  closeResult: string;
  isopen: boolean
  cars: any[];
  loading: boolean;
  isLoading: boolean;
  totalRecords: number;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  UnSelect: any;
  displayBasic: boolean = false;
  displayHistoryBasic: boolean = false;
  historydata: any = [];
  supplierId: number;
  skcode: string;
  depotList: any = [];
  displayEdit: boolean = false;
  displayDpotHistory: boolean = false;
  displayDpotAction: boolean = false;
  public Dpotdata: any = [];
  baseURL: string;
  // isChecked: boolean=false;
  isCheckedfassi: boolean = false;
  isCheckedaddress: boolean = false;
  isCheckedGst: boolean = false;
  isChecked: boolean = false;
  img: any;
  skip: number = 0;
  take: number = 10;
  roleName: any;
  roleList: any;
  roleListarry: boolean = false;
  depolistarry: boolean = false;
  imagelist: any[];
  display: boolean = false;
  docName: string;
  // roleListarry: any[] = [
  //   { RoleName: 'Accounts executive' }
  // ]
  arrayofentity: any[] = [
    { EntityName: "Supplier", Id: 2, RoleName: "Supplier Checker" },
    { EntityName: "DepoMaster", Id: 2, RoleName: "Supplier Checker" }
  ]
  activeFields: any[] = [
    { field: 'id', label: 'Id' },
    { field: 'SupplierName', label: 'SupplierName' },
    { field: 'FatherName', label: 'FatherName' },
    { field: 'Status', label: 'Status' },
    { field: 'CreatedBy', label: 'CreatedBy' },
    { field: 'CreatedDate', label: 'CreatedDate' },
    { field: 'CheckerBy', label: 'CheckerBy' },
    { field: 'CheckerDate', label: 'CheckerDate' },
    { field: 'CheckerComment', label: 'CheckerComment' },

  ];
  pageSize: number;
  constructor(private messageService: MessageService,
    private mastermakercheckerservice: MastermakercheckerService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService,
    private SupplierService: SupplierService,
    private peoplePilot: PepolePilotService) {
    this.UnSelect = "undefined";
    this.IsShow = false;
    this.baseURL = environment.apiURL;
    this.img = {};
  }

  ngOnInit() {
    this.peoplePilot.GetUserRole().subscribe(result => {
      localStorage.setItem('role', result);
      this.roleName = localStorage.getItem('role');
      this.roleList = this.roleName.split(',');
      console.log(this.roleList);

      for (var i in this.roleList) {
        if (this.roleList[i] == 'HQ Master login' || this.roleList[i] == 'Accounts executive') {

          this.roleListarry = true;
        }
        else if (this.roleList[i] == 'IC department lead') {
          this.depolistarry = true;
        }
      }


    });
    // this.isCheckedfassi = false;
    // this.isCheckedaddress = false;
    // this.isChecked = false;
    // this.isCheckedGst = false;
    this.mastermakercheckerservice.MasterCheckerEntity().subscribe(result => {
      console.log('MasterCheckerEntity : ', result);
      this.Mastercheckerentity = result;
      this.Status = new Array("Pending", "Approved", "Rejected");
    })
    this.cols = [
      // { field: 'id', header: 'Id' },
      { field: 'SupplierName', header: 'SupplierName' },
      { field: 'SUPPLIERCODES', header: 'SupplierCode' },
      { field: 'FatherName', header: 'FatherName' },
      { field: 'Status', header: 'Status' },
      { field: 'CreatedBy', header: 'CreatedBy' },
      { field: 'CreatedDate', header: 'CreatedDate' },
      { field: 'StateName', header: 'StateName' },
      { field: 'City', header: 'City' }
    ];



  }
  showDialog(img, name) {
    debugger
    let img1 = [];
    this.imagelist = [];
    this.docName = '';
    if (img != null && img.length > 0) {
      for (var i = 0; i < img.length; i++) {
        img1.push(this.baseURL + img[i]);
      }
      this.imagelist = img1;
      this.docName = name;
      this.display = true;
    }
    else {
      alert('No documents uploaded.');
    }
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
  load(event) {
    if(this.hitbtn)
      this.GetCheckerList(event)
    
   this.hitbtn=true;

  }
  sstatus1: any;
  key: any
  TotalRecords: any
  first: number = 0
  supstatus:any
  depostatus:any 
  hitbtn:boolean=true
  emp() {
    this.first = 0;
    this.TotalRecords = 0;
    this.alepop=true;
    this.hitbtn=false;
  }
  
  GetCheckerList(event) {
    // if (this.sstatus != "Approved") {
    //   this.roleListarry = false;
    // }
    // else {
    //   this.roleListarry = true;
    // }
    
    let Skip = event && event.first ? event.first : 0
    let Take = event && event.rows ? event.rows : 10
    let KeyWord = this.key ? this.key : ""
    if (this.entityname != undefined && this.entityname != "undefined" && this.sstatus != undefined && this.sstatus != "undefined") {
      if (this.entityname == 'Supplier') {
        this.mastermakercheckerservice.CheckerList(this.entityname, this.sstatus, KeyWord, Skip, Take).subscribe(result => {
          var arr: [] = result.data;
          console.log(arr, 'arr');
          if (result.Status && result.data) {
            this.PendingList = result.data.SupplierOnBoardDC;
            this.TotalRecords = result.data.Totalcount;
            this.supstatus= result.data.SupplierOnBoardDC[0].Status;
            console.log(this.PendingList);
            
            // for (var j in result.data.SupplierOnBoardDC) {

            //   this.PendingList[j].MakerDate = result.data[j].MakerDate ? moment(result.data[j].MakerDate).format('DD/MM/YYYY HH:mm:ss') : null
            //   if (result.data[j].Status == 'Pending' && result.data[j].CheckerBy == null) {
            //     this.PendingList[j].CheckerBy = '-';
            //   };
            // }
            console.log('PendingList', this.PendingList);
            this.depotList = null;
          }
        })
      }

      // else {
      //   this.PendingList = null;
      // }
      else if (this.entityname != undefined && this.entityname == "DepoMaster" && this.sstatus != undefined && this.sstatus == "Approved") {
        // alert('thh')
        this.PendingList = null;
        let Skip = event && event.first ? event.first : 0
        let Take = event && event.rows ? event.rows : 10
        let KeyWord = this.key ? this.key : ""
        this.SupplierService.getDepotList(this.sstatus, KeyWord, Skip, Take).subscribe(data => {
          console.log(data, 'adat');
          this.depotList = data.data.DepoOnBoardingDC;
          this.TotalRecords = data.data.totalcount
          this.depostatus= data.data.DepoOnBoardingDC[0].Status;
          console.log(this.depotList, 'depotList');
        })

      }
      else if (this.entityname != undefined && this.entityname == "DepoMaster" && this.sstatus != undefined && this.sstatus == "Pending") {
        this.PendingList = null;
        this.SupplierService.getDepotList(this.sstatus, KeyWord, Skip, Take).subscribe(data => {
          if (data.Status == "ERROR") {
            alert('no data found');
          }
          else {
            console.log(data, 'adat');
            this.depotList = data.data.DepoOnBoardingDC;
            this.TotalRecords = data.data.totalcount
            this.depostatus= data.data.DepoOnBoardingDC[0].Status;
            console.log(this.depotList, 'depotList');
          }
        })

      }

      else if (this.entityname != undefined && this.entityname == "DepoMaster" && this.sstatus != undefined && this.sstatus == "Rejected") {
        this.PendingList = null;
        this.SupplierService.getDepotList(this.sstatus, KeyWord, Skip, Take).subscribe(data => {
          if (data.Status == "ERROR") {
            alert('no data found');
          }
          else {
            console.log(data, 'adat');
            this.depotList = data.data.DepoOnBoardingDC;
            this.TotalRecords = data.data.totalcount;
            this.depostatus= data.data.DepoOnBoardingDC[0].Status;

            console.log(this.depotList, 'depotList');
          }
        })
      }
    }
    else {
      if(this.alepop==true)
      {
        alert("Please Select Master Type and Status")
        this.alepop=false;
      }
    }
  }

  alepop:boolean=false;
  openDetails(d, e) {

    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      if (this.selectedRow.path) {
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  activePopup(d) {
    debugger
    this.selectedRowDetails = d;
    this.displayBasic = true;
    this.activeDactivate = {
      id: d.id,
      supplierId: d.SupplierId,
      // status: d.Status,
      status: "Approved",
      comments: '',
      userid: d.userid,
      ActiveType: d.Active,
    }
  }



  getSupHistory(d) {

    this.selectedRowDetails = d;
    console.log(this.selectedRow, 'd');
    this.skcode = d.SUPPLIERCODES;
    this.supplierId = d.SupplierId;
    this.mastermakercheckerservice.getSupplierhistory(this.supplierId, this.skcode).subscribe(data => {
      console.log(data, 'history');
      this.historydata = data.data;
    })
  }

  history(d) {
    this.displayHistoryBasic = true;
    this.getSupHistory(d);

  }

  postActivity() {
    debugger
    if (this.activeDactivate.comments == '') {
      alert('Please enter Comments...');
      return false;
    }
    this.mastermakercheckerservice.activeDactivate(this.activeDactivate).subscribe(x => {

      if (x.Status) {
        alert(x.Message);
        this.displayBasic = false;
      }
      else {
        alert(x.Message);
      }


    })
  }

  depoaction(d) {
    debugger
    this.activeDactivateDpot = {
      id: d.Id,
      depoId: d.DepoId,
      status: 'Approved',
      comments: '',
      userid: null,
      ActiveType: d.IsActive,
    }
    this.displayDpotAction = true;
  }



  myFunction(imgAll) {
    this.isChecked = true;
    if (imgAll.pannumberImage == true) {
      this.isChecked = false;
      return;
    }
  }
  fassiChecked(imgAll) {
    this.isCheckedfassi = true;
    if (imgAll.fassiImage == true) {
      this.isCheckedfassi = false;
      return;
    }
  }
  myaddressCheck(imgAll) {
    this.isCheckedaddress = true;
    if (imgAll.canCheImage == true) {
      this.isCheckedaddress = false;
      return;
    }
  }
  myFunctionGst(imgAll) {
    this.isCheckedGst = true;
    if (imgAll.gstImage == true) {
      this.isCheckedGst = false;
      return;
    }
  }


  editDepot(config) {

    console.log(config, 'config');
    this.Dpotdata = config;
    this.displayEdit = true;
    if (this.Dpotdata.Status == "Approved") {
      this.isChecked = true;
      this.isCheckedfassi = true;
      this.isCheckedaddress = true;
      this.isCheckedGst = true;
    }
    else if (this.Dpotdata.Status == "Pending") {
      this.isChecked = false;
      this.isCheckedfassi = false;
      this.isCheckedaddress = false;
      this.isCheckedGst = false;
    }

    // if (this.Dpotdata.Status == "Approved") {
    //   this.isCheckedfassi = true;
    // }
    // if (this.Dpotdata.Status == "Approved") {
    //   this.isCheckedaddress = true;
    // }
    // if (this.Dpotdata.Status == "Approved") {
    //   this.isCheckedGst = true;
    // }

    {
      this.actionDepo = {
        id: this.Dpotdata.Id,
        depoId: this.Dpotdata.DepoId,
        status: "",
        comments: '',
        userid: this.Dpotdata.userid,
        activeType: true
      }
    }

    if (this.Dpotdata.IsActive == true) {
      this.sstatus1 = 'Active'
      console.log("status for true false", this.sstatus1);

    }
    if (this.Dpotdata.IsActive == false) {
      this.sstatus1 = 'Inactive'
    }
  }

  approveAction() {

    if (this.isChecked == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  Pan Image", detail: '' });
      return false;
    } else if (this.isCheckedfassi == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  FASSI Image", detail: '' });
      return false;
    } else if (this.isCheckedaddress == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  Cheque Image", detail: '' });
      return false;
    }
    else if (this.Dpotdata.GstImage != null && this.isCheckedGst == false) {
      this.messageService.add({ severity: 'error', summary: "Please Verify  Gst Image", detail: '' });
      return false;
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (this.isChecked == true || this.isCheckedfassi == true
          || this.isCheckedaddress == true || this.isCheckedGst == true) {
          this.actionDepo.status = 'Approved';
          this.mastermakercheckerservice.approveDpot(this.actionDepo).subscribe(result => {
            console.log(result, 'result');
            this.displayEdit = false;
            this.messageService.add({ severity: 'success', summary: "Status Approved Successfully", detail: '' });
            this.GetCheckerList(event);
          })
        }
      }
    });

  }


  RejectAction() {
    if (this.actionDepo.comments == "" || this.actionDepo.comments == undefined) {
      // alert('please type comment')
      this.messageService.add({ severity: 'error', summary: "Please type comment", detail: '' });

      return false;
    }

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.actionDepo.status = 'Rejected';
        this.mastermakercheckerservice.approveDpot(this.actionDepo).subscribe(result => {
          console.log(result, 'result');
          this.displayEdit = false;
          this.messageService.add({ severity: 'success', summary: "Status Rejected Successfully", detail: '' });
          this.GetCheckerList(event);
        })
      }
    })
  }

  postDpotActivity() {

    debugger

    if (this.activeDactivateDpot.comments == '') {
      alert('Please enter comments...');
      return false;
    }

    this.mastermakercheckerservice.ActiveActiondpot(this.activeDactivateDpot).subscribe(x => {

      if (x.Status) {
        alert(x.Message);
        this.displayDpotAction = false;
      }
      else {
        alert(x.Message);

      }
      console.log(x, 'x');
    })
  }
}




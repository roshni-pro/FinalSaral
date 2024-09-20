import { Component, OnInit } from '@angular/core';
import { MastermakercheckerService } from 'app/shared/services/mastermakerchecker.service';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-masterchecker',
  templateUrl: './masterchecker.component.html',
  styleUrls: ['./masterchecker.component.scss']
})
export class MastercheckerComponent implements OnInit {
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
  activeFields: any[] = [
    { field: 'Id', label: 'Id' },
    { field: 'EntityName', label: 'EntityName' },
    { field: 'Operation', label: 'Operation' },
    { field: 'Status', label: 'Status' },
    { field: 'MakerBy', label: 'MakerBy' },
    { field: 'MakerDate', label: 'MakerDate' },
    { field: 'CheckerBy', label: 'CheckerBy' },
    { field: 'CheckerDate', label: 'CheckerDate' },
    { field: 'CheckerComment', label: 'CheckerComment' },

  ];
  pageSize: number;
  getRoleData:any;
  isFounderRole:boolean;
  constructor(private messageService: MessageService, private mastermakercheckerservice: MastermakercheckerService, private modalService: NgbModal, private confirmationService: ConfirmationService) {

    this.UnSelect = "undefined";
    this.IsShow = false;
  }

  ngOnInit() {
    this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
     var founderRole = 'Founder - GBO and GBU';
     var getFounderRoleRoleName = this.getRoleData.find(x => x == founderRole);
     if(getFounderRoleRoleName == undefined){
      this.isFounderRole = false;
     }else{
      this.isFounderRole = true;
     }
    this.mastermakercheckerservice.MasterCheckerEntity().subscribe(result => {
      console.log('MasterCheckerEntity : ', result);
      debugger;
      let obj=[];
      if(this.isFounderRole){
        result.forEach(element => {
          if(this.isFounderRole && (element.EntityName == 'Category' || element.EntityName == 'BaseCategory' || element.EntityName == 'SubCategory'))
          {
            obj.push(element);       
          }
          this.Mastercheckerentity = obj;
        });
        // this.Mastercheckerentity = result.find(element => element.EntityName == 'Category' && element.EntityName == 'BaseCategory' && element.EntityName == 'SubCategory' );        
      }else{
        result.forEach(element => {
          if(!this.isFounderRole && (element.EntityName != 'Category' && element.EntityName != 'BaseCategory' && element.EntityName != 'SubCategory'))
          {
            obj.push(element);       
          }
          this.Mastercheckerentity = obj;
        });
      }
      // this.Mastercheckerentity = result;
      this.Status = new Array("Pending", "Approve", "Reject");
    })
    this.cols = [
      // { field: 'Id', header: 'Id' },
      { field: 'EntityName', header: 'MasterName' },
      { field: 'Operation', header: 'Operation' },
      { field: 'Status', header: 'Status' },
      { field: 'MakerBy', header: 'MakerBy' },
      { field: 'CheckerBy', header: 'CheckerBy' },
      { field: 'MakerDate', header: 'MakerDate' }
    ];
    //this.GetCheckerList();
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

  GetCheckerList() {
    
    if (this.entityname != undefined && this.entityname != "undefined" && this.sstatus != undefined && this.sstatus != "undefined") {
      this.mastermakercheckerservice.MasterCheckerList(this.entityname, this.sstatus).subscribe(result => {
        
        if (result && result.length > 0) {
          this.PendingList = result;
          for(var j in result){
            
            this.PendingList[j].MakerDate = result[j].MakerDate ? moment(result[j].MakerDate).format('DD/MM/YYYY HH:mm:ss') : null
            if(result[j].Status == 'Pending' && result[j].CheckerBy==null)
            {
              this.PendingList[j].CheckerBy = '-';
            };
            }
console.log('PendingList',this.PendingList);
          this.ColumnArray = Object.keys(result[0].NewJson);

          for (var i = 0; i < result.length; i++) {
            this.list.push(result[i].NewJson);
            if (result[i].OldJson != null) {
              this.list.push(result[i].OldJson);
            }
          }
          this.CheckerList = this.list;
        }
        else {
          this.PendingList = null;
        }
      })
    }
    else {
      alert("Please Select Master Type and Status")
    }
  }


  openDetails(d, e) {
    
    this.selectedRowDetails = d;
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }


}

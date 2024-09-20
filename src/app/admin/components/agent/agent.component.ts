import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { User } from 'app/shared/interface/user';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { from } from 'rxjs';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { TaxMasterService } from 'app/shared/services/tax-master.service';
import { AgentService } from 'app/shared/services/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  agentMasterList: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  activeFields: any[] = [{ field: 'DisplayName', label: 'Full Name' }, { field: 'AgentCode', label: 'Agent Code' }, { field: 'Department', label: 'Department' },];
  closeResult: string;
  isopen: boolean;
  cols: any[];
  constructor(private modalService: NgbModal, private agentService: AgentService, private confirmationService: ConfirmationService, private router: Router) { }
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
    this.isDetails = false;
    this.cols = [
      // { header: 'Edit' },
      { field: 'DisplayName', header: 'Full Name' },
      { field: 'AgentCode', header: 'AgentCode' },
      { field: 'Department', header: 'Department' },
      { field: 'Active', header: 'Active' },
      { field: 'CreatedDate', header: 'Created Date' },
    ];

    this.agentService.GetAllAgent().subscribe(result => {
      this.agentMasterList = result;
      for (var i in this.agentMasterList) {
        this.agentMasterList[i].CreatedDate = this.agentMasterList[i].CreatedDate ? moment(this.agentMasterList[i].CreatedDate).format('DD/MM/YYYY') : null
      }
      console.log(this.agentMasterList);
    });
  }

  addAgentMaster() {
    this.router.navigateByUrl("/layout/admin/add-agent");
    // this.peopleService.AddPeople().subscribe(result => {
    //   alert("People Deleted");
    // });
  }

  onDelete(ID: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.agentService.DeleteAgent(ID).subscribe(result => {
          let ac = this.agentMasterList.filter(x => x.ID == ID)[0];
          let index = this.agentMasterList.indexOf(ac);
          this.agentMasterList.splice(index, 1);
        });
      }
    });
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
    if (this.selectedRow.path) {
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }
}

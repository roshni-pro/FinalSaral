import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ExportService } from 'app/shared/services/export.service';
import { Master } from 'app/shared/master-owner/master';
import { MasterOwners } from 'app/shared/master-owner/master-owners';
import { MasterOwnerViewModel } from 'app/shared/master-owner/master-owner-view-model';

@Component({
  selector: 'app-master-owner',
  templateUrl: './master-owner.component.html',
  styleUrls: ['./master-owner.component.scss']
})
export class MasterOwnerComponent implements OnInit {
  masterList: any[];
  isOpenOwner: boolean;
  isFormInvalid: boolean;
  masterOwnerViewModel: MasterOwnerViewModel;
  masterOwnerList: MasterOwners[];
  approverObj: any;
  peopleList: any[];
  constructor(private messageService: MessageService,
    private exportservice: ExportService,
    private router: Router,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService) { }


  ngOnInit() {
    this.isFormInvalid = false;
    this.GetMasterList();
    this.isOpenOwner = false;

  }

  addMaster() {
    this.router.navigateByUrl("layout/master-export/masteredit")
  }

  GetMasterList() {
    this.exportservice.GetMasterList().subscribe(result => {
      this.masterList = result;
      console.log(this.masterList);
    });
  }



  searchApprover(event) {
    console.log('event: ', event);
    this.exportservice.GetAutoComplete(event.query).subscribe(result => {
      this.peopleList = result;
      if (this.peopleList && this.peopleList.length > 0) {
        this.peopleList.forEach(x => {
          x.Field = x.DisplayName ? x.DisplayName : "";
          x.Field += x.Email ? " - " + x.Email : "";
          x.Field += x.UserName ? " - " + x.UserName : "";
          x.Field += x.Mobile ? "(" + x.Mobile + ")" : "";
        })
      }
      console.log('x is: ', result);
    });
  }



  removeApprover(masterOwner: MasterOwners) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if (masterOwner.Id > 0) {
          this.exportservice.DeleteExportMasterOwner(masterOwner.Id).subscribe(x => {
            this.masterOwnerViewModel.MasterOwnerList = this.masterOwnerViewModel.MasterOwnerList.filter(x => { return x.Id != masterOwner.Id });

          })
        } else {
          let index: number = this.masterOwnerViewModel.MasterOwnerList.indexOf(masterOwner);
          this.masterOwnerViewModel.MasterOwnerList.splice(index, 1);
          this.messageService.clear();
          this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
          this.removeMessage();
        }
      }
    });


  }

  saveMaster() {
    if (!this.masterOwnerViewModel.MasterObject.MasterName) {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', summary: 'Required!', detail: 'Pease enter master name' });
      this.removeMessage();
    } else {
      this.exportservice.SaveMasterOwner(this.masterOwnerViewModel).subscribe(result => {
        this.messageService.add({ severity: 'success', summary: 'Saved!', detail: 'Master saved!' });
        this.removeMessage();
        this.isOpenOwner = false;
      });
    }
  }

  removeMessage() {
    setTimeout(() => {
      this.messageService.clear();
    }, 2000);
  }

  onSelectApprover(aproover: any) {
    console.log('aproover: ', aproover);
    let newOwner: MasterOwners = {
      ApproverId: aproover.PeopleID,
      Field: aproover.Field,
      Id: null,
      MasterId: 0,
      MasterName: ""
    };
    this.masterOwnerViewModel.MasterOwnerList.push(newOwner);
    this.approverObj = null;
  }


  addNewMaster() {
    this.masterOwnerViewModel = {
      MasterObject: {
        MasterId: null,
        MasterName: '',
        IsActive: true,
        IsDeleted: false
      },
      MasterOwnerList: []
    };


    this.isOpenOwner = true;
  }

  edit(master) {
    this.exportservice.GetByExportMasterId(master.MasterId).subscribe(x => {
      this.masterOwnerViewModel = x;
      this.isOpenOwner = true;
    });
  }

  deleteExportMaster(master) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.exportservice.DeleteExportMaster(master.MasterId).subscribe(result => {
          let index = this.masterList.indexOf(x => x.MasterId == master.MasterId);
          this.masterList.splice(index, 1);
        });
      }
    });
  }

}








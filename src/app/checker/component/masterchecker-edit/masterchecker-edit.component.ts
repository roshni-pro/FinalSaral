import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { MastermakercheckerService } from 'app/shared/services/mastermakerchecker.service';
import { MessageService } from 'primeng/api';
import { MakerCheckerDTO } from '../interface/MakerCheckerDTO';

@Component({
  selector: 'app-masterchecker-edit',
  templateUrl: './masterchecker-edit.component.html',
  styleUrls: ['./masterchecker-edit.component.scss']
})
export class MastercheckerEditComponent implements OnInit {
  @Input() Id: any;
  details: any;
  Status: string[];
  ColumnArray: string[];
  list: any;
  CheckerList: any;
  RowArray: string[];
  LastStatus: any;
  disablebtn : boolean;
  PendingList : any;
  SupplierCode : any;
  makerCheckerDTO : MakerCheckerDTO;
  newJsonData : any;
  DepoCodes : any;

  constructor(private mastermakercheckerservice: MastermakercheckerService,private messageService: MessageService) {
    this.list = [];
  }

  ngOnInit() {
    this.disablebtn = false;
    this.Status = new Array("Pending", "Approve", "Reject");
    if (this.Id) {
      
      this.details = this.Id;
      this.LastStatus = this.details.Status;
      //this.ColumnArray = Object.keys(JSON.parse(this.details.NewJson));
      this.ColumnArray = new Array("FieldName",  "OldValue","NewValue");
      this.RowArray = Object.keys(JSON.parse(this.details.NewJson));
      this.newJsonData = Object.keys(JSON.parse(this.details.NewJson));
      // this.SupplierCode = this.newJsonData.indexOf('SUPPLIERCODES');
     
      this.list.push(JSON.parse(this.details.NewJson));
      this.SupplierCode = this.list[0].SUPPLIERCODES;
      this.DepoCodes = this.list[0].DepoCodes;
      if (this.details.OldJson != null && this.details.OldJson != "") {
        this.list.push(JSON.parse(this.details.OldJson));
      }

      this.CheckerList = this.list;
    }

    for (var i in this.list) {
      this.list[i].CreatedDate = this.list[i].CreatedDate ? moment(this.list[i].CreatedDate).format('DD/MM/YYYY') : null
      this.list[i].UpdatedDate = this.list[i].UpdatedDate ? moment(this.list[i].UpdatedDate).format('DD/MM/YYYY') : null
    }
    console.log('This Details ::', this.details);
    this.mastermakercheckerservice.MasterCheckerList(this.details.EntityName, this.LastStatus).subscribe(result => {
      if (result && result.length > 0) {
        this.PendingList = result;
console.log('PendingList',this.PendingList);
      }
      else {
        this.PendingList = null;
      }
    })

  }

  update() {

this.disablebtn = true;
    this.makerCheckerDTO={
      
      SupplierCode : this.SupplierCode,
      Id : this.details.Id,
      MongoId : this.details.MongoId,
      EntityName : this.details.EntityName,
      EntityId : this.details.EntityId,
      Operation :this.details.Operation,
      OldJson : this.details.OldJson,
      NewJson : this.details.NewJson,
      Status : this.details.Status,
      CheckerComment : this.details.CheckerComment,
      MakerBy : this.details.MakerBy,
      CheckerBy :this.details.CheckerBy,
      MakerDate : this.details.MakerDate,
      CheckerDate : this.details.CheckerDate,
      DepoCodes : this.DepoCodes
    }

    if (this.details.Status == "Reject") {
      
      if (this.details.CheckerComment == null) {
        alert("Please provide Rejection Comment");
      }
      else{
        
       this.disablebtn = true;
        this.mastermakercheckerservice.MakerOperation(this.makerCheckerDTO).subscribe(result => { 
           
            this.messageService.add({ severity: 'success', summary: 'Record Saved Successfully!', detail: '' });
            window.location.reload();
          // alert("Record Saved");
          // window.location.reload();
        })
      }
    }
    else if(this.details.Status == "Approve"){
        this.mastermakercheckerservice.MakerOperation(this.makerCheckerDTO).subscribe(result => {
          // debugger;
          console.log('ResultApprove:',result);
          
          this.messageService.add({ severity: 'success', summary: 'Record Saved Successfully!', detail: '' });
          // alert("Record Saved");
          window.location.reload();
        })
    }

  };

}

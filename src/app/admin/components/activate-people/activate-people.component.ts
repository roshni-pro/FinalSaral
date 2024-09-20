import { Component, OnInit } from '@angular/core';
import { ActivePeopleService } from 'app/admin/services/active-people.service';
import * as moment from 'moment';

@Component({
  selector: 'app-activate-people',
  templateUrl: './activate-people.component.html',
  styleUrls: ['./activate-people.component.scss']
})
export class ActivatePeopleComponent implements OnInit {
  keyword:any;
  blocked:boolean;
  peopleList:any;
  totalRecords:number;
  commentShowForReject:boolean=false;
  commentMsg:string;
  getRoleData:any;
  hrRole:boolean;
  constructor(private _service:ActivePeopleService) { }

  ngOnInit() {
     this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
     var HrRole = 'HR senior executive';
     var getHrRoleName = this.getRoleData.find(x => x == HrRole);
     if(getHrRoleName == undefined){
      this.hrRole = false;
     }else{
      this.hrRole = true;
     }

  }

  SearchByKey(){
    if(this.keyword==undefined || this.keyword==null){
      alert("Please Enter Keyword");
    return;
    }
    this.commentMsg = undefined;
    this.blocked=true;  
    this._service.getPeopleByKey(this.keyword).subscribe(
      (res)=>{
        console.log(res);
        //this.peopleList=res.filter((x: { Active: boolean; }) => x.Active == true);
        this.peopleList=res;
        this.blocked=false;
      },
      (err)=>{
        alert(err.error.ErrorMessage);
        this.blocked=false;
      }
     );
  }


  activeBtnDisable:boolean;
  getPeopleId:number;
  savedActiveStatus(row){
    this.getPeopleId = row.PeopleID;
    this.commentShowForReject = true;
  }

  clearData(){
    this.keyword = undefined;
    this.peopleList = [];
  }

  activatePeople(){
    if(this.commentMsg==undefined || this.commentMsg==null){
      this.activeBtnDisable = true;
      alert("Please Enter Comment");
      return;
    }
    let userId = this.getPeopleId;
    let userComment = this.commentMsg;
    let userStatus = true;
    this._service.updateInActivePeopleById(userId,userComment,userStatus).subscribe(
      (res)=>{
        console.log(res);
        if(res.Status == true){
          debugger;
          if(res.Role == 'Sales Executive'){
            alert('Profile activated successfully, Please map with cluster');
          }else{
            alert('Profile activated successfully');
          }
          
          this.commentShowForReject = false;
          this.activeBtnDisable = false;
          this.keyword = undefined;
          this.peopleList = [];
        }
      },
      (err)=>{
        alert(err.error.ErrorMessage);
      }
    )
    
  }

  closeCmtDialog(){
    this.commentShowForReject = false;
  }
}

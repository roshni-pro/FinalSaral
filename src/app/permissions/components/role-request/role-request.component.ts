import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RolepagepermissionService } from 'app/shared/services/rolepagepermission.service';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Role {
  name: string,
  code: string
}
interface Page {
  name: string,
  code: string
}
@Component({
  selector: 'app-role-request',
  templateUrl: './role-request.component.html',
  styleUrls: ['./role-request.component.scss']
})

export class RoleRequestComponent implements OnInit {
  roleList: Role[];
  pageList: Page[];
  roleID: string;
  rolePageList: any;
  rolePagePermissionDc: {};
  istree: any;
  treeData: any;
  childData: any;
  details: any;
  objRequest: any;
  selectedRoles: Role[];
  selectdPages: Page[];
  rangeDates: Date;
  isInvalid: boolean;
  minimumDate:any;
  minDate: Date;
  maxDate: Date;
  invalidDates: Array<Date>

  @Output() refreshParent = new EventEmitter();

  constructor(private rolePageService: RolepagepermissionService, private router: Router,private toastr: ToastrService) {

    this.istree = false;
    this.objRequest = [];
  }

  ngOnInit() {
    this.minimumDate=new Date();
    let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];
    
    
        this.rolePageService.RoleAccess().subscribe(result => {
      this.roleList = result;
      console.log('roleList: ', result);
    })

    this.rolePageService.Pages().subscribe(result => {
      this.pageList = result;
      console.log('pageList: ', result);
    })

  }

  goToPage() {
    this.router.navigateByUrl('/layout/permission/RequestAccess');
  }


  saveRoleReq(objRequest) {
  
    
if(objRequest.rangeDates[0]==null)
{
alert('Please Select Date From');
return;
}
if(objRequest.rangeDates[1]==null)
{
alert('Please Select Date Till');
return;
}
if(objRequest.selectdPages.length<0)
{
alert('Please Select Pages');
return;
}
if(objRequest.selectedRoles.length<0)
{
alert('Please Select Roles');
return;
}


      console.log('objRequest', objRequest)
      let list = [];
      let listNew = [];
      
      if (objRequest && objRequest.selectedRoles && objRequest.selectedRoles.length > 0 && objRequest.selectdPages != undefined) {
        objRequest.selectdPages.forEach(y => {

          let obj = {
            validFrom: objRequest.rangeDates[0],
            validTo: objRequest.rangeDates[1],
            PageId: y.Id
          }
          list.push(obj);
        })
        objRequest.selectedRoles.forEach(z => {
          let objnew = {
            RoleId: z.Id,
            validFrom: objRequest.rangeDates[0],
            validTo: objRequest.rangeDates[1]
          }
          listNew.push(objnew);
        });
      }
      else if (objRequest.selectedRoles != undefined) {
        objRequest.selectedRoles.forEach(z => {
          let objnew = {
            RoleId: z.Id,
            validFrom: objRequest.rangeDates[0],
            validTo: objRequest.rangeDates[1]
          }
          listNew.push(objnew);
          list.push(objnew);
        });
      }
      else if (objRequest.selectdPages != undefined) {


        objRequest.selectdPages.forEach(z => {
          let objnew = {
            PageId: z.Id,
            validFrom: objRequest.rangeDates[0],
            validTo: objRequest.rangeDates[1]

          }

          listNew.push(objnew);
          list.push(objnew);
        });

      }


      let requestData
      if (list.length > 0) {
        requestData = {

          RoleRequest: list,
          SaveUsersRole: listNew
        }
      }
      else {
        requestData = {

          RoleRequest: listNew,
          SaveUsersRole: listNew
        }

      }
      // this.rolePageService.saveInRole(list).subscribe(result => {

      // });
      this.rolePageService.saveAspnetUserInRole(requestData).subscribe(result => {
        this.router.navigateByUrl('/layout/permission/RequestAccess');
      }, error => {

        alert("Role Already Exists with User")
      });

      this.refreshParent.emit();
   
     


  }




}

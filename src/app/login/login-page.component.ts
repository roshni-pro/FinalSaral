import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../shared/services/user.service';
import { NGXToastrService } from '../shared/services/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EntityHistoryService } from 'app/shared/services/entity-history.service';
// import {ProgressSpinnerModule} from 'primeng/progressspinner';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [NGXToastrService]
})

export class LoginPageComponent {
  userName: any;
  password: any;
  IsProgressed: boolean;
  // private loggedInStatus=JSON.parse(localStorage.getItem('loggedIn')||'false');

  @ViewChild('f', { static: false }) loginForm: NgForm;

  constructor(private router: Router, private userService: UserService, private entityHistoryService : EntityHistoryService,
    private route: ActivatedRoute, private service: NGXToastrService) { }

  // On submit button click
  // onSubmit() {
  //     this.loginForm.reset();
  // }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['register']);//[] //{ relativeTo: this.route.parent });
  }




  ngOnInit() {
    this.IsProgressed = false;
    //this.validate(); 
  }

  onLoggedin() {
    this.IsProgressed = true;
    console.log('userName: ', this.userName);
    console.log('password: ', this.password);
    // localStorage.setItem('isLoggedin', 'true');

    // onLoggedin(value:boolean) {
    //   console.log('userName: ', this.userName);
    //   console.log('password: ', this.password);
    //   this.loggedInStatus = value
    //  localStorage.setItem('isLoggedin', 'true')

    this.userService.userAuthentication(this.userName, this.password).subscribe((data: any) => {
      console.log(data);
      this.IsProgressed = false;
      // this.service.typeInfo();
      debugger;
      localStorage.setItem('tokenData', JSON.stringify(data));
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('userid', data.userid);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('Warehouseid', data.Warehouseid);
      localStorage.setItem('role', data.rolenames);
      // var roles = data.rolenames.split(',');
      // var isAdminRole = roles ? roles.filter(x=> x == 'HQ Master login' || x =='WH Master login') : null;
      // if(isAdminRole[0] =='HQ Master login' || isAdminRole[0] == 'WH Master login' ){
      if( parseInt(data.Warehouseid) == 0){
        this.router.navigate(['layout']);
      }else{
      if(data.Warehouseids){
      var warehouseIds = data.Warehouseids.split(',').map(Number);
      console.log(warehouseIds);
      localStorage.setItem('warehouseids', warehouseIds);
      if(warehouseIds.length > 1){
        this.router.navigateByUrl('layout/warehouse-selection')
        // this.router.navigate(['warehouse-selection'])
      }else{
        this.router.navigate(['layout']);
    }
  }else{
    this.router.navigate(['layout']);
  }
}
    if(data.userid > 0)
    {
      let userid = localStorage.getItem('userid');
      debugger;
      this.entityHistoryService.angularPageList(userid).subscribe(x=>
          {
              localStorage.setItem("AllPageListDC", JSON.stringify(x.AllPageListDC));
              localStorage.setItem("AssignedPageListDc", JSON.stringify(x.AssignedPageListDc));
          })
    }
    },
      (err) => {
        alert("error")
        this.IsProgressed = false;
        this.service.typeError();
        
      });

  }
  // validate() {
  //   if (localStorage.getItem('userToken')) {
  //     this.router.navigate(['layout']);
  //   }
  // }
}



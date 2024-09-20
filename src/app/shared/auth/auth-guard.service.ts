import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // debugger;
    let roles = (localStorage.getItem('role'));
    if(roles != null)
    {
      var getRoleData = roles? roles.split(','): [];
      var HQMaster = 'HQ Master login';  // view
      // var HQMasterLogin = getRoleData.find(x => x == HQMaster);
      // debugger;
      // if(true)
      // {
        var allPageListDC = JSON.parse(localStorage.getItem("AllPageListDC"));
        var assignedPageListDc = JSON.parse(localStorage.getItem("AssignedPageListDc"));
        let stateUrl = state.url.replace("/", "");
        if(allPageListDC != null && assignedPageListDc != null)
        {
          var selectedAllPageListDC = allPageListDC.find(x => x.RouteName.indexOf(stateUrl) > -1);
          if (selectedAllPageListDC == null) {
            return this.authService.isAuthenticated();
          } else {
            var selectedRoute = assignedPageListDc.find(x => x.RouteName.indexOf(stateUrl) > -1);
      
            if (selectedRoute != null) {
              return this.authService.isAuthenticated();
            } else {
              // return false;
              let tempUserToken = localStorage.getItem('userToken');
              if(tempUserToken != 'null')
              {
                localStorage.setItem('tempUserToken',tempUserToken);
                localStorage.removeItem('userToken');
              }            
              return this.authService.isAuthenticated();
            }  
        }
        
        // }else{
        //   debugger;
        //   let tempUserToken = localStorage.getItem('userToken');
        //   localStorage.setItem('tempUserToken',tempUserToken);
        //   localStorage.removeItem('userToken');
        //   return this.authService.isAuthenticated();
        // }
      }
    }
    return this.authService.isAuthenticated();
  }
}

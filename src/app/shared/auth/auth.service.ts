import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  logout() {   
    localStorage.removeItem('userToken');
    localStorage.removeItem('AllPageListDC');
    localStorage.removeItem('AssignedPageListDc');
    this.router.navigateByUrl('/login');
    // this.token = null;
  }

  getToken() {    
    return this.token;
  }

  isAuthenticated() {
    // debugger;
    if(localStorage.getItem('userToken')){            
      return true;
    }
    else if(localStorage.getItem('tempUserToken'))
    {
      localStorage.setItem('userToken',localStorage.getItem('tempUserToken'))
      this.router.navigateByUrl('/layout');
      return false;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
    // here you can check if user is authenticated or not through his token 
    
  }
}

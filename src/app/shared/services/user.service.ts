import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interface/user';
import { environment } from 'environments/environment';
import { updateLocale } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = environment.apiURL;
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    console.log(body);
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password , warehouseid ?: any) {
    const formData = new FormData();
    var data = '';
    warehouseid = warehouseid ? warehouseid : null;
    formData.append('grant_type', 'grant_type');
    formData.append('username', userName);
    formData.append('password', password);
    formData.append('warehouseid', warehouseid);
    if(warehouseid){
     data = "grant_type=password&username=" + userName + "&password=" + password + "&warehouseid="+ warehouseid ;
    }else{
      data = "grant_type=password&username=" + userName + "&password=" + password ;
    }
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
    //return this.http.post(this.rootUrl + '/token', formData);
  }

  getUserClaims(){
   return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  }
}

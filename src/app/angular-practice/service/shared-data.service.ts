import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  logData = new Subject();
  constructor() { }

  setData(loginDetails){
    debugger;
    console.log(loginDetails);
    this.logData.next(loginDetails);
  }
}

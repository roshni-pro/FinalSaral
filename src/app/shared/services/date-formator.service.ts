import { Injectable } from '@angular/core';
const moment = require('moment');
@Injectable({
  providedIn: 'root'
})
export class DateFormatorService {

  constructor() { }

  public getTodayDateinDDdMMdYYYYString(): string {
    let now = moment();
    now = now.format("DD/MM/YYYY");
    return now;
  }

  public getTodayDateinMMdDDdYYYYString(): string {
    let now = moment();
    now = now.format("MM/DD/YYYY");
    return now;
  }


  public getTodayDatePlusDaysinDDdMMdYYYYString(numberOfDays: number): string {
    let now = moment();
    now = now.add( numberOfDays, 'days');
    now = now.format("DD/MM/YYYY");
    return now;
  }

  public getTodayDatePlusDaysinMMdDDdYYYYString(numberOfDays: number): string {
    let now = moment();
   
    now = now.add( numberOfDays, 'days');
    now = now.format("MM/DD/YYYY");
    return now;
  }

  public getMMdDDdYYYYFromDDdMMdYYYYString(DDdMMdYYYY: string): string {
    try {
      if (DDdMMdYYYY) {
        let datePartArray: string[] = DDdMMdYYYY.split('/');
        return (datePartArray[1] + '/' + datePartArray[0] + '/' + datePartArray[2]);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  public getMMdDDdYYYYFromDD_MM_YYYYString(DDdMMdYYYY: string): string {
    try {
      if (DDdMMdYYYY) {
        let datePartArray: string[] = DDdMMdYYYY.split('/');
        return (datePartArray[1] + '-' + datePartArray[0] + '-' + datePartArray[2]);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}

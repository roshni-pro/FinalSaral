import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TownHallCommentsSection } from '../interface/townHall/town-hall-comments-section';
@Injectable({
  providedIn: 'root'
})
export class TownhallService {
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  GetTownHallData(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/TownHallGraph/GetTownHallData');
  }

  GetTownHalldataYear(defaultYear): Observable<any> {
    return this.http.get<any>(this.apiURL + '/api/CRM/CRMYearDashboard?Year='+defaultYear);
  }
  SetMonthName(townHallData: any): any {
    if (townHallData) {
      let keys = Object.keys(townHallData);
      if (keys && keys.length > 0) {
        keys.forEach(key => {
          if (Array.isArray(townHallData[key] && townHallData[key]) && townHallData[key].length > 0 && townHallData[key][0].hasOwnProperty('MonthName')) {
            townHallData[key].forEach(item => {
              if (item.Months == 1) {
                item.MonthName = "January";

              }
              else if (item.Months == 2) {
                item.MonthName = "February";

              }
              else if (item.Months == 3) {
                item.MonthName = "March";
              }
              else if (item.Months == 4) {
                item.MonthName = "April";
              }
              else if (item.Months == 5) {
                item.MonthName = "May";
              }
              else if (item.Months == 6) {
                item.MonthName = "June";
              }
              else if (item.Months == 7) {
                item.MonthName = "July";
              }
              else if (item.Months == 8) {
                item.MonthName = "August";
              }
              else if (item.Months == 9) {
                item.MonthName = "September";
              }
              else if (item.Months == 10) {
                item.MonthName = "October";
              }
              else if (item.Months == 11) {
                item.MonthName = "November";
              }
              else if (item.Months == 12) {
                item.MonthName = "December";
              }

            });
          }
        });
      }
    }
  }

  SaveTownHallCommentsSection(comment: TownHallCommentsSection): Observable<TownHallCommentsSection>{
    return this.http.post<TownHallCommentsSection>(this.apiURL + '/api/TownHallGraph/SaveTownHallCommentsSection', comment);
  }

  GetTownHallCommentsSection(): Observable<TownHallCommentsSection>{
    return this.http.get<TownHallCommentsSection>(this.apiURL + '/api/TownHallGraph/GetTownHallCommentsSection');
  }
  

}

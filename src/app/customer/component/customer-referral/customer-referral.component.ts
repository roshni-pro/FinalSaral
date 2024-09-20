import { Component, OnInit } from '@angular/core';
import { ReferralServService } from '../customerService/referral-serv.service';

@Component({
  selector: 'app-customer-referral',
  templateUrl: './customer-referral.component.html',
  styleUrls: ['./customer-referral.component.scss']
})
export class CustomerReferralComponent implements OnInit {

  AllRefferal: any[] = [
    { label: "Customer", value: 1 },
    { label: "People", value: 2 },
    { label: "Consumer", value: 3 },
  ];

  SelectedRefType: any = { label: "Customer", value: 1 };
  SK_Code: string = '';
  PopDetails: boolean = false;
  allCustReferralData: any[] = [];
  totalRecords: number = 0;

  take: number;
  skip: number;

  detailsList: any[] = [];

  detailsLoader: boolean = false;


  constructor(private API_Service: ReferralServService) { }

  ngOnInit() {
  }





  search() {
    // if(this.SK_Code == '' || this.SK_Code == undefined){
    //   alert("Please enter SK Code")
    // }else{
    if (this.SK_Code != '' || this.SK_Code != undefined) {
      this.SK_Code = this.SK_Code.trim();
    }

    let payload = {
      ReferralType: this.SelectedRefType.value,
      Skip: 1,
      Take: 10,
      KeyType: this.SK_Code,
    }
    console.log(payload);

    this.API_Service.GetCustomerReferralData(payload).subscribe(
      (res: any[]) => {
        console.log(res);
        if (res.length > 0) {
          this.allCustReferralData = res;
          this.totalRecords = this.allCustReferralData[0].TotalCount;
        } else {
          this.allCustReferralData = [];
          alert("List is Empty")
        }
      },
      (err) => {
        console.log(err);

      }
    );
    //}

  }

  load(event) {
    // this.blocked=true;
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;

    let payload = {
      ReferralType: this.SelectedRefType.value,
      Skip: this.skip,
      Take: this.take,
      KeyType: this.SK_Code,
    }

    console.log(payload);

    this.API_Service.GetCustomerReferralData(payload).subscribe(
      (res: any[]) => {
        console.log(res);
        if (res.length > 0) {
          this.allCustReferralData = res;
          this.totalRecords = this.allCustReferralData[0].TotalCount;
        } else {
          this.allCustReferralData = [];
          alert("List is Empty");
        }
      },
      (err) => {
        console.log(err);

      }
    );
  }

  detailPop(data) {
    this.detailsLoader = true;
    // this.detailsData = data;
    console.log(data);
    this.PopDetails = true;
    this.API_Service.GetCustomerWiseReferralList(data.ReferralSkCode).subscribe(
      (res: any[]) => {
        if (res.length > 0) {
          this.detailsLoader = false;
          this.detailsList = res;
          console.log(res);
        } else {
          this.detailsLoader = false;
          this.detailsList = [];
          alert("No Details Available")
        }
      },
      (err) => {
        this.detailsList = [];
        console.log(err);

      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';


@Component({
  selector: 'app-add-customer-refferal-config',
  templateUrl: './add-customer-refferal-config.component.html',
  styleUrls: ['./add-customer-refferal-config.component.scss']
})
export class AddCustomerRefferalConfigComponent implements OnInit {

  openAddDialog: boolean = false;
  openDeleteDialog: boolean = false;
  viewHistory: boolean = false;

  allClityList: any[] = [];
  AllCustomerList: any[] = [];

  AllRefferal: any[] = [
    { label: "Select Here", value: 0 },
    { label: "Customer", value: 1 },
    { label: "People", value: 2 },
    { label: "Consumer", value: 3 },
  ]

  // orderStatusOptions: any[] = [
  //   { label: "Select Here", value: 0 },
  //   { label: "delivered", value: 1 },
  // ]

  selectedCity: any;
  SelectedReffType: any;
  OnOrder: number;
  orderStatus: any;
  walletPoints: number; //referralWalletPoint
  CustomerWalletPoint: number;
  //CustomerWalletPoint
  deleteSelection: number;
  FilterCity: any = { Cityid: 0 };
  FilterReffType = 1;
  tempCustList: any[];
  allCustomerRefStatus: any[];
  historyID: number;
  entity: string = 'CustomerReferralConfiguration';
  constructor(private CityApiService: CityService, private exportService: ExportServiceService) {
  }

  ngOnInit() {
    this.getCustomerRefstatus();
    this.getCustomerRefferalList();
    this.getAllCity();
  }

  test() {
    alert("this")
  }

  getCustomerRefferalList() {
    debugger
    // alert("alert")
    console.log(this.FilterCity, this.FilterReffType);

    this.CityApiService.GetCustomerRefferalConfig(this.FilterReffType, this.FilterCity.Cityid).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.AllCustomerList = res;
          this.AllCustomerList = this.AllCustomerList.reverse();
        } else {
          alert("List is Empty");
        }
      },
      (err) => {
        // console.log(err);
        alert("ERROR - Cannot GET Customer Referral Config List");
      }
    );
  }

  getAllCity() {
    this.CityApiService.GetAllCity().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.allClityList = res;
          this.allClityList.unshift({ CityName: "Select Here", Cityid: 0 })
        } else {
          this.allClityList = [];
        }
      },
      (err) => {
        console.log(err);
        alert("ERROR - Cannot GET city list");
      }
    );
  }

  openAddCustReffPopUp() {

    this.tempCustList = [];
    this.selectedCity = undefined;
    this.OnOrder = undefined;
    this.orderStatus = undefined;
    this.walletPoints = undefined; //referralWalletPoint
    this.CustomerWalletPoint = undefined;
    this.SelectedReffType = undefined;
    this.openAddDialog = true;

  }

  closeAddCustReffPopUp() {
    this.openAddDialog = false;
  }

  numberOnly(event): boolean {
    var digitNumber = event.key;
    if (digitNumber <= 9) {

    } else {
      return false;
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberOnlyWalletPoint(event): boolean {
    var digitNumber = event.key;
    if (digitNumber <= 9) {

    } else {
      return false;
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  check() {

    // console.log(this.selectedCity);
    debugger

    if (this.selectedCity == undefined) {
      alert("Please Enter city");
    } else {

      if (this.selectedCity.Cityid == 0) {
        alert("Please Enter city");
      } else {

        if (this.SelectedReffType == undefined) {
          alert("Please Enter Referral Type")
        } else {
          if (this.SelectedReffType.value == 0) {
            alert("Please Enter Referral Type")
          } else {

            if (this.OnOrder == undefined || this.OnOrder == 0) {
              alert("Please Enter Order Value")
            } else {

              if (this.orderStatus == undefined) {
                alert("please enter order status")
              } else {
                if (this.orderStatus.id == 0) {
                  alert("please enter order status")
                } else {
                  if (this.walletPoints == undefined ) { //referralWalletPoint
                    alert("please enter Wallet Points")
                  } else {

                    if (this.CustomerWalletPoint == undefined ) {
                      alert("please enter Customer Wallet Points")
                    } else {

                      console.log("this.orderStatus", this.orderStatus);



                      let payload = {
                        CityName: this.selectedCity.CityName,
                        CityId: this.selectedCity.Cityid,
                        OnOrder: this.OnOrder,
                        OnDeliverd: this.orderStatus.id,
                        ReferralWalletPoint: this.walletPoints, //referralWalletPoint
                        ReferralType: this.SelectedReffType.value,
                        CustomerWalletPoint: this.CustomerWalletPoint,
                        orderStatusName: this.orderStatus.OrderStatus
                      }

                      console.log(payload);

                      this.CityApiService.checkCustomerRefferalConfig(payload).subscribe(
                        (res) => {
                          // alert(res);
                          console.log(res);

                          if (res == "Checked Successfully!!") {
                            // this.closeAddCustReffPopUp();
                            // alert("Saved Successfully");






                            let flag = 0;



                            if (this.tempCustList.length > 0) {
                              this.tempCustList.forEach(element => {
                                console.log(payload, element);
                                if (payload.CityId == element.CityId && payload.ReferralType == element.ReferralType && payload.OnOrder == element.OnOrder) {
                                  flag = 1;
                                }
                              });
                            } else {
                              flag = 2;
                            }

                            // alert(flag)
                            if (flag == 1) {
                              alert("Already exists in the List")
                            } else if (flag == 2 || flag == 0) {
                              // this.getCustomerRefferalList();
                              this.tempCustList.push(payload);

                              // this.selectedCity = undefined;
                              this.OnOrder = undefined;
                              //this.orderStatus = undefined;
                              this.walletPoints = undefined; //referralWalletPoint
                              this.CustomerWalletPoint = undefined;
                              // this.SelectedReffType = undefined;
                            }



                          } else {
                            alert("Already Exists In the Main List");
                          }
                        },
                        (err) => {
                          alert("ERROR - Cannot POST - CustomerReferralConfig")
                        }
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  openDeleteCustReffPopUp(id) {
    this.deleteSelection = id;
    console.log(id);
    this.openDeleteDialog = true;
  }

  closeDeleteCustReffPopUp() {
    this.openDeleteDialog = false;
  }

  deleteFromList() {
    this.CityApiService.DeleteCustomerRefferalConfig(this.deleteSelection).subscribe(
      (res) => {
        console.log(res);

        if (res != 0) {
          this.closeDeleteCustReffPopUp();
          this.getCustomerRefferalList();
        }
      }, (err) => {
        alert("ERROR - Cannot Delete, Please Try Again")
      }
    );
  }

  changeActiveStatus(obj) {
    console.log(obj);

    this.CityApiService.SetCustReffConfigActiveStatus(obj).subscribe(
      (res: string) => {
        console.log("status", res);
        if (res != "changes saved!") {
          // this.AllCustomerList[id-1].IsActive = !IsActive;
          this.getCustomerRefferalList();
          alert("Please Deactivate same order referral before activation");
        }
      },
      (err) => {
        console.log(err);
        alert("Error - Cannot Set customer Referral config. status. Try Again");
        this.getCustomerRefferalList();
      }
    );

  }

  getCustomerRefstatus() {
    this.CityApiService.GetCustomerRefstatus().subscribe(
      (res) => {
        console.log(res);
        this.allCustomerRefStatus = res;
        this.allCustomerRefStatus.unshift({ OrderStatus: "Select Here", id: 0 })
      },
      (err) => {
        console.log(err);
        alert("Error - Cannot Get Customer Referral status. Try Again");
      }
    );
  }

  save() {
    debugger
    console.log("magic here", this.tempCustList);
    if (this.tempCustList.length == 0) {
      alert("Please Add Entries to the list");
    } else {
      this.CityApiService.SubmitBulkCustReferralData(this.tempCustList).subscribe(
        (res) => {
          console.log(res);
          alert("Entries Added Successfully");
          this.getCustomerRefferalList();
          this.closeAddCustReffPopUp();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  removeFromList(i) {

    this.tempCustList.forEach((element, index) => {
      if (index == i) this.tempCustList.splice(index, 1);
    });
    // this.tempCustList.splice(i)
  }

  exportExcel() {
    if (this.AllCustomerList.length == 0) {
      alert("List is empty")
    } else {
      let expoList = [];
      this.AllCustomerList.forEach((element, index) => {
        let beatExport = {
          City_Name: element.CityName,
          Referral_Type: element.ReferralType == 1 ? "Customer"  : element.ReferralType == 3 ? "Consumer" :"People",
          On_Order_Count: element.OnOrder,
          Order_Status: element.OnDeliverd == 1 ? "Delivered" :
            (element.OnDeliverd == 2 ? "Sattled" :
              (element.OnDeliverd == 3 ? "Pending" :
                (element.OnDeliverd == 4 ? "Issued" :
                  (element.OnDeliverd == 5 ? "Shipped" : "Delivered/sattled"
                  )))),
          Referral_Wallet_Point: element.ReferralWalletPoint,
          Customer_Wallet_Point: element.CustomerWalletPoint,
          Status: element.IsActive == 1 ? 'Active' : 'Inactive',
        }
        expoList.push(beatExport);
      });
      this.exportService.exportAsExcelFile(expoList, 'CustoemerReferral');
    }
  }

  openHistory(Data) {
    this.historyID = Data.id;
    this.viewHistory = true;
  }
}

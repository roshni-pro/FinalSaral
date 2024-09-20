import { Component, OnInit } from '@angular/core';
import { DirectOpenNetworkPincodeService } from '../direct-Open-Network-Pincode-services/direct-open-network-pincode.service';

@Component({
  selector: 'app-open-network-pincode',
  templateUrl: './open-network-pincode.component.html',
  styleUrls: ['./open-network-pincode.component.scss']
})
export class OpenNetworkPincodeComponent implements OnInit {

  searchPinCode: any;
  addPinCode: any;
  openAddDialog: boolean = false;


  directNetworkTable: any[];


  allWarehouses: any[] = [];
  selectedWarehouse: any;


  selectedCluster: any;
  allCluster: any[];
  isClusterAvailbale: boolean = false;

  allPincodeList: any[];
  openDeleteDialog: boolean = false;
  deleteButtonID: number;
  deletePincodeConfirmation: number;


  constructor(private apiService: DirectOpenNetworkPincodeService) { }

  ngOnInit() {
    this.getPincodeList();
  }

  getPincodeList() {
    this.apiService.GetPincodeList().subscribe(
      (res) => {
        console.log(res)
        if (res) {
          this.allPincodeList = res;
        } else {
          this.allPincodeList = [];
        }
      },
      (err) => {
        console.log(err);
        this.allPincodeList = [];
      }
    );
  }

  //logical functions
  getWarehouses() {
    this.apiService.getWarehouseList().subscribe(
      (res) => {
        console.log(res);
        if (res.length > 0) {
          this.allWarehouses = res;
          //this.selectedWarehouse = this.allWarehouses[0];
          this.allWarehouses.unshift({
            WarehouseName: "Select Warehouse",
            value: undefined
          })
          //this.getClustersByWarehouse();
        } else {
          alert("warehouse list is empty")
          this.allWarehouses = [];
        }
      },
      (err) => {
        this.allWarehouses = [];
        alert("Error - Cannot GET Warehouse List")
        console.log(err);
      },
    );
  }

  getClustersByWarehouse() {
    debugger
    console.log(this.selectedWarehouse);
    if (this.selectedWarehouse.WarehouseName != "Select Warehouse") {
      let warehouseID = this.selectedWarehouse.WarehouseId;
      this.apiService.getClusterbyWarehouseID(warehouseID).subscribe(
        (res) => {
          console.log(res);
          if (res.length > 0) {
            this.allCluster = res;
            //this.selectedCluster = this.allCluster[0];
            this.allCluster.unshift({
              ClusterName: "Select Cluster",
              value: undefined
            })
            this.isClusterAvailbale = true;
          } else {
            // alert("Cluster list is empty")
            this.allCluster = [];
            this.selectedCluster = undefined;
            this.isClusterAvailbale = false;
          }
        },
        (err) => {
          this.allCluster = [];
          alert("Error - Cannot GET Warehouse List")
          this.selectedCluster = undefined;
          this.isClusterAvailbale = false;
          console.log(err);
        },
      );
    } else {
      this.allCluster = [];
      this.selectedCluster = undefined;
      this.isClusterAvailbale = false;
    }

  }


  savePincode() {
    
    // console.log("warehouse - ", this.selectedWarehouse, "cluster", this.selectedCluster, "pincode", this.addPinCode);
    
    if (this.addPinCode == null || this.addPinCode == undefined || this.addPinCode == '' || this.addPinCode.length < 6) {
      alert("please Enter a valid Pin Code")
    } else {
      if (this.selectedWarehouse == undefined) {
        alert("Please Select a Warehouse")
      } else {
        if (this.selectedCluster == [] || this.selectedCluster == null || this.selectedCluster == undefined) {
          alert("please select a Cluster")
        } else {
          let body = {
            PinCode: parseInt(this.addPinCode),
            MappingWarehouseId: this.selectedWarehouse.WarehouseId,
            DefaultClusterId: this.selectedCluster.ClusterId
          }
          // console.log("body", body);
          this.addPinCode = this.addPinCode.trim();
          debugger
          this.apiService.submitPincodeList(body).subscribe(
            (res) => {
              console.log(res);
              if (res.ErrorMsg == "Already exists") {
                alert("Pin-Code Alredy Exists")
              } else {
                alert("Pin-Code Submitted Successfully");
                this.openAddDialog = false;
                this.getPincodeList();
              }
            },
            (err) => {
              console.log(err);
            }
          );
        }
      }
    } 
  }

  deletePincode() {
    // console.log("delete function", deleteID);
    this.apiService.deletePincode(this.deleteButtonID).subscribe(
      (res) => {
        console.log(res);
        if (res != 0) {
          this.openDeleteDialog = false;
          this.getPincodeList();
          alert("Deleted Successfully");
        } else {
          alert("Failed to Delete, Please Try Again")
        }
      },
      (err) => {
        console.log(err);
        alert("ERROR - Cannot DELETE")
      }
    );

  }










  //HTML structural Functions
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

  openAddDialogBox() {
    this.selectedWarehouse = undefined;
    this.selectedCluster = undefined;
    this.addPinCode = undefined;
    this.getWarehouses();
    this.openAddDialog = true;
  }

  openDeleteDialogBox(DeleteID, pincode) {
    this.deletePincodeConfirmation = pincode;
    this.deleteButtonID = DeleteID;
    this.openDeleteDialog = true;
  }

  closeAddDialogBox() {
    this.openAddDialog = false;
  }

  closeDeleteDialogBox() {
    this.deletePincodeConfirmation = undefined;
    this.deleteButtonID = undefined;
    this.openDeleteDialog = false;
  }

  searchByPincode() {
    // if (this.searchPinCode == null || this.searchPinCode == undefined || this.searchPinCode == '' || this.searchPinCode.length < 6) {
    //   alert("please enter a valid Pin Code")
    //   this.searchPinCode = undefined;
    // } else {

    // }
  }


}

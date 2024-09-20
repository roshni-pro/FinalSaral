import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/store/services/store.service';
import { SearchMappedExeOnClusterDc } from 'app/store/interfaces/SearchMappedExeOnClusterDc'
import * as XLSX from 'xlsx';
import { ClusterService } from 'app/shared/services/cluster.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';



export interface ClusterExecutiveBeatExport {
  Skcode: string;
  BeatNumber: number | null;
  Day: string;
  EvenOrOddWeek: string;
}


export interface ClusterExecutiveBeat {
  BeatNumber: number | null;
  Skcode: string;
  Day: string;
  ExecutiveId: number;
  SkipDays: number;
  SkipWeeks: number;
  StoreId: number;
  EvenOrOddWeek: string;
}

export interface ValidatingAssignBeatDc {
  ClusterExecutiveBeat: any;
  clusterIds: any;
  StoreId: number;
}

@Component({
  selector: 'app-store-cluster-beat-mapping',
  templateUrl: './store-cluster-beat-mapping.component.html',
  styleUrls: ['./store-cluster-beat-mapping.component.scss']
})

export class StoreClusterBeatMappingComponent implements OnInit {

  popUp: boolean = false;

  allClusterList: any;
  allWarehousList: any;
  allStoreList: any;
  popClusterList: any;

  selectedStore: any;
  selectedWareHouse: any;
  selectedCluster: any[] = [];

  mainList: any[] = [];
  SelectedDetails: any[] = [];
  ExeMappedCustomerList: any[] = [];
  SearchMappedExeOnClusterDc: SearchMappedExeOnClusterDc;
  beatList: ClusterExecutiveBeat[] = [];

  ValidatingAssignBeat: ValidatingAssignBeatDc = {
    ClusterExecutiveBeat: [],
    clusterIds: [],
    StoreId: null
  };

  finalSelectedClusterIds: any[];
  SkcodePopUPFilter: any = '';

  isSwitchAvailable: boolean = false;
  isPostAvailable: boolean = false;
  // @Component({
  //   selector: 'app-store-cluster-beat-mapping',
  //   templateUrl: './store-cluster-beat-mapping.component.html',
  //   styleUrls: ['./store-cluster-beat-mapping.component.scss']
  // })
  constructor(public APIService: StoreService, private exportService: ExportServiceService) {

  }

  ngOnInit() {
    this.getStoreList();
    this.getWareHouseList();
  }

  detailsPopUp(data) {
    this.ExeMappedCustomerList = [];
    this.SelectedDetails = data;
    this.SkcodePopUPFilter = '';
    this.popUp = true;
    this.showDetails(data);
  }

  getStoreList() {
    this.APIService.GetStoreList().subscribe(
      (res) => {
        console.log(res);
        this.allStoreList = res;
        this.allStoreList.unshift({ Name: "Select Here", id: 0 })
      },
      (err) => {
        console.log(err);
        alert("ERROR - Cannot Get Store List, Please Try Again");
      }
    );
  }

  getWareHouseList() {
    this.APIService.GetWareHouseList().subscribe(
      (res) => {
        console.log(res);
        this.allWarehousList = res;
        this.allWarehousList.unshift({ WarehouseName: "Select Here", WarehouseId: 0 });
      },
      (err) => {
        console.log(err);
        alert("ERROR - Cannot Get Warehouse List, Please Try Again");
      }
    );
  }

  getClusterList() {
    console.log(this.selectedWareHouse.WarehouseId);
    this.selectedCluster = undefined;
    this.APIService.GetClusterList(this.selectedWareHouse.WarehouseId).subscribe(
      (res: any[]) => {
        console.log(res);
        if (res.length > 0) {
          this.allClusterList = res;
          // this.allClusterList.unshift({ ClusterName: "Select Here", ClusterId: 0 })
        } else {
          this.allClusterList = [];
          // alert("Cluster List is empty for this input-set");
        }
      },
      (err) => {
        console.log(err);
        alert("ERROR - Cannot Get Cluster List, Please Try Again");
      }
    );
  }


  searchMainList() {

    let payload = undefined;
    // console.log(this.selectedCluster);
    let clusterIDs: any[] = [];
    if (this.selectedCluster.length > 0) {
      this.selectedCluster.forEach(element => {
        clusterIDs.push(element.ClusterId);
      });
    }

    this.finalSelectedClusterIds = clusterIDs;

    // console.log(clusterIDs);

    payload = {
      ClusterIds: clusterIDs,
      StoreId: this.selectedStore.Id
    }

    this.APIService.StoreClusterExecutive(payload).subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.mainList = res;
          if(this.mainList.length>0){
            this.isSwitchAvailable = true;
          }else{
            this.isSwitchAvailable = false;
          }
        }
      },
      (err) => {
        console.log(err);
        this.mainList = [];
        this.isSwitchAvailable = false;
        alert("ERROR - Cannot Get Cluster List, Please Try Again");
      }
    );

  }

  showDetails(data) {
    // let Cids = [];
    console.log("data", data);

    this.SearchMappedExeOnClusterDc = {
      clusterIds: [data.ClusterId],
      ExecutiveId: data.ExecutiveId,
      StoreId: data.StoreId
    }

    console.log("DC", this.SearchMappedExeOnClusterDc);


    this.APIService.getMappedCustomerOnCluster(this.SearchMappedExeOnClusterDc).subscribe(
      (res) => {
        console.log(res);
        this.ExeMappedCustomerList = res;
        // this.SkcodePopUPFilter = '';
      },
      (err) => {
        this.ExeMappedCustomerList = [];
        alert("ERROR - Cannot get detils")
        console.log(err);
        // this.SkcodePopUPFilter = undefined;

      }
    );
  }

  onUpload(event, uploadCustom) {
    debugger
    // this.IsPostBeat = false;
    // this.outOfbeatSkcode = null;
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      var dataFromExcel = jsonData;
      const dataString = JSON.stringify(jsonData);

      let excelData = dataFromExcel.data;
      let invalid = false;
      let detailOfIndexedItem = [];

      if (excelData.length > 0) {

        this.beatList = null;
        let uploadbeatList = [];
        excelData.forEach((element, index) => {


          // let beat: ClusterExecutiveBeat = {
          //   BeatNumber: element.BeatNumber,
          //   Skcode: element.Skcode,
          //   Day: element.Day,
          //   //SkipDays: 0,
          //   //SkipWeeks: 0,
          //   //ExecutiveId: this.currentExecutive.ExecutiveId,
          //   //StoreId: this.StoreId,
          //   EvenOrOddWeek: element.EvenOrOddWeek,
          // }

          let beat: ClusterExecutiveBeat = {
            BeatNumber: element.BeatNumber,
            Skcode: element.Skcode,
            Day: element.Day,
            SkipDays: 0,
            SkipWeeks: 0,
            ExecutiveId: 0,
            StoreId: this.selectedStore.Id,
            EvenOrOddWeek: element.EvenOrOddWeek,
          }

          uploadbeatList.push(beat);
        });


        this.beatList = uploadbeatList;
        // this.blocked = true;

        this.ValidatingAssignBeat.ClusterExecutiveBeat = this.beatList;
        // this.ValidatingAssignBeat.clusterIds = this.SearchMappedExeOnClusterDc.clusterIds;
        this.ValidatingAssignBeat.clusterIds = this.finalSelectedClusterIds;
        this.ValidatingAssignBeat.StoreId = null;
        this.APIService.validatingAssignBeat(this.ValidatingAssignBeat).subscribe(x => {
          console.log(x);

          // this.blocked = false;
          if (x) {
            alert(x);
            // this.outOfbeatSkcode = x;
            // this.displayoutOfbeatSkcode = true;
            // this.messageService.add({ severity: 'success', summary: 'Update Done!', detail: '' });
            this.isPostAvailable = false;
          }
          else {
            this.isPostAvailable = true;
            // alert("Invalid")
            // this.IsPostBeat = true;
          }
        },
          error => {
            this.isPostAvailable = false;
            // this.blocked = false;
            // this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
          });
      }
    }
    reader.readAsBinaryString(file);
  }

  PostBeat() {

    if (this.ValidatingAssignBeat) {
      // this.blocked = true;
      this.APIService.AssignBeat(this.ValidatingAssignBeat).subscribe(x => {
        // this.displayUploadDialog = false;
        // this.IsPostBeat = false;
        // this.blocked = false;

        if (x) {
          alert(x);
          window.location.reload();
          // window.location.reload();
          // this.messageService.add({ severity: 'success', summary: x, detail: '' });
        }
        else {
            alert("Failed to Update, Try Again");
          // this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
        }
      },
        error => {
          alert("ERROR -  Failed to Update, Try Again");
          // this.blocked = false;
          // this.messageService.add({ severity: 'error', summary: 'Error In Saving!', detail: '' });
        });
    }

  }

  downloadFile() {

    // this.ExeMappedCustomerList = [];

    let data = {
      clusterIds: this.finalSelectedClusterIds,
      ExecutiveId: 0,
      StoreId: this.selectedStore.Id
    }

    this.SearchMappedExeOnClusterDc = {
      clusterIds: data.clusterIds,
      ExecutiveId: data.ExecutiveId,
      StoreId: data.StoreId
    }

    this.APIService.MappedCustomerOnStoreCluster(this.SearchMappedExeOnClusterDc).subscribe(
      (res) => {
        console.log(res);
        // this.ExeMappedCustomerList = res;
        this.export(res);
      },
      (err) => {
        console.log(err);
      }
    );
    // this.showDetails(data, 2);
  }

  export(data) {
    let beatExportAll = [];
    data.forEach((element, index) => {
      let beatExport: ClusterExecutiveBeatExport = {
        BeatNumber: element.BeatNumber,
        Skcode: element.Skcode,
        Day: element.Day,
        EvenOrOddWeek: element.EvenOrOddWeek
      }
      beatExportAll.push(beatExport);
    });
    // console.log(beatExportAll, this.ExeMappedCustomerList);

    this.exportService.exportAsExcelFile(beatExportAll, 'MappedCustomerList');

  }

  close(){
    this.SkcodePopUPFilter = '';
    this.ExeMappedCustomerList = [];
    this.popUp = false;
  }

  exportExcel(){
    this.export(this.ExeMappedCustomerList);
    // this.exportService.exportAsExcelFile(this.ExeMappedCustomerList, 'Details');
  }


}

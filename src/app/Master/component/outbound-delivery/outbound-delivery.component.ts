import { Component, OnInit, Input } from '@angular/core';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { OutBoundDeliveryMasterService } from './../../services/outbounddeliverymaster.service'
import { OutBoundMappingMaster, OutBoundDeliveryDetails } from './../../interfaces/outbounddeliverymaster'
import { ActivatedRoute, Router } from '@angular/router';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { ItemService } from 'app/shared/services/item.service';
import { CustomerService } from 'app/shared/services/customer.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-outbound-delivery',
  templateUrl: './outbound-delivery.component.html',
  styleUrls: ['./outbound-delivery.component.scss']
})
export class OutboundDeliveryComponent implements OnInit {
  outBoundMappingMaster: OutBoundMappingMaster;
  outBoundDeliveryDetails: OutBoundDeliveryDetails[] = [];
  selectedWarehouseId: any;
  cityId: any;
  data: any;
  public listField: any = []
  arraofData: any = [];
  public coldata: any = [
    { field: 'Vehicle Number', header: 'Vehicle Number' },
    { field: 'Driver Name', header: 'Driver Name' },
    { field: 'Delivery Boy Name', header: 'Delivery Boy Name' },

  ]
  selectedList: any;
  masterwarehouseList: any = [];
  clusterList: any = [];
  agentList: any = [];
  vehicleRegistrationNoLIst = [];
  driverList = [];
  dboyList = [];
  selectedClusterId: any;
  AgentCode: any;
  selectedRegId: any;
  errmsg: string;
  productDialog: boolean;
  EditDialog: boolean;
  showTable: boolean = false;
  @Input() Id: any;
  isEditOpen: boolean = false;
  mappingdetails = [];
  isInvalid: boolean;
  skip: number = 1;
  take: number = 10;
  addMasterId: number;
  public mapplist = [
    {
      'vname': { 'name': 'ajj' },
      'jdj': { 'name': 'ajj' },
      'jhj': { 'name': 'ajj' },
    }

  ]
  constructor(private outBoundDeliveryMasterService: OutBoundDeliveryMasterService,
    private router: Router, private activeRoute: ActivatedRoute,
    private itemService: ItemService, private customerservice: CustomerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,) {
    this.data = {};
  }

  ngOnInit() {
    this.Id = Number(this.route.snapshot.paramMap.get("Id"));
    if (this.Id != 0) {
      this.isEditOpen = true;
      this.getOutByIdData(this.Id)
    }
    else {
      this.isEditOpen = false;
    }

    this.getWarehouse();
  }

  getOutByIdData(id) {
    this.outBoundDeliveryMasterService.getOutbyId(id).subscribe(res => {
      // debugger;
      this.data = res;
      console.log('res:', res);
      var wareid = res.WarehouseId;
      this.data.Warehouseid = wareid;
      var clusid = res.ClusterId;
      this.data.ClusterId = clusid;
      var agid = res.AgentId;
      this.data.AgentId = agid;
      if (!(wareid == undefined || wareid == '' || wareid == null)) {
        this.getCluster(wareid);
      }
      if (!(clusid == undefined || clusid == '' || clusid == null)) {
        this.getAgent(clusid);
      }
      this.showTable = true;
      this.outBoundDeliveryDetails = this.data.OutBoundDeliveryDetails;
    });

  }



  getWarehouse() {
    this.clusterList = []
    this.itemService.GetAllWarehouse().subscribe(result => {
      this.masterwarehouseList = result;
      console.log(this.masterwarehouseList, 'ware');
    });

  }

  getCluster(wID) {
    // debugger
    this.agentList = [];
    this.customerservice.getClusterByCity(wID).subscribe(result => {
      this.clusterList = result;
      this.clusterList.forEach(element => {
        if (element.ClusterId == this.data.ClusterId) {
          this.cityId = element.CityId;
        }
      });
      // if (!(this.data.ClusterId == undefined || this.data.ClusterId == '' || this.data.ClusterId == null)) {
      //   this.getAgent(this.data.ClusterId);
      // }
    })
  }

  getAgent(cID) {
    // debugger
    this.customerservice.getAgentByCluster(cID).subscribe(result => {
      this.agentList = result;
      if (this.Id) {
        this.data.AgentId = this.data.AgentId ? this.data.AgentId : "";
      }
      else {
        this.data.AgentId = "";
      }

      console.log("agentlist is:", this.agentList);
      this.clusterList.filter(element => {
        element.ClusterId == this.data.ClusterId;
        var c = element.CityId;
        this.cityId = c;
        console.log('cityc', c);
     
      console.log('cityca', this.cityId);
      this.GetVehicleRegistrationNoLIst(this.cityId);
      this.GetDriverList(this.cityId);
      this.GetDboyList(this.cityId);
    });
    })

  }

  GetVehicleRegistrationNoLIst(CityId) {
    // debugger
    CityId = this.cityId;
    this.selectedRegId = this.selectedRegId;
    this.outBoundDeliveryMasterService.getVehicleRegistrationNoLIst(CityId).subscribe(x => {
      // debugger;
      this.vehicleRegistrationNoLIst = x;
      console.log(this.vehicleRegistrationNoLIst, 'v');
    })
  }

  GetDriverList(CityId) {
    // CityId=this.cityId;
    this.outBoundDeliveryMasterService.getDriverList(CityId).subscribe(x => {
      this.driverList = x;
      console.log(this.driverList, 'driverList');
    })
  }

  GetDboyList(CityId) {
    // CityId=this.cityId;
    this.outBoundDeliveryMasterService.getDboyList(CityId).subscribe(x => {
      this.dboyList = x;
      console.log(this.dboyList, 'dboyList');
    })
  }


  gotolistpage() {
    this.router.navigate(['/layout/master/OutboundDeliveryList']);
  }



  onSave(data) {
    let vehicle = 0;
    let Driver = 0;
    let Dboy = 0;
    this.outBoundDeliveryDetails.forEach(element => {
      if (element.VehicleMasterId == 0) {
        vehicle++;
      }
      if (element.DriverMasterId == 0) {
        Driver++;
      }
      if (element.DboyMasterId == 0) {
        Dboy++;
      }
    });
    if (vehicle > 0) {
      this.messageService.add({ severity: 'error', summary: 'Please select Vechile!!', detail: '' });
      return;
    }
    if (Driver > 0) {
      this.messageService.add({ severity: 'error', summary: 'Please select Driver!!', detail: '' });
      return;
    }
    if (Dboy > 0) {
      this.messageService.add({ severity: 'error', summary: 'Please select Dboy!!', detail: '' });
      return;
    }
    this.outBoundMappingMaster = {
      Id: this.Id ? this.Id : 0,
      WarehouseId: data.WarehouseId,
      AgentId: data.AgentId,
      ClusterId: data.ClusterId,
      OutBoundDeliveryDetails: this.outBoundDeliveryDetails,

    }

    if (this.Id == 0) {
      this.outBoundMappingMaster.Id = this.addMasterId;
      this.outBoundDeliveryMasterService.Add(this.outBoundMappingMaster).subscribe(x => {
        // debugger
        console.log(x, 'x');
        if (x.Result == true) {
          alert(x.msg);
          this.messageService.add({ severity: 'success', summary: 'Vechile Added ', detail: '' });
          this.router.navigate(['/layout/master/OutboundDeliveryList']);
        }
        else {
          this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
        }
      })
    }
    else {
      // this.outBoundDeliveryMasterService.Edit(this.outBoundMappingMaster).subscribe(x => {
      //   alert(x.msg);
      //   this.messageService.add({ severity: 'success', summary: x, detail: '' });
      //   this.router.navigate(['/layout/master/OutboundDeliveryList']);
      // })
      this.outBoundDeliveryMasterService.Add(this.outBoundMappingMaster).subscribe(x => {
        // debugger
        console.log(x, 'x');
        if (x.Result == true) {
          alert(x.msg);
          this.messageService.add({ severity: 'success', summary: 'Vechile Updated ', detail: x });
          this.router.navigate(['/layout/master/OutboundDeliveryList']);
        }
        else {
          this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
        }
      })
    }
  }
  Edit() {
    this.EditDialog = true;
  }


  OnEditSave() {
    this.outBoundDeliveryMasterService.Edit(this.arraofData).subscribe(x => {
      console.log(x, 'x');
      // this.errmsg=x.msg;
      // alert(this.errmsg);
      this.router.navigate(['/layout/master/OutboundDeliveryList']);

    })
  }



  openNew(mappingForm) {

    // debugger
    if (mappingForm.form.status == "VALID") {
      this.productDialog = true;
    }

    else {

      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
      this.productDialog = false;

    }

    this.mapplist = [
      {
        'vname': { 'name': 'ajj' },
        'jdj': { 'name': 'ajj' },
        'jhj': { 'name': 'ajj' },
      }

    ]
  }

  getOutBoundDetails(data) {
    this.outBoundDeliveryMasterService.getOutBoundDetailsById(data.WarehouseId, data.ClusterId, data.AgentId, this.skip, this.take).subscribe(x => {
      // debugger;
      this.showTable = true;
      this.addMasterId = x.Id;
      if (x.OutBoundDeliveryDetails == null || x.OutBoundDeliveryDetails == undefined) {
        this.outBoundDeliveryDetails = [];
      }
      else {
        this.outBoundDeliveryDetails = x.OutBoundDeliveryDetails;
      }
    });
  }

  saveAddedRowdata(popupForm, data) {
    // debugger
    if (popupForm.form.status == "VALID") {
      if (!this.Id) {
        // debugger
        var obj = {
          Id: this.data.Id,
          VehicleMasterId: this.data.VehicleMasterId,
          DriverMasterId: this.data.DriverMasterId,
          DboyMasterId: this.data.DboyMasterId,
          IsDeleted: false
        }
        this.outBoundDeliveryDetails.push(obj);
        this.productDialog = false
        this.showTable = true
      }
      else {

      }
      this.data.VehicleMasterId = null;
      this.data.DriverMasterId = null;
      this.data.DboyMasterId = null;
    }
    else {
      this.isInvalid = true;
      this.productDialog = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });

    }


  }

  hideDialog() {
    this.data.VehicleMasterId = "";
    this.data.DriverMasterId = "";
    this.data.DboyMasterId = "";
    this.productDialog = false;
  }

  deleteSelectedRow(config) {
    // debugger
    //   if(config.Id !=0){
    //   this.confirmationService.confirm({
    //     message: 'Are you sure that you want to perform this action?',
    //     accept: () => {
    //       const index = this.outBoundDeliveryDetails.indexOf(config);
    //       this.outBoundDeliveryDetails.splice(index, 1);
    //       var obj = {
    //         Id: config.Id,
    //         VehicleMasterId: config.VehicleMasterId,
    //         DriverMasterId: config.DriverMasterId,
    //         DboyMasterId: config.DboyMasterId,
    //         IsDeleted : true
    //       }
    //       this.outBoundDeliveryDetails.push(obj);
    //       this.messageService.add({ severity: 'success', summary: 'removed successfullt', detail: '' });

    //     }
    //   });
    // }
    // else{
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        const index = this.outBoundDeliveryDetails.indexOf(config);
        this.outBoundDeliveryDetails.splice(index, 1);
        this.messageService.add({ severity: 'success', summary: 'Removed successfully', detail: '' });

      }
    });
    // }
  }

  goBack() {

  }



}

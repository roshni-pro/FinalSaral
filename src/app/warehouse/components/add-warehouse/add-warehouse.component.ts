import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { SelectItem, MessageService } from 'primeng/api';
import { CustomerService } from 'app/shared/services/customer.service';
import { CountryService } from 'app/shared/services/country.service';
import { ZoneService } from 'app/shared/services/zone.service';
import { RegionService } from 'app/shared/services/region.service';
import { DateFormatorService } from 'app/shared/services/date-formator.service';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.scss']
})
export class AddWarehouseComponent implements OnInit {
  @Input() warehouseID: any
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  warehouse: any
  cityList: any;
  warehouseList: any;
  stateList: any;
  taxGroupList: any;
  taxGroup: any[];
  isInvalid: boolean;
  peopleList: any;
  countryList: any;
  zoneList: any;
  regionList: any;
  addwarehousee: boolean = true;
  warehousee: any;
  constructor(private messageService: MessageService, private customerservice: CustomerService, private warehouseService: WarehouseService,
    private router: Router, private pilotService: PepolePilotService, private regionService: RegionService, private zoneService: ZoneService
    , private countryService: CountryService, private dateFormatorService: DateFormatorService
    , private datepipe: DatePipe) { this.warehouse = {} }

  ngOnInit() {
    this.isInvalid = false;
    this.pilotService.States().subscribe(result => {
      this.stateList = result;
    })

    if (this.warehouseID) {
      this.warehouseService.GetByID(this.warehouseID).subscribe(result => {

        this.warehouse = result;
        console.log(this.warehouse);
        this.warehouse.FSSAILicenseDate = moment(this.warehouse.FSSAILicenseDate).format('YYYY-MM-DD'); //this.datepipe.transform(this.warehouse.FSSAILicenseDate, 'YYYY-MM-DD');
        this.warehouse.FSSAILicenseExpiryDate = moment(this.warehouse.FSSAILicenseExpiryDate).format('YYYY-MM-DD'); //this.datepipe.transform(this.warehouse.FSSAILicenseExpiryDate, 'dd-MM-yyyy');
        // this.warehouse.FSSAILicenseDate = this.datepipe.transform(this.warehouse.FSSAILicenseDate, 'dd/MM/yyyy');
        // this.warehouse.FSSAILicenseExpiryDate = this.datepipe.transform(this.warehouse.FSSAILicenseExpiryDate, 'dd/MM/yyyy');

        if (this.warehouse.FSSAILicenseDate == "01/00/1900") {
          this.warehouse.FSSAILicenseDate = null
        }
        if (this.warehouse.FSSAILicenseExpiryDate == "01/00/1900") {
          this.warehouse.FSSAILicenseDate = null
        }

        console.log(this.warehouse);
        if (this.warehouse.Stateid) {
          this.pilotService.City().subscribe(result => {
            this.cityList = result.filter(x => x.Stateid == this.warehouse.Stateid);
          });
        }

      })
    } else {
      this.pilotService.City().subscribe(result => {

        this.cityList = result;
      })
    }


    this.warehouseService.GetAllTaxGroup().subscribe(result => {

      this.taxGroup = result;

    })


    this.countryService.GetAllCountry().subscribe(result => {
      this.countryList = result;
    })
    this.zoneService.GetAllZone().subscribe(result => {
      this.zoneList = result;
    })
    this.regionService.GetAllRegion().subscribe(result => {
      this.regionList = result;
    })
    this.warehouseService.WarehouseManagerName().subscribe(result => {
      this.peopleList = result;
    })


  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onclick(warehouseForm: any) {

    this.addwarehousee = false;
    this.warehouse.FSSAILicenseDate = moment(this.warehouse.FSSAILicenseDate).format('YYYY-MM-DD'); //this.datepipe.transform(this.warehouse.FSSAILicenseDate, 'YYYY-MM-DD');
    this.warehouse.FSSAILicenseExpiryDate = moment(this.warehouse.FSSAILicenseExpiryDate).format('YYYY-MM-DD'); //this.datepipe.transform(this.warehouse.FSSAILicenseExpiryDate, 'dd-MM-yyyy');

   
    // console.log('warehouseForm: ', warehouseForm);
    // console.log(this.warehouse.FSSAILicenseDate);
    // console.log(this.warehouse.FSSAILicenseExpiryDate);
    if (this.warehouse.FSSAILicenseDate == null || this.warehouse.FSSAILicenseDate == '' || this.warehouse.FSSAILicenseDate == undefined) {
      alert("Enter - FSSAILicenseDate")
    } else {
      if (this.warehouse.FSSAILicenseExpiryDate == null || this.warehouse.FSSAILicenseExpiryDate == '' || this.warehouse.FSSAILicenseExpiryDate == undefined) {
        alert("Enter - FSSAILicenseExpiryDate")
      } else {
        // alert("API")
        // console.log(this.warehouse.FSSAILicenseDate);
        // console.log(this.warehouse.FSSAILicenseExpiryDate);
        // this.warehouse.FSSAILicenseDate = this.warehouse.FSSAILicenseDate.trim()
        // this.warehouse.FSSAILicenseExpiryDate = this.warehouse.FSSAILicenseExpiryDate.trim()
        if (warehouseForm.form.status == "VALID") {
          if (this.warehouseID == null) {
            this.warehouseService.addWarehouse(this.warehouse).subscribe(result => {

              this.warehousee = result;

              this.addwarehousee = true;

              this.router.navigateByUrl('/layout/warehouse/warehouse')

            },
              (err) => {
                this.addwarehousee = true;
                alert("error")

              });
          } else {
            this.warehouseService.UpdateWarehouse(this.warehouse).subscribe(result => {
              this.warehousee = result;

              this.addwarehousee = true;

              console.log(this.warehouseID);
              this.refreshParent.emit();
              this.router.navigateByUrl('/layout/warehouse/warehouse');
              // this.expanded = false;
            },
              (err) => {
                this.addwarehousee = true;
                // alert("error")
                alert("error")

              });
          }
        } else {

          this.isInvalid = true;
          this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
        }
      }
    }




  }

  onStateChange(id, type) {
    console.log(id);
    console.log(name);
    if (type == 'state') {
      this.pilotService.City().subscribe(result => {
        this.cityList = result.filter(x => x.Stateid == id);
      });
    }
  }
  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/warehouse/warehouse')
  }
}

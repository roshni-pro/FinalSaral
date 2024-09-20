import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VendorPaymentService } from "app/operation-capacity/services/vendor-payment.service";
import { environment } from "environments/environment";

@Component({
  selector: "app-fleet-detail",
  templateUrl: "./fleet-detail.component.html",
  styleUrls: ["./fleet-detail.component.scss"],
})
export class FleetDetailComponent implements OnInit {
  @Input() doc: any[];
  @Input() fleetDetail: any[];
  baseURL:any;
  constructor(private vendorService: VendorPaymentService) {    this.baseURL = environment.apiURL;
  }

  ngOnInit() {
    console.log('checkdoc',this.doc, this.fleetDetail);
  }

  openImage(doc){
    window.open(this.baseURL+ doc)
  }
}

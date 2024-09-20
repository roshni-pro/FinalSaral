import { Component, OnInit, Input, ViewChild, AfterViewChecked } from '@angular/core';
import { environment } from 'environments/environment';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-distributorverification-images',
  templateUrl: './distributorverification-images.component.html',
  styleUrls: ['./distributorverification-images.component.scss']
})
export class DistributorverificationImagesComponent implements AfterViewChecked {
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  @Input() distributiondt: any;

  Signature: string;
  DrugLicense: string;
  FoodLicense: string;
  GST: string;
  PAN: string;
  Aadhar:string;
  baseURL : any;
  Blankcheque:string;
  UploadLicensePicture:string;
  highlighted: boolean = false;
  constructor() { 
    this.baseURL = environment.apiURL; 
  }

  ngAfterViewChecked() {
    
    this.carousel.pause();
    this.Signature = this.distributiondt.Signature ? this.baseURL+'/DistributorImages/'+ this.distributiondt.Signature:"";
   // this.DrugLicense = this.baseURL +'/DistributorImages/'+ this.distributiondt.DrugLicense;
    this.FoodLicense = this.distributiondt.FoodLicense ? this.baseURL +'/UploadedImages/'+ this.distributiondt.FoodLicense:"";
    this.GST =this.distributiondt.GST ? this.baseURL +'/UploadedImages/'+ this.distributiondt.GST :"";
    if(this.distributiondt.TypeOfBusiness =='Direct Open Network')
    {
    this.PAN = this.distributiondt.PAN ? this.baseURL +'/UploadedImages/'+ this.distributiondt.PAN :"";
    this.Aadhar = this.distributiondt.Aadhar ? this.baseURL +'/UploadedImages/'+ this.distributiondt.Aadhar:"";
    this.Blankcheque =this.distributiondt.BlankCheque ? this.baseURL +'/UploadedImages/'+ this.distributiondt.BlankCheque :"";
    }
    else
    {

      this.PAN = this.distributiondt.PAN ? this.baseURL +'/DistributorImages/'+ this.distributiondt.PAN :"";
    this.Aadhar = this.distributiondt.Aadhar ? this.baseURL +'/DistributorImages/'+ this.distributiondt.Aadhar:"";
    this.Blankcheque =this.distributiondt.BlankCheque ? this.baseURL +'/DistributorImages/'+ this.distributiondt.BlankCheque :"";
   
    }
    this.UploadLicensePicture = this.distributiondt.UploadLicensePicture ? this.baseURL +'/UploadedImages/'+ this.distributiondt.UploadLicensePicture : "";
  }

}

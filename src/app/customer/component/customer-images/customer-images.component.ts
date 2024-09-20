import { Component, AfterViewChecked, Input, ViewChild } from '@angular/core';
import { NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import { HighlightService } from 'app/shared/services/highlight.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-images',
  templateUrl: './customer-images.component.html',
  styleUrls: ['./customer-images.component.scss']
})
  
export class CustomerImagesComponent implements AfterViewChecked {

    @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

    @Input() details: any;

    GSTImage: string;
    LicenseImage: string;
    profilePicture: string;
    registrationImage: string;
    shopImage: string;
    baseURL : any
    highlighted: boolean = false;
  
    constructor(private highlightService: HighlightService) {
      this.baseURL = environment.apiURL;
    }
  
    ngAfterViewChecked() {
      this.carousel.pause();
     
       this.GSTImage =this.details.UploadGSTPicture ? this.baseURL+'/UploadedImages/'+ this.details.UploadGSTPicture:"";
      this.LicenseImage = this.details.UploadLicensePicture?this.baseURL +'/UploadedImages/'+ this.details.UploadLicensePicture:"";
      this.profilePicture = this.details.UploadProfilePichure?this.baseURL +'/UploadedImages/'+ this.details.UploadProfilePichure:"";
      this.registrationImage = this.details.UploadRegistration ? this.baseURL +'/UploadedImages/'+ this.details.UploadRegistration:"";
      this.shopImage =  this.details.Shopimage? this.baseURL +'/UploadedImages/'+ this.details.Shopimage:"";
      // this.highlightService.highlightAll();
    }
}
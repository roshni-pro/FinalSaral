import { Component, OnInit, Input } from '@angular/core';
//import { element } from 'protractor';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-mobile-banner',
  templateUrl: './mobile-banner.component.html',
  styleUrls: ['./mobile-banner.component.scss']
})
export class MobileBannerComponent implements OnInit {
  @Input() section: any;
  @Input() bannerType: any;
  apiURL: string;
  cloudUrl:string;
  constructor() { 
    // console.log(this.section, this.bannerType);
    this.apiURL=environment.apiURL;
    this.cloudUrl='https://res.cloudinary.com';
  }

  ngOnInit() {
    console.log(this.section);
    this.section.forEach(element=>{
      if(element.BannerImage && (!(element.BannerImage.includes(this.apiURL)) && !(element.BannerImage.includes(this.cloudUrl)) )){
        element.BannerImage=this.apiURL+element.BannerImage
      }
    })
  }

  clear(){
    
  }

}

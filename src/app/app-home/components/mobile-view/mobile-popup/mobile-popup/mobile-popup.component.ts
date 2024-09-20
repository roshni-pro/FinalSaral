import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-mobile-popup',
  templateUrl: './mobile-popup.component.html',
  styleUrls: ['./mobile-popup.component.scss']
})
export class MobilePopupComponent implements OnInit {
  @Input() section: any;
  @Input() popupType: any;
  apiURL: any;
  cloudUrl: string;
  constructor() {
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

}

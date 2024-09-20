import { Component, OnInit } from '@angular/core';
import { OrangebookversionService } from 'app/shared/services/orangebookversion.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-orangebookacceptance',
  templateUrl: './orangebookacceptance.component.html',
  styleUrls: ['./orangebookacceptance.component.scss']
})
export class OrangebookacceptanceComponent implements OnInit {
  versionList : any;
  obid : any;
  filepathList : any;
  url:any;
  OBLatestVersion :any ;
  OBID : any;
  FilePath:any;
  IsAccept : boolean;
  blocked: boolean;
  path: any;
  constructor(private orangebookversionservice : OrangebookversionService, private sanitizer: DomSanitizer) { 
   // this.url = this.orangebookversionservice.apiURL + '/OrangeBook/About Shopkirana02-11-2019.pdf'; 
    this.path = this.orangebookversionservice.apiURL + '/OrangeBook/About Shopkirana02-11-2019.pdf';  
    console.log('OBLatestVersion : ',this.path);
    
  }

  getSantizeUrl(url : string) { 
    
    return this.sanitizer.bypassSecurityTrustUrl(url); 
}

  ngOnInit() {
    // this.orangebookversionservice.OBversionAcceptance( ).subscribe(result =>{
    //   console.log('OBLatestVersion : ',result);
    //   this.OBLatestVersion = result.Version;
    //   this.OBID = result.Id;
    //   this.FilePath = result.FilePath;
      
    // })
  }
    AddODversionAcceptance(){
      
      this.blocked = true;
    // this.orangebookversionservice.AddODversionAcceptance(this.OBID).subscribe(result =>{
    //   
    //   this.blocked = false;
    //   this.filepathList = result;
    //   alert(this.filepathList.Message);
    //   window.location.reload();
    // })
  }

  
}
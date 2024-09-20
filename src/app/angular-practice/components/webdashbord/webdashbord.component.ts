import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../../service/shared-data.service'

@Component({
  selector: 'app-webdashbord',
  templateUrl: './webdashbord.component.html',
  styleUrls: ['./webdashbord.component.scss']
})
export class WebdashbordComponent implements OnInit {

  constructor(private sharedDataService:SharedDataService) { }

  ngOnInit() {

  }

  call(){
    console.log("hu lala hu lala");
    
    this.sharedDataService.logData.subscribe(result=>{
      console.log("-------------------------",result);
    })
  }


}

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KisanDanService } from 'app/shared/services/kisan-dan.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kisandaangallary',
  templateUrl: './kisandaangallary.component.html',
  styleUrls: ['./kisandaangallary.component.scss']
})
export class KisandaangallaryComponent implements OnInit {
  @Input() customerId: any;
  @Input() lang: string;
  @Input() wid: any;
  Kisandanimage:any[];
  details:any;
  Total:any;
  apiURL: string; 
  IsShow:boolean; 
  custKishandata:any;
  
  constructor(private router: Router,private route: ActivatedRoute,private KisanDanService:KisanDanService,private http: HttpClient) {this.apiURL = environment.apiURL; }

  ngOnInit() {  
    this.customerId = Number(this.route.snapshot.paramMap.get("customerId"));
    this.lang = this.route.snapshot.paramMap.get("lang");
    this.wid = Number(this.route.snapshot.paramMap.get("wid"));
    this.IsShow=false;
      this.KisanDanService.kishandanImage(this.customerId,this.lang,this.wid).subscribe(result => {
        console.log('result: ', result);    
        this.Kisandanimage = result; 
        
      })   



  }
  
    IsShowDesCription(row){
    this.Kisandanimage.forEach(obj => {     
     if(row.Id==obj.Id)
     {
        if(obj.IsShow==true){
          obj.IsShow=false;

        } else{
          obj.IsShow=true;
        }
    }
     
    })
   
  
  
  }

 
}

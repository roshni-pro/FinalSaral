import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/shared/services/customer.service';
import { AgentService } from 'app/shared/services/agent.service';
import { KisanDanService } from 'app/shared/services/kisan-dan.service';
import * as moment from 'moment';
@Component({
  selector: 'app-customerkisanwebview',
  templateUrl: './customerkisanwebview.component.html',
  styleUrls: ['./customerkisanwebview.component.scss']
})
export class CustomerkisanwebviewComponent implements OnInit {
  @Input() customerid: any;
  @Input() lang: string;
  @Input() wid: any;
  custKishandata:any[];
  details:any;
  Total:any;
  @Input() CustomerId: any;
  
  constructor(private router: Router,private route: ActivatedRoute,private KisanDanService:KisanDanService) {}

  ngOnInit() {
    this.Total=0
     this.CustomerId = Number(this.route.snapshot.paramMap.get("CustomerId"));
      this.lang = this.route.snapshot.paramMap.get("lang");
      this.wid = Number(this.route.snapshot.paramMap.get("wid"));      
        this.KisanDanService.kishandanDetail(this.CustomerId,this.lang,this.wid).subscribe(result => {        
          console.log('result: ', result);
          this.custKishandata = result;  
          for(var i in this.custKishandata){           
            this.custKishandata[i].CreatedDate = this.custKishandata[i].CreatedDate ? moment(this.custKishandata[i].CreatedDate).format('DD/MM/YYYY') : null
         
            }
            
        })   
   }
}


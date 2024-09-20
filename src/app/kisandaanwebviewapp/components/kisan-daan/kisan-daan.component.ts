import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KisanDanService } from 'app/shared/services/kisan-dan.service';



@Component({
  selector: 'app-kisan-daan',
  templateUrl: './kisan-daan.component.html',
  styleUrls: ['./kisan-daan.component.scss'],
  encapsulation: ViewEncapsulation.None


})
export class KisanDaanComponent implements OnInit {

  @Input() customerid: any;
  @Input() lang: string;
  @Input() wid: any;
  Kisandandescr: any[];
  details: any;
  Total: any;
  CustomerTotalDaan: any;
  apiURL: string;
  IsShowview: boolean;
  custKishandata: any[];
  Kisandanimage: any;
  Kisandaan: string;
  Kisandaandata: string;
  IsShow: boolean;
  custKisanlist:any;
  blocked:boolean;
  @Input() numScroll: number;
  // @Input() responsiveOptions:any;
  @Input() numVisible: number;
  @Input() circular: any;
  @Input() autoplayInterval: any;
  responsiveOptions;
  constructor(private router: Router, private route: ActivatedRoute, private KisanDanService: KisanDanService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.blocked = true;
    this.Total = 0;
    this.CustomerTotalDaan=0;
    this.customerid = Number(this.route.snapshot.paramMap.get("customerid"));
    this.lang = this.route.snapshot.paramMap.get("lang");
    this.wid = Number(this.route.snapshot.paramMap.get("wid"));   
    this.IsShowview = false;
    this.IsShow = false;    

    this.KisanDanService.kishandans(this.customerid, this.lang, this.wid).subscribe(result => {   
      
      console.log('result: ', result);        
      this.Total  = result.TotalDaan;
      this.CustomerTotalDaan  = result.CustomerTotalDaan;
      this.Kisandaan = result.KisanDanDescription.WhyUseKd;
      this.Kisandaandata = result.KisanDanDescription.HowItWorkKd;
      this.Kisandanimage =result.KisanDaanGallarys;
      this.KisanDanService.CustomerData().subscribe(result =>{
        
        this.blocked = false;
        this.custKisanlist = result;  
        console.log('result: ', result); 
    
      })
      
    })    
  

  
  
  }


  customerkisanwebview() { 
    this.router.navigateByUrl('/webview/CustomerKisanDan/'+this.customerid+'')

  }
  kisandaangallary() {
    this.router.navigateByUrl('/webview/kisandaangallary/:customerid/:lang/:wid')
  }


  IsShowDesCription(row) {  
    if (row) {
      this.IsShowview = false;
    } else {
      this.IsShowview = true;
    }

  }

  IsShowDesCriptiondata(row) { 
    if (row) {
      this.IsShow = false;
    } else {
      this.IsShow = true;
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isThisSecond } from 'date-fns';

@Component({
  selector: 'app-showcustomerlevel',
  templateUrl: './showcustomerlevel.component.html',
  styleUrls: ['./showcustomerlevel.component.scss']
})
export class ShowcustomerlevelComponent implements OnInit {
  @Input() subCatBarndsIds: any;
  subCatBarndsId:any;
  GetBrandTarget:any;
  openpopBrands:boolean;
  openpopItemDcs:boolean;
  freeItem:boolean;
  listBrands:any;
  listItem:any;
  listfreeItem:any;
  constructor(private digitalsaleService: DigitalSaleService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.openpopBrands=false;
    this.openpopItemDcs=false;
    this.freeItem=false;
      this.subCatBarndsId = Number(this.route.snapshot.paramMap.get("subCatBarndsIds"));
      
      this.digitalsaleService.GetBrandTarget(this.subCatBarndsId ).subscribe(result=>{
        
        this.GetBrandTarget=result;
      })

  }
  openBrandspopup(data){
    
this.openpopBrands=true;
this.listBrands=data;
  }
  openItemDcs(data11){
    
    this.openpopItemDcs=true;
    this.listItem=data11;
  }
  freeItemDcs(datafreeItemDcs){
    
    this.freeItem=true;
    this.listfreeItem=datafreeItemDcs;
  }
  back() {
    this.router.navigateByUrl("layout/digitalsales/CustomerTargetList")
  }
}

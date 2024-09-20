import { Component, OnInit } from '@angular/core';
import { LiveBrandDataForMetaBaseFilterDC } from 'app/live-brand-data-for-metabase/interface/live-brand-data-for-metabaseDC';
import { LiveBrandDataForMetabaseService } from 'app/live-brand-data-for-metabase/services/live-brand-data-for-metabase.service';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';

@Component({
  selector: 'app-live-brand-data-for-metabase',
  templateUrl: './live-brand-data-for-metabase.component.html',
  styleUrls: ['./live-brand-data-for-metabase.component.scss']
})
export class LiveBrandDataForMetabaseComponent implements OnInit {
  liveBrandDataForMetaBaseFilterDC : LiveBrandDataForMetaBaseFilterDC;
  BrandList : any;
  selectedList : any
  liveBrandMetaData : any;
  totalRecords : number = 0;
  blocked: boolean;
  constructor(private _liveBrandMetaService : LiveBrandDataForMetabaseService
    ,public brandService : SubSubCategoryService) { }

  ngOnInit() {
    this.selectedList = [];
    var valuess = null;
    this.blocked = true;
    this.brandService.GetAllBrands(valuess).subscribe(result => {
      
      this.BrandList = result;
      this.blocked = false;
    })   
  }
  selectedBands() {
    var a = [];
    console.log("this.selectedCategory", this.selectedList)
    this.selectedList.forEach(element => {
      console.log(element.SubsubCategoryid);
      a.push(element.SubsubCategoryid);
    });
    // this.liveBrandDataForMetaBaseFilterDC.BrandIds = a;
    this.liveBrandDataForMetaBaseFilterDC={
      BrandIds : a,
      Skip : 1,
      Take : 10
    }
    debugger;
    this.blocked = true;
    this._liveBrandMetaService.getLiveBrandDataForMetaBaseList(this.liveBrandDataForMetaBaseFilterDC).subscribe(x=>{
      debugger;
      this.liveBrandMetaData = x.LiveBrandDataForMetaBaseDC;
      this.totalRecords = x.TotalCount;
      this.blocked = false;
    })
  }
  load(event) {
    debugger;
    // this.liveBrandDataForMetaBaseFilterDC.Skip = event.first ? event.first : 1;
    // this.liveBrandDataForMetaBaseFilterDC.Take = event.rows ? event.rows : 10;
    var Last = event.first ? event.first + event.rows : 10;
    this.liveBrandDataForMetaBaseFilterDC.Skip = Last / event.rows;
    this.liveBrandDataForMetaBaseFilterDC.Take = event.rows;
    this.blocked = true;
    this._liveBrandMetaService.getLiveBrandDataForMetaBaseList(this.liveBrandDataForMetaBaseFilterDC).subscribe(x=>{
      debugger;
      this.liveBrandMetaData = x.LiveBrandDataForMetaBaseDC;
      this.totalRecords = x.TotalCount;
      this.blocked = false;
    })
  }

}

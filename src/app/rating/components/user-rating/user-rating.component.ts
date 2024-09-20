import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingService } from 'app/rating/service/rating.service';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {
  AppType : any;
  ratingList : any;
  isOpenRatingDetail : boolean = false;
  selectedDetail : any;
  blocked: boolean;
  skip : number = 0;
  take : number = 10;
  Keyword : any;
  totalcount:number;
  first: number = 0;
  exportData : any;
  isKeyWordSearch : boolean = false;
  constructor(private ratingService : RatingService,private messageService: MessageService,
    private router : Router, private exportService: ExportServiceService) { }

  ngOnInit() {
    this.AppType = "";
  }
  load(event){
    // debugger;
    if(this.isKeyWordSearch == false){
      this.Keyword = [];
    }
    var Last=  event.first ? event.first + event.rows : 20;
    this.skip=event.rows ? Last/ event.rows : Last/20;
    this.take= event.rows ? event.rows : 20;
    this.Keyword = this.Keyword ? this.Keyword : [];
    this.blocked = true;
    this.ratingService.getUserRating(this.AppType,this.Keyword,this.skip,this.take).subscribe(list=>{
      // debugger;
      this.blocked = false;     
      this.ratingList = list.UserRating;
      this.totalcount = list.TotalCount;
    })
  }
  Search() {
    // var Last=  20;
    // debugger;
    this.skip= 1;
    this.take= 20;
    this.Keyword = this.Keyword ? this.Keyword : [];
    this.blocked = true;
    this.ratingList = [];
    this.totalcount = 0;
    this.ratingService.getUserRating(this.AppType,this.Keyword,this.skip,this.take).subscribe(list=>{
      // debugger;
      this.blocked = false; 
      if(this.Keyword.length > 0){ this.isKeyWordSearch = true;}        
      this.ratingList = list.UserRating;
      this.totalcount = list.TotalCount;
      this.first = 0;
    })
  }
  openDetail(ir){
    // debugger;
    this.selectedDetail = ir;
    this.isOpenRatingDetail = true;
  }
  addRating(){
    this.router.navigateByUrl('layout/rating/add-rating');
  }
  closeRatingDetailPopup(){
    this.isOpenRatingDetail = false;
    // this.Search();
  }
  exportExcel(){
    
    this.Keyword = this.Keyword ? this.Keyword : [];
    this.blocked = true;
    this.exportData = [];
    this.ratingService.exportUserRating(this.AppType,this.Keyword).subscribe(list=>{
      this.blocked = false;     
      this.exportData = list.UserRating;
      // this.totalcount = list.TotalCount;
      this.exportService.exportAsExcelFile(this.exportData, 'ExportUserRating');
      
    })
  
  }
}

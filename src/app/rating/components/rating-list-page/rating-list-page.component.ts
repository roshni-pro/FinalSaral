import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingService } from 'app/rating/service/rating.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rating-list-page',
  templateUrl: './rating-list-page.component.html',
  styleUrls: ['./rating-list-page.component.scss']
})
export class RatingListPageComponent implements OnInit {
  AppType : any;
  ratingList : any;
  isOpenRatingDetail : boolean = false;
  selectedDetail : any;
  blocked: boolean;
  constructor(private ratingService : RatingService,private messageService: MessageService,
    private router : Router) { }

  ngOnInit() {
    this.AppType = "";
  }
  Search(){
    this.blocked = true;
    this.ratingService.getRatingMaster(this.AppType).subscribe(list=>{
      // debugger;
      this.blocked = false;
      this.ratingList = list;
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
    this.Search();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RatingDetailDC, RatingMasterDC } from 'app/rating/interface/RatingMasterDC';
import { RatingService } from 'app/rating/service/rating.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.scss']
})
export class AddRatingComponent implements OnInit {
  addrating : any;
  ratingList : any[]=[];
  isAdd : boolean = false;
  ratingMasterDC : RatingMasterDC;
  ratingDetailDC : RatingDetailDC[]=[];
  blocked: boolean;
  @Input() selectedDetailId : any;
  title : any;
  @Input() UserRatingDetails : any;
  @Input() isDetail : boolean = false;
  @Input() isUserRating : boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(private ratingService : RatingService,private messageService: MessageService,
    private router : Router,private confirmationService: ConfirmationService) { this.addrating ={}; }

  ngOnInit() {
    this.addrating.AppType = "";
    this.addrating.Rating = "";
    // debugger;
    if(this.selectedDetailId != null && !this.isUserRating && this.isDetail){
      this.title = "Edit Rating";
      // debugger;
      this.ratingService.getRatingDetails(this.selectedDetailId).subscribe(getData=>{
        // debugger;
        this.addrating.Id = getData.Id;
        this.addrating.AppType = getData.AppType;
        this.addrating.Rating = getData.Rating;
        this.addrating.AppTypeName = getData.AppTypeName;
        this.ratingList = getData.RatingDetails;
        this.ratingList.forEach(rl=>{
          rl.Rating = getData.Rating,
          rl.AppTypeName = getData.AppTypeName,
          rl.Id = rl.Id,
          rl.RatingMasterId  = rl.RatingMasterId
        })
        if(this.ratingList.length > 0){
          this.isAdd = true;
        }
      })      
    }else if(!this.selectedDetailId && !this.isUserRating && !this.isDetail){
      this.title = "Add Rating";
    }
    if(this.UserRatingDetails != null && this.isUserRating && !this.isDetail){
      this.addrating.AppType = this.UserRatingDetails.AppType;
      this.addrating.Rating = this.UserRatingDetails.Rating;
      this.addrating.AppTypeName = this.UserRatingDetails.AppTypeName;
      this.ratingList = this.UserRatingDetails.UserRatingDetails;
      if(this.ratingList.length > 0){
        this.isAdd = true;
      }
      this.ratingList.forEach(rl=>{
        rl.Rating = this.UserRatingDetails.Rating,
        rl.AppTypeName = this.UserRatingDetails.AppTypeName,
        rl.Id = rl.Id
      })
    }
  }
  addRatingData(){
    if(this.addrating.AppType != ""){
    this.isAdd = true;
    if(this.addrating.AppType == '1'){
      this.addrating.AppTypeName = 'Sales';
    }else if(this.addrating.AppType == '2'){
      this.addrating.AppTypeName = 'Retailer';
    }else if(this.addrating.AppType == '3'){
      this.addrating.AppTypeName = 'Delivery';
    }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Select App Type First!', detail: '' });
      this.addrating.Rating = "";
    }
  }
  clearRatingData(){
    this.addrating.AppType = "";
    this.addrating.Rating = "";
    this.addrating.AppTypeName = null;
    this.ratingList = [];
    this.ratingDetailDC = [];
  }
  addDetail(){
    if(this.addrating.Detail != null){
      this.ratingList.push({
        AppTypeName : this.addrating.AppTypeName,
        Detail :this.addrating.Detail,
        Rating : this.addrating.Rating,
        AppType : this.addrating.AppType
      });
      this.addrating.Detail = null;
    }else{
      alert('Add Detail');
    }
  }
  onSave(){  
    this.ratingList.forEach(x=>{
      let obj={
        Detail : x.Detail,
        Id : x.Id ? x.Id : 0,
        RatingMasterId  : x.RatingMasterId ? x.RatingMasterId : 0
      }
      this.ratingDetailDC.push(obj);
    })
    this.ratingMasterDC={
      Id : this.addrating.Id ? this.addrating.Id : 0,
      AppType : this.addrating.AppType,
      Rating : this.addrating.Rating,
      RatingDetails : this.ratingDetailDC
    }
    this.blocked = true;
    this.ratingService.addRatingMaster(this.ratingMasterDC).subscribe(x=>{
      this.blocked = false;
      if(x.Result == true){
        this.messageService.add({ severity: 'success', summary: x.msg, detail: '' });
      setTimeout(() => {
        
            this.router.navigateByUrl('layout/rating');
        }, 1000);
          
      }else{
        this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
      }      
    })
  }
  onUpdate(){  
    this.ratingList.forEach(x=>{
      let obj={
        Detail : x.Detail,
        Id : x.Id ? x.Id : 0,
        RatingMasterId  : x.RatingMasterId ? x.RatingMasterId : 0
      }
      this.ratingDetailDC.push(obj);
    })
    this.ratingMasterDC={
      Id : this.addrating.Id ? this.addrating.Id : 0,
      AppType : this.addrating.AppType,
      Rating : this.addrating.Rating,
      RatingDetails : this.ratingDetailDC
    }
    this.blocked = true;
    this.ratingService.updateRatingMaster(this.ratingMasterDC).subscribe(x=>{
      this.blocked = false;
      if(x.Result == true){
        this.messageService.add({ severity: 'success', summary: x.msg, detail: '' });
      setTimeout(() => {        
            // this.router.navigateByUrl('layout/rating');
            this.close.emit();
        }, 1000);
          
      }else{
        this.messageService.add({ severity: 'error', summary: x.msg, detail: '' });
      }      
    })
  }
  back(){
    this.router.navigateByUrl('layout/rating');
  }
  onDelete(ir) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          debugger;
          let ac = this.ratingList.filter(x => x == ir)[0];
          let index = this.ratingList.indexOf(ac);
          this.ratingList.splice(index, 1);
      }
    });
  }
}

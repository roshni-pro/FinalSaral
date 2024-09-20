import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {

  constructor( private route: ActivatedRoute ,private router: Router) { }
  itemFor=[
    {
      code:1,
      name:'Custom'
    },
    {
      code:2,
      name:'URL'
    }
  ]
  SelectedItem:any
  showUrl:boolean=false
  Id:number=1
  ngOnInit() {
  }
    OnSelect()
    {
      if(this.SelectedItem.code==2)
      {
        this.showUrl=true
      }
      else
      {
        this.showUrl=false
        this.router.navigateByUrl("layout/salesApp/promotionList") 
      }
      
    }
}

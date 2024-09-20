import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  activeIndex:any
  ngOnInit() {
    //this.activeIndex =1
  }

}





  



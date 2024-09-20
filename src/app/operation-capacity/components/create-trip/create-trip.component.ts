import { FullscreenControlOptions } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent implements OnInit {
 //map
 lat: number = 22.7196;
 lng: number = 75.8577;
 zoom: number = 13;
 options: FullscreenControlOptions;
 myInnerHeight = 100;
 display:boolean
 fullscreenControl: boolean;
  constructor(private router : Router) { }

  ngOnInit() {
  }
 
  open(){
    this.display=true;
  }
  onUpdate()
  {
    this.router.navigateByUrl('layout/operation-capacity/assignment-list');
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beat-dsr-tabs',
  templateUrl: './beat-dsr-tabs.component.html',
  styleUrls: ['./beat-dsr-tabs.component.scss']
})
export class BeatDsrTabsComponent implements OnInit {
  scrollTabSelected:number = 0;
  constructor() { }

  ngOnInit() {
  }


  changeTab(ev: any) {
    this.scrollTabSelected = ev.index;;
  }


}

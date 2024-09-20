import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ir',
  templateUrl: './ir.component.html',
  styleUrls: ['./ir.component.scss']
})
export class IRComponent implements OnInit {

  index = 0;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(params => {
      
      if (params[0].path == "IR") {
        this.index = 1;
      } else if (params[0].path == "closed-pr") {
        this.index = 2;
      }
    });
  }

  handleChange(e) {
    
    this.index = e.index;
  }

}

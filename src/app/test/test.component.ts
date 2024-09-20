import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(  localStorage.getItem('userToken') == null){
      this.router.navigate(['login']);
    }
  }

}

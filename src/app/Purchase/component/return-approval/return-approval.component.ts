import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-approval',
  templateUrl: './return-approval.component.html',
  styleUrls: ['./return-approval.component.scss']
})
export class ReturnApprovalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
}

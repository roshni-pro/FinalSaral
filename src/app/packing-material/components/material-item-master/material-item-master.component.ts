import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material-item-master',
  templateUrl: './material-item-master.component.html',
  styleUrls: ['./material-item-master.component.scss']
})
export class MaterialItemMasterComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  addItem(){
    this.router.navigateByUrl('layout/packing-material/add')
  }
}

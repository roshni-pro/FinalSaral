import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { $ } from 'protractor';

// import * as Chartist from 'chartist';
// import { ChartType, ChartEvent } from "ng-chartist";

declare var require: any;

//const data: any = require('../../shared/data/chartist.json');

// 

@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {
 data : any;
    constructor(private router: Router, private userService : UserService,
        private route: ActivatedRoute ) { 
          
            // gridId : 'drivers_grid' ;
            // this.data = [{
            //     order_id: 1,
            //     name: "Name1",
            //     address: "Indore"
            
            // },
            // {
            //     order_id: 2,
            //     name: "Name1",
            //     address: "Indore"
            
            // },
            // {
            //     order_id: 3,
            //     name: "Name1",
            //     address: "Indore"
            
            // },
            // {
            //     order_id: 4,
            //     name: "Name1",
            //     address: "Indore"
            
            // },
            // {
            //     order_id: 5,
            //     name: "Name1",
            //     address: "Indore"
            
            // }
            // ]
           
        
        }
      
    }
       


import { Component, OnInit } from '@angular/core';
import { LevelcolorService } from 'app/shared/services/levelcolor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-levelcolor',
  templateUrl: './levelcolor.component.html',
  styleUrls: ['./levelcolor.component.scss']
})
export class LevelcolorComponent implements OnInit {
  
  levelList:any;
  colorList:any;
  //LevelColor: any;
  LevelName:any[];
  data:any; 
  levelarray : any[];

  

  
  constructor(private levelcolorService : LevelcolorService ,private router:Router ) { }

  
  
  
  ngOnInit() {

    var fd =[
      {colorcode: "#FFFFFF"},
      {colorcode: "#C0C0C0" },
      {colorcode: "#808080"},
      {colorcode: "#000000" }
    ]
    

    
    this.levelcolorService.levelcolur().subscribe(result => {
      
      this.levelList= result;
      console.log("this.levelList" ,this.levelList)
    })
  }

 
  save(level){
    
    this.levelcolorService.levelsave(level).subscribe(result => {

      this.colorList= result;
    })
  }

}

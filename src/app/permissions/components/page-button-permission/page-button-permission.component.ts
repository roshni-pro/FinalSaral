import { Component, OnInit } from '@angular/core';
import { PagebuttonpermissionService } from 'app/shared/services/pagebuttonpermission.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page-button-permission',
  templateUrl: './page-button-permission.component.html',
  styleUrls: ['./page-button-permission.component.scss']
})
export class PageButtonPermissionComponent implements OnInit {
 pageList:any;
 Id:string;
 pagepermList:any;
 Buttons:any;
  constructor(private messageService: MessageService,private PageService:PagebuttonpermissionService) { }

  ngOnInit() {
    // this.PageService.Pages().subscribe(result =>{
      this.PageService.Pages().subscribe(result =>{
      this. pageList=result;
      console.log('fgg', this. pageList)
    })
  }

//   getPageChange()
//   {
//     this.PageService.GetAllPagesForDropDown(this.Id).subscribe(result=>{
// this.pagepermList=result;

//     })
//   }

  
  getPageChange(Id) {
    console.log(this.Id)
    this.PageService.getButtons(this.Id).subscribe(result => {
      this.pagepermList = result;
      console.log('abcd',this.pagepermList);

    })
  }

  savePageList(pageData,Id) {
    console.log(Id)
    console.log(pageData);
    this.messageService.add({severity:'success', summary: 'Save Successfully!', detail:''});
    this.PageService.pagepermissionlist(pageData, Id).subscribe(result => {
      
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageMasterPermissionService } from 'app/shared/services/page-master-permission.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-page-master',
  templateUrl: './page-master.component.html',
  styleUrls: ['./page-master.component.scss']
})
export class PageMasterComponent implements OnInit {
  draggedCar: any;
  angular: any;
  data: any;
  item: any;
  Isupdate: boolean;
  pageList: any;
  ParentId: any;
  dropDownList: any[];
  getAllParent: any[];
  getChildList: any[];
  updatePageList: any[];
  array: any[];
  constructor(private messageService: MessageService ,private confirmationService: ConfirmationService,  private pageMasterPermissionService : PageMasterPermissionService ) {this.data={}  }
  onTabChange(event) {
    this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
}

onDrop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.getAllParent, event.previousIndex, event.currentIndex);
  }

onDropChild(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.getChildList, event.previousIndex, event.currentIndex); 
};

  ngOnInit() {
    this.data={};
    this.pageMasterPermissionService.GetAllPagesForDropDown().subscribe(result =>{
      this.dropDownList = result;
      console.log(this.dropDownList);
    })
    this.pageMasterPermissionService.GetAllParentPages().subscribe(result =>{
      this.getAllParent = result;
      console.log(this.getAllParent);
    })
    
  }
  //Get child pages
  getChild(ParentId){
    console.log(ParentId);
    this.pageMasterPermissionService.addChildPage(ParentId).subscribe(result => {
      this.getChildList = result;
    });
  }
  //for clear data
  refresh(){
    this.data={};
   } 
// Save Page
onSave(){
  if(this.data.PageName && this.data.RouteName && this.data.ClassName){
  this.pageMasterPermissionService.addMasterPage(this.data).subscribe(result => {
    this.data={};
    this.ngOnInit()
    this.messageService.add({severity:'success', summary: 'Successfully Added', detail:''});
  });
}else{
  this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
}
}
//Edit Parent and Child
GetUpdateParent(editdata){

  console.log(editdata);
  this.Isupdate = true;
  this.data = editdata;
  if (!this.data.RouteName || this.data.RouteName == "NULL" || this.data.RouteName == "null")
  this.data.RouteName = "";
  if (!this.data.IconClassName || this.data.IconClassName == "NULL" || this.data.IconClassName == "null")
  this.data.IconClassName = "";
  if (!this.data.ClassName || this.data.ClassName == "NULL" || this.data.ClassName == "null")
  this.data.ClassName = "";     
}

//Update Page Sequence
onUpdateList(itemsList ,ParentId){
  for(var item in itemsList){
    console.log(item)
    itemsList[item].Sequence = parseInt(item) + 1;
  }
  // console.log(itemsList);
   this.pageMasterPermissionService.UpdateList(itemsList,ParentId).subscribe(result => {
     if(result == true){
      this.messageService.add({severity:'success', summary: 'Save Successfully!', detail:''});
     }else{
     this.messageService.add({severity:'error', summary: 'Save Not Successfull!', detail:''});
     } 
   
  })
 
}
//Remove Child Page
delete(ID){
  this.onDelete(ID);
}

onDelete(ID: number) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      this.pageMasterPermissionService.DeletePage(ID).subscribe(result => {
        let ac = this.getChildList.filter(x => x.ID == ID)[0];
        let index = this.getChildList.indexOf(ac);
        this.getChildList.splice(index, 1);
      });
    }
  });
}
//Remove Parent Page
onParentDelete(ID: number) {
  this.confirmationService.confirm({
    message: 'Are you sure that you want to perform this action?',
    accept: () => {
      this.pageMasterPermissionService.DeletePage(ID).subscribe(result => {
        let ac = this.getAllParent.filter(x => x.ID == ID)[0];
        let index = this.getAllParent.indexOf(ac);
        this.getAllParent.splice(index, 1);
      });
    }
  });
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {
  assignmentList : any;
  selectedAssignmentList : any[]=[];
  constructor(private router : Router) {
      this.assignmentList = [
    {OrderId: 65651,OrderDetail:'Aount:6757657', CustomerInfo : 'Categaory & Sub-Categaory',ClusterName:'Ind1',DeliveryAddress:'ffg ghfghghf gg hg hggh fgh',DeliveryDate:'20/08/2021'},
    {OrderId: 26765,OrderDetail:'Aount:6757657', CustomerInfo : '& Sub-Categaory',ClusterName:'Ind1',DeliveryAddress:'ffg ghfghghf gg hg hggh fgh',DeliveryDate:'21/08/2021'},
    {OrderId: 16776,OrderDetail:'Aount:6757657', CustomerInfo : 'Categaory',ClusterName:'Ind1',DeliveryAddress:'ffg ghfghghf gg hg hggh fgh',DeliveryDate:'22/08/2021'},
    {OrderId: 18676,OrderDetail:'Aount:6757657', CustomerInfo : 'Sub-Categaory',ClusterName:'Ind1',DeliveryAddress:'ffg ghfghghf gg hg hggh fgh',DeliveryDate:'20/08/2021'},
  ];3
   }

  ngOnInit() {
  }
  onClickAssignment(rowData)
  {
    debugger;
    this.selectedAssignmentList.push(rowData);
    this.selectedAssignmentList.forEach(x=>{
      if(x.OrderId == rowData.OrderId && !rowData.IsChecked)
      {
        this.selectedAssignmentList.splice(0,1);
      }
    });
  }
  onCancel()
  {
    this.router.navigateByUrl('layout/operation-capacity/planMaster');
  }

}

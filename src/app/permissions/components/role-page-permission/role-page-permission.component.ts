import { Component, OnInit } from '@angular/core';
import { RolepagepermissionService } from 'app/shared/services/rolepagepermission.service';

import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-role-page-permission',
  templateUrl: './role-page-permission.component.html',
  styleUrls: ['./role-page-permission.component.scss']
})
export class RolePagePermissionComponent implements OnInit {
  roleList: any;
  roleID: string;
  rolePageList: any;
  rolePagePermissionDc: {};
  istree: any;
  treeData: any;
  childData: any;
  details: any;
  constructor(private rolePageService: RolepagepermissionService) { this.istree = false; }

  ngOnInit() {
    this.rolePageService.Role().subscribe(result => {
      this.roleList = result;
      // console.log(result);
    })
  }
  getRoleChange() {
    console.log(this.roleList);
    console.log(this.roleID);

    this.rolePageService.GetAllPagesForDropDown(this.roleID).subscribe(result => {
      this.istree = true;
      this.rolePageList = result;
      this.updateRolePagePermissionList();
      console.log(this.rolePageList);

    });
  };

  collapseParent(parent: any) {
    this.rolePageList.forEach(element => {
      if (element != parent) {
        element.IsVisible = false;
      }
    });
    parent.IsVisible = !parent.IsVisible;
  }

  onParentPageClick(role: any) {
    if (role.ChildRolePagePermissionDcs && role.ChildRolePagePermissionDcs.length > 0) {
      role.ChildRolePagePermissionDcs.forEach(element => {
        element.IsChecked = role.IsChecked;
      });
    }
  }

  onChildPageClick(parentPage: any) {
    let isAnyChecked = false;
    if (parentPage.ChildRolePagePermissionDcs && parentPage.ChildRolePagePermissionDcs.length > 0) {
      parentPage.ChildRolePagePermissionDcs.forEach(element => {
        if (element.IsChecked) {
          isAnyChecked = true;
        }
      });
      parentPage.IsChecked = isAnyChecked;

    }
  }

  private updateRolePagePermissionList() {
    if (this.rolePageList && this.rolePageList.length > 0) {
      this.rolePageList.forEach(element => {
        element.IsVisible = false;
      });
    }
  }

  saveRole(Listrole) {
    this.rolePageService.SaveRolePageData(Listrole, this.roleID).subscribe(result => {
    });
  }

 
};

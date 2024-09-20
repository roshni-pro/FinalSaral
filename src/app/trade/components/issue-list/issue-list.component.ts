import { Component, OnInit } from '@angular/core';
import { TradeOrdersService } from 'app/shared/services/trade-orders.service';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode,ConfirmationService, MessageService } from 'primeng/api';
import { PostIssues } from 'app/shared/interface/trade/issueTree';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss'],
  styles: [`
        .company.ui-organizationchart .ui-organizationchart-node-content.ui-person {
            padding: 0;
            border: 0 none;
        }

        .node-header,.node-content {
            padding: .5em .7em;
        }

        .node-header {
            background-color: #495ebb;
            color: #ffffff;
        }

        .node-content {
            text-align: center;
            border: 1px solid #495ebb;
        }

        .node-content img {
            border-radius: 50%;
        }

        .department-cfo {
            background-color: #7247bc;
            color: #ffffff;
        }

        .department-coo {
            background-color: #a534b6;
            color: #ffffff;
        }

        .department-cto {
            background-color: #e9286f;
            color: #ffffff;
        }

        .ui-person .ui-node-toggler {
            color: #495ebb !important;
        }

        .department-cto .ui-node-toggler {
            color: #8a0a39 !important;
        }
    `]
})
export class IssueListComponent implements OnInit {
  issuelist: TreeNode[];
  isAddParent: boolean;
  issue: any;
  data: any;
  selectedFile3:any;
  treechild: TreeNode;
  child:any[];
  isOpenPopup: boolean;
  postIssues: PostIssues;
  constructor(private tradeService: TradeOrdersService,private confirmationService:ConfirmationService,private messageService: MessageService) { this.data = {}; }

  ngOnInit() {
    this.data = null;
    this.selectedFile3=null;
    this.isAddParent = false;
    this.isOpenPopup = false;
    this.postIssues = {
      primaryKey: 1,
      Description: null
    }
    this.tradeService.getIssuelist(39).subscribe(result => {
      this.issue = result; 
      this.treechild= this.issue.children;        
      this.issuelist = [{
        label: 'Issue',
        styleClass: 'ui-person',      
        children: this.makeTreeNode(this.treechild)
      }];
    })
    
  }
 
  makeTreeNode(nodeList: any): TreeNode[] {
    
    let treeNodeList: TreeNode[] = [];
    if (nodeList && nodeList.length > 0) {
      nodeList.forEach(x => {
        let treeNode: TreeNode = {
          label: x.Description,
          styleClass: 'department-cfo',
          data: x.Id,
          children:this.makeTreeNode(x.children)
        }
        treeNodeList.push(treeNode);
      });
      return treeNodeList;
    }
  }
     
  getChild(data)
  {
    this.tradeService.getIssuelist(data.Id).subscribe(result => {
      this.child = result;
      this.issuelist = [{
        //label: 'Issue',
        children: this.makeTreeNode(result)
      }];
    })
  }
  addChild(datas) {
    if (datas == null) {
      this.isAddParent = true;
      this.isOpenPopup = true;
      this.postIssues = {
        primaryKey: 1,
        Description: null
      }
      return;
    }
    else {
      this.isAddParent = true;
      this.isOpenPopup = true;
      this.postIssues = {
        primaryKey: datas.data,
        Description: null
      }
      return;
    }
  }
  SaveChild(data) {
    
    this.postIssues = {
      primaryKey: data.primaryKey,
      Description: data.Description
    }
    this.tradeService.addChild(this.postIssues).subscribe(result => {
      this.isAddParent = false;
      this.isOpenPopup = false;
      window.location.reload();
    // this.getChild(result.primaryKey);
    })
  }
  deleteNode(d)
  {
    this.confirmationService.confirm({
      message: 'Are you sure.You want to delete this Node? because,all child and parent node is also deleted !!',
      accept: () => {
        this.tradeService.deleteNode(d.data).subscribe(result => {
          if (result == true) {
            this.messageService.add({ severity: 'success', summary: 'deleted successfully !!', detail: '' });
            this.ngOnInit();
          }         
        })
      },
      reject: () => {           
         this.ngOnInit();  
      
      }
    })
  }
  parentNode(selectedFile3)
  {
    // this.isAddParent = true;
    // this.isOpenPopup = true;
    // this.postIssues = {
    //   primaryKey: 1,
    //   Description: null
    // }
    // return;
  }
 
  // this.tradeService.getIssuelist(result.primaryKey).subscribe(result => {
  //   this.issue = result;
  //   this.issuelist = [{
  //     label: 'Issue',
  //     children: this.makeTreeNode(result)
  //   }];
  // })
}

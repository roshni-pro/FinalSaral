
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from 'app/shared/services/supplier.service';


@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss']
})


export class ChatDetailsComponent implements OnInit {

  displayTabs: any[];
  closeResult: string;
  buyerList: any[];
  entity: any;
  @Input() details: any;
  @Input() activeFields: any[];
  supplierChat: any[];
  GetChatThreads: any;
  chatThread : any[];
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() activeStatus = new EventEmitter<any>();
  @Output() deleteSupplier = new EventEmitter<any>();
  @Output() refreshParent = new EventEmitter();

  constructor(private modalService: NgbModal, private supplierService: SupplierService) { this.entity = "Supplier";
  this.GetChatThreads = {}; }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.displayTabs =
      [
       
        { field: 'overview', bool: true },
        { field: 'pochat', bool: false },
        { field: 'chat', bool: false },
      ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');

    this.supplierService.GetBuyer().subscribe(result => {
      this.buyerList = result;
      console.log(this.buyerList);
    })
   

    this.supplierService.GetSupplierChatThreads(this.details.SupplierId).subscribe(result => {
      
      this.GetChatThreads = [];
     for(var i in result)
     {
       if(result[i] == 0)
       {
        this.chatThread = result[i];
        console.log('chatThread::',this.chatThread);
       }
       else{
        this.GetChatThreads.push(result[i]);
       }
     }
      // this.GetChatThreads = result;
      console.log("thread == " + this.GetChatThreads);
    })
  }

  activeTabClass: any[] = [
    {tabName:'overviewDisplay',isActive:true},
    {tabName:'pochatDisplay',isActive:false},
    {tabName:'chatDisplay',isActive:false},
  ];

  switchActive(e,pageSelection) {
    // console.log(e.path);
    // $('.nav-link').removeClass('active');
    if(e.path){
      let navitem = e.path[2].children;
      for (var i = 0; i < navitem.length; i++) {
        navitem[i].firstChild.className = "nav-link";
      }
      e.path[0].className = "nav-link active";
    }
    this.activeTabClass.forEach((e: any)=>{
      if(pageSelection == e.tabName){
        e.isActive = true;
      }else{
        e.isActive = false;
      }
    })
  }

  closeDetails(isDetails: boolean) {
    this.isdetailsclose.emit(isDetails);
  }

  RefreshParent() {
    this.refreshParent.emit();
  }

  ToggleActivation(supplier) {
    this.activeStatus.emit(supplier);
  }


  hideDisplayTabsContents() {
    for (var i = 0; i < this.displayTabs.length; i++) {
      this.displayTabs[i].bool = false;
    }
  }
  pochatDisplay(e) {
    this.switchActive(e,'pochatDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[1].bool = true;
  }
  chatDisplay(e) {
    this.switchActive(e,'chatDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[2].bool = true;
  }
  overviewDisplay(e) {
    this.switchActive(e,'overviewDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[0].bool = true;
  }



  // refreshSupplierChat() {
  //   console.log("aaya");
  //   this.supplierService.GetSupplierChat(this.details.SupplierId).subscribe(result => {
  //     this.supplierChat = result['ChatSupplier'];
  //     console.log(this.supplierChat);
  //   });
  // }

}


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from 'app/shared/services/supplier.service';



@Component({
	selector: 'app-supplier-details',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

	displayTabs: any[];
	closeResult: string;
	buyerList: any[];
	entity: any;
	@Input() details: any;
	@Input() activeFields: any[];
	supplierChat: any[];
	

	@Output() isdetailsclose = new EventEmitter<boolean>();
	@Output() activeStatus = new EventEmitter<any>();
	@Output() deleteSupplier = new EventEmitter<any>();
	@Output() refreshParent = new EventEmitter();

	constructor(private modalService: NgbModal, private supplierService: SupplierService) { this.entity = "Supplier" }

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
  
  ngOnChanges(){
    this.displayTabs = [{field:'overview', bool:true},
                        {field:'edit-form', bool:false},
                        {field:'depo', bool:false},
                        {field:'ladger', bool:false},
                        {field:'history', bool:false},
                        {field:'chat', bool:false},
                        {field:'payment', bool:false}
                      ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');



		this.supplierService.GetBuyer().subscribe(result => {
			this.buyerList = result;
			console.log(this.buyerList);
		})
		// this.supplierService.GetSupplierChat(this.details.SupplierId).subscribe(result => {
		// 	this.supplierChat = result['ChatSupplier'];
		// })
		// this.supplierService.GetSupplierChatThreads(this.details.SupplierId).subscribe(result => {
		// 	this.GetSupplierChatThreads = result['GetSupplierChatThreads'];
		// 	console.log("dgfgdfgdg" + this.GetSupplierChatThreads);
		// })

		
	}

	activeTabClass: any[] = [
		{tabName:'overviewDisplay',isActive:true},
		{tabName:'editFormDisplay',isActive:false},
		{tabName:'depoDisplay',isActive:false},
		{tabName:'switchActive',isActive:true},
		{tabName:'historyDisplay',isActive:false},
		// {tabName:'chatDisplay',isActive:false},
		{tabName:'paymentDisplay',isActive:false},
		
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

	onDelete(details) {
		this.deleteSupplier.emit(details.SupplierId);
	}


	hideDisplayTabsContents() {
		for (var i = 0; i < this.displayTabs.length; i++) {
			this.displayTabs[i].bool = false;
		}
	}

	overviewDisplay(e) {
		this.switchActive(e,'overviewDisplay');
		this.hideDisplayTabsContents();
		this.displayTabs[0].bool = true;
	}

	editFormDisplay(e) {
		this.switchActive(e,'editFormDisplay');
		this.hideDisplayTabsContents();
		this.displayTabs[1].bool = true;
	}

	depoDisplay(e) {
		this.switchActive(e,'depoDisplay');
		this.hideDisplayTabsContents();
		this.displayTabs[2].bool = true;
	}
  paymentDisplay(e){
    this.switchActive(e,'paymentDisplay');
    this.hideDisplayTabsContents();
    this.displayTabs[6].bool=true;


  }
  

  // refreshSupplierChat(){
  //   console.log("aaya");
  //   this.supplierService.GetSupplierChat(this.details.SupplierId).subscribe(result =>{
  //     this.supplierChat = result['ChatSupplier'];
  //     console.log(this.supplierChat);
  //   });
  // }

	historyDisplay(e) {
		this.switchActive(e,'historyDisplay');
		this.hideDisplayTabsContents();
		this.displayTabs[4].bool = true;
	}
	chatDisplay(e) {
		this.switchActive(e,'chatDisplay');
		this.hideDisplayTabsContents();
		this.displayTabs[5].bool = true;
	}




}

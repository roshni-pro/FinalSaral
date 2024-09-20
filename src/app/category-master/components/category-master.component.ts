import { Component, OnInit } from '@angular/core';
import { ComplaintTicket } from 'app/shared/interface/complaint-ticket';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ComplaintTicketService } from 'app/shared/services/complaint-ticket.service';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.scss']
})
export class CategoryMasterComponent implements OnInit {
  warehouseList: any[];
  selectedWarehouse: any;
  selectedWarehouseCopy: any;
  ComplaintTicket: ComplaintTicket;
  selectedWarehouseList: any[];
  warehouses: any;
  WarehouseId:any;
  data: any;
  status: any;
  UserType: string;
  Category: string;
  Status: string;
  ticketlist =[];
  categorylist: any;
  CategoryId: any;
  IsActive: any;
  constructor(private complaintservice: ComplaintTicketService,  private confirmationService: ConfirmationService,private pepolePilotService: PepolePilotService, private modalService: NgbModal, private warehouseService: WarehouseService, private exportService: ExportServiceService, private messageService: MessageService) { this.data ={};
  }

  ngOnInit() {
    this.selectedWarehouseList = [];
    this.data.UserType=null;
    this.data.CategoryName=null;
    this.ticketlist =[];
  
    this.ComplaintTicket = {
      WarehouseId:null,
      ItemPerPage:null,
      PageNo:null,
      UserType:null,
      Category:null,
      Status:null,
      Priority:null,
      Search:null,
    
   
  
  }
  this.complaintservice.GetAllCategory().subscribe(result => {
    
    this.ticketlist = result.category;
  })

    
  
  
  }
    OnClick(data, form) {
      
      
      if(data.UserType != null && data.CategoryName != null){
 
      this.ComplaintTicket = {
        WarehouseId:this.data.WarehouseId,
        ItemPerPage:10,
        PageNo:1,
        UserType:this.data.UserType,
        Category:this.data.CategoryId,
        Status:this.data.Status,
        Priority:this.data.Priority,
        Search:this.data.Search,
     
       

      }
      this.complaintservice.SaveCategory(this.data.UserType, this.data.CategoryName).subscribe(result => {
        
        this.categorylist = result.TicketData;      
        window.location.reload();
      })
      this.complaintservice.GetAllCategory().subscribe(result => {
        
        this.ticketlist = result.category;
      })

    
    }
    else
    {
      alert("plz select one paramater")
    }
    
  }
    
  Type(UserType) {
    
    this.UserType = UserType
    this.complaintservice.GetCategory(this.data.UserType).subscribe(result => {
      
      console.log(result);
      this.categorylist = result.category;
    })
    if (UserType == "People") {
    
      this.complaintservice.GetCategory(this.data.UserType).subscribe(result => {
        
        console.log(result);
        this.categorylist = result.category;
      })
        }

    if (UserType == "Customer" ) {
    
      this.complaintservice.GetCategory(this.data.UserType).subscribe(result => {
        
        console.log(result);
        this.categorylist = result.category;
      })
    }
  }
    keypress(e,CategoryName){
      if (e.which === 32 && !CategoryName)
        e.preventDefault();
    }
    
  ActiveInactive(rowdata) {
    
    // this.complaintservice.IsActive(rowdata.CategoryId,rowdata.IsActive).subscribe(result => {
    //   console.log('IsActive :',result);
    // });
    this.confirmationService.confirm({
      
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        
        this.CategoryId = rowdata.CategoryId;
        this.complaintservice.IsActive(rowdata.CategoryId,rowdata.IsActive).subscribe(result => {
          
        
          if (result) {
            
            // success message   
                                                  
            this.messageService.add({ severity: 'success', summary: 'Your Auto-Notifiocation Request is Activated Successfully!', detail: '' });         
            //window.location.reload();     
          } else {
            // fail message
            
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          }
        });
      },
      reject: () => {
        rowdata.IsActive = !rowdata.IsActive;
        this.messageService.add({ severity: 'error', summary: 'Your AutoNotifiocation Request for IsActive Process is Canceled!', detail: '' });
      }
    });
  }

  }


  
  




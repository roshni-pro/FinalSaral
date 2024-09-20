import { Component, OnInit, Input } from '@angular/core';
import { ComplaintTicketService } from 'app/shared/services/complaint-ticket.service';
import { MessageService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ComplaintTicket } from 'app/shared/interface/complaint-ticket';
import { TicketChat } from 'app/shared/interface/ticket-chat';
import { ChangeStatus } from 'app/shared/interface/change-status';

@Component({
  selector: 'app-complaint-ticket',
  templateUrl: './complaint-ticket.component.html',
  styleUrls: ['./complaint-ticket.component.scss']
})
export class ComplaintTicketComponent implements OnInit {
  ComplaintTicket: ComplaintTicket;
  selectedRowDetails: any;
  totalRecords: number;
  selectedWarehouseList: any[];
  warehouses: any;
  WarehouseId: any;
  data: any;
  status: any;
  UserType: string;
  Category: string;
  Status: string;
  ticket: any;
  ticketlist = [];
  categorylist: any;
  isOpenPopup: boolean;
  TicketChat: TicketChat;
  ChangeStatus: ChangeStatus;
  IsUser: boolean;
  TicketId: any;
  chat: any;
  Attachment: any;
  showchatbox: boolean;
  ResolverId: any;
  CustomerId: any;
  PeopleId: any;
  selecteddetail: any;
  chatMessage: string;
  selectstatus: any;
  blocked: boolean;
  selectname: any;
  selectcategory: any;
  selectimg: any;
  ResolverName: any;
  subject: any;
  img: any;
  imgArr = [];
  @Input() numScroll: number;
  @Input() numVisible: number;
  @Input() circular: any;
  @Input() autoplayInterval: any;
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];
  url: string;
  Document: any;
  file: File[];
  imagePath: File[];
  Attchment: string | ArrayBuffer;
  Selectdate = new Date();
  SelectPriority: any;
  CategoryName: string;
  SelectName1: any;
  selectstatus1: any;

  constructor(private complaintservice: ComplaintTicketService, private modalService: NgbModal, private warehouseService: WarehouseService, private exportService: ExportServiceService, private messageService: MessageService) {
    this.data = {};
    //this.url = "https://uat.shopkirana.in/UploadedImages/";
    this.url = this.complaintservice.url + "//UploadedImages/";
    //this.url = "https://res.cloudinary.com/shopkirana/image/upload/v1563453167/sample.jpg";
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }



  ngOnInit() {
    this.showchatbox = false;
    this.ticketlist = [];
    this.isOpenPopup = false;
    this.selectedRowDetails = [];
    this.ComplaintTicket = {
      WarehouseId: null,
      ItemPerPage: null,
      PageNo: null,
      UserType: null,
      Category: null,
      Status: null,
      Priority:null,
      Search:null,
    }
      

    

    this.TicketChat = {
      TicketId: null,
      chat: null,
      Attachment: null,
    }
    this.ChangeStatus = {
      TicketId: null,
      status: null,
      Priority:null,
    }

    this.complaintservice.WarehouseGetByID().subscribe(result => {
      this.warehouses = result;
    })

  }
  OnClick() {
    
    
    this.blocked = true;
    this.ComplaintTicket = {
      WarehouseId: this.data.WarehouseId,
      ItemPerPage: 20,
      PageNo: 1,
      UserType: this.data.UserType,
      Category: this.selectcategory,
      Status: this.selectstatus,
      Priority:this.SelectPriority,
      Search:this.data.Search,
    
    }
  

    
    this.complaintservice.GetTicket(this.ComplaintTicket).subscribe(result => {

      console.log('result', result);
      this.ticketlist = result.TicketData;
      
      this.totalRecords = result.total_count;

      this.Document = result.Document;
      console.log('this.totalRecords: ', this.totalRecords);
      this.blocked = false;
    })
  }

  Type(UserType) {

    this.UserType = UserType
    this.complaintservice.GetCategory(this.data.UserType).subscribe(result => {
      console.log(result);
      this.categorylist = result.category;
    })
    if (UserType == "People" && this.WarehouseId != null) {
      this.complaintservice.GetTicket(this.ComplaintTicket).subscribe(result => {
        this.ticketlist = result;
      })

    }

    if (UserType == "Customer" && this.WarehouseId != null) {
      this.complaintservice.GetTicket(this.ComplaintTicket).subscribe(result => {
        this.ticketlist = result;
      })
      this.complaintservice.GetCategory(this.data.UserType).subscribe(result => {
        console.log(result);
        this.categorylist = result.category;
      })
    }

  }



  Status1(Status) {
    this.Status = Status

  }


  onChange(status) {
    this.status = status
    if (status == "true" && this.WarehouseId != null) {
      this.complaintservice.GetTicket(this.ComplaintTicket).subscribe(result => {
        this.ticketlist = result;
      })

    }
  }

  load(event) {

    var First = event.first;//(event.first == 0 || event.first) ? event.first  : 0;
    var Last = event.rows ? event.first + event.rows : 20;
    
    var page = Last / event.rows;
    this.ComplaintTicket.PageNo = page;

    this.ComplaintTicket.ItemPerPage = Last;
    this.ComplaintTicket.ItemPerPage = (event.rows ?  event.rows : 20)
    this.complaintservice.GetTicket(this.ComplaintTicket).subscribe(result => {

      console.log('result', result);
      this.ticketlist = result.TicketData;
      
      this.totalRecords = result.total_count;

      this.Document = result.Document;
      console.log('this.totalRecords: ', this.totalRecords);
    })

  }

  openDetails(d, e) {
    let imgArr = [];
    this.imgArr = [];
    console.log(d);
    console.log(this.url);
    this.isOpenPopup = true;
    this.selectedRowDetails = d.TicketChat;
    this.selecteddetail = d.TicketId;
    this.selectstatus = d.Status;
    this.selectstatus1=d.Status;
    this.selectname = d.UserName;
    this.selectcategory = d.Category;
    this.Selectdate = d.CreatedDate;
      // this.selectimg=d.Document;
      // this.ResolverName=d.TicketChat.ResolverName;
      this.subject = d.Description;
      this.SelectPriority=d.Priority;
     this.SelectName1=d.CategoryName;
    imgArr = d.Document.split(',');
    if (imgArr.length <= 1) {
      
      this.selectimg = imgArr[0]; // uncommend this on single image display
     // this.selectimg = "https://res.cloudinary.com/shopkirana/image/upload/v1563453167/sample.jpg";
    }
    for (var i = 0; i < imgArr.length; i++) {
      
      this.imgArr.push(this.url + imgArr[i]);
    }
    console.log(imgArr);
  }

  OnSave() {

    this.ComplaintTicket = {
      WarehouseId: this.data.WarehouseId,
      ItemPerPage: 20,
      PageNo: 1,
      UserType: this.data.UserType,
      Category: this.selectcategory,
      Status: this.selectstatus1,
    Priority:this.SelectPriority,
    Search:this.data.Search,
    }
  }

  OnSaveStatus() {
    

    this.ChangeStatus = {
      TicketId: this.selecteddetail,
      status: this.selectstatus1,
      Priority:this.SelectPriority,
    }
    this.complaintservice.PostStatus(this.ChangeStatus).subscribe(result => {
      this.OnClick();
      this.ticketlist = result;
      window.location.reload()
    })

 ;

  }

  refreshChat() {
    this.complaintservice.GetTicket(this.ComplaintTicket).subscribe(result => {
      
            console.log('result', result);
            this.ticketlist = result.TicketData;
            this.totalRecords = result.total_count;
      
            this.Document = result.Document;
            console.log('this.totalRecords: ', this.totalRecords);
            this.blocked = false;
          });
    //this.OnClick();
     window.location.reload();
  }


  GetThisChat(TicketChat) {
    
    TicketChat.chat = false;
    this.showchatbox = true;
    TicketChat.TicketId = this.PeopleId;
    this.IsUser = true;

    console.log('TicketId :', TicketChat.TicketId);
  }


  sendMessage(chatMessage) {

    if (chatMessage) {
      console.log("chat", chatMessage)
      this.TicketChat = {
        TicketId: this.selecteddetail,
        chat: chatMessage,
        Attachment: this.Attachment,
      };

      this.complaintservice.PostChat(this.TicketChat).subscribe(result => {
        console.log(result);
        
        this.complaintservice.GetTicketChat(this.selecteddetail).subscribe(result => {
          
          this.selectedRowDetails = result.TicketChat;
          console.log('this.selectedRowDetails:', this.selectedRowDetails);
          for (var i in this.selectedRowDetails) {
            console.log('this.selectedRowDetails.IsUser:', this.selectedRowDetails[i].IsUser);
          }
        })
        this.OnClick();
        this.chatMessage = null;
      })
      
    }
  }

  GetData() {
    this.complaintservice.GetChat(this.TicketChat.TicketId).subscribe(result => {
      console.log("get chat ", result);
    })
  }

  upload(file: File[]) {
    
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.Attchment = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")
    };

  }

  uploader() {
    let formData = new FormData();
    formData.append('file', this.file[0])
    this.complaintservice.UploadImage(formData).subscribe(result => {
      
      console.log(result)
      alert("File Sucessfully Uploaded! Please Save ");
    })
  }
  keypress(e,chatMessage){
    if (e.which === 32 && !chatMessage)
      e.preventDefault();
  }

  
  Priority(Priority) {
    this.Priority = Priority

  }

}

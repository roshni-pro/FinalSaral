import { Component, OnInit } from '@angular/core';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { WuduService } from 'app/shared/services/wudu/wudu.service';
import { WuDuSmsCx } from 'app/shared/interface/wuduinterfaces/wu-du-sms-cx';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wudu-notification',
  templateUrl: './wudu-notification.component.html',
  styleUrls: ['./wudu-notification.component.scss']
})
export class WuduNotificationComponent implements OnInit {
  cityLists: any;
  Id: any;
  list: any[];
  cols: any[];
  selectedList: any;
  WuDuSmsCustomerId: any;
  radiodisabled:boolean;
  showcityandcategory:boolean;
  message: string;
  Notification:any;
  checked: boolean = false;
  blocked: boolean;
  type:string;
  isNotification:boolean;
  wuDuSmsCx: WuDuSmsCx;
  tempno: any;
  constructor(private ItemServices: TradeitemmasterService, private wuduService: WuduService,private messageService:MessageService) { }

  ngOnInit() {

this.radiodisabled=false;
this.isNotification=false;
    this.blocked = true;
    this.message=null;
    this.Notification=null;
    this.Id = '';
    this.selectedList = [];
    this.WuDuSmsCustomerId = [];
    this.tempno = [];
    //  this.loadData(this.Id);
    this.ItemServices.GetCityV2().subscribe(result => {
      this.cityLists = result;
    });

    this.cols = [
      { field: 'CustId', header: 'SkCustomerId' },
      { field: 'Name', header: 'CustomerName' },
      { field: 'Mobile', header: 'Mobile' }

    ];
    this.wuDuSmsCx={
      MobileNos:[],
      Message:null
    }
  }

  loadData(City) {
    this.blocked = true;
    this.wuduService.GetwuduCustomerList(City).subscribe(result => {
      this.blocked = false;
      this.list = result;
      // console.log( this.list);
      this.updateCustomerList();
    });
  }

  onSelectCustomer(customer) {
    if (customer.isSelected) {
      this.selectedList.push(customer);
    } else {
      this.selectedList = this.selectedList.filter(x => {
        return x.CustId != customer.CustId;
      });
    }
  }

  onSelection() {
    if (this.checked == true) {
      this.checked = false;
    } else {
      this.checked = true;
    }
  }

  removeCustomer(cust) {
    let listItem = this.list.filter(x => {
      return x.CustId == cust.CustId;
    });

    if (listItem && listItem.length > 0) {
      listItem[0].isSelected = 0;
    }
    this.selectedList = this.selectedList.filter(x => {
      return x.CustId != cust.CustId;
    });
  }

  updateCustomerList() {
    if (this.list && this.list.length > 0 && this.selectedList && this.selectedList.length > 0) {
      this.selectedList.forEach(x => {
        let result = this.list.filter(y => {
          return y.CustId == x.CustId;
        });
        if (result && result.length > 0) {
          result[0].isSelected = true;
        }
      })
    }
  }
  onEventTypeChange(selectedData) {
    this.type=selectedData;
    if(selectedData=="Message")
    {
      this.radiodisabled = false;
      this.isNotification=true;
      this.showcityandcategory = true;
    }
    else
    {
      this.radiodisabled = true;
      this.isNotification=false;
      this.showcityandcategory = false;
      this.onNotification();
    }
   
  }

  sendMessages() {
    
    if (!this.selectedList || this.selectedList.length < 1) {
      alert('select atleast one customer');
    } else if (!this.message) {
      alert('insert message');
    } else {  
      for (let index = 0; index < this.selectedList.length; index++) {
        var dataToPost =this.selectedList[index].Mobile;  
         this.wuDuSmsCx.MobileNos.push(dataToPost);
        } 
        this.wuDuSmsCx.Message = this.message;
      if(this.type=="Message")
      {
        this.wuduService.SendCustomerMessageList(this.wuDuSmsCx).subscribe(result => {      
          this.message = '';
          this.selectedList = [];
          this.WuDuSmsCustomerId = [];    
          if(result== true)
          {
            this.messageService.add({ severity: 'success', summary: 'message are sent successfully!', detail: '' });
            this.ngOnInit();
          }   
          else
          {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!', detail: '' });
            this.ngOnInit();
          }               
        });
      }
      else
      {
        this.wuduService.SendNotification(this.wuDuSmsCx).subscribe(result => {      
          this.message = '';
          this.selectedList = [];
          this.WuDuSmsCustomerId = [];  
          if(result== true)
          {
            this.messageService.add({ severity: 'success', summary: 'message are sent successfully!', detail: '' });
            this.ngOnInit();
          }   
          else
          {
            this.messageService.add({ severity: 'error', summary: 'Something went wrong!', detail: '' });
            this.ngOnInit();
          }   
        });
      }        
    }

  }

  onNotification()
  {
    this.blocked = true;
    this.wuduService. GetwuduCustomerListMongo().subscribe(result => {
      this.blocked = false;
      this.list = result;        
    });
  }
 
}

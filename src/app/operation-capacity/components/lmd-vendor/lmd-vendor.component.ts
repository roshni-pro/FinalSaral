import { Component, OnInit } from '@angular/core';
import { LmdVendorListDC } from 'app/operation-capacity/interface/lmd-vendor-list';
import { LmdVendorService } from 'app/operation-capacity/services/lmd-vendor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lmd-vendor',
  templateUrl: './lmd-vendor.component.html',
  styleUrls: ['./lmd-vendor.component.scss']
})
export class LmdVendorComponent implements OnInit {
  lmdVendorList : any;
  keyWord : any='';
  lmdVendorListDC : LmdVendorListDC;
  isOpenVendor : boolean = false;
  VendorName : any;
  isUpdate : boolean = false;
  updateData : any; 
  blocked : boolean = false;

  constructor(private lmdVendorService : LmdVendorService,private messageService: MessageService) { }

  ngOnInit() {
    this.onSearch();
  }
  onSearch()
  {
    this.blocked = true;
    this.lmdVendorService.getLMDVendorList(this.keyWord).subscribe(x=>
      {
        this.lmdVendorList = x;
        this.blocked = false;
        console.log('lmdVendorList : ', this.lmdVendorList);
      });
  }
  onOpenInserPopup()
  {
    this.VendorName = '';
    this.isUpdate = false;
    this.isOpenVendor = true;
  }
  onInsert()
  {
    this.blocked = true;
    this.lmdVendorService.insertLMDVendor(this.VendorName).subscribe(x=>
      {
        this.blocked = false;
        if(x.Status)
          {
            this.isOpenVendor = false;
            this.messageService.add({ severity: 'success', summary: x.Message, detail: '' });         
            this.onSearch();
          }
        console.log('insertlmdVendorList : ', x);
//         Message
      });
  }
  onOpenVendorForUpdate(data)
  {
    this.VendorName = data.VendorName;
    this.updateData = data;
    this.isUpdate = true;
    this.isOpenVendor = true;
  }
  onUpdate()
  {
    this.lmdVendorListDC = 
    {
      Id : this.updateData.Id,
      VendorName : this.VendorName
    }
    this.blocked = true;
    this.lmdVendorService.updateLMDVendor(this.lmdVendorListDC).subscribe(x=>
      {
        this.blocked = false;
       if(x.Status)
       {
          this.isOpenVendor = false;
          this.messageService.add({ severity: 'success', summary: x.Message, detail: '' });         
          this.onSearch();
       }
        console.log('updatelmdVendorList : ', x);
      });
  }
  onDelete(data)
  {
    this.blocked = true;
    this.lmdVendorService.deleteLMDVendor(data.Id).subscribe(x=>
      {
        this.blocked = false;
        if(x)
          {
            this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!!', detail: '' });         
            this.onSearch();
          }
        
        console.log('deletelmdVendorList : ', x);
      });
  }

}

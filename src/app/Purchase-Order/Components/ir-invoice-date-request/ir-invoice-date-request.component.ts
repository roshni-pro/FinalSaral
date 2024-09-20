import { Component, OnInit } from '@angular/core';
import { PodashboardserviceService } from 'app/Purchase-Order/Services/podashboardservice.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ir-invoice-date-request',
  templateUrl: './ir-invoice-date-request.component.html',
  styleUrls: ['./ir-invoice-date-request.component.scss']
})
export class IRInvoiceDateRequestComponent implements OnInit {

  constructor(private WarehouseService :WarehouseService ,
    private PodashboardserviceService:PodashboardserviceService) { }

  ngOnInit() {
    this.GetWareHouse()
  }

  blocked:boolean=false;
  WareHouseList:any
  selectedWareHouse:any
  selectDate:any
  
  GetWareHouse( )
  {
    this.WarehouseService.GetWarehouseNew().subscribe(res=>
    {
      this.WareHouseList=res
      console.log(this.WareHouseList,"WarehousesAPi");
    })
  }

  ViewList:any
  date1:any=null
  date2:any=null
  Search()
  {
    debugger
    if(this.selectedWareHouse==undefined)
    {
      alert("Please Select Warehouse");
      return false;
    }
    if(this.selectDate)
    {
      this.date1=this.selectDate[0];
      this.date2=this.selectDate[1];
      if(this.date2==undefined) { alert("Please Select Two Date") ; return false;}; 
    }
    if(this.selectedWareHouse!=undefined)
    {
      let wid=this.selectedWareHouse.value;
      let startD = this.date1 ? moment(this.selectDate[0]).format('YYYY/MM/DD') : null
      let EndD = this.date2 ? moment(this.selectDate[1]).format('YYYY/MM/DD') : null
      this.blocked=true;
      this.PodashboardserviceService.GetIRDetailViaIcApprove(wid,startD,EndD).subscribe(res=>
      {
        // debugger;
        this.ViewList=res
        this.blocked=false;
        console.log(this.ViewList);
        
      })
    }
  }

  iSshow:boolean=false
  InvoiceDate:any
  InvoiceNumber:any
  IRType:any
  popupList:any
  IRmasterid:any
  View(item)
  {
    debugger;
    this.IRmasterid=item.IRMasterID
    this.PodashboardserviceService.EditIR(item.IRMasterID).subscribe(res=>
      {
        debugger;
        this.InvoiceDate=moment(item.InvoiceDate).format('L');
        this.InvoiceNumber=item.InvoiceNumber;
        this.IRType=item.IRType
        this.iSshow=true;
        this.popupList=res.IRItemDcs
        console.log(this.popupList);
        
      })
  }

  Accept()
  {

    this.PodashboardserviceService.AcceptRejectByIcLeadIR(this.IRmasterid,true).subscribe(res=>
    {
      console.log(res);
      // {Message: 'Updated Successfully ', Status: true, Data: null}
      if(res.Status==true)
      {
        alert(res.Message);
        this.iSshow=false;
        this.Search();
      }        
      else{
        alert(res.Message)
        this.iSshow=false;
      }
    })
  }

  Reject()
  {

    this.PodashboardserviceService.AcceptRejectByIcLeadIR(this.IRmasterid,false).subscribe(res=>
      {
        console.log(res);
        if(res.Status==true)
        {
          alert("Rejected Successfully");
          this.iSshow=false;
          this.Search();
        }        
        else{
          alert(res.Message);
          this.iSshow=false;
        }
      })
  }

}

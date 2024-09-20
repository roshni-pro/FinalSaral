import { Component, OnInit } from '@angular/core';
import {CashMgmtServicesService} from '../Services/cash-mgmt-services.service'
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-cash-comp',
  templateUrl: './cash-comp.component.html',
  styleUrls: ['./cash-comp.component.scss']
})
export class CashCompComponent implements OnInit 
{
  display: boolean = false;


  constructor(private _service:CashMgmtServicesService ,private router: Router) {}
  closingCash:any[];
  openingCash:any[];
  todaysCollection:any[];
  othertodaysCollection:any[];
  NotesAmount:number=0
  CoinsAmount:number=0
  TotalNotes:number=0
  request:boolean;
  acceptrequest:boolean;
  cashverified:boolean;
  verified:boolean;
  ware:any;
  totalCurrencyList : any[]=[];
  totalotherCurrencyList:any[]=[];
  // date:DatePipe
  selected:any={Id:0,Date:''}
  totalAmountDC : any[];
  cashierIncreement : number = 2;
  OtherCasherDataDcs : any;
  BODCashData : any;
  warehouseid : any;
  ChequeAmt:any[];
  chequeCount:any[];
  userid:any[];
  action:boolean;
  ButtonShowAcceptPeople:boolean;
  ButtonShowRequestPeople : boolean;
  ButtonShowVerifiePeople : boolean;
  userId : any;
  getData()
  {
    console.log("selected  ",this.selected);
    
  }
  search(warehouseid)
  {
    debugger;
    this.totalCurrencyList = [];
    this.totalotherCurrencyList = [];
    var selectedDate = moment(this.selected.Date).format('MM/DD/YYYY');
    this._service.cashCollections(warehouseid,selectedDate).subscribe(res=>{

      this.ChequeAmt=res;
      this.chequeCount=res;
      console.log("result",res);

      this.BODCashData = res;
      if(this.BODCashData.InputDate != null){
        debugger;
        this.selected.Date = this.BODCashData.InputDate;
      }
      this.OtherCasherDataDcs = res.OtherCasherDataDcs;
      if(res.OtherCasherDataDcs.length > 0){
        for(var i in res.OtherCasherDataDcs){
           debugger;
          this.cashierIncreement += Number.parseInt(i);
          // this.OtherCasherDataDcs = res.OtherCasherDataDcs[i];
          console.log('this.cashierIncreement',this.cashierIncreement);
        }
    }
    this.todaysCollection=res.WarehouseTodayCash; 
    this.othertodaysCollection=res.OtherCasherDataDcs;
    //--------todays collections 
    this.todaysCollection.forEach(x =>
      {
        if(x.CashCurrencyType=="Notes" && x.CurrencyCount!=0)
        {
          this.NotesAmount+=x.CurrencyDenominationValue*x.CurrencyCount
          console.log("Notes Amount",this.NotesAmount);
        }

        if(x.CashCurrencyType=="Coins" && x.CurrencyCount!=0)
        {
          this.CoinsAmount+=x.CurrencyDenominationValue*x.CurrencyCount
          console.log(this.CoinsAmount,"Coins Amount");
        }       
      })
      this.TotalNotes+=this.NotesAmount+this.CoinsAmount
      let object={
        NotesAmount : this.NotesAmount,
        CoinsAmount : this.CoinsAmount,
        TotalNotes : this.TotalNotes
      }
      this.totalCurrencyList.push(object);
      console.log(this.totalCurrencyList,'totalCurrencyList');
      
      // console.log(this.TotalNotes,"TotalNotes"); 

      //----------othertodaycollection
      this.othertodaysCollection.forEach(x =>
        {
          if(x.CashCurrencyType=="Notes" && x.CurrencyCount!=0)
          {
            this.NotesAmount+=x.CurrencyDenominationValue*x.CurrencyCount
            console.log("Notes Amount",this.NotesAmount);
          }

          if(x.CashCurrencyType=="Coins" && x.CurrencyCount!=0)
          {
            this.CoinsAmount+=x.CurrencyDenominationValue*x.CurrencyCount
            console.log(this.CoinsAmount,"Coins Amount");
          }       
        })
        this.TotalNotes+=this.NotesAmount+this.CoinsAmount
        let obj={
          NotesAmount : this.NotesAmount,
          CoinsAmount : this.CoinsAmount,
          TotalNotes : this.TotalNotes
        }
        this.totalotherCurrencyList.push(obj);
        console.log(this.totalotherCurrencyList,'totalotherCurrencyList');   
    })  
  }
  ngOnInit()
  {
    this.selected.Date = new Date();
    // this.warehouseid =  localStorage.getItem('Warehouseid');
    // this.totalAmountDC = [
    //   //{totalCheckAmount : 100,totalCheckSubmitted : 60},
    //   // {totalCheckAmount : 100,totalCheckSubmitted : 60}
    // ]

    this.request = true;
    this.acceptrequest = false;
    this.cashverified = false;
    this.verified = false;
    this.GetWarList()
    // var warehouseid= 7;
    // this.warehouseid = 1;
    this.warehouseid = localStorage.getItem('Warehouseid');
    var loginId = localStorage.getItem('userid');
    this.userId = Number.parseInt(loginId);
    this._service.GetRequestBtn(this.warehouseid,false,this.userId).subscribe(x=>{
      debugger;
    this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
    this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
    this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
    })
    this.search(this.warehouseid);
//     this._service.cashCollections(warehouseid).subscribe(res=>{
//       this.BODCashData = res;
//       this.OtherCasherDataDcs = res.OtherCasherDataDcs;
//       if(res.OtherCasherDataDcs.length > 0){
//         for(var i in res.OtherCasherDataDcs){
//           // debugger;
//           this.cashierIncreement += Number.parseInt(i);
//           console.log('this.cashierIncreement',this.cashierIncreement);
//         }
//     }
//       console.log("dataaaa",res);//WarehouseClosingCash WarehouseOpeningCash WarehouseTodayCash 
//       this.todaysCollection=res.WarehouseTodayCash;
//       // this.totalAmountDC = res.totalAmountDC;
//       // this.date=res.CurrencyHubStockId.BOD;
//       console.log("today's",this.todaysCollection);

//       this.othertodaysCollection=res.OtherCasherDataDcs[0].WarehouseTodayCash;    //      this.DistplayDate=res.CurrencyHubStockId.BOD
// // console.log("Date",this.DistplayDate);
//       console.log("others",this.othertodaysCollection);

// //--------todays collections
//     this.todaysCollection.forEach(x =>
//       {
//         if(x.CashCurrencyType=="Notes" && x.CurrencyCount!=0)
//         {
//           this.NotesAmount+=x.CurrencyDenominationValue*x.CurrencyCount
//           console.log("Notes Amount",this.NotesAmount);
//         }

//         if(x.CashCurrencyType=="Coins" && x.CurrencyCount!=0)
//         {
//           this.CoinsAmount+=x.CurrencyDenominationValue*x.CurrencyCount
//           console.log(this.CoinsAmount,"Coins Amount");
//         }       
//       })
//       this.TotalNotes+=this.NotesAmount+this.CoinsAmount
//       let object={
//         NotesAmount : this.NotesAmount,
//         CoinsAmount : this.CoinsAmount,
//         TotalNotes : this.TotalNotes
//       }
//       this.totalCurrencyList.push(object);
//       console.log(this.totalCurrencyList,'totalCurrencyList');
      
//       // console.log(this.TotalNotes,"TotalNotes"); 

//       //----------othertodaycollection
//       this.othertodaysCollection.forEach(x =>
//         {
//           if(x.CashCurrencyType=="Notes" && x.CurrencyCount!=0)
//           {
//             this.NotesAmount+=x.CurrencyDenominationValue*x.CurrencyCount
//             console.log("Notes Amount",this.NotesAmount);
//           }

//           if(x.CashCurrencyType=="Coins" && x.CurrencyCount!=0)
//           {
//             this.CoinsAmount+=x.CurrencyDenominationValue*x.CurrencyCount
//             console.log(this.CoinsAmount,"Coins Amount");
//           }       
//         })
//         this.TotalNotes+=this.NotesAmount+this.CoinsAmount
//         let obj={
//           NotesAmount : this.NotesAmount,
//           CoinsAmount : this.CoinsAmount,
//           TotalNotes : this.TotalNotes
//         }
//         this.totalotherCurrencyList.push(obj);
//         console.log(this.totalotherCurrencyList,'totalotherCurrencyList');        
//     //     console.log(this.TotalNotes,"OtherTotalNotes");    
//     }) 

  }
  back()
  {
    // this.router.navigateByUrl('layout/customer/gullak/' + this.Id + '/' + this.CustomerId);
  }
  name:any=[];
  GetWarList()
  {
    this._service.GetWarehouse().subscribe(res=>
      {
        // this.ware=res
        // console.log("WareHouseList",this.ware);
        this.name=res;
        debugger
        if(Number.parseInt(this.warehouseid) > 0){
          var wHData = this.name.filter(x=>x.WarehouseId == this.warehouseid);
          this.selected.Id = wHData[0];
          this.selected.Id.WarehouseId = wHData[0].WarehouseId;
        }
        console.log("WareHouseList",this.selected);
      })
  } 
 
  cashDisplay:boolean=false;
  showDialogRequest() { 
    //this.display = true;
    this.action=false
    this.cashDisplay = true;
    debugger;
  }

  reqAccptBtnEnable(){
    this.acceptrequest = true;
    this.cashDisplay = false;
    this.request = false;
    // var userid = localStorage.getItem('userid');
    this._service.GetRequestBtn(this.warehouseid,this.acceptrequest,this.userId).subscribe(x=>{
      debugger;
      this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
      this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
      this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
    })
  }

  dialogReqAcc:boolean=false;
  showDialogRequestAccept(){
    // var userid = localStorage.getItem('userid');
    this._service.GetRequestBtn(this.warehouseid,this.acceptrequest,this.userId).subscribe(x=>{
      debugger;
      this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
      this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
      this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
    })
    this.dialogReqAcc = true;
  }



  
  verifybtnenable(){
    this.cashverified = true;
    this.acceptrequest = false;
    this.dialogReqAcc = false;
    // var userid = localStorage.getItem('userid');
    this._service.GetRequestBtn(this.warehouseid,this.cashverified,this.userId).subscribe(x=>{
      debugger;
      this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
      this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
      this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
    })
  }

  dialogVerify:boolean=false;
  showDialogVerify(){
    
    this.dialogVerify = true;
  }

  verifiedbtnenb(){
    this.verified = true;
    this.cashverified = false;
    this.dialogVerify = false;
  }
}

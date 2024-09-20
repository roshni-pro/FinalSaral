import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CashMgmtServicesService } from '../Service/cash-mgmt-services.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { SkSharedModule } from 'app/shared/sk-shared/sk-shared.module';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-multi-cashier',
  templateUrl: './multi-cashier.component.html',
  styleUrls: ['./multi-cashier.component.scss']
})
export class MultiCashierComponent implements OnInit {
  display: boolean = false;

  constructor(private _service:CashMgmtServicesService ,private router: Router) {}
  closingCash:any[];
  openingCash:any[];
  todaysCollection:any[];
  othertodaysCollection:any[];
  NotesAmount:number=0
  CoinsAmount:number=0
  TotalNotes:number=0
  OtherNotesAmount:number=0
  OtherCoinsAmount:number=0
  OtherTotalNotes:number=0
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
  cashiermsg:any;
  userId : any;
  todayDate : any;
  blocked : boolean = false;
  selectedDate:any;
  TotalAmounttcash:any;
  TotalAmounttCheque:any;
  TotalSubmittedAmountCashAmt:any;
  TotalSubmittedAmounttChequeAmt:any;
  getData()
  {
    console.log("selected  ",this.selected);
    
  }
  search(warehouseid)
  {   
    debugger;
    this.NotesAmount = 0;
    this.cashiermsg = "";
    this.CoinsAmount = 0;
    this.TotalNotes = 0;
    this.OtherNotesAmount = 0;
    this.OtherCoinsAmount = 0;
    this.OtherTotalNotes = 0;
    if(warehouseid > 0){
    this.totalCurrencyList = [];
    this.totalotherCurrencyList = [];
    this.selectedDate = moment(this.selected.Date).format('MM/DD/YYYY');
    this.blocked = true;
    this._service.cashCollections(warehouseid,this.selectedDate).subscribe(res=>{
      debugger;
      this.blocked = false;
      // this.ChequeAmt=res;
      // this.chequeCount=res;      
       this.BODCashData = res;
      // if(this.BODCashData &&  (this.BODCashData.CasherPeopleName == '' ||  (this.BODCashData.OtherCasherDataDcs.length == 0)))
      // {
      //   alert('Cash Collection not maintained for all cashier for !' + this.selected.Date);
      // // }
      // if(this.BODCashData.InputDate != null){        
      //   this.selected.Date = this.BODCashData.InputDate;
      // }
      this.OtherCasherDataDcs = res.OtherCasherDataDcs;
      this.cashierIncreement =res.OtherCasherDataDcs.length 
      this.TotalSubmittedAmountCashAmt=res.TotalOpeingamount;
      this.TotalSubmittedAmounttChequeAmt=res.TotalSubmittedChequeamount;
    //   if(res.OtherCasherDataDcs.length > 0){
    //     for(var i in res.OtherCasherDataDcs){          
    //       this.cashierIncreement += Number.parseInt(i);         
    //     }
    // }
    this.todaysCollection=res.WarehouseTodayCash; 
    this.othertodaysCollection=res.OtherCasherDataDcs;
    //--------todays collections 
    this.todaysCollection.forEach(x =>
      {
        if(x.CashCurrencyType=="Notes" && x.CurrencyCount!=0)
        {
          this.NotesAmount+=x.CurrencyDenominationValue*x.CurrencyCount          
        }

        if(x.CashCurrencyType=="Coins" && x.CurrencyCount!=0)
        {
          this.CoinsAmount+=x.CurrencyDenominationValue*x.CurrencyCount          
        }       
      })
      this.TotalNotes+=this.NotesAmount+this.CoinsAmount
      let object={
        NotesAmount : this.NotesAmount,
        CoinsAmount : this.CoinsAmount,
        TotalNotes : this.TotalNotes
      }
      this.totalCurrencyList.push(object);     
      
      // console.log(this.TotalNotes,"TotalNotes"); 

      //----------othertodaycollection
      this.OtherNotesAmount = 0;
      this.OtherCoinsAmount = 0;
      this.OtherTotalNotes = 0;
      this.othertodaysCollection.forEach(x =>
        {
          x.WarehouseTodayCash.forEach(element => {
              if(element.CashCurrencyType=="Notes" && element.CurrencyCount!=0)
              {
                this.OtherNotesAmount+=element.CurrencyDenominationTotal
               
              }
    
              if(element.CashCurrencyType=="Coins" && element.CurrencyCount!=0)
              {
                this.OtherCoinsAmount+=element.CurrencyDenominationTotal                
              }   
          });        
        })
        this.OtherTotalNotes+=this.OtherNotesAmount+this.OtherCoinsAmount
        let obj={
          NotesAmount : this.OtherNotesAmount,
          CoinsAmount : this.OtherCoinsAmount,
          TotalNotes : this.OtherTotalNotes
        }
        this.totalotherCurrencyList.push(obj);       
        var TotalAmtcheque= this.totalCurrencyList ? this.totalCurrencyList[0].TotalNotes : 0;
        var TotalAmtCash=this.BODCashData ? this.BODCashData.WarehouseTotalChequeAmount :  0;
       
        this.blocked = true;
        this._service.GetRequestBtn(this.warehouseid,false,this.userId,TotalAmtcheque,TotalAmtCash,this.selectedDate,"").subscribe(x=>{
          debugger;
          this.blocked = false;
          var totalCurrencyList= this.totalCurrencyList ? this.totalCurrencyList[0].TotalNotes : 0;
          var totalotherCurrencyList = this.totalotherCurrencyList ? this.totalotherCurrencyList[0].TotalNotes : 0;
          var whTotalChequeAmt=this.BODCashData ? this.BODCashData.WarehouseTotalChequeAmount :  0;
          var otherTotalChequeAmt=this.OtherCasherDataDcs.length > 0 ? this.OtherCasherDataDcs[0].OtherCasherTotalChequeAmount :  0;
          var TotalAmtCash = totalCurrencyList + totalotherCurrencyList;
          var TotalAmtcheque=whTotalChequeAmt + otherTotalChequeAmt;
          this.TotalAmounttcash=TotalAmtCash;
          this.TotalAmounttCheque=TotalAmtcheque;
        // this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
        // this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
        // this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
        // if(x.Status == true || x.Message == 'Process done by all cashier!!'){
        //   this.verified = true;
        // }else if(x.Message== "Request already done")
        // {
        //   this.requestSend = true;
        // }
         this.cashiermsg=   x.Message ;

        })  
    })  
  }else{
    alert('Please Select Warehouse First!');
  }
  }
  ngOnInit()
  {
    this.selected.Date = new Date();
    this.todayDate = new Date();
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

    this.userId = Number.parseInt(localStorage.getItem('userid'));
debugger;
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
    // window.open("https://uat.shopkirana.in/#/WarehouseCurrencyDashboard");
    debugger;
    let loginData = localStorage.getItem('tokenData');
    if (loginData) {
        let loginDataObject = JSON.parse(loginData);
        // window.open(environment.apiURL + "#/WarehouseCurrencyDashboard" + loginDataObject.access_token + "/" + loginDataObject.Warehouseids + "/" + loginDataObject.userid + "/" + loginDataObject.userName + "/" + loginDataObject.Warehouseid);
        window.open(environment.apiURL + "#/WarehouseCurrencyDashboard");
    }
  }
  name:any=[];
  GetWarList()
  {
    this.blocked = true;
    this._service.GetWarehouse().subscribe(res=>
      {
        this.blocked = false;
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
  buttonClickName:string="";
  showDialogRequest() { 
    //this.display = true;
    this.action=false;
    this.cashDisplay = true;
    this.buttonClickName="RequestBtn";
  }

  requestSend : boolean = false;
  reqAccptBtnEnable(){
    this.acceptrequest = true;
    this.cashDisplay = false;
    this.display = false;
    //this.request = false;
    // this.ButtonShowAcceptPeople = true;
    // var userid = localStorage.getItem('userid');
    var TotalAmtcheque= this.totalCurrencyList ? this.totalCurrencyList[0].TotalNotes : 0;
    var TotalAmtCash=this.BODCashData ? this.BODCashData.WarehouseTotalChequeAmount :  0;
    this.blocked = true;
    this._service.GetRequestBtn(this.warehouseid,this.acceptrequest,this.userId,TotalAmtcheque,TotalAmtCash,this.selectedDate, this.buttonClickName).subscribe(x=>{
     
      this.blocked = false;
      this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
      this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
      this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
      if(x.Message== "Request already done")
      {
        this.requestSend = true;
      }else if(x.Message == "Process Request Sucessfully" && !x.ButtonShowAcceptPeople && !x.ButtonShowRequestPeople && !x.ButtonShowVerifiePeople)
        {
          this.requestSend = true;
        }
        this.search(this.warehouseid);
    })
  }

  reqaccptclose()
  {
    this.cashDisplay=false;
    this.buttonClickName="";
  }

  dialogReqAcc:boolean=false;
  showDialogRequestAccept(){
    // var userid = localStorage.getItem('userid');
    this.acceptrequest=true;
    // var TotalAmtcheque= this.totalCurrencyList ? this.totalCurrencyList[0].TotalNotes : 0;
    // var TotalAmtCash=this.BODCashData ? this.BODCashData.WarehouseTotalChequeAmount :  0;
    // this._service.GetRequestBtn(this.warehouseid,this.acceptrequest,this.userId,TotalAmtcheque,TotalAmtCash).subscribe(x=>{
    //   debugger;
    //   this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
    //   this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
    //   this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
    // })
    this.display = true;
    this.buttonClickName="AcceptBtn";
  }

  dialogVerified:boolean=false;
  showDialogVerified()
  {
    this.dialogVerified = true;
  }
  
  verifybtnenable(){
    this.cashverified = true;
    this.acceptrequest = false;
    this.dialogReqAcc = false;
    // var userid = localStorage.getItem('userid');
    this.blocked = true;
    this._service.GetRequestBtn(this.warehouseid,this.cashverified,this.userId,this.tempData.OtherCasherTotalChequeAmount,this.tempData.OtherCasherTotalTodayChequeCount,this.selectedDate,"").subscribe(x=>{
      debugger;
      this.blocked = false;
      this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
      this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
      this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
      if(x.Message== "Request already done")
        {
          this.requestSend = true;
        }
        this.search(this.warehouseid);
    })
  }
  tempData : any;
  dialogVerify:boolean=false;
  showDialogVerify(){
    // this.tempData = c;
    this.dialogVerify = true;
    this.buttonClickName="VerifyBtn";  
  }

  verifiedbtnenb(){
    debugger;
    // this.verified = true;
    this.cashverified = true;
    this.dialogVerify = false;
    var totalCurrencyList= this.totalCurrencyList ? this.totalCurrencyList[0].TotalNotes : 0;
    var totalotherCurrencyList = this.totalotherCurrencyList ? this.totalotherCurrencyList[0].TotalNotes : 0;
    var whTotalChequeAmt=this.BODCashData ? this.BODCashData.WarehouseTotalChequeAmount :  0;
    var otherTotalChequeAmt=this.OtherCasherDataDcs.length > 0 ? this.OtherCasherDataDcs[0].OtherCasherTotalChequeAmount :  0;
    var TotalAmtcheque = totalCurrencyList + totalotherCurrencyList;
    var TotalAmtCash=whTotalChequeAmt + otherTotalChequeAmt;
    this.blocked = true;
    this._service.GetRequestBtn(this.warehouseid,this.cashverified,this.userId,TotalAmtcheque,TotalAmtCash,this.selectedDate,this.buttonClickName).subscribe(x=>{
      debugger;
      this.blocked = false;
      this.ButtonShowAcceptPeople = x.ButtonShowAcceptPeople;
      this.ButtonShowRequestPeople = x.ButtonShowRequestPeople;
      this.ButtonShowVerifiePeople = x.ButtonShowVerifiePeople;
      if(x.Status == true  || x.Message == 'Process done by all cashier!!'){
        this.verified = true;
      }else if(x.Message== "Request already done")
      {
        this.requestSend = true;
      }
      this.search(this.warehouseid);
    })
  }
}

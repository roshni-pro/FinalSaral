import { Component, OnInit } from '@angular/core';
import { MtdService } from 'app/cash-managment/Service/mtd.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-mt-dcollection-screen',
  templateUrl: './mt-dcollection-screen.component.html',
  styleUrls: ['./mt-dcollection-screen.component.scss']
})
export class MtDCollectionScreenComponent implements OnInit {

  month:any;
  blocked:boolean;
  WareHouseList:any[]=[]
  MTDdata:any[]=[]
  selectedWareHouseId:any
  selectedWareHouse:any[]=[]
  selectDate:any
  MTDCollectionDC:any=null
  Flag:boolean=false
  mtdCollection:number=0
  mtdChequeDeposit:number=0
  mtdCashDeposit:number=0
  todayCollection:number=0
  todayCheque:number=0
  todayCash:number=0

  constructor(private service:MtdService,private exportservice:ExportServiceService) { }

  ngOnInit() {
    this.GetWareHouse()
    this.MTDData()
    //alert("Please Select Two Dates to Search")
}

  GetWareHouse( )
  {
    this.service.GetWareHouse().subscribe(res=>
      {
        this.WareHouseList=res
        console.log(this.WareHouseList,"WarehousesAPi");
        this.selectedWareHouse = this.WareHouseList;
        // console.log(this.WareHouseList,"All WareHouseFromm API");
        // this.AllWareHouses = this.WareHouseList.map(function (a) {
        //   return {
        //     'WareHouseId': a.WarehouseId,
        //   };
        // });
        this.MTDData();
     
          console.log(this.AllWareHouses,"All Ids");
        

      })
  }
  wareHouseId:number
  FromDate:any=null
  ToDate:any=null
  HubCurrency:any[]=[]
  EOD:any=null
  DateOfBank:any=null
  Flag1:boolean=false
  Flag2:boolean=false
  TotalCheque:number
  TotalCash:number
  TotalCollection:number
  EODData:any
  depositDate:any
  WareHousesId:any[]=[]
  AllWareHouses:any[]=[]
  date1:any;
  date2:any;

  
  MTDData()
  {
    
   this.WareHousesId = [];
   this.mtdCollection=0
   this.mtdCashDeposit=0
   this.mtdChequeDeposit=0
   this.todayCash=0
   this.todayCheque=0
   this.todayCollection=0 

   console.log(this.selectedWareHouse);
   this.selectedWareHouse.forEach(element => {
    this.WareHousesId.push(element.WarehouseId);
   });
  console.log(this.WareHousesId,"WareHousesIds");

 
  if(this.selectDate)
  {
  this.date1=this.selectDate[0];
  this.date2=this.selectDate[1];
  
  //var Difference_In_Time = date2.getTime() - date1.getTime();
  if(this.date2==undefined) alert("Please Select Two Date");
  var Difference_In_Time=this.date2.getTime()-this.date1.getTime()
  var Difference_In_Days = Difference_In_Time / (1000 * 3600*24);
  }
  
  if(Difference_In_Days>31)
  {
    alert("Please Select Date Range Between One month ")
    this.click();
  }
  
  
  if(Difference_In_Days<31)
  {
   if((this.WareHousesId && this.WareHousesId.length > 0) && this.selectDate != null)
   {
    
    this.Flag=true
    // this.wareHouseId=this.selectedWareHouseId.WarehouseId
    // console.log(this.wareHouseId,"WareHouseId");
    //console.log(this.selectDate,"Date")
   
    if(this.selectDate!=null)
    {
    this.FromDate=this.selectDate[0];
    this.ToDate=this.selectDate[1];
    }
    //console.log(this.FromDate,"FromDate");
    //console.log(this.ToDate,"ToDate");
    //console.log(this.WareHousesId,"WarehouseIds");
    const payload=
    {
      'warehouseIds':this.WareHousesId,

      'Fromdate':this.FromDate,
      'Todate':this.ToDate
    }
    this.blocked=true;
    this.service.GetData(payload).subscribe(res =>
      {
        console.log(res,"Res");
        this.MTDdata=res.hubCurrencyCollectionDcs
        console.log(this.MTDdata,"MTDdata");
        this.Flag1=false
        this.Flag2=true
        this.ShowBox=true
        this.TotalCheque=res.TotalBankChequeAmt
        this.TotalCash=res.TotalBankCashAmt
        this.TotalCollection=res.TotalCollections
        console.log(this.TotalCollection,"TotalCollection");
        console.log(this.TotalCash);
        console.log(this.TotalCheque);
        this.blocked=false;
      })
   }
  
  }

 // console.log(this.WareHousesId,"WareHouseIdssss3");
     // alert("hiiii")
     //debugger;
  if(!this.selectDate && this.WareHousesId.length > 0 && this.WareHousesId)
  
    {
        this.Flag=true
        //console.log(this.selectedWareHouse,"Selected WareHouse");
   //  this.wareHouseId=this.selectedWareHouseId.WarehouseId
     //   console.log(this.WareHousesId,"WareHouseIdssss");
   
        const payload=
        {
            'warehouseIds':this.WareHousesId,
            'Fromdate':null,
            'Todate':null
        }
        this.blocked=true;
    this.service.GetData(payload).subscribe(res =>
      {
        console.log(res,"Resrr");
        this.MTDdata=res.hubCurrencyCollectionDcs
        this.MTDCollectionDC=res.mtDCollectionDC
        console.log(this.MTDdata,"MTDdata");
        console.log(this.MTDCollectionDC,"MTDCollectionDC");

      // this.TotalBankCashAmount=res.mtDCollectionDC.TotalBankCashAmount
      //this.TotalBankChequeAmount=res.mtDCollectionDC.TotalBankChequeAmount
      //this.MTDdata

        this.mtdCollection=this.MTDCollectionDC.MTDTotalCollection
        this.mtdChequeDeposit=this.MTDCollectionDC.MTDTotalBankChequeDeposit
        this.mtdCashDeposit=this.MTDCollectionDC.MTDTotalBankCashDeposit
        this.todayCollection=this.MTDCollectionDC.TodayCollection
        this.todayCheque=this.MTDCollectionDC.TodaybankChequeDeposit
        this.todayCash=this.MTDCollectionDC.TodaybankCashDeposit
        this.Flag1=true
        this.Flag2=false  
        this.ShowBox=true
        this.blocked=false;
      })
    }
    
  
   //}
   
  }
  ShowBox:boolean=false
  click()
  {
    // this.selectedWareHouseId=null
    this.selectDate=null
    this.MTDdata=[]
    this.ShowBox=false
    this.selectedWareHouse=[]
  }
  back()
  {
    
    let loginData = localStorage.getItem('tokenData');
    if (loginData) {
        let loginDataObject = JSON.parse(loginData);
        // window.open(environment.apiURL + "#/WarehouseCurrencyDashboard" + loginDataObject.access_token + "/" + loginDataObject.Warehouseids + "/" + loginDataObject.userid + "/" + loginDataObject.userName + "/" + loginDataObject.Warehouseid);
        window.open(environment.apiURL + "#/HQLiveCurrencyDashboard");
    }
  } 

  export()
  {
    // if(this.WareHousesId.length > 0 && !this.selectDate)
    // {
    // alert("Plaese Select Date Range to Export")
    // }
    
    //  this.date1=this.selectDate[0]
    // this.date2=this.selectDate[1]
    // //var Difference_In_Time = date2.getTime() - date1.getTime();
    // var Difference_In_Time=this.date2.getTime()-this.date1.getTime()
    // var Difference_In_Days = Difference_In_Time / (1000 * 3600*24);
    // console.log("day",Difference_In_Days);
  
    // if(Difference_In_Days<31  )
    // {

    this.selectedWareHouse.forEach(element => {
      this.WareHousesId.push(element.WarehouseId);
     });
    console.log(this.WareHousesId,"WareHousesId");
    
     if( (this.WareHousesId.length > 0 && this.selectDate != null) || this.WareHousesId.length > 0)
     {
      this.Flag=true
      // this.wareHouseId=this.selectedWareHouseId.WarehouseId
      // console.log(this.wareHouseId,"WareHouseId");
      console.log(this.selectDate,"Date")
      if(this.selectDate!=null)
      {
      this.FromDate=this.selectDate[0]
      this.ToDate=this.selectDate[1]
      }
      console.log(this.FromDate,"FromDate");
      console.log(this.ToDate,"ToDate");
      console.log(this.WareHousesId,"WarehouseIds");
      const payload=
      {
        'warehouseIds':this.WareHousesId,
        'Fromdate':this.FromDate,
        'Todate':this.ToDate
      }
      this.service.GetData(payload).subscribe(res =>
        {
          
          console.log(res,"Res");
          this.MTDdata=res.hubCurrencyCollectionDcs
          console.log(this.MTDdata,"MTDdata");
          var exportMTDData=[];
          for(var i=0; i<res.hubCurrencyCollectionDcs.length; i++){
            var json= {
              WarehouseName:res.hubCurrencyCollectionDcs[i].WarehouseName,
              NoofAssingement:res.hubCurrencyCollectionDcs[i].TotalAssignmentCount,
              TotalAssingementAmount:res.hubCurrencyCollectionDcs[i].TotalCashAmt+res.hubCurrencyCollectionDcs[i].TotalCheckAmt+res.hubCurrencyCollectionDcs[i].TotalOnlineAmt,
              TotalCashAmount:res.hubCurrencyCollectionDcs[i].TotalCashAmt,
              TotalChequeAmount:res.hubCurrencyCollectionDcs[i].TotalCheckAmt,
              TotalOnlineAmount:res.hubCurrencyCollectionDcs[i].TotalOnlineAmt,
              TotalCollectionAmount:res.hubCurrencyCollectionDcs[i].TotalCashAmt+res.hubCurrencyCollectionDcs[i].TotalCheckAmt+res.hubCurrencyCollectionDcs[i].TotalOnlineAmt,
              TotalDueAmount:res.hubCurrencyCollectionDcs[i].TotalDueAmt,
              BankTotalCashAmount:res.hubCurrencyCollectionDcs[i].TotalBankCashAmt,
              BankTotalChequeAmount:res.hubCurrencyCollectionDcs[i].TotalBankChequeAmt
              
            }
            exportMTDData.push(json);
          }
          
          this.exportservice.exportAsExcelFile(exportMTDData,"MTD Collection Data") 
        })
    }
  // }
  // else
  // {
  //   alert("Please select Date Range Between One Month")
  // }
    //else{
      
    //   // if(!this.selectedWareHouse && !this.selectDate )
    //   // {
    //   //   alert('Date And WarehouseId is Mandatory!');
    //   // }
    //   // else if(!this.selectedWareHouse)
    //   // {
    //   //   alert('WarehouseId is Mandatory!');
    //   // }
    //   // else
    //    if(!this.selectDate )
    //   {
    //       this.Flag=true
    //       console.log(this.selectedWareHouse,"Selected WareHouse");
    //   // this.wareHouseId=this.selectedWareHouseId.WarehouseId
    //       console.log(this.WareHousesId,"WareHouseId");
    //       const payload=
    //       {
    //           'warehouseIds':this.WareHousesId,
    //           'Fromdate':null,
    //           'Todate':null
    //       }
    //   this.service.GetData(payload).subscribe(res =>
    //     {
    //       console.log(res,"Resrr");
    //       this.MTDdata=res.hubCurrencyCollectionDcs
    //       this.MTDCollectionDC=res.mtDCollectionDC
    //       console.log(this.MTDdata,"MTDdata");
    //       console.log(this.MTDCollectionDC,"MTDCollectionDC");
    //       this.exportservice.exportAsExcelFile(this.MTDdata,"MTD Collection Data") 
          
    //     })
    //   }
    //  }
    }
  }

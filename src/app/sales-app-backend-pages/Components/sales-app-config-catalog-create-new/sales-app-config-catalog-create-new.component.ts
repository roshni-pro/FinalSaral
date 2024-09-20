import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import {ConfirmationService, MessageService } from 'primeng/api';
import { CityService } from 'app/shared/services/city.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { lastDayOfISOWeek } from 'date-fns';
import { arrayToHash } from '@fullcalendar/core/util/object';

@Component({
  selector: 'app-sales-app-config-catalog-create-new',
  templateUrl: './sales-app-config-catalog-create-new.component.html',
  styleUrls: ['./sales-app-config-catalog-create-new.component.scss']
})
export class SalesAppConfigCatalogCreateNewComponent implements OnInit {
  
  constructor( private ActiveRoute: ActivatedRoute, private msg:MessageService,
    private router : Router, private warehouseService: WarehouseService,private confirmationService: ConfirmationService,private salesApp: SalesAppServiceService,private messageService: MessageService,private cityService: CityService,private exportservice:ExportServiceService 
    )
  {
    this.searchModel = {};
    this.SuggestedSortItems = 
    [
      {name: 'Most Sold', code: 'MostSold'},
      {name: 'Least Sold', code: 'LeastSold'},
      {name: 'Random', code: 'Random'}
    ];

    this.PromotionalSortItems=
    [
      {name: 'Custom', code: 'Custom'},
      {name: 'Random', code: 'Random'}
    ]
    this.BaseListingSortItems=
    [
      {name: 'Most Sold', code: 'MostSold'},
      {name: 'Least Sold', code: 'LeastSold'},
    ]    
    this.products = [
      { code:1, Name: 'BaseListing' },
      { code:2, Name: 'SuggestedItems' },
      { code:3, Name: 'PromotionalItems' }
    ];

    this.itemdata= [
      { code:1, Name: 'BaseListing',Seq:0 },
      { code:2, Name: 'SuggestedItems',Seq:0 },
      { code:3, Name: 'PromotionalItems',Seq:0 }
    ];
   }
  @Output() newItemEvent = new EventEmitter<boolean>();
  itemdata:any
  searchModel: any;
  cityList:any[]=[]
  cityListt:any[]=[]
  SuggestedSortItems:any[]=[]
  PromotionalSortItems:any[]=[]
  BaseListingSortItems:any[]=[]
  BaseListing:boolean=false
  PromotionalItems:boolean=false
  SuggestedItems:boolean=false
  products:any[]=[];
  CityIdUrl:any
  IsShowUrl:any
  listingConfigurationDCs:any[]=[]
  ConfigList:any[]=[]
  list:any[]
  CID:any[]=[]
  seq:any
  ed:boolean=false
  blocked:boolean=false
  IsFalsePI:boolean=false
  IsFalseSI:boolean=false
  Gcity:boolean=false
el:boolean=false
du:boolean=false

  ngOnInit() {   
    // debugger
    this.CityIdUrl = this.ActiveRoute.snapshot.paramMap.get('cityId');
    this.IsShowUrl = this.ActiveRoute.snapshot.paramMap.get('isShow');
    console.log(this.CityIdUrl,this.IsShowUrl,"City IsShow");
   
    this.GetCity() 
  }  
  
  EditUpdateF()
  {
    // debugger;
    this.blocked=true
    this.salesApp.GetCatalogConfigByCityId(Number(this.CityIdUrl)).subscribe(res=>
      {
        console.log(res,"res");
        this.blocked=false
        this.searchModel.Amount=res.Amount
        this.searchModel.CustomerReach=res.CustomerReach
        this.searchModel.Frequency=res.Frequency
        this.list=res.listingConfigurationDCs
        // debugger;
        this.list.forEach(element => {
          this.products.forEach(pro=>{
            if(pro.Name==element.ConfigName)
            {
               
              if(element.ConfigName=="BaseListing")
              {
                this.BaseListingSortItems.forEach(bs=>{
                  if(bs.name==element.Sort) {element.Sort=bs}
                })
                pro.Idbl=element.Id
                element.ConfigName="BaseListing"
                pro.index=element.Sequence
                this.searchModel.ItemCountBL=element.ItemCount 
                this.searchModel.SortBL=element.Sort
                this.searchModel.ScoreToBL=element.ScoreTo
                this.searchModel.ScoreFromBL=element.ScoreFrom
                this.searchModel.checkboxBL=element.IsScoreCheck == undefined ? false : element.IsScoreCheck
                this.searchModel.UnbilledBL=element.Unbilled  == undefined ? false : element.Unbilled
              } 
              
              if(element.ConfigName=="PromotionalItems")
              {
                this.PromotionalSortItems.forEach(ps=>{
                  if(ps.name==element.Sort) {element.Sort=ps}
                })
                pro.IdPi=element.Id
                element.ConfigName="PromotionalItems"
                this.searchModel.ItemCountPI=element.ItemCount 
                this.searchModel.SortPI=element.Sort
                this.searchModel.PromotionalItemsPI=element.PromotionalItems
                this.searchModel.NewLaunchPI=element.NewLaunch == undefined ? false : element.NewLaunch
                this.searchModel.StatusPI=element.Status == undefined ? false : element.Status          
              }
              if(element.ConfigName=="SuggestedItems")
              {
                this.SuggestedSortItems.forEach(ss=>{
                  if(ss.name==element.Sort) {element.Sort=ss}
                })
                pro.IdSi=element.Id
                element.ConfigName="SuggestedItems"
                this.searchModel.ItemCountSI=element.ItemCount 
                this.searchModel.UnbilledSI=element.Unbilled == undefined ? false : element.Unbilled 
                this.searchModel.SortSI=element.Sort
                this.searchModel.ScoreToSI=element.ScoreTo
                this.searchModel.ScoreFromSI=element.ScoreFrom
                this.searchModel.checkboxSI=element.IsScoreCheck ==undefined ? false :element.IsScoreCheck
                this.searchModel.StatusSI=element.Status ==undefined ? false :element.Status
              } 
              this.ConfigList.push(pro);
            } 
          }); 
         }); 
         console.log(this.ConfigList);
         
          this.products= this.ConfigList;
          if(this.products[0].Name == "BaseListing")
          {
              this.BaseListing = true;
          }
          else if(this.products[0].Name == "SuggestedItems")
          {
            this.SuggestedItems = true;
          }
          else if(this.products[0].Name == "PromotionalItems")
          {
            this.PromotionalItems = true;
          }
      }) 
  }

  CreateNew() {
    this.newItemEvent.emit(false);
    this.router.navigateByUrl("/layout/salesApp/SalesAppConfig");
  }

  GetCity()
  {
    // this.CID=[]
    this.blocked=true
    this.salesApp.getCityList().subscribe((res:any)=>{
      debugger;
      console.log(res);
      this.blocked=false
      this.cityListt = res.filter(x=>x.IsShow==true);
      this.cityList =res;
      debugger;
        if(this.IsShowUrl=="true")
        {
          this.ed=true
          if(this.CityIdUrl== "0")
            {
              this.EditUpdateF() 
              this.searchModel.selectedCity=0
              this.Gcity=true
              return false
            }
          else
          {
            this.cityList.forEach(element => {
              this.CID.push(element.Cityid)
              if(this.CityIdUrl == element.Cityid )
              {
                this.searchModel.selectedCity =  element
                this.EditUpdateF();
                return false;
              }  
            });
          }
        }
        else if(this.IsShowUrl=="false")
        {
          this.ed=false;
          this.el=true
          this.du=true      
          this.EditUpdateF();    
          return false;
        }
        else
        {
          this.ed=false
          this.BaseListing = true;
          this.Gcity=false;
          this.el=true
          return false;
        }
      })
  }

  
  Confirmationsave()
  {
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure you want to save? ',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      
      accept: () => {
        this.save()
      },
      reject: () => {
        
      }
    });
  }

  

  DeleteCatalogConfigByCityId()
  {
    var CID=this.searchModel.selectedCity.Cityid
    this.blocked=true
    this.salesApp.DeleteCatalogConfigByCityId(CID).subscribe(res=>
    {
      this.blocked=false
      console.log(res);      
      if(res.Status==true)
      {
        this.showSuccess("Data Saved");

      }  
      else{
        this.showError("Data not Deleted")

      }
    })
  }

  getIndex(ConfigName,rowdata)
  {
    //this.products.filter(x=>x.)
    console.log(ConfigName,rowdata);
    this.products.forEach((element,index) => {
      if(element.Name==rowdata){
        element.Seq=index+1
        console.log(index+1);        
      }
    });
  }
  validateNumber(e: any) {

    let pattern = "^[0-9]{1}[.]{1}[0-9]{2}$"
    let result = e.match(pattern);
    // let input = String.fromCharCode(e.charCode);
    // const reg = /^\d*(?:[,]\d{1,2})?$/;
    // if(result!=null){
    //   this.showError("dhdhd")
    // }
    // if (!reg.test(input)) {
    //   e.preventDefault();
    // }
}
  save()
  {
    var oone
  debugger;
    if(this.searchModel.selectedCity==undefined)
    {
      this.showError("Select City");      
      return false;
    }
    if(this.searchModel.Frequency==undefined || this.searchModel.Frequency==0)
    {
      this.showError("Enter Frequency")
      return false;
    }
    else if(this.searchModel.CustomerReach==undefined || this.searchModel.CustomerReach==0)
    {
      this.showError("Enter Customer Reach")
      return false;
    }
    else if(this.searchModel.Amount==undefined || this.searchModel.Amount==0)
    {
      this.showError("Enter Amount")
      return false;
    }
    else if(this.searchModel.ItemCountBL + this.searchModel.ItemCountSI+this.searchModel.ItemCountPI > 10)
    {
      this.showError("The sum of ItemCount Should Not Be Greater Than 10")
      return false;
    }
    
    else if((oone=  this.searchModel.CustomerReach + this.searchModel.Amount +   this.searchModel.Frequency) && (oone!=1))
    {
      this.showError("The sum of CustomerReach, Amount, Frequency should be 1")
      return false; 
    }
    else if((this.searchModel.checkboxSI==false && (this.searchModel.ScoreToSI!=undefined ) && this.searchModel.StatusSI==true) && (this.searchModel.ScoreToSI!=""))
    {
      this.showError("Please Select Status")
      return false;
    }
    else if((this.searchModel.checkboxSI==false && (this.searchModel.ScoreFromSI!=undefined )&& this.searchModel.StatusSI==true) && ( this.searchModel.ScoreFromSI!=""))
    {
      this.showError(" Please Select Status")
      return false;
    }
    else if(this.searchModel.checkboxSI==true && (this.searchModel.ScoreFromSI=="" || this.searchModel.ScoreFromSI==undefined|| this.searchModel.ScoreFromSI==null))
    {
      this.showError("Please enter Score ")
      return false;
    }
    else if(this.searchModel.checkboxSI==true && (this.searchModel.ScoreToSI==""|| this.searchModel.ScoreToSI==undefined|| this.searchModel.ScoreToSI==null))
    {
      this.showError("Please enter Score ")
      return false;
    }
    
    else{   
      debugger;
      // this.searchModel.selectedCity.forEach(element => {
      //   this.CID.push(element.Cityid)
      // })
      console.log("sss",this.searchModel.selectedCity);
      
      this.CID=this.searchModel.selectedCity.Cityid
      console.log("cid",this.CID);
      
      
      console.log("qefrqef",this.searchModel);
      var Id
      var Sequence
      var ConfigName
      var listingConfigurationDCs=[];
      debugger;
      this.products.forEach(el=>{
        if(el.Name=="BaseListing") 
        {
          el.Id=el.Idbl
          el.ConfigName="BaseListing"
          el.Sequence = this.products[0].code
          el.ItemCount = this.searchModel.ItemCountBL,
          el.Sort = this.searchModel.SortBL==undefined ? "MostSold" : this.searchModel.SortBL!=null ? this.searchModel.SortBL.name : "MostSold",
          el.Unbilled = this.searchModel.UnbilledBL == undefined ? false : this.searchModel.UnbilledBL ,
          el.IsScoreCheck = this.searchModel.checkboxBL,
          el.ScoreFrom = this.searchModel.ScoreFromBL,
          el.ScoreTo = this.searchModel.ScoreToBL
        }
        else if(el.Name=="SuggestedItems")
        {
          el.Id=el.IdSi
          el.Sequence = this.products[1].code
          el.ConfigName="SuggestedItems"
          el.Status = this.searchModel.StatusSI ? this.searchModel.StatusSI : false,
          el.ItemCount = this.searchModel.ItemCountSI,
          el.Sort = this.searchModel.SortSI==undefined ?  "MostSold" : this.searchModel.SortSI!=null ? this.searchModel.SortSI.name : "MostSold" ,
          el.Unbilled = this.searchModel.UnbilledSI  == undefined ? false : this.searchModel.UnbilledSI,
          el.IsScoreCheck = this.searchModel.checkboxSI,
          el.ScoreFrom = this.searchModel.ScoreFromSI,
          el.ScoreTo = this.searchModel.ScoreToSI
        }
        else if(el.Name=="PromotionalItems") {
          el.Id=el.IdPi
          el.ConfigName="PromotionalItems"
          el.Sequence = this.products[2].code
          el.Status = this.searchModel.StatusPI == undefined ? false : this.searchModel.StatusPI,
          el.ItemCount = this.searchModel.ItemCountPI,
          el.Sort = this.searchModel.SortPI==undefined ?  "Custom" : this.searchModel.SortPI!=null ? this.searchModel.SortPI.name : "Custom",
          el.NewLaunch = this.searchModel.NewLaunchPI == undefined ? false : this.searchModel.NewLaunchPI,
          el.PromotionalItems = this.searchModel.PromotionalItemsPI == undefined ? false : this.searchModel.PromotionalItemsPI
        }
              
        ConfigName=el.Name,
        listingConfigurationDCs.push(el)
      })
      console.log("ssssssssssss",listingConfigurationDCs);
      // debugger
      const payload=
      {
        "CityId":this.CID?this.CID:0,
        "Frequency":this.searchModel.Frequency,
        "CustomerReach":this.searchModel.CustomerReach,
        "Amount":this.searchModel.Amount,
        "IsRepeat":this.searchModel.SelectedRepeat==undefined ? false : this.searchModel.SelectedRepeat ,
        "listingConfigurationDCs" : listingConfigurationDCs
      }  

      payload.listingConfigurationDCs.forEach((data:any)=>{
        this.products.forEach((seqs:any,index)=>{
          if(data.ConfigName==seqs.Name )
          {
              data.Sequence=index+1;
              this.seq=data.Sequence
          }
        })
      })  
      
      debugger;    
      console.log("payload",payload); 
      this.salesApp.PostInsertCatalogConfiguration(payload).subscribe(res=>
        {
          //debugger;
          console.log(res);
          if(res.Status==true)
          {
            debugger;
            this.showSuccess(res.Message);
            this.CreateNew();
            //this.router.navigateByUrl("/layout/salesApp/SalesAppConfig");
            // this.currentTab = (this.currentTab == 1) ? 0 : this.currentTab + 1;
            return false;
          }
          else if(res.Status==false)
          {
            this.showError(res.Message)
            return false;
          }
        }) 
      }
       
  }
  currentTab:number
  click1()
  {
    this.BaseListing=true
    this.PromotionalItems=false
    this.SuggestedItems=false
  }

  click2()
  {
    this.BaseListing=false
    this.PromotionalItems=false
    this.SuggestedItems=true

  }

  click3()
  {
    this.BaseListing=false
    this.PromotionalItems=true
    this.SuggestedItems=false
  }

  showError(msg1:string){
    this.msg.add({severity:'error', summary: 'Error', detail:msg1});
  }
  showSuccess(msg1:string){
    this.msg.add({severity:'success', summary: 'Success', detail:msg1});
  }


}

import { Component, OnInit } from '@angular/core';
import { WindowScrollController } from '@fullcalendar/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { isFirstDayOfMonth } from 'date-fns';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-sales-intent-approval',
  templateUrl: './sales-intent-approval.component.html',
  styleUrls: ['./sales-intent-approval.component.scss']
})
export class SalesIntentApprovalComponent implements OnInit {
  brandname:string='';
  selectdate:Date;
  salesData:any[]= [];
  Id:number;
  IsSalesLeadApproved:number;
  IsBuyerLeadApproved:number;
  Approvalby:number
  RejectedBy:number
  status:boolean=false;
  approvedId:number;
  approvedBY:number;
  blocked:boolean=false
  ItemPerPage:any;
  PageNo:any;
  totalRecords:number=500;
  requestdrop:any[]
  selectRequest:any=null
  saleslist:any[]= [];
  flag:number=0
  oldbrandname:string=''
  showPending:boolean=true;
  showSettle:boolean=false;
  showdata:boolean=false;
  showsearch:boolean=false
  salesRoleNameRegion:any;
  cm5lead :any;
  salesRoleNameCountry:any;
  buyerRoleNameSourcing:any;
  buyerRoleNameRegional:any;
  hqMasterRole:any;
  skip:number;
  take:number;
  totalRecordPending:number = 0;
  totalRecordSettle:number= 0;
  constructor(private serv:InventoryforcastserService, 
              private confirmationService: ConfirmationService, 
              private exportService: ExportServiceService) {
    this.requestdrop=[
      {name: 'Pending Request' , value: 'Pending Request'},
      {name: 'Settled Request' , value: 'Settled Request'}
  ];
   this.selectRequest = this.requestdrop[0];
   }
   getRoleData:any;
   first:number=0;
   inventoryForecastingExecutive : any;
   inventoryForecastingSalesSeniorExecutive : any;
  ngOnInit() 
  {
    // this.getRoleData = (JSON.parse(localStorage.getItem('tokenData')).rolenames).split(',');
    this.getRoleData = (localStorage.getItem('role')).split(',');
    //console.log("getRole",this.getRoleData);
    var salesRoleRegion = 'Region sales lead';
    var CM5lead='CM5 lead';
    var salesRoleCountry = 'Country service lead';
    var buyerRoleSourcing = 'Buyer';
    var buyerRoleRegional = 'Region Sourcing lead';
    var HQMaster = 'HQ Master login';
    var InventoryForecastingExecutive = 'Inventory Forecasting Executive';
    this.inventoryForecastingExecutive = this.getRoleData.find(x => x == InventoryForecastingExecutive);

    var InventoryForecastingSalesSeniorExecutive = 'Inventory Forecasting Sales Senior Executive';
    this.inventoryForecastingSalesSeniorExecutive = this.getRoleData.find(x => x == InventoryForecastingSalesSeniorExecutive);

    this.salesRoleNameRegion = this.getRoleData.find(x => x == salesRoleRegion)
    this.cm5lead=this.getRoleData.find(x=>x==CM5lead)
    this.salesRoleNameCountry = this.getRoleData.find(x => x == salesRoleCountry)
    this.buyerRoleNameSourcing = this.getRoleData.find(x => x == buyerRoleSourcing)
    this.buyerRoleNameRegional = this.getRoleData.find(x => x == buyerRoleRegional)
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster)

    if(this.selectRequest != null){
      this.selectRequest.name=='Pending Request' 
    }
    //this.getData()
    // this.selectRequest.name==='Pending Request'
    //this.pendingrequest()
    this.getCommentList();
    this.categoryList();
  }

  lo:boolean=false
  pendingLoad(event){
    this.lo=true
    this.settelLoad(event);
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows || 1;
    this.take = event.rows || 10;
    if(this.SearchHit==true)
    {
    let date = this.selectdate ? moment(this.selectdate).format('yyyy-MM-01') : null;
    let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
    const obj = {
      "subSubCategoriesIds":selectedMultiBrandID,
      "productname":this.brandname,
      "month":date,
      "skip":this.skip,
      "take":this.take
    }
    console.log(obj);
    //this.serv.salesintent(this.brandname,date,this.skip,this.take).subscribe
    this.serv.salesintent(obj).subscribe
    (res=>
    { 
      console.log(res);
      res.salesIntentApprovalDCs.forEach(element => {
        element.cmtDd = false;
        element.ETADate = moment(element.ETADate).format('DD-MM-YYYY');
      });
      this.salesData=res.salesIntentApprovalDCs
      this.totalRecordPending=res.TotalRec
      console.log(this.salesData);
      console.log(this.totalRecord);
      this.blocked=false    
    },
    (err)=>
    {
      alert('Please Wait here')
    })
  }
  }

  settelLoad(event){ 
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;
    this.take = event.rows;
    if(this.SearchHit==true){
    let date1 = this.selectdate ? moment(this.selectdate).format('yyyy-MM-01') : null;
    let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
    const obj = {
      "subSubCategoriesIds":selectedMultiBrandID,
      "productname":this.brandname,
      "month":date1,
      "skip":this.skip,
      "take":this.take
    }
    if(this.SearchHit==true)
    {
    console.log(obj);
    this.blocked = true;
    //this.serv.oldRequestSearch(this.brandname,date1,this.skip || 1,this.take || 10).subscribe((res)=>
    this.serv.oldRequestSearch(obj).subscribe((res)=>
      {
        console.log(res);
        res.SalesIntentApprovalOldDCs.forEach(element => {
          element.ETADate = moment(element.ETADate).format('DD-MM-YYYY');
        });
        this.saleslist=res.SalesIntentApprovalOldDCs
        this.totalRecordSettle=res.TotRec
        this.blocked = false;
      })
    }
  }
  }

  // load(event) { 
  //   var Last = event.first ? event.first + event.rows : 10;
  //   this.skip = Last / event.rows;
  //   this.take = event.rows;
  //   this.blocked=true;
  //   let date = this.selectdate ? moment(this.selectdate).format('yyyy-MM-01') : null
    
  //   this.serv.salesintent(this.brandname,date,this.skip,this.take).subscribe
  //   (res=>
  //   { 
  //     this.salesData=res.salesIntentApprovalDCs
  //     this.totalRecord=res.TotRec
  //     console.log(this.salesData);
  //     console.log(this.totalRecord);
  //     this.blocked=false    
  //   },
  //   (err)=>
  //   {
  //     alert('Please Wait')
  //   } )
  //   console.log(event);
  //   console.log(Last/event.rows);
  //   let date1 = this.selectdate ? moment(this.selectdate).format('yyyy-MM-01') : null
  //   this.serv.oldRequestSearch(this.oldbrandname,date1,this.skip,this.take).subscribe((res)=>
  //     {
  //       this.saleslist=res.SalesIntentApprovalOldDCs
  //       this.totalRecord=res.TotRec
  //       console.log(this.saleslist)
  //       console.log(this.totalRecord)
  //     })
     
  //  }
  totalRecord:number=0
  getRequest()
  {
    debugger;
    this.selectedSubsubCatregory=undefined
    this.salesData=[];
    this.saleslist=[]
    this.skip=1
    this.SearchHit=false;
    this.totalRecordPending = 0;
    this.totalRecordSettle = 0;

    // this.skip,this.take
    if(this.selectRequest.name==='Pending Request' || this.showdata===true)
    {
      this.selectedSubsubCatregory=[]
      this.showPending = true;
      this.showSettle = false;
      this.flag=1
  //     let date = this.selectdate ?moment(this.selectdate).format('yyyy-MM-01') : null;
  //     let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
  //     const obj = {
  //       "subSubCategoriesIds":selectedMultiBrandID,
  //       "productname":this.brandname,
  //       "month":date,
  //       "skip":this.skip,
  //       "take":this.take
  //     }
  //   console.log(obj);
  //   if(this.SearchHit==true)
  //   {
  //   //this.serv.salesintent(this.brandname,date,this.skip,this.take).subscribe
  //   this.serv.salesintent(obj).subscribe      
  //     (res=>
  //     {
  //       console.log(res)
  //       res.salesIntentApprovalDCs.forEach(element => {
  //         element.cmtDd = false;
  //         element.ETADate = moment(element.ETADate).format('DD-MM-YYYY');
  //       });
  //       this.salesData=res.salesIntentApprovalDCs
  //       this.totalRecordPending=res.TotalRec  
  //       this.blocked=false 
  //       console.log(this.salesData)   
  //     },
  //     (err)=>
  //     {
  //       alert('Please Wait')
  //     } )
  //     this.showdata=false;
  }
    if(this.selectRequest.name==='Settled Request')
    {
      this.selectedSubsubCatregory=[]
      this.flag=2
      this.showSettle = true;
      this.showPending = false;
  //     // let date1 = this.selectdate ? moment(this.selectdate).format('yyyy-MM-01') : null
  //     // this.serv.oldRequestSearch(this.oldbrandname,date1,this.skip,this.take).subscribe((res)=>
  //     // {
  //     //   console.log(res);
  //     //   this.saleslist=res.SalesIntentApprovalOldDCs
  //     //   this.totalRecordSettle=res.TotRec
  //     //   console.log(this.saleslist)
  //     // })
  //     //this.settelLoad(event);
  //   }
    }
  }

  SearchHit:boolean=false
  Searchhit()
  {
    this.SearchHit=true
  }
  searchData()
  {
    // this.skip,this.take
    debugger
    if((this.selectedSubsubCatregory==undefined || this.selectedSubsubCatregory.length==0) && (this.lo==false || this.SearchHit==true) )
    {
      debugger;
      alert("Select Brand")    
      return false;  
    }
    let date = this.selectdate ?moment(this.selectdate).format('yyyy-MM-01') : null 
    if(this.selectRequest.name=='Pending Request'){  
      this.blocked=true
      this.showPending = true;
      this.showSettle = false;
    let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
    const obj = {
      "subSubCategoriesIds":selectedMultiBrandID,
      "productname":this.brandname,
      "month":date,
      "skip":1,
      "take":this.take
    }
    console.log(obj);
      //this.serv.salesintent(this.brandname,date,this.skip,this.take).subscribe
      if(this.SearchHit==true){
      this.serv.salesintent(obj).subscribe
      (res=>
      { 
        console.log(res);
        res.salesIntentApprovalDCs.forEach(element => {
          element.cmtDd = false;
          element.ETADate = moment(element.ETADate).format('DD-MM-YYYY');
        });
        this.first=0;
        this.salesData=res.salesIntentApprovalDCs
        this.totalRecordPending=res.TotalRec
        this.blocked=false    
      },
      (err)=>
      {
        alert('Please Wait')
      } )
      // this.SearchHit=false
    }
  }
    else if(this.selectRequest.name=='Settled Request'){
    // this.totalRecordSettle=0;
    if(this.SearchHit==true){
    let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
    const obj = {
      "subSubCategoriesIds":selectedMultiBrandID,
      "productname":this.brandname,
      "month":date,
      "skip":1,
      "take":this.take
    }
    console.log(obj);
    this.blocked = true;
    this.showPending = false;
    this.showSettle = true;
     //this.serv.oldRequestSearch(this.brandname,date,this.skip,this.take).subscribe((res)=>
     this.serv.oldRequestSearch(obj).subscribe((res)=>
      {
        console.log(res);
        this.first=0;
        res.SalesIntentApprovalOldDCs.forEach(element => {
          element.ETADate = moment(element.ETADate).format('DD-MM-YYYY');
        });
        debugger;
        this.saleslist=res.SalesIntentApprovalOldDCs
        this.totalRecordSettle=res.TotRec 
        this.blocked=false;
      })
    } 
    // this.SearchHit=false
  }
  }

  salesApprovedRejectStatus(itemData,leadId,item,status)
  {
      this.Id = item.Id
      this.IsSalesLeadApproved = itemData
      this.approvedId = leadId;
      this.blocked=true;
      this.serv.salesIntent2(this.Id,this.IsSalesLeadApproved,this.approvedId).subscribe((res)=>
        {
          console.log(res,"result");
          this.blocked = false; 
          alert(res.Data);
           this.searchData();
          //else
          //alert("Data not found");
            //alert('Sale Lead Approved Successfully')

          //this.searchData();
         // this.status=status
          // if(this.status == true){
          //   alert('Sale Lead Approved Successfully')
          //   this.searchData();
          // }else{
          //   alert('Sale Lead Rejected')
          //   this.searchData();
          // }
        }) 
  }
  
  buyersApprovedRejectStatus(itemData,leadId,item,status)
  {
    console.log(item)
    console.log(status)
    this.Id = item.Id
    if(status == 'Reject'){
      if(item.Comments == null){
        alert('Please select comment');
        return false;
      }
    }
    this.IsBuyerLeadApproved = itemData
    this.approvedId = leadId;
      this.serv.salesIntent2(this.Id,this.IsBuyerLeadApproved,this.approvedId).subscribe((res)=>
      {
        //this.status=status
        //if(this.status == true){
          //alert('Buyer Lead Approved Successfully')
          //this.searchData();
       // }else{
       //   alert('Buyer Lead Rejected')    
       //   this.searchData();       
        //}

        alert(res.Data);
        this.searchData();
      })
  }

  clear()
  {
    this.brandname=''
    this.selectdate=null
    // this.salesData=null
    // this.saleslist=null  
  } 
  // getData()
  // {
  //   let date = this.selectdate ?moment(this.selectdate).format('yyyy-MM-01') : null    
  //    this.blocked=true
  //     this.showPending = true;
  //     this.showSettle = false;
  //     this.serv.salesintent(this.brandname,date,this.skip,this.take).subscribe
  //     (res=>
  //     {
  //       console.log(res)
  //       this.salesData=res
  //       this.blocked=false    
  //     },
  //     (err)=>
  //     {
  //       alert('Please Wait')
  //     }
  //     )
  //   }
    
    pendingrequest()
    {
      let date = this.selectdate ? moment(this.selectdate).format('yyyy-MM-01') : null;
      let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
      const obj = {
        "subSubCategoriesIds":selectedMultiBrandID,
        "productname":this.brandname,
        "month":date,
        "skip":this.skip,
        "take":this.take
      }
    console.log(obj);
    //this.serv.salesintent(this.brandname,date,this.skip,this.take).subscribe
      this.serv.salesintent(obj).subscribe    
      (res=>
      {
        console.log(res)
        res.salesIntentApprovalDCs.forEach(element => {
          element.cmtDd = false;
          element.ETADate = moment(element.ETADate).format('DD-MM-YYYY');
        });
        this.salesData=res.salesIntentApprovalDCs
        this.totalRecordPending=res.TotRec
        this.blocked=false   
      },
      (err)=>
      {
        alert('Please Wait')
      } )
    }
    reset()
    {
      this.first=0;
    }

    cmtList:any;
    getCommentList(){
      this.serv.getCommentListForSalesIntent().subscribe(
        (res)=>{
          console.log(res);
          this.cmtList = res;
        },
        (err)=>{
          console.log(err);
        }
      )
    }

    cmtSaveForSalesIntent(item){
      var itemDetails = item;
      console.log(itemDetails.Id, itemDetails.Comments);
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action ?',
        accept: () => {
          this.blocked = true;  
          this.serv.saveCommentForSalesIntent(itemDetails.Id, itemDetails.Comments.Comments).subscribe(
            (res)=>{
              console.log(res);
              if(res.Status == true){
                alert(res.msg);
                //this.searchData();
                // this.pendingLoad(event);
              }else{
                alert(res.msg);
              }
              this.blocked = false; 
            },
            (err)=>{
              console.log(err);
              this.blocked = false;
            }
          )
        },
        reject: () => {
          this.salesData.forEach(el => {
            el.Comments = undefined;
          });
        }
      });
    }
    salesDataaa:any[]=[]
  exportDownload(){ //aartimukati
    debugger;
    let date = this.selectdate ?moment(this.selectdate).format('yyyy-MM-01') : null 
    if(this.selectRequest.name == 'Pending Request')
    {      
      if(this.salesData==undefined || this.salesData.length==0)
      {
        alert("Please search the data first")
        return false
      }
      let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
      const obj = {
        "subSubCategoriesIds":selectedMultiBrandID,
        "productname":this.brandname,
        "month":date,
        "skip":1,
        "take":this.totalRecordPending
      }
        //this.serv.salesintent(this.brandname,date,this.skip,this.take).subscribe
      this.serv.salesintent(obj).subscribe
      (res=>
      { 
        console.log(res);
        this.salesDataaa=res.salesIntentApprovalDCs
        let pending_req_result = this.salesDataaa.map(function(a){
          return{
            'Catogory' : a.Category,
            'Sub Category' : a.SubcategoryName,	
            'Brand' : a.Brand,
            'Item Name' : a.Item_Display_Name,
            'System Forecasted Qty' : a.System_Forecasted_Qty,
            'Seller Additional Qty' : a.Sellers_Additional_Qty,
            'Purchase MOQ' : a.MinOrderQty,
            'No. of Sets' : a.NoOfSet,
            'Total Qty' : a.TotalQty,
            'ETA Date' : a.ETADate,
            'Buying Price' : a.BuyingPrice,
            'Warehouse Name' : a.WarehouseName,
            'Sales Lead Status' : a.IsSalesLeadApproved == 1 ? 'Approved' : '',
            'Buyer Lead Status' : '',
            'Buyer Lead Comments' : a.Comments,
            'Buyer Name': a.BuyerName,
            'Seller Name' : a.SellerName,
            'ItemMultiMRPId':a.ItemMultiMRPId>0 ? a.ItemMultiMRPId : 0
          }
        })
        this.exportService.exportAsExcelFile(pending_req_result, 'Sales_intent_for_Pending_Request');     
      })
    
    }
    if(this.selectRequest.name == 'Settled Request')
    {
      if(this.saleslist.length==0 || this.saleslist==undefined)
      {
        alert("Please Search the Data")
        return false
      }
      let selectedMultiBrandID = this.selectedSubsubCatregory.map(x=>x.BrandId);
      const obj = {
        "subSubCategoriesIds":selectedMultiBrandID,
        "productname":this.brandname,
        "month":date,
        "skip":1,
        "take":this.totalRecordSettle
      }
      // console.log(obj);
      this.blocked = true;
      //this.serv.oldRequestSearch(this.brandname,date,this.skip,this.take).subscribe((res)=>
      this.serv.oldRequestSearch(obj).subscribe((res)=>
      {
        console.log("aaaaaaaaaa",res);
        res.SalesIntentApprovalOldDCs.forEach(element => {
          element.ETADate = moment(element.ETADate).format('DD-MM-YYYY');
          this.blocked=false;
        });
        this.saleslisttt=res.SalesIntentApprovalOldDCs
        this.blocked=false;
        let settled_req_result = this.saleslisttt.map(function(a){
          return{
            'Catogory' : a.Category,
            'Sub Category' : a.SubcategoryName,	
            'Brand' : a.Brand,
            'Item Name' : a.Item_Display_Name,
            'System Forecasted Qty' : a.System_Forecasted_Qty,
            'Seller Additional Qty' : a.Sellers_Additional_Qty,
            'Purchase MOQ' : a.MinOrderQty,
            'No. of Sets' : a.NoOfSet,
            'Total Qty' : a.TotalQty,
            'ETA Date' : a.ETADate,
            'Buying Price' : a.BuyingPrice,
            'Warehouse Name' : a.WarehouseName,
            'Sales Lead Status' : a.IsSalesLeadApproved,
            'Buyer Lead Status' : a.IsBuyerLeadApproved,
            'Buyer Lead Comments' : a.Comments,
            'Buyer Name': a.BuyerName,
            'Seller Name' : a.SellerName,
            'ItemMultiMRPId':a.ItemMultiMRPId>0 ? a.ItemMultiMRPId : 0
          }
        })
          this.exportService.exportAsExcelFile(settled_req_result, 'Sales_intent_for_Settled_Request');          
      })
    }   
  }
  saleslisttt:any[]=[]
    subCatList:any[];
    brandList:any[];
    selectedSubCat:any[];
    selectedSubsubCatregory:any[];
    categoryListData: any;
    categoryList() {
      this.subCatList = [];
      this.brandList = [];
      this.selectedSubCat = [];
      this.selectedSubsubCatregory = [];
      this.serv.getAllCategories().subscribe(res => {
        this.categoryListData = res;
        this.getAllSubCatList();
      })
    }
  
    getAllSubCatList(){
      var catIds = this.categoryListData.map(function (elem) {
        return elem.CategoryId ? elem.CategoryId : elem
      });
      this.blocked = true;
      this.serv.getSubCategories(catIds).subscribe(result => {
        this.subCatList = result;
        this.blocked = false;
        this.getAllBrandCatList();
      });
    }
    getAllBrandCatList(){
      var catIds = this.categoryListData.map(function (elem) {
        return elem.CategoryId ? elem.CategoryId : elem
      });
      var SubCatIds = this.subCatList.map(function (elem) {
        return elem.SubCategoryId ? elem.SubCategoryId : elem
      });
      const payload = {
            categoryId: catIds,
            subcategoryId: SubCatIds
          }
      this.blocked = true;
      this.serv.getSubSubCatList(payload).subscribe(result => {
        this.brandList = result;
        this.blocked = false;
      });
    }
  }

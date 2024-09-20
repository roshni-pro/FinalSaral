import { Component, OnInit,HostListener } from '@angular/core';
import { SalesAppServiceService } from 'app/sales-app-backend-pages/Services/sales-app-service.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sales-return-config',
  templateUrl: './sales-return-config.component.html',
  styleUrls: ['./sales-return-config.component.scss']
})
export class SalesReturnConfigComponent implements OnInit {
  skip: number=0;
  take: number=10;
  selectedItemRowData : any;
  isHistoryOpen : boolean = false;
  entity : any;
  cols : any;

  constructor(private service:SalesAppServiceService, private messageService : MessageService,private confirmationService: ConfirmationService,
    private exportserv: ExportServiceService,
    private router:Router) { this.DataList={};
  this.entity='SalesReturnConfig';
  
}
// @HostListener('window:scroll', [])
  ngOnInit() {
    this.cols = [
      { field: 'BrandName', header: 'BrandName' },
      { field: 'CategoryName', header: 'CategoryName' },
      { field: 'QtyPercent', header: 'QtyPercent' },
      { field: 'DayBeforeExpiry', header: 'DayBeforeExpiry' },
      { field: 'DayAfterExpiry', header: 'DayAfterExpiry' },
    ]
    this.getBrandList();
    this.getSalesReturn();
    this.DataList.QtyPercent = 100;
  }
  DataList:any;
  blocked:any;
  brandList:any;
  categoryList:any;
  BrandObj:any;
  CategoryObj:any;
  totalRecords:number;
  SalesReturnList:any;
  IsUpdated:boolean = false;
  first:number = 0;
  selectedCategory : any=[];
  IsDeliveryDate:any;
  IsOrderDate:any;
  getBrandList()
  {
    
    this.blocked = true;
    this.service.GetBrandList().subscribe(x=>
      {
        if(x!=null && x.Status==true)
        {
          this.brandList=x.Data
          console.log(this.brandList,"res");
          this.blocked = false; 
        }
        else
        {
          this.showError(x.Message)
          this.blocked = false;
        }
       
      })
  }

  getCategoryList()
  {
    this.DataList ={QtyPercent :100}
    this.CategoryObj={}
    this.IsUpdated = false
    this.service.GetCategoryListByBrandId(this.BrandObj.SubsubCategoryid).subscribe(x=>
      {
        if(x!=null && x.Status==true)
        {
          this.categoryList=x.Data
          console.log(this.categoryList,"categoryList");
          this.blocked = false;  
        }
        else
        {
          this.showError(x.Message)
        }
      })
  }
  Confim(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      accept: () => {
        this.Save();
      },
      reject:()=>{
        // alert("dd")
      }     
    });
   
  }
  IsSelectExpiry:boolean=false;
  Save()
  {
    debugger;
    this.isDisabled=false;

    if(this.BrandObj==undefined) this.showerror("select brand first!")
    // else if(this.CategoryObj==undefined || this.CategoryObj==null || (this.CategoryObj && (this.CategoryObj.Categoryid <= 0 || this.CategoryObj.Categoryid == undefined))) 
    // {
    //   this.showerror("select Category first!")
    // }
    else if(!this.selectedCategory && this.selectedCategory.length ==0) 
    {
      this.showerror("select Category first!")
    }
    else if(!this.fo && !this.od && !this.dd){this.showerror("Please Select Atleast One Duration")}
    //else if(this.DataList.QtyPercent==undefined) this.showerror("Enter OrderQty first!")
    else if(this.fo==true && this.DataList.IsPreExpiry==true && this.DataList.DayBeforeExpiry==undefined) this.showerror("Enter Day Before Expiry!")
    else if(this.fo==true && this.DataList.IsPostExpiry==true && this.DataList.DayAfterExpiry==undefined) this.showerror("Enter Day After Expiry!")
    else if((( this.DataList.IsPreExpiry==false && this.DataList.IsPostExpiry==false) 
  || this.DataList.IsPreExpiry==undefined && this.DataList.IsPostExpiry==undefined)  && this.fo==true )
    {
      this.showerror("Please Select Atleast one expiry format either pre or post!!!");
    }
    else if (this.DataList.QtyPercent > 100) {
      this.showerror("Enter The Value between 1 to 100!!!");
      this.DataList.QtyPercent  = 0
    }else if (this.DataList.QtyPercent <= 0) {
      this.showerror("Enter The Value between 1 to 100!!!");
      this.DataList.QtyPercent  = 0
    }
    else if(this.DataList.DurationOrderDate==undefined  && this.od){this.showerror("Enter Duration From Order-Date!!!");}
    else if(this.DataList.DurationDeliveryDate==undefined  && this.dd){this.showerror("Enter Duration From Delivery-Date!!!");}
    else
    {
      let categoryIds = [];
      this.selectedCategory.forEach(element => {
        categoryIds.push(element.Categoryid);
      });
debugger;
      var FilterDc={     
        "Id":this.DataList.Id,
        "BrandId":this.BrandObj.SubsubCategoryid,
        "CategoryId":categoryIds,
        "QtyPercent":this.DataList.QtyPercent,
        "IsPreExpiry":this.DataList.IsPreExpiry,
        "IsPostExpiry":this.DataList.IsPostExpiry,
        "DayBeforeExpiry":this.DataList.DayBeforeExpiry,
        "DayAfterExpiry":this.DataList.DayAfterExpiry,
        "DurationOrderDate":this.DataList.DurationOrderDate,
        "DurationDeliveryDate":this.DataList.DurationDeliveryDate
      }
      this.blocked = true;
        this.service.insertUpdateSalesReturn(FilterDc).subscribe((x:any)=>{
          if(x.Status==true)
          {
            this.showSuccessfull(x.Message);
            this.selectedCategory = [];
            this.DataList.IsPreExpiry = false;
            this.DataList.IsPostExpiry = false;
            this.DataList.IsPreExpiry = undefined;
            this.DataList.IsPostExpiry = undefined;
            this.DataList.DurationOrderDate = undefined;
            this.DataList.DurationDeliveryDate=undefined;
            this.fo=false;this.od=false;this.dd=false;
            this.getSalesReturn();
            this.BrandObj = null;
            this.CategoryObj = null;
            this.selectedCategory=null;
            //this.DataList = {}
            this.blocked = false;
          }
          else
          {
            this.showError(x.Message)
            this.blocked = false;
          }
        });
      }
      this.IsUpdated = false;
      this.DataList ={QtyPercent :100}
  }
  load(event)
  {
    this.skip = event && (event.first) ? (event.first) : 0;
    this.take =  event && event.rows ? event.rows : 10;
    this.blocked = true;
    if(event){
      this.getSalesReturn();
    }
    
  }
  Search(){
    this.DataList ={QtyPercent :100}
    var obj = {
      "BrandId":this.BrandObj.SubsubCategoryid,
      "CategoryId":this.CategoryObj.Categoryid,
    }
    this.service.getSalesReturnList(obj).subscribe((x:any)=>{
      
      if(x.Status==true)
      {
        this.BrandObj = {"SubsubCategoryid":x.Data[0].BrandId,"SubsubcategoryName":x.Data[0].BrandName}
        this.CategoryObj = {"Categoryid":x.Data[0].CategoryId,"CategoryName":x.Data[0].CategoryName}
        this.DataList = {
        "Id" :x.Data[0].Id,
        "QtyPercent" : x.Data[0].QtyPercent,
        "IsPreExpiry" : x.Data[0].IsPreExpiry,
        "IsPostExpiry" : x.Data[0].IsPostExpiry,
        "DayBeforeExpiry":x.Data[0].DayBeforeExpiry,
        "DayAfterExpiry" : x.Data[0].DayAfterExpiry,
        "DurationOrderDate":x.Data[0].DurationOrderDate,
        "DurationDeliveryDate":x.Data[0].DurationDeliveryDate
        }
        this.IsUpdated = true
      }
      else
      {
        this.IsUpdated = false
      }
    });
  }
  getSalesReturn(){
    var obj = {
      "skip":this.skip,
      "take":this.take,
      "KeyValue" : this.KeyValue ? this.KeyValue : "",
      "BrandId":0,
      "CategoryId":0,
    }
    debugger;
    if(this.SalesReturnList && this.SalesReturnList.length > 0)
    {
      this.SalesReturnList.forEach(element => {
        element.isEdit = false;
      });
    }
    this.service.getSalesReturnList(obj).subscribe((x:any)=>{

      if(x.Status==true)
      {
        this.SalesReturnList = x.Data;
        console.log('this.SalesReturnList',this.SalesReturnList);
        
        this.SalesReturnList.forEach(element => {
          if(element.Id == this.editableId)
          {
            element.isEdit = true;
          }else{
            element.isEdit = false;
          }
        });
        this.totalRecords = x.Data[0].totalRecords; 
        console.log(this.SalesReturnList);
        this.blocked = false;
      }
      else
      {
        this.totalRecords = 0
        this.blocked = false;
      }
    });
  }
  KeyValue : any;
  onSearchFilter(keyWord)
  {
    if(keyWord.length >= 3)
    {
      this.KeyValue = keyWord;
      this.getSalesReturn();
    }else if(keyWord.length == 0)
    {
      this.KeyValue = "";
      this.getSalesReturn();
    }
  }
  keyPress(event: any) {
    debugger
    const pattern = /[0-9]/;
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  numberOnly(event): boolean { 
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  editableId : any;
  isDisabled: boolean = false;
  Edit(rowdata)
  {
    debugger
    this.selectedCategory=[];
    this.BrandObj = {
      SubsubCategoryid:rowdata.BrandId,
      SubsubcategoryName:rowdata.BrandName
    }
    debugger;
    let Category = {Categoryid:rowdata.CategoryId,CategoryName:rowdata.CategoryName}
    this.selectedCategory.push(Category);
    this.getCategoryList();
    this.DataList = {
        "Id" :rowdata.Id,
        "QtyPercent" : rowdata.QtyPercent,
        "IsPreExpiry" : rowdata.IsPreExpiry,
        "IsPostExpiry" : rowdata.IsPostExpiry,
        "DayBeforeExpiry":rowdata.DayBeforeExpiry,
        "DayAfterExpiry" : rowdata.DayAfterExpiry,
        "DurationOrderDate" : rowdata.DurationOrderDate,
        "DurationDeliveryDate" : rowdata.DurationDeliveryDate,
    }
    if(rowdata.DurationOrderDate>0){this.od=true; this.IsOrderDate='ISOrderDatee'}
    if(rowdata.DurationDeliveryDate>0){this.dd=true;this.IsDeliveryDate='IsDeliveryDate'}
    this.editableId = this.DataList.Id;
    this.getSalesReturn();
    this.isDisabled=true;
    this.IsUpdated = true;
  
  }
  Delete(rowData)
  {
    debugger
    this.blocked = true;
    this.service.deleteSalesReturnId(rowData.Id).subscribe(x=>
      {
        console.log(x);
        if(x.Status==true)
        {
          this.showSuccessfull(x.Message);
          this.getSalesReturn();
          this.blocked = false;
        }else
        {
            this.showError(x.Message)
            this.blocked = false;
        }
      })

  }
  confirm(rowData) {
    if(!rowData.isEdit)
    {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Delete(rowData);
      },
      reject: () => {
        this.showError('You have cancelled')
      }
    });
  }
  }

  onClickHistory(rowData)
  {
    this.selectedItemRowData = rowData;
    this.isHistoryOpen = true;
  }

  onInputChange() {
    if (this.DataList.QtyPercent > 100) {
      this.showerror("Enter The Value between 1 to 100!!!");
      this.DataList.QtyPercent  = 0
    }else if (this.DataList.QtyPercent <= 0) {
      this.showerror("Enter The Value between 1 to 100!!!");
      this.DataList.QtyPercent  = 0
    }
  }
  onExport()
  {
    this.service.getSalesReturnExport(this.KeyValue ? this.KeyValue : "").subscribe((x:any)=>{
      if(x.Status==true)
      {
        // this.InventoryapprovalService.exportAsExcelFile(result, FileName);
        this.exportserv.exportAsExcelFile(x.Data, "ExportData")
        this.showSuccessfull('Export Done Successfully!!');
      }
      else
      {
        this.showError('Data Not Found!!');
      }
    });
  }


 validate(e){
    var t = e.target.value;
    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 2)) : t;
}

// numberOnly(event): boolean { debugger
//     const charCode = (event.which) ? event.which : event.keyCode;
//     if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
//       return false;
//     }
//     return true;
//   }

  showSuccessfull(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg: string) {
    this.messageService.add({ severity: 'info', summary: 'info', detail: msg });
  }
  showerror(msg: string) {
    this.messageService.add({ severity: 'warn', summary: 'warning', detail: msg });
  }


  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
  onSelectCat(){
    debugger;
    this.selectedCategory;
  }
  showScroll: boolean;
  showScrollHeight = 200;
  hideScrollHeight = 200;
  onWindowScroll() {
    if (
      (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      ) > this.showScrollHeight
    ) {
      this.showScroll = true;
    } else if (this.showScroll &&
      (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScroll = false;
    }
  }

  Cancel(){
    this.isDisabled=false;

    this.BrandObj=null;

    this.selectedCategory=null;
    this.DataList={}
    this.IsUpdated=false;
  }
od:boolean=false;
  checkradio()
  {
    this.od=true;this.dd=false;this.fo=false;
    this.DataList.DurationOrderDate=undefined;
    this.DataList.DurationDeliveryDate=undefined;
    this.DataList.DayAfterExpiry=undefined;
    this.DataList.DayBeforeExpiry=undefined;
    this.DataList.IsPostExpiry=false;
    this.DataList.IsPreExpiry=false;
  }
  
  dd:boolean=false;
  checkradioo()
  {
    this.dd=true;this.od=false;this.fo=false;
    this.DataList.DurationOrderDate=undefined;
    this.DataList.DurationDeliveryDate=undefined;
    this.DataList.DayAfterExpiry=undefined;
    this.DataList.DayBeforeExpiry=undefined;
    this.DataList.IsPostExpiry=false;
    this.DataList.IsPreExpiry=false;
  }
  fo:boolean=false;
  checkradioq()
  {
    this.fo=true; this.dd=false;this.od=false;
    this.DataList.DurationOrderDate=undefined;
    this.DataList.DurationDeliveryDate=undefined;
    this.DataList.DayAfterExpiry=undefined;
    this.DataList.DayBeforeExpiry=undefined;
    this.DataList.IsPostExpiry=false;
    this.DataList.IsPreExpiry=false;
  }
}



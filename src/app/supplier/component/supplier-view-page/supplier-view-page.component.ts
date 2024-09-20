import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { TradeChatSignalRService } from 'app/shared/services/tradeServices/trade-chat-signal-r.service';

@Component({
  selector: 'app-supplier-view-page',
  templateUrl: './supplier-view-page.component.html',
  styleUrls: ['./supplier-view-page.component.scss']
})
export class SupplierViewPageComponent implements OnInit {
  SupplierList:any[];
  supplierlistcopy:any;
  cols: any[];
  cars: any[];
  Supplier:any;
  statusFilter:any;
  selectedRowDetails: any;
  isHidden:boolean=false;
  status:any;
  // sellbrands:any;
  activeFields: any[] = [
    //{ field: 'SupplierId', label: 'SupplierId' },
    { field: 'Name', label: 'Supplier Name' },
    { field: 'SUPPLIERCODES', label: 'Supplier Code' },
    { field: 'MobileNo', label: 'MobileNo' },
    { field: 'SubcategoryName', label: 'Subcategory Name' },
    { field: 'StateName', label: 'State Name' },
    { field: 'City', label: 'City Name' },
    { field: 'Active', label: 'Active' },
    { field: 'DepoName', label: 'Depo Name' },
    { field: 'BillingAddress', label: 'Billing Address' },
    { field: 'businessType', label: 'Business Type' },
    { field: 'PaymentTerms', label: 'Payment Terms' },
    { field: 'CreatedDate', label: 'Created Date' },
     ]
  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    
    this.cols = [
      //{ field: 'SupplierId', header: 'SupplierId' },
      { field: 'SUPPLIERCODES', header: 'Supplier Code' },
      { field: 'Name', header: 'Supplier Name' },
      {field:'SellingBrands',header:'Selling Brands'},
    
    { field: 'MobileNo', header: 'MobileNo' },
    {field:'GstInNumber',header:'GST Number'},
    { field: 'EmailId', header: 'EmailId' },  
    { field: 'SubcategoryName', header: 'Subcategory Name' },
    { field: 'City', header: 'City Name' },
    { field: 'StateName', header: 'State' },
    { field: 'DepoName', header: 'Depo Name' },
    { field: 'PaymentTerms', header: 'Payment Terms' },
    { field: 'Active', header: 'Active' },
    
    { field: 'BillingAddress', header: 'Billing Address' },
    { field: 'businessType', header: 'Business Type' },
    
    { field: 'CreatedDate', header: 'Created Date' },     
      
    
    ];
    
    this.supplierService.GetSupplierData().subscribe((result:any) => {
      
      this.SupplierList = result;
      this.supplierlistcopy=result;
     });

     this.statusFilter=[{
      label:'All',value:'All'
     },
    {
      label:'True',value:'true'
    },{
      label:'False',value:'false'
    }]
  }

  // change(x,y){
  //   console.log("x",x);
  //   console.log("y",y);
  //   this.isHidden=true;
  //   let z=this.SupplierList.filter(data=>{
  //     if(data.SUPPLIERCODES==x && data.DepoName==y){
  //       return data.SellingBrands
  //     }
  //   })
  //   z.forEach(x=>{
  //     this.sellbrands=x.SellingBrands;
  //     console.log("sel",this.sellbrands)
  //   })
    
  // }
  // changedisabled(){
  //   this.isHidden=false;
  //   this.sellbrands="";
  // }
  // statusfilter:any;
  // getdata(statusfilter){
  //   alert(statusfilter+"dfgf");
  // }
  filterdata(event){
    debugger
    this.SupplierList=this.supplierlistcopy;
    console.log(event.value.value);
    if(event.value.value=="All"){
       this.SupplierList= this.supplierlistcopy.filter((x:any)=>{
        return x.Active == true || x.Active==false
      })
      
    }
    else if (event.value.value == "true"){
      this.SupplierList=this.supplierlistcopy.filter((x:any)=>{
        return x.Active == true
      })
    }
    else{
      this.SupplierList=this.supplierlistcopy.filter(x=>{
        return x.Active==false
      })
    }
  }
}

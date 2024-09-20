import { Component, OnInit } from '@angular/core';
import { CFRInterface } from 'app/report/interface/cfrDC';
import { DfrCfrService } from 'app/report/services/dfr-cfr.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';
const DEFAULT_COLORS = ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
'#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
'#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
'#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']


@Component({
  selector: 'app-cfr',
  templateUrl: './cfr.component.html',
  styleUrls: ['./cfr.component.scss']
})


export class CfrComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  optionsObject:any;
  warehouseListData:any;
  categoryListData:any;
  selectedCatregory: any[] = [];
  subCatList=[];
  brandList: any[];
  selectedwarehouse: any[] = [];
  selectedSubCat:any[] = [];
  selectedSubsubCatregory: any[] = [];
  buyerData:any;
  selectedBuyers:any[] = [];
  whouseLists:any;
  brandLists:any;
  startDate:any;
  endDate:any;
  subcat :any[];
  CFRDashboardResult:any;
  CFRTableData:CFRInterface;
  CRFGraphData:any;
  CFRTotalGreen:any;
  CFRTotalRed:any;
  totalGreenCount : any[]=[];
  totalRedCount : any[]=[];
  blocked : boolean = false;
  isShowChart : boolean = false;
  selectedGraphBuyers : any[]=[];
  selectedBuyerForGraph : any[]=[];
  buyerId:any[];

  constructor(private _service:DfrCfrService, private exportService : ExportServiceService) {
  }
  ngOnInit() {
    this.warehouseList();
    this.categoryList();
   
  }

  chartdesign(graphDetails){
    // this.optionsObject = {
    
    //   scales: {
    //     yAxes: [
    //       {
    //         display: true,
    //         scaleLabel: {
    //           show: false,
    //         },
    //         ticks: {
    //           beginAtZero: true,
    //           max: 100,
    //           min: 20,
    //           stepSize: 20,
    //           callback: (label) => {
    //             let _label = label + '%';
    //             return _label;
                
    //           }
    //         }
    //       }
    //     ],
    //   }
    // };
    var pieData = this.CRFGraphData.map((proj) => proj.DemandData);
    var pieLabels = this.CRFGraphData.map((proj) => proj.BuyerName);
    var pieCFRPercent = this.CRFGraphData.map((proj) => proj.CFRPercent);
    var pieColors = this.configureDefaultColours(pieData);    
    this.basicData = {
      labels: pieData,
      datasets: [
        {
          label: '',
          backgroundColor: pieColors,
          borderColor: '#1E88E5',
          data: pieCFRPercent,
          fill: false,
          tension: .4
      },         
      ]
  };

  }

  warehouseList(){
    this.blocked = true;
    this._service.getWarehouseList().subscribe(res => {
      console.log(res);
      this.blocked = false;
      this.warehouseListData = res;
    })
  }

  categoryList(){
    this.blocked = true;
    this._service.getCategoryList().subscribe(res => {
      console.log(res);
      this.blocked = false;
      this.categoryListData = res;
    })
  }
  
  
  getSubCatList(categories){
    console.log(categories);
    this.subCatList=[];
    this.brandList=[];
    if (categories && categories.length > 0) {
      // let subcat = [];
      this.subcat = categories.map(function (elem) {
        return elem.CategoryId ? elem.CategoryId : elem
      });
      this.blocked = true;
      this._service.getSubCategoryList(this.subcat).subscribe(result => {
        console.log('subCatList', result);
        this.blocked = false;
        this.subCatList = result;
      });
    }else{
      this.buyerList();
      this.selectedBuyers = [];
      this.selectedSubCat = [];
      this.selectedwarehouse = [];
      this.selectedSubsubCatregory = [];
      this.isShowChart = false;
      this.CFRTableData = null;
    }
  }

  getBrandsnew(subcategories) {
    
    this.brandList=[];
    this.selectedSubsubCatregory=[];
    if (subcategories && subcategories.length > 0) {
      let subcat = [];
      subcat = subcategories.map(function (elem) {
        return elem.SubCategoryId ? elem.SubCategoryId : elem
      });
      this.blocked = true;
      this._service.getBrandList(subcat).subscribe(result => {
        console.log('test', result);
        this.blocked = false;
        this.brandList = result;
      });
    }else{
      this.buyerList();
      this.selectedBuyers = [];
    }
  }

  getBrandList(brand){
    this.buyerList();
    this.buyerData = [];
    this.selectedBuyers = [];
  }

  getWarehouseList(warehouse){
    //this.buyerList();
    this.buyerData = [];
    this.selectedBuyers = [];
  }
  
  buyerList(){

    this.whouseLists = this.selectedwarehouse.map(function (elem) {
      return elem.WarehouseId ? elem.WarehouseId : elem;
    });
     
    
    this.brandLists = this.brandList.map(function (elem) {
      return elem.BrandId ? elem.BrandId : elem;
    });
 
    var buyerDc = {
      'BrandIds' : this.brandLists,
      'WarehouseIds' : this.whouseLists 
    }
    console.log(buyerDc);

    if(this.selectedSubsubCatregory.length > 0){
      this.blocked = true;
      this._service.getBuyerList(buyerDc).subscribe(res => {
        console.log(res);
        this.blocked = false;
        this.buyerData = res;
      })
    }else{
      this.buyerData = [];
    }
    
  }

  
  getbuyerList(buyers){
    this.selectedGraphBuyers = buyers;
    this.selectedBuyerForGraph = buyers;
   this.buyerId = [];
   debugger;
   if(buyers && buyers.length > 0){
     this.buyerId = buyers.map(function (a) {
       return a.BuyerId ? a.BuyerId : a
     })
     //this.getSearchRecord();
   }else{
     this.selectedGraphBuyers = [];
     this.selectedBuyerForGraph = [];
     this.CFRTableData = null;
     this.CFRTotalGreen = 0;
     this.CFRTotalRed = 0;
     this.CRFGraphData = null;
   }
   
  }
  getGraphBuyerList(selectedBuyerForGraph){
   this.buyerId = [];
   debugger;
   this.selectedBuyers = selectedBuyerForGraph;
   if(selectedBuyerForGraph && selectedBuyerForGraph.length > 0){
     this.buyerId = selectedBuyerForGraph.map(function (a) {      
       return a.BuyerId ? a.BuyerId : a
     })
     this.getSearchRecord();
   }else{
    this.CFRTableData = null;
    this.CFRTotalGreen = 0;
    this.CFRTotalRed = 0;
    this.CRFGraphData = null;
   }
   
  }

 
  getSearchRecord(){
 
    if(this.selectedwarehouse.length == 0){
      alert("please select Warehouse")
    }else{
      if(this.selectedCatregory.length == 0){
        alert("please select Category")
      }else{
        if(this.selectedSubCat.length == 0){
          alert("please select Sub-Category")
        }else{
          if(this.selectedSubsubCatregory.length == 0){
            alert("please select Sub-Sub-Category(Brand)")
          }else{
            if(this.selectedBuyers.length == 0){
              alert("please select Buyer")
            }else{
              if(this.startDate == undefined){
                alert("please select Start Date")
              }else{
                if(this.endDate == undefined){
                  alert("please select End Date")
                }else{
                  
                  this.startDate = this.startDate ?  moment(this.startDate).format('MM/DD/YYYY') : '';
                  this.endDate = this.endDate ? moment(this.endDate).format('MM/DD/YYYY') : '';
              
                  let categoryid = this.selectedCatregory.map(function (a){
                    return a.CategoryId ? a.CategoryId : 0;
                  })
              
                  let subCatId = this.selectedSubCat.map(function (b){
                    return b.SubCategoryId ? b.SubCategoryId : 0;
                  })
              
                  // let buyerId = this.selectedBuyers.map(function (c){
                  //   return c.BuyerId ? c.BuyerId : 0;
                  // })
              
                  var CFRObject = {
                    'warehouseIds' : this.whouseLists,
                    'categoriesIds' : categoryid,
                    'subcategoriesIds' : subCatId,
                    'brandIds' : this.brandLists,
                    'buyerIds' : this.buyerId,
                    'StartDate' : this.startDate,
                    'EndDate' : this.endDate
                  }
                  
                  if(this.selectedCatregory && this.selectedCatregory.length > 0){
                    this.blocked = true;
                  this._service.getCFRDashboardTableData(CFRObject).subscribe(res => {
                    console.log(res);
                    this.totalGreenCount = [];
                    this.totalRedCount = [];
                    this.CFRDashboardResult  = res;
                    this.CFRTableData  = this.CFRDashboardResult.CFRDashboardDataDcs;
                    this.CRFGraphData  = this.CFRDashboardResult.CFRDashboardGraphDcs;
                    this.CFRTotalGreen  = this.CFRDashboardResult.TotalGreen;
                    this.CFRTotalRed  = this.CFRDashboardResult.TotalRed;
                    if(this.CFRDashboardResult.CFRDashboardDataDcs.length == 0){
                      this.CRFGraphData = null;
                    }
                    this.CFRDashboardResult.CFRDashboardDataDcs.forEach(element => {
                      // debugger;
                      if(element.status =='Green'){
                        this.totalGreenCount.push(element);
                      }else if(element.status == 'Red'){
                        this.totalRedCount.push(element);
                      }
                    // debugger;
                     this.CRFGraphData.forEach(element => {
                      element.DemandData = element.BuyerName + ' ' + '(DemandDay : ' + element.DemandDay + ')';
                      //  element.DemandData = element.BuyerName + ' ' + '(DemandDay : ' + element.DemandDay + ')' + ' ' + '(Warehouse : ' + element.warehousename + ')';
                     }); 
                    this.chartdesign(this.CRFGraphData);
                   
                  });
                  if(this.CFRDashboardResult.CFRDashboardDataDcs.length > 0){
                    this.isShowChart = true;
                  }
                  this.blocked = false;
                  })
                }else{
                  this.isShowChart = false;
                  this.CFRTableData = null;
                }
                }  
              }
            }
          }
        }
      }
    }
  } 
  private configureDefaultColours(data: number[]): string[] {
    let customColours = []
    if (data.length) {
    customColours = data.map((element, idx) => {
        return DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
    });
    }
    return customColours;
}
result:any
  exportDownload(){
    // alert('Data not found')
    // var result = this.CFRTableData.map(function(a){
    //   return{
    //     'Buyer' : a.buyerName,
    //     'Item Number' : a.itemnumber,
    //     'Category' : a.CategoryName,
    //     'Sub Category' : a.SubCategoryName,
    //     'Brand Name' : a.SubSubCategoryName,
    //     'Item Name' : a.ItemName,
    //     'MRP' : a.MRP,
    //     'Warehouse' : a.warehouseName,
    //     'Limit Value' : a.LimitValue,
    //     'Active %' : a.Active_per,
    //     'Active Item' : a.IsActive,
    //     'Date' : a.CreatedDate,
    //     'Status' : a.status,
    //   }
    // })
    this.result = this.CFRTableData;
    if(this.result && this.result.length > 0)
    {
      this.result.forEach(element => {
        element.CreatedDate = moment(element.CreatedDate).format('MM/DD/YYYY HH:mm:ss')
      });
    this.exportService.exportAsExcelFile(this.result, 'CFR-Download');
    }else{
      alert('No Data Found!');
    }

  }
}





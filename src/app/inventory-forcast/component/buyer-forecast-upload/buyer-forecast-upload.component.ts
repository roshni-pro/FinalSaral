import { Component, OnInit } from '@angular/core';
import { InventoryforcastserService } from 'app/inventory-forcast/services/inventoryforcastser.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { Console } from 'console';
import * as moment from 'moment';
import { stringify } from 'querystring';

@Component({
  selector: 'app-buyer-forecast-upload',
  templateUrl: './buyer-forecast-upload.component.html',
  styleUrls: ['./buyer-forecast-upload.component.scss']
})
export class BuyerForecastUploadComponent implements OnInit {

  uploadby: string = '';
  selectDate: Date;
  PopDetails: boolean = false;
  uploadid: number = 0;
  uploadDate: Date
  SummaryDetails: boolean = false;
  popuploadId: number = 0
  popsumuploadId: number = 0
  skip: number = 0
  take: number = 10
  data: any
  details: any = []
  samplefile: any = []
  buyerdata: any[] = [];
  pdcadata: any[] = [];
  first: number = 0;
  Sumbuyer: number = 0;
  Sumpdca: number = 0;
  pdcadialog: boolean = false;
  buyerdialog: boolean = false;
  basecatid: number = 0
  buyerkeyname: any[] = [];
  pdcakeyname: any[] = [];
  buyersummary: any[] = [];
  pdcasummary: any[] = [];
  PdcaExport: any[] = [];
  BuyerExport: any[] = [];
  SubCategoryId: number = 0;
  pdcaDataCheck: boolean = false
  buyerDataCheckk: boolean = false
  blocked: boolean = false
  exportDisableBuyer = true;
  exportDisablePdca = true;
  peopleid: number;
  getRoleData: any;
  sourceExecutiveRole: any;
  regionSourcingRole: any;
  hqMasterRole: any;
  selectedGroup: any;
  GroupData: any[] = []
  SumPDCAPercent:number=0;
  inventoryForecastingSeniorExecutive : any;
  inventoryForecastingExecutive : any;
  constructor(private exportService: ExportServiceService, private serv: InventoryforcastserService) { }
  
  ngOnInit() {
    this.getRoleData = (localStorage.getItem('role')).split(',');
    console.log(this.getRoleData);
    var sourceExecutive = 'Buyer';
    var regionSourcing = 'Region Sourcing lead';
    var HQMaster = 'HQ Master login';
    var InventoryForecastingExecutive = 'Inventory Forecasting Executive';
    this.inventoryForecastingExecutive = this.getRoleData.find(x => x == InventoryForecastingExecutive);
    var InventoryForecastingSeniorExecutive = 'Inventory Forecasting Senior Executive';
    this.inventoryForecastingSeniorExecutive = this.getRoleData.find(x => x == InventoryForecastingSeniorExecutive);

    this.sourceExecutiveRole = this.getRoleData.find(x => x == sourceExecutive)
    this.regionSourcingRole = this.getRoleData.find(x => x == regionSourcing)
    this.hqMasterRole = this.getRoleData.find(x => x == HQMaster)
    this.GroupDrop()
  }

  totalrecords: any
  buyDetailCheck = false
  detaaaa: any = []


  GroupDrop() {
    this.serv.groupDetail().subscribe(res => {
      this.GroupData = res;
      this.GroupData.unshift({ Name: "Select Here", Id: 0 });
      this.selectedGroup = this.GroupData[0];
      console.log("this.GroupData", this.GroupData);
      this.searchnewdata()
    })
  }


  DetailPop(item) {
    this.PopDetails = true;
    console.log(item.UploadID)
    this.popuploadId = item.UploadID
    this.serv.getbuyerdetail(this.popuploadId, this.skip, this.take).subscribe(res => {
      if (res.length > 0) {
        this.details = res
        console.log(this.details, "Details Data");

        this.totalrecords = res[0].TotRec;
        this.buyDetailCheck = true
      }
    })
  }


  detailexportdata: any



  DetailsExport() {
    this.serv.GetBuyerViewListExport(this.popuploadId).subscribe(res => {
      this.detailexportdata = res;
      console.log(res);
      if (this.detailexportdata != null) {
        this.exportService.exportAsExcelFile(this.detailexportdata, "Brand Details Export")
      } else {
        alert("No Data Found");
      }
    },
      (err) => {
        console.log(err);
      })
  }



  GroupName: string = ""
  // searchResult() {

  //   // if(this.selectedGroup==null)
  //   // {
  //   //   alert("Please Select Group")
  //   //   return false
  //   // }
  //   // console.log(this.selectedGroup,"Selected Group");
  //   // this.GroupName=this.selectedGroup.Name
  //   // console.log(this.GroupName,"GroupName");  this.skip, this.take
  //   let date = this.selectDate ? moment(this.selectDate).format('YYYY-MM-DD') : null
  //   this.blocked=true
  //   this.serv.getData(this.GroupName,this.uploadby, date,this.skip,this.take).subscribe((res) => {
  //     this.data = res
  //     console.log(this.data,"data");
  //   this.blocked=false
  //   },(err)=>
  //   {
  //     console.log(err);
  //   }
  //   )

  //  // const reload=()=>window.location.reload();  this.skip, this.take
  // }

  newData: any
  GroupValidation:any
  searchFinal()
  {
    // this.GroupValidation=this.selectedGroup.Name
    // console.log(this.GroupValidation,"GroupValid");
    // if(this.GroupValidation=="Select Here")
    // {
    //   alert("Select GroupName")

    // }

    this.GroupName = this.selectedGroup.Name;
    if(this.GroupName == "Select Here"){
      alert("Select GroupName")
      // this.GroupName = '';
    }else{
      // this.GroupName = this.selectedGroup.Name;
    }    
    if(this.GroupName!="Select Here")
    
    {
      this.searchnewdata()
    }
  }


  searchnewdata() {
    let date = this.selectDate ? moment(this.selectDate).format('YYYY-MM-DD') : null
    this.blocked = true
    console.log( "selected ",this.selectedGroup);
    console.log(this.GroupName,"")
    // if (this.selectedGroup.Name == "Select Here") {
    //   console.log(this.selectedGroup);
    // }
    // else {
    //   console.log(this.selectedGroup, "Selected Group");
    //   this.GroupName = this.selectedGroup.Name
    //   console.log(this.GroupName)
    //   this.serv.getData(this.GroupName, this.uploadby, date, this.skip, this.take).subscribe(res => {
    //     console.log(res);
    //     this.newData = res
    //     this.blocked = false
    //   })
    // }
    this.GroupName = this.selectedGroup.Name;
    if(this.GroupName == "Select Here"){
      this.GroupName = '';
    }else{
      // this.GroupName = this.selectedGroup.Name;
    }    
    if(this.GroupName!=undefined){
    this.serv.getData(this.GroupName, this.uploadby, date, this.skip, this.take).subscribe(res => {
      console.log(res);
      this.newData = res
      this.blocked = false
    })
  }
}
  onUploadPdcaSummary(event, uploadCustom) {

  }
  //buyer summary upload file 
  onUploadBuyerSummary(event, uploadCustom) {
    const files = event.files[0];
    console.log(files);

    let file = new FormData();
    file.append("file", files)

    this.serv.uploadBuyerSum(file).subscribe((res) => {

      alert(res);
      console.log(res);
      window.location.reload();
    },
      (err) => {
        console.log(err);
      })
  }
  //buyer forecast on click upload and choose file
  onUpload(event, uploadCustom) {
    const files = event.files[0];
    console.log(files);

    let file = new FormData();
    file.append("file", files)

    this.serv.uploader(file).subscribe((res) => {

      alert(res);
      console.log(res);
      window.location.reload();
    },
      (err) => {
        console.log(err);
      })
  }
  pagination
  load(event) {
    // this.blocked=true;
    var Last = event.first ? event.first + event.rows : 10;
    this.skip = Last / event.rows;

    this.take = event.rows;
    //this.popuploadId = this.UploadID
    this.serv.getbuyerdetail(this.popuploadId, this.skip, this.take).subscribe(res => {
      console.log(res)
      if (res.length > 0) {
        this.details = res
        this.totalrecords = res[0].TotRec;
        this.buyDetailCheck = true
      }
    })
  }
  summaryPop(item) {
    this.SummaryDetails = true;
    this.popsumuploadId = item.UploadID;
    this.first = 0;
    this.serv.getsummary(this.popsumuploadId).subscribe(
      (res: any) => {
        this.buyerdata = res.BuyersSummaryDC;
        this.pdcadata = res.PDCADC;
        console.log(this.pdcadata, "PDCA Data");
        console.log(this.buyerdata, "Buyer Summary");
        this.buyerdata.forEach(element => {
          this.Sumbuyer += element.Value;
        });
        this.SumPDCAPercent=0
        this.pdcadata.forEach(element => {
          this.Sumpdca += element.Value;
          this.SumPDCAPercent=((this.SumPDCAPercent+element.Percentage))
        });
        
        this.Sumbuyer = 0;
        this.Sumpdca = 0;
        for (let result of this.buyerdata) {
          this.Sumbuyer += result.Value;
        }

        for (let result of this.pdcadata) {
          this.Sumpdca += result.Value;
        }

        if (this.buyerdata.length > 0) {
          this.exportDisableBuyer = false
        }
        if (this.pdcadata.length > 0) {
          this.exportDisablePdca = false
        }
      },
      (err) => {
        console.log(err);

      })
    this.export('a');

  }
  BuyerExport1: any[] = []
  // button func for exporing data / downloading file
  export(selectExportArr: string) {
    // pdca export data for save file important fields
    console.log("pdcadata", this.pdcadata);
    this.PdcaExport = this.pdcadata.map(function (a) {
      return {
        'Category': a.Category,
        'Department': a.Department,
        'Value': a.Value,
      };
    });
    console.log("pdcaexport", this.PdcaExport);
    //new export file service calling for buyer
    this.serv.exportBuyerSum(this.popsumuploadId).subscribe(res => {
      this.BuyerExport = res
    },
      (err) => {
        console.log(err);
      })

    console.log(this.BuyerExport);

    this.BuyerExport1 = this.BuyerExport.map(function (a) {
      return {
        Id: a.Id,
        WarehouseName: a.WarehouseName,
        Department: a.Department,
        Category: a.Category,
        SubCategory: a.SubCategory,
        BrandName: a.BrandName,
        ValueInAmt: a.ValueInAmt,
      };
    });
    if (selectExportArr == "PDCA") {
      this.exportService.exportAsExcelFile(this.PdcaExport, "pdcasummarylist");
    }
    else if (selectExportArr == "Buyers") {
      this.exportService.exportAsExcelFile(this.BuyerExport1, "buyersummarylist");
    } else {
      if (selectExportArr == 'a') {

      }
      else {
        alert('File Error ! please Download again')
      }
    }
  }

  //download sample Function
  downloadSample() {
    this.serv.downloadsample().subscribe((res) => {
      console.log(res)
      this.samplefile = res
      console.log(this.samplefile);
      this.sampleExport(this.samplefile);
    })
  }
  clear() {
    this.selectDate = null
    this.uploadby = ''
    this.selectedGroup = null
    //  this.searchResult()
  }

  // button func for exporing data / downloading file
  sampleExport(samplefile) {

    this.exportService.exportAsExcelFile(this.samplefile, "BUYERS_FORECAST_Sample");
  }
  //PDCA POPUP
  totalWarehousepdca(arr, col) {
    if (col != 'CategoryName') {
      var total = 0;
      for (let result of arr) {
        total += result[col];
      }
      return total;
    }
    else {
      return "Grand Total";
    }
  }
  // pdca popup on click of name
  pdcaPop(product) {
    this.pdcadialog = true
    this.serv.getpdcasummary(this.popsumuploadId, product.BaseCategoryId, product.Categoryid).subscribe
      (
        (res) => {

          this.pdcasummary = res
          if (this.pdcasummary.length > 0) {
            this.pdcaDataCheck = true
          }
          console.log(this.pdcasummary, "Pdca Summary");

          if (this.pdcasummary.length > 0) {
            this.pdcakeyname = Object.keys(res[0])
          }
        },
        (err) => {
          console.log(err)
        })
  }
  //buyer pop up on click of name
  buyerPop(product: any) {
    this.buyerdialog = true;
    this.serv.getbuyersummary(this.popsumuploadId, product.PeopleID, product.SubCategoryId).subscribe
      (
        (res) => {
          this.buyersummary = res
          if (this.buyersummary.length > 0) {
            this.buyerDataCheckk = true
          }
          if (this.buyersummary.length > 0) {
            this.buyerkeyname = Object.keys(res[0])
          } else {
            this.buyerkeyname = [];
          }
        },
        (err) => {
          console.log(err)
        }
      )
  }
  totalWarehousebuyer(arr, col) {
    if (col != 'Manufacture') {
      var total = 0;
      for (let result of arr) {
        total += result[col];
      }
      return total;
    }
    else {
      return "Grand Total";
    }
  }

}
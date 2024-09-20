import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExecutiveService } from 'app/executive-assignment/Services/executive.service';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/components/common/messageservice';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-upload-cfr-article',
  templateUrl: './upload-cfr-article.component.html',
  styleUrls: ['./upload-cfr-article.component.scss']
})
export class UploadCfrArticleComponent implements OnInit {
  [x: string]: any;
  blocked: boolean;
  data: any[];
  CfrItemList: any[];
  cols: any[];
  subcatList:any;
  subcateid:any;
  city:any
  Items:any;
  selectcity:any
  selectAddcity:any
  selectedList:any=[]
  selectedItem:any
  AddCfrList:any;

  visible:boolean=false;
  @ViewChild(Table, { static: false }) Table: Table;
  constructor(private digitalsaleService: DigitalSaleService, private executiveService: ExecutiveService,
    private messageService: MessageService,private exportService: ExportServiceService,private subcategoryservice: SubCategoryService,
    private confirmationService: ConfirmationService) { this.data = []; }

  ngOnInit() 
  { 
    this.cityList();
    this.getSubcategory();
   
     
  }

  getSubcategory(){
    this.blocked=true;
    this.subcategoryservice.GetAllSubCategory().subscribe(result=>{
      this.subcatList =result;
      this.blocked=false;
     });
  }
  cityList()
  {
    this.blocked=true;
    this.executiveService.getCityList().subscribe(res=>
      {
        console.log(res);
        this.city=res
        this.blocked=false;
        
      })
  }

 
  onUpload(event, uploadCustom) {
  // debugger;
   if(this.selectcity > 0){
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = event.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      var dataFromExcel = jsonData;
      const dataString = JSON.stringify(jsonData);
  
      for (var i in dataFromExcel.data) {
        let obj = {
          ItemNumber: dataFromExcel.data[i].ItemNumber,
          WarehouseId: dataFromExcel.data ? dataFromExcel.data[i].WarehouseId : 0,
          SubCatId: this.subcateid ? this.subcateid : 0,
          CityId : this.selectcity ? this.selectcity : 0
        }
        this.data.push(obj);
      }
      // for (var i in dataFromExcel.Sheet1) {
      //   let obj = {
      //     ItemNumber: dataFromExcel.Sheet1[i].ItemNumber,
      //     WarehouseId: dataFromExcel.Sheet1 ? dataFromExcel.Sheet1[i].WarehouseId : 0,
      //     SubCatId: this.subcateid ? this.subcateid : 0
      //   }
      //   this.data.push(obj);
      // }
      if (this.data.length > 0) {
    
        this.blocked = true;
        this.executiveService.UploadCfrArticle(this.data).subscribe(result => {
     
          this.blocked = false;
          if(result == 'Your Excel data is uploaded succesfully.')
          {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'file uploaded successfully!', detail: '' });
            }, 500);
          }else{
            this.messageService.add({ severity: 'error', summary: result, detail: '' });
          }
        
        },
          error => {
            this.blocked = false;
            this.messageService.add({ severity: 'error', summary: 'Error In file upload!', detail: '' });
          });
      } 
      else 
      {
        error => {
          this.blocked = false;
          this.messageService.add({ severity: 'error', summary: 'Error In file upload!', detail: '' });
        };
      }
    }
    reader.readAsBinaryString(file);
  }else{
    alert('Please Select City First!');
  }
  }
  

  addDisplay(){
// debugger
    if(this.selectcity){
      this.visible=true;
      this.clear();
      this.selectAddcity=this.selectcity;
      this.getAdditemList();
    }
    else{
      alert('Select city!')
    }
  }
  AddItems(selectedItem:any){
    // debugger
    let payload={
      'ItemNumber':selectedItem.ItemNumber,
      'CityId':selectedItem.Cityid,
      'SubCatId':selectedItem.SubCategoryId,
      'CityName':selectedItem.CityName,
      'SubcategoryName':selectedItem.SubcategoryName,
      'itemBaseName':selectedItem.itemBaseName
    }
    this.selectedList.push(payload);
  }
  UploadedCfrData:any;
  getCfrData(){
    if(this.selectcity && this.subcateid){
      this.executiveService.getCfrData(this.selectcity,this.subcateid).subscribe(res=>{
        console.log(res);
        this.UploadedCfrData=res;
        if(this.UploadedCfrData && this.UploadedCfrData.length==0){
          alert('No data found!');
        }
      })
    }
    else {
      if(!this.selectcity){
        alert('Select city!')
      }
      if(!this.subcateid){
        alert('Select Subcategory!')
      }
    }
  }

  getAdditemList(){
    this.blocked=true;
    this.executiveService.GetCfrAddItemList(this.selectAddcity).subscribe(res=>{
      console.log(res);
      res.forEach(element => {
        element.IsCheck=false;
      });
      this.Items=res;
      this.blocked=false;
    })
  }
  removeCfrArticle(articleId){
    this.blocked=true;
    this.executiveService.removeCfrData(articleId).subscribe(res=>{
      // console.log(res);
      alert(res);
      this.blocked=false;
      this.getCfrData();

    })
  }

  addCfrArticles(){
    console.log(this.selectedList)
    if(this.selectedList && this.selectedList.length>0){
      this.blocked=true;
      this.executiveService.addCfrArticle(this.selectedList).subscribe(res=>{
        alert(res);
        this.blocked=false;
        if(this.selectcity && this.subcateid){
          this.getAdditemList();
          this.getCfrData();
        }
        this.clear();
      })
    }
    else{
      alert("Choose Items!");
    }
    
  }
  Remove(index){
    this.selectedList.splice(index,1);
  }

  clear(){
    this.selectedItem=[];
    this.selectedList=[];

  }
  confirm1(articleId) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to remove this article?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            this.removeCfrArticle(articleId);
        },
        reject: (type:any) => {
          
        }
    });
}

  downloadSampleFile() {
    let dummyData = []
    dummyData.push({ ItemNumber: ''})
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dummyData);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, 'SampleCfrUpload');
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: "xlsx"
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ".xlsx");
  }



}


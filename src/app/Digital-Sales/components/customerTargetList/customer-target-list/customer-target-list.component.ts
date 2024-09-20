import { Component, OnInit, Input, ElementRef,ViewChild } from '@angular/core';
import * as moment from 'moment';
import { CityService } from 'app/shared/services/city.service';
import { SubCategoryService } from 'app/shared/services/sub-category.service';
import { SubSubCategoryService } from 'app/shared/services/sub-sub-category.service';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { MessageService } from 'primeng/api';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { lastDayOfISOWeek } from 'date-fns';



@Component({
  selector: 'app-customer-target-list',
  templateUrl: './customer-target-list.component.html',
  styleUrls: ['./customer-target-list.component.scss']
})


export class CustomerTargetListComponent implements OnInit {
  closeResult: string;
  isInvalid: boolean;
  CityList: any[];
  SubCategoryList: any[];
  BrandList: any[];
  SelectBrandIds: any[];
  minimumDate: any;
  getsearchData: any;
  count: number;
  companyTarget: any;
  getBrandCustTargetlist: any;
  visible:boolean=false;
  file: File[];
  filepath: File[];
  fileUrl: string | ArrayBuffer;
  UploadID: any;
  blocked: boolean = false
  @ViewChild('myInput', null) fileUploader: ElementRef;
  constructor(private cityservice: CityService,
    private subcategoryservice: SubCategoryService,
    private brandService: SubSubCategoryService,
    private digitalsaleService: DigitalSaleService,
    private router: Router,
    private route: ActivatedRoute,
    private exportService: ExportServiceService,
    private messageService: MessageService,
    private modalService: NgbModal) {
      this.companyTarget = {}
  }

  ngOnInit() {

    this.companyTarget = {
      CityId: 0,
      // StartDate: new Date(),
      //EndDate:  new Date(),
      SubCatId: 0,
      subCatTargetBrands: []
    }

    this.minimumDate = new Date();
    this.cityservice.GetAllCity().subscribe(x => {
      this.CityList = x;
    });
    this.SubCategoryList = null;
    this.subcategoryservice.GetAllSubCategory().subscribe(result => {
      this.SubCategoryList = result;
    })
  }

  GetBrand(SubCatId) {
    this.companyTarget.subCatTargetBrands = [];
    this.BrandList = null;
    this.brandService.GetBrandBySubCategoryId(SubCatId).subscribe(result => {
      
      this.BrandList = result;
    })
  }


  brandChangeEvent(event: boolean) {
    alert(event);
  }
  clear() {
    this.companyTarget.CityId = 0;
    this.companyTarget.SubCatId = 0;
    this.companyTarget.subCatTargetBrands = [];
  }
  search(searchData) {
    
    if (searchData.CityId == 0) {
      this.messageService.add({ severity: 'error', summary: 'Please Select City !!', detail: '' });
      return false;
    }
    let SubsubCategoryidsModel = searchData.SubsubCategoryid;
    let SubsubCategoryids = [];
    if (searchData.SubsubCategoryid) {
      searchData.SubsubCategoryid.forEach(element => {
        SubsubCategoryids.push(element.SubsubCategoryid);
      });
      searchData.SubsubCategoryid = SubsubCategoryids;
    } else {
      searchData.SubsubCategoryid = [];
    }
    var datatoPost = {
      CityId: searchData.CityId,
      SubCategoryId: searchData.SubCatId ? searchData.SubCatId : 0,
      StartDate: searchData.StartDate ? moment(searchData.StartDate).format('YYYY-MM-DD') : null,
      EndDate: searchData.EndDate ? moment(searchData.EndDate).format('YYYY-MM-DD') : null,
      BrandId: searchData.SubsubCategoryid ? searchData.SubsubCategoryid : [],
      Status: true,
      skip: 0,
      take: 10
    };
    this.blocked=true
    this.digitalsaleService.GetAllSubcategorytarget(datatoPost).subscribe(result => {
	console.log(result)
  this.blocked=false;
      this.getsearchData = result.CompanyTargetDCs;
      console.log(this.getsearchData);
      
      this.count = result.totalItem;
    })

  }

  addCompanyTarget() {
    this.router.navigateByUrl("layout/digitalsales/AddCompanyTarget")
  }

  searchLevel(event) {
    this.router.navigateByUrl("layout/digitalsales/Showcustomerlevel/" + event.SubCatTargetBrandId)
  }
  getBrandCustomerTargetlist(SubCatData) {
    
    this.digitalsaleService.GetBrandCustomerTarget(SubCatData.SubCatTargetBrandId).subscribe(result => {
      this.getBrandCustTargetlist = result;
      
      if (result.length != 0) {
        this.exportService.exportAsExcelFile(this.getBrandCustTargetlist, 'GetBrandCustTargetlist');
      } else {
        this.messageService.add({ severity: 'error', summary: 'No Data found !!', detail: '' });
      }
    })
  }
  load(event) {
    
    var datatoPost = {
      CityId: event.CityId,
      SubCategoryId: 0,
      StartDate: null,
      EndDate: null,
      BrandId: [],
      Status: true,
      skip: event.first,
      take: event.rows
    };
    this.digitalsaleService.GetAllSubcategorytarget(datatoPost).subscribe(result => {
      this.getsearchData = result.CompanyTargetDCs;
      this.count = result.totalItem;

    })
  }
  active(activedata) {
    
    var d = this.companyTarget;
    var datatopost = {
      InActive: true,
      SubCatTargetBrandId: activedata.SubCatTargetBrandId
    }
    this.digitalsaleService.InactiveBrandCustomerTarget(datatopost).subscribe(result => {
      // this.getBrandCustTargetlist=result;
      
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Active Successfully !!', detail: '' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'No Data found !!', detail: '' });
      }
      var datatopost = {
        CityId: d.CityId,
        SubCategoryId: d.SubCatId,
        StartDate: null,
        EndDate: null,
        BrandId: [],
        Status: true,
        skip: 0,
        take: 10
      }
      this.digitalsaleService.GetAllSubcategorytarget(datatopost).subscribe(result => {
        this.getsearchData = result.CompanyTargetDCs;
        this.count = result.totalItem;

      })
    })
  }
  inactive(inactivedata) {
    var d = this.companyTarget;
    
    var datatopost = {
      InActive: false,
      SubCatTargetBrandId: inactivedata.SubCatTargetBrandId
    }
    this.digitalsaleService.InactiveBrandCustomerTarget(datatopost).subscribe(result => {
      // this.getBrandCustTargetlist=result;
      
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'DeActive Successfully !!', detail: '' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'No Data found !!', detail: '' });
      }
      var datatopost = {
        CityId: d.CityId,
        SubCategoryId: d.SubCatId,
        StartDate: null,
        EndDate: null,
        BrandId: [],
        Status: true,
        skip: 0,
        take: 10
      }
      this.digitalsaleService.GetAllSubcategorytarget(datatopost).subscribe(result => {
        this.getsearchData = result.CompanyTargetDCs;
        this.count = result.totalItem;
      })
    })
  }

  ImportCust(Id){
    this.fileUploader.nativeElement.value = null;
    this.visible=true;
    this.UploadID=Id;
  }

  onUpload(file: File[]){
    this.file = file;
    console.log('file',this.file);
    
    var reader = new FileReader();
    this.filepath = file;
    reader.readAsDataURL(file[0]); 
    reader.onload = (_event) => { 
    }
  }

  UploadCust(){
    //debugger;
    if(this.file==undefined)
    {
      alert("Please upload File");
    }
    let formData = new FormData();
    formData.append('file',this.file[0])    
    this.digitalsaleService.ImportTargetCust(this.UploadID,formData).subscribe((result:any) =>{
      this.file=null;
      console.log(result)
      this.visible=false;
      this.search(this.companyTarget);
      // this.messageService.add({severity:'success', summary: result, detail:''});
      alert(result);
    })
  }

}

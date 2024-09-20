import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupplierService } from 'app/shared/services/supplier.service';
import { SupplierCategoryService } from 'app/shared/services/suppliercategory.service';
import { CityService } from 'app/shared/services/city.service';
import { StateService } from 'app/shared/services/state.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { MurliService } from 'app/shared/services/murli.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-murli-audio-images-details',
  templateUrl: './murli-audio-images-details.component.html',
  styleUrls: ['./murli-audio-images-details.component.scss']
})
export class MurliAudioImagesDetailsComponent implements OnInit {
  @Output() refreshParent = new EventEmitter<boolean>();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  closeResult: string;
  mewMurliObject: any;
  mewMurliDataView: any[];
  cols: any;
  newMurliDetails: any;
  totalamount: any[];
  finalamount: any;
  isInvalid: boolean;
  warehouseList: any;
  WarehouseId: number;

  apiURL: string;
  User: any;




  //--
  public imagePath;

  walkFile: any;
  speakFile: any;
  buyFile: any;
  walkImage: any;
  speakImage: any;
  buyImage: any;
  walkList: any;
  speakList: any;
  buyList: any;
  MurliAudioImageDc: any;
  Name: string;
  ImagePath: string;


  constructor(private messageService: MessageService,
    private murliService: MurliService,
    private modalService: NgbModal,
    private router: Router,
    private warehouse: WarehouseService,
    private http: HttpClient) {


    this.apiURL = environment.apiURL;


    this.mewMurliObject = {};
    this.newMurliDetails = {};
    this.mewMurliDataView = [];
    this.MurliAudioImageDc = {
      MurliImageDcs: []
    };

    this.walkList = {};
    this.speakList = {};
    this.buyList = {};

  }
  display: boolean = false;
  displayCheckbox: boolean;


  ngOnInit() {

    this.warehouse.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
      console.log("whwhwh", this.warehouseList);
    })

  }



  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  uploadWalk(walkFile: File[]) {
    
    this.walkFile = walkFile;
    var reader = new FileReader();
    this.imagePath = walkFile;
    reader.readAsDataURL(walkFile[0]);
    reader.onload = (_event) => {
      this.walkImage = reader.result;
    }
  }
  uploaderWalk() {
    
    let formData = new FormData();
    formData.append('file', this.walkFile[0])
    this.murliService.UploadMurliImageForMobile(formData).subscribe(result => {
      this.walkList.ImagePath = result;

      console.log(this.apiURL);
      console.log(this.walkList.ImagePath);
      this.walkImage = this.apiURL + this.walkList.ImagePath;
      console.log(this.walkImage);
      this.messageService.add({ severity: 'success', summary: 'Walk Uploaded Successfully!', detail: '' });

    })
  }

  uploadSpeak(speakFile: File[]) {
    
    this.speakFile = speakFile;
    var reader = new FileReader();
    this.imagePath = speakFile;
    reader.readAsDataURL(speakFile[0]);
    reader.onload = (_event) => {
      this.speakImage = reader.result;
    }
  }
  uploaderSpeak() {
    
    let formData = new FormData();
    formData.append('file', this.speakFile[0])
    this.murliService.UploadMurliImageForMobile(formData).subscribe(result => {
      this.speakList.ImagePath = result;
      console.log(this.apiURL);
      console.log(this.speakList.ImagePath);
      this.speakImage = this.apiURL + this.speakList.ImagePath;
      console.log(this.speakImage);
      this.messageService.add({ severity: 'success', summary: 'Speak Uploaded Successfully!', detail: '' });

    })
  }

  uploadBuy(buyFile: File[]) {
    
    this.buyFile = buyFile;
    var reader = new FileReader();
    this.imagePath = buyFile;
    reader.readAsDataURL(buyFile[0]);
    reader.onload = (_event) => {
      this.buyImage = reader.result;
    }
  }
  uploaderBuy() {
    
    let formData = new FormData();
    formData.append('file', this.buyFile[0])
    this.murliService.UploadMurliImageForMobile(formData).subscribe(result => {
      this.buyList.ImagePath = result;
      console.log(this.apiURL);
      console.log(this.buyList.ImagePath);
      this.buyImage = this.apiURL + this.buyList.ImagePath;
      console.log("buy oimagre ", this.buyImage);
      this.messageService.add({ severity: 'success', summary: 'Buy Uploaded Successfully!', detail: '' });
    })
  }





  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  // AddItemsTolist(testFormV1: any) {
  //   


  //   if (testFormV1.form.status == "VALID") {

  //     // if (this.newOrderDetails.Qty > 0 && this.newOrderDetails.UnitPrice > 0) {

  //     //   this.newOrderDetails.TotalAmount = this.newOrderDetails.Qty * this.newOrderDetails.UnitPrice;
  //     //   this.NewOrderDetailsView.push(this.newOrderDetails)
  //     //   this.finalamount = 0
  //     //   this.NewOrderDetailsView.forEach(element => {
  //     //     console.log(element)
  //     //     this.finalamount = this.finalamount + element.TotalAmount;
  //     //   });
  //     //   console.log(this.newOrderDetails.completeAmount);
  //     //   console.log(this.NewOrderDetailsView);

  //     //   console.log(" this.finalamount", this.finalamount)
  //     //   this.newOrderDetails = {};


  //     // } else {

  //     //   this.newOrderDetails = {};
  //     //   this.messageService.add({ severity: 'error', summary: 'No negative values', detail: '' });



  //     // }



  //   } else {
  //     // this.newOrderDetails = {};

  //     this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields! ', detail: '' });



  //   }



  // }



  onSave(testForm: any) {
    
    if (this.buyList.ImagePath && this.speakList.ImagePath && this.walkList.ImagePath) {

      if (testForm.form.status == "VALID") {
        this.walkList.Name = "Walk";
        this.speakList.Name = "Speek";
        this.buyList.Name = "Buy";

        this.MurliAudioImageDc.MurliImageDcs[0] = this.walkList;
        this.MurliAudioImageDc.MurliImageDcs[1] = this.speakList;
        this.MurliAudioImageDc.MurliImageDcs[2] = this.buyList;

        console.log("final data to send ", this.MurliAudioImageDc);


        this.murliService.AddMurliImage(this.MurliAudioImageDc).subscribe(res => {
        })
        this.messageService.add({ severity: 'Success', summary: 'Order added ', detail: '' });
        this.router.navigateByUrl('/layout/murli/murliaudioimage');

      } else {
        this.isInvalid = true;
        this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
        return;
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Please Upload all three images!!', detail: '' });
    }
  }




  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/murli/murliaudioimage')
  }


}

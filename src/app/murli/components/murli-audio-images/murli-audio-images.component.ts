import { Component, OnInit } from '@angular/core';
import { MurliService } from 'app/shared/services/murli.service';
import { Router } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-murli-audio-images',
  templateUrl: './murli-audio-images.component.html',
  styleUrls: ['./murli-audio-images.component.scss']
})
export class MurliAudioImagesComponent implements OnInit {


  warehouseList: any;
  Whsearch: any;
  getdatalist: any;
  cols: any[];

  isOpenPopup: boolean;
  Imagedatas: any;
  walkimage: any;
  speakimage: any;
  buyimage: any;
  title: any;
  isActivePopUp: boolean;
  isDeletePoPuP: boolean;


  Activevalue: any;
  MurliAudioImageDc: any;
  MurliAudioImageDcDel: any;

  IDforAD: any;
  gotowh: any;

  IDforDelete: any;

  blocked: boolean;


  constructor(private messageService: MessageService,
    private murliService: MurliService,
    private modalService: NgbModal,
    private router: Router,
    private warehouse: WarehouseService,
    private http: HttpClient,
    private confirmationService: ConfirmationService) {

    this.Imagedatas = {};
    this.MurliAudioImageDc = {};
    this.MurliAudioImageDcDel = {};



  }

  ngOnInit() {

    this.warehouse.GetAllWarehouse().subscribe(result => {
      this.warehouseList = result;
      console.log("whwhwh", this.warehouseList);
    })



    this.cols = [
      { field: 'WarehouseName', header: 'Warehouse Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Isactive', header: 'Isactive' },
      { field: 'Actions', header: 'Actions', bool: true }

    ];

  }

  onSave(Whsearch) {
    this.blocked = true;
    console.log(Whsearch);
    this.murliService.GetMurliImage(Whsearch).subscribe(result => {
      
      console.log("resssfdsf", result);
      this.getdatalist = result;
      console.log("whwhwhdataatatatat", this.getdatalist);
      this.blocked = false;
    })
  }

  Images(pageData) {
    
    console.log("pageData dfg dfg", pageData);
    this.walkimage = pageData.MurliImageDcsV1[0].ImagePath;
    this.speakimage = pageData.MurliImageDcsV1[1].ImagePath;
    this.buyimage = pageData.MurliImageDcsV1[2].ImagePath;
    this.title = pageData.Title;
    this.isOpenPopup = true;
  }



  publishStory(rowdata) {
    console.log(rowdata);
    


    let filterlist = this.getdatalist.filter(element => {
      return element.Isactive == true;
    });

    if (rowdata.Isactive == true || (filterlist && filterlist.length > 0)) {
      this.blocked = true;
      this.murliService.ActiveMurliImages(rowdata.Id, rowdata.Isactive, rowdata.WarehouseId).subscribe(result => {
        this.messageService.add({ severity: 'success', summary: 'Published', detail: 'Murli Images Published Successfully!!!' });

        this.onSave(rowdata.WarehouseId);
        this.blocked = false;
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Atlest one set of Images needs to be Active !', detail: '' });
      this.onSave(rowdata.WarehouseId);
    }


  }



  delete(rowdata) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.murliService.DeleteMurliImages(rowdata.Id, rowdata.WarehouseId).subscribe(story => {
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Murli Images Deleted Successfully!!!' });
          this.onSave(rowdata.WarehouseId);
        });
      }
    });
  }

  Add() {
    this.router.navigateByUrl('layout/murli/murliaudioimageDetails');
  }
}

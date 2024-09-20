import { Component, OnInit } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { ItemService } from 'app/shared/services/item.service';
import * as internal from 'assert';
import { event } from 'jquery';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-barcode-item',
    templateUrl: './barcode-item.component.html',
    styleUrls: ['./barcode-item.component.scss']
})
export class BarcodeItemComponent implements OnInit {
    isSearch: boolean
    isTable: boolean
    searchKey: any
    skip: number
    take: number
    keyword: string
    blocked: boolean
    itemlist: any[]
    popupDisplay: boolean = false
    totalRecords: number
    ItemPerPage: any;
    PageNo: any;
    first: number
    barcodeimage: any
    IsExport: boolean
    constructor(private itemService: ItemService,
         private exportService: ExportServiceService,
         private confirmationService: ConfirmationService
         ) { }

    ngOnInit() {
        this.ItemPerPage = 10
        this.PageNo = 1
    }
    load(event) {
        this.IsExport = false;
        this.first = 0;
        if (event) {
            var Last = event.first ? event.first + event.rows : 10
            this.ItemPerPage = event.rows
            this.PageNo = Last / event.rows
        }
        if (this.searchKey) {
        } else {
            this.searchKey = ""
        }
        this.blocked = true;
        this.itemService.GetItemBarDetail(this.PageNo, this.ItemPerPage, this.searchKey, this.IsExport).subscribe(res => {
            this.itemlist = res;

            console.log(res, "res");
            this.totalRecords = res[0].total_rows;
            this.blocked = false;
        })
    }
    searchResult() {
        this.ItemPerPage = 10
        this.PageNo = 1;
        this.itemlist = []
        this.totalRecords = 0;
        this.load(null);

    }
    toggleSearch() {
        if (this.isSearch == true) {
            this.isSearch = false;
        } else {
            if (this.isTable == true) {
                this.isTable = false;
            }
            this.isSearch = true;
        }
    }
    
    searchClear() {
        this.searchKey = ''
        this.ItemPerPage = 10
        this.PageNo = 1;
        this.itemlist = []
        this.totalRecords = 0;
        this.load(null)
    }

    //barcode popup variables
    barcodeList: any = [];
    showBarcode: boolean = false;
    barcodePopup(item) {

        this.showBarcode = false;            
        this.barcodeList = []; 
        this.barcodeimage = null; 
        console.log(item); 

        let itemNumber = item.Number? item.Number: item.ItemNumber;
        this.itemService.getItemBarcodes(itemNumber).subscribe(res => {
            console.log(res);
            this.barcodeList = res;
            this.popupDisplay = true;
        })

    }
    
    showBarcodeImage(barcode) {
        this.showBarcode = false;            
        console.log();
        
        if (barcode != null && barcode != "") {
            this.itemService.GetBarCode(barcode).subscribe(res => {
                console.log(res);
                this.barcodeimage = 'data:image/png;base64,' + res.BarcodeImage;
                this.showBarcode = true;            
            })
        } else {
            this.showBarcode = false;            
            alert('there is no barcode for product')
        }
    }

    backToShowList(){
        this.showBarcode = false;
    }


    printBarcode() {
    }
    Exportfile() {
        //download sample Function
        this.IsExport = true
        this.itemService.GetItemBarDetail(this.PageNo, this.ItemPerPage, this.searchKey, this.IsExport).subscribe(res => {
            this.itemlist = res
            console.log(res, "export res");

            if (this.itemlist != null) {
                this.exportService.exportAsExcelFile(this.itemlist, "details Export")
            }
        })
    }


    // confirm(e) {
    //     this.popupDisplay = false;
    //     this.confirmationService.confirm({
    //         message: 'Are you sure that you want to perform this action?',
    //         accept: () => {
    //             //Actual logic to perform a confirmation
    //             console.log(e);
    //             this.itemService.DeleteItemBarcodes(e.ItemNumber, e.Barcode).subscribe(res=>{
    //                 console.log(res);
    //                 this.barcodePopup(e);
    //             },
    //             err=>{
    //                 alert("Error - Please Try again");
    //             })
    //         },
    //         reject: () => {
    //             this.barcodePopup(e);
    //         }
    //     });
    // }

}
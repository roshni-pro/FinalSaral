import { OfferService } from '../../Service/offer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import * as moment from 'moment';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  WarehouseList: any;
  offerlist: any;
  WarehouseId: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any[];
  blocked: boolean;
  start: Date;
  end: Date;
  OfferOn: any;
  tabname: any;
  selectedName: any;
  activeNameFields: any[] = [
    { field: 'Name', label: 'TypeName' },
  ]
  activeFields: any[] = [
    { field: 'OfferCode', label: 'OfferCode' },
    { field: 'OfferName', label: 'Offer Name' },
    { field: 'Description', label: 'Description' },
    { field: 'BillDiscountType', label: 'Type' },


    { field: 'itemname', label: 'Item Name' },
    { field: 'WarehouseName', label: 'Warehouse Name' },
    { field: 'OffersaleQty', label: 'Quantity' },
    { field: 'start', label: 'start' },
    { field: 'end', label: 'end' },
    { field: 'DistributorDiscountPercentage', label: 'Percentage' },
    { field: 'OfferOn', label: 'Offer On' },
    { field: 'FreeOfferType', label: 'Free Offer Type' },
    { field: 'IsActive', label: 'IsActive' },
    { field: 'BillAmount', label: 'Min Limit' },
    { field: 'MaxBillAmount', label: 'Max Limit' },
    { field: 'BillDiscountWallet', label: 'Weight' },
    { field: 'BillDiscountOfferOn', label: 'Discount On' },
    { field: 'FreeWalletPoint', label: 'Amount' },
    { field: 'UOM', label: 'UOM' },
    { field: 'DistributorDiscountAmount', label: 'Max Discount' },
    // {field:'FreeWalletPoint', label:'Wallet Point'},
    // {field:'FreeWalletPoint', label:'Wallet Point'},
    // {field:'FreeWalletPoint', label:'Wallet Point'},
  ];

  constructor(private warehouseService: WarehouseService, private router: Router, private OfferService: OfferService) {
    this.selectedRowDetails = [];
    // this.selectedName = [];
  }

  ngOnInit() {
    this.WarehouseId = "";
    this.start = null;
    this.end = null;
    this.warehouseService.GetAllWarehouse().subscribe(result => {

      this.WarehouseList = result;
    })

    this.onSearch(this.WarehouseId, this.start, this.end, this.OfferOn);
    // this.OfferService.getOfferList(this.WarehouseId).subscribe(result => {
    //   this.offerlist = result;
    //   console.log(' this.offerlist: ', this.offerlist);
    // });
  }
  onSearch(WarehouseId, start, end, OfferOn) {

    if (start != null) {
      start = start ? moment(start).format('DD/MM/YYYY') : null;
      // end = end ? moment(end).format('DD/MM/YYYY') : null;
    }
    if (end != null) {
      // start = start ? moment(start).format('DD/MM/YYYY') : null;
      end = end ? moment(end).format('DD/MM/YYYY') : null;
    }
    this.warehouseService.GetAllWarehouse().subscribe(result => {

      this.WarehouseList = result;
    })

    if (OfferOn == undefined || OfferOn == null) {
      OfferOn = 'ItemPost';
    }
    if (WarehouseId == undefined || WarehouseId == "" || start == undefined || start == null || end == undefined || end == null) {
      if (WarehouseId == undefined || WarehouseId == "") {
        WarehouseId = 0;
      }
      if (start == undefined || start == null) {
        start = '';
      }
      if (end == undefined || end == null) {
        end = '';
      }



      // OfferOn = 'ItemPost';
      this.blocked = true;
      var dataToPost = {
        warehouseid: WarehouseId,
        start: start,
        end: end,
        offerOn: OfferOn
      }
      this.OfferService.getOfferList(dataToPost.warehouseid, dataToPost.start, dataToPost.end, dataToPost.offerOn).subscribe(result => {

        this.blocked = false;
        this.offerlist = result;
        console.log('offerlist:', this.offerlist);
        for (var i in this.WarehouseList) {
          for (var j in this.offerlist) {
            if (this.offerlist[j].WarehouseId == this.WarehouseList[i].WarehouseId) {
              this.offerlist[j].WarehouseName = this.WarehouseList[i].WarehouseName;
            }
          }
        }
        console.log(' this.offerlist: ', this.offerlist);
      });
    }
    //   else
    //   {
    //     if(start != null )
    // {
    //   start = start ? moment(start).format('DD/MM/YYYY') : null;
    //   // end = end ? moment(end).format('DD/MM/YYYY') : null;
    // }
    // if(end != null )
    // {
    //   // start = start ? moment(start).format('DD/MM/YYYY') : null;
    //   end = end ? moment(end).format('DD/MM/YYYY') : null;
    // }
    //     var dataToPost = {
    //       warehouseid : WarehouseId,
    //       start : start,
    //       end : end,
    //       offerOn : OfferOn
    //     }
    //     this.blocked = true;
    //     this.OfferService.getOfferList(dataToPost.warehouseid,dataToPost.start,dataToPost.end,dataToPost.offerOn).subscribe(result => {
    //       this.blocked = false;
    //       this.offerlist = result;
    //       for(var i in this.WarehouseList)
    //       {
    //         for(var j in this.offerlist)
    //         {
    //           if(this.offerlist[j].WarehouseId == this.WarehouseList[i].WarehouseId)
    //           {
    //             this.offerlist[j].WarehouseName = this.WarehouseList[i].WarehouseName;
    //           }
    //         }
    //       }
    //       console.log(' this.offerlist: ', this.offerlist);
    //     });
    //   }      
  }


  addOffer() {
    this.router.navigateByUrl("/layout/DistributerOffer/AddDistributerOffer");
  }

  openDetails(d, e) {

    if (this.OfferOn == 'ItemMarkDown') {

      this.OfferService.GEtOview(d.offerId, d.BillDiscountType).subscribe(result => {
        console.log('getoverview', result);
        this.selectedName = result[0];
        this.selectedRowDetails = d;
        console.log('selectedRowDetailss', this.selectedRowDetails);


      });
    }
    else {


      this.selectedRowDetails = d;
    }
    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }
    this.selectedRow = e;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
    }
    console.log(this.selectedRow);
    this.isDetails = true;
  }

  isDetailsFalse(isDetails: boolean) {
    this.isDetails = isDetails;
    if(this.selectedRow.path){
      this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
    }
  }

  onTabChange(event) {
    // this.showCoupon = false;

    if (event.index == 0) {
      this.OfferOn = 'ItemPost'
      this.onSearch(this.WarehouseId, this.start, this.end, this.OfferOn);
    } else if (event.index == 1) {
      this.OfferOn = 'Slab'
      this.onSearch(this.WarehouseId, this.start, this.end, this.OfferOn);
    }
    else if (event.index == 2) {
      this.OfferOn = 'ItemMarkDown'
      this.onSearch(this.WarehouseId, this.start, this.end, this.OfferOn);
    }
  }


  Offerfilter(event) {

    let term = event.target.value
    console.log(term);
    var a = this.offerlist;
    if (term.length > 3) {
      this.offerlist = this.offerlist.filter(x => x.OfferName == term || x.itemname == term || x.OfferOn == term || x.FreeOfferType == term)
      if (this.offerlist.length == 0) {
        this.offerlist = a;
        if (this.offerlist.length == 0) {
          this.onSearch(this.WarehouseId, this.start, this.end, this.OfferOn)
        }
      }
    } else {
      this.onSearch(this.WarehouseId, this.start, this.end, this.OfferOn)
    }
  }

}

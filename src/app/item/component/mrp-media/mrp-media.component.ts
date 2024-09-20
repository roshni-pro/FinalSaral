import { Component, Input, OnInit } from '@angular/core';
import { LiveItemPageService } from 'app/item/services/live-item-page.service';
import { ItemService } from 'app/shared/services/item.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { environment } from 'environments/environment';

// import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-mrp-media',
  templateUrl: './mrp-media.component.html',
  styleUrls: ['./mrp-media.component.scss']
})
export class MrpMediaComponent implements OnInit {

  @Input() warehouseId: any;
  @Input() itemnumber: any;
  @Input() details: any;
  mrpMedia: any;
  selectedmrpMedia: any[] = [];
  item: any;
  // blocked : boolean = false;
  mediaURL: string = '';
  constructor(private service: LiveItemPageService, private supplier: SupplierService, private itemService: ItemService) {
    this.mediaURL = 'https://uat.shopkirana.in/../../';
  }

  async ngOnInit() {
    await this.getSupplierList();
    this.GetMRPMediaList();
    console.log(this.details);
    this.item = this.details;
    console.log(this.item);
    this.getBuyerList();
  }

  dummyDepoId:any
  GetMRPMediaList() {
    this.dummyDepoId=null
    this.service.GetMRPMediaList(this.itemnumber, this.warehouseId).subscribe(res => {
      console.log(res);
      this.mrpMedia = res;
      debugger
      this.itemNumber = this.mrpMedia[0].ItemNumber;
      this.mrpMedia && this.mrpMedia[0].SupplierId ? this.SelectedSupplier = this.supplierList.find((p: any) => p.SupplierId === this.mrpMedia[0].SupplierId):null;
      if(this.mrpMedia && this.mrpMedia[0].BuyerId){
        this.SelectedBuyer= this.buyerList.find((p: any) => p.PeopleID === this.mrpMedia[0].BuyerId)
         
        }
      if(this.mrpMedia && this.mrpMedia[0].DepoId){
        this.dummyDepoId=this.mrpMedia[0].DepoId
        this.getDepotDetails()
      } 

       
    });
  }

  saveAddItem() {
    debugger
    console.log(this.selectedmrpMedia);
    this.selectedmrpMedia.forEach(x => {
      x.IsActive = x.active == null ? false : x.active,
        x.LimitQty = x.ItemLimitQty
    })
    if (this.selectedmrpMedia.length > 0 &&
      this.SelectedDepo.DepoId > 0 &&
      this.SelectedSupplier.SupplierId > 0 &&
      this.SelectedBuyer.PeopleID > 0) {

      this.selectedmrpMedia.forEach(element => {
        element.DepoId = this.SelectedDepo.DepoId;
        element.SupplierId = this.SelectedSupplier.SupplierId;
        element.BuyerId = this.SelectedBuyer.PeopleID;
      });
      this.blocked = true;
      debugger
      console.log(this.selectedmrpMedia);
      this.service.AddUpdateConsumerItem(this.selectedmrpMedia).subscribe(res => {
        console.log(res);
        this.blocked = false;
        this.GetMRPMediaList();
        this.selectedmrpMedia = [];
        // this.messageService.add({ severity: 'success', summary: res.message, detail: '' });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      })
    }
    else {
      if (!(this.SelectedSupplier.SupplierId > 0)) {
        alert('Please Select Supplier')
      }
      else if (!(this.SelectedDepo.DepoId > 0)) {
        alert('Please Select Depo')
      }
      else if (!(this.SelectedBuyer.PeopleID > 0)) {
        alert('Please Select Buyer')
      }
    }
  }


  onCheckboxChange(e: any, item: any) {
    if (e.checked) {
      this.selectedmrpMedia.push(item);
    } else {
      this.selectedmrpMedia = this.selectedmrpMedia.filter(i => i.ItemId !== item.ItemId);
    }
  }

  SelectedDepo: any = { DepoId: '' };
  SelectedSupplier: any = { SupplierId: '' };
  SelectedBuyer: any = { PeopleID: '' };
  itemNumber: any = '';

  blocked: boolean = false;
  onKeyPress(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value + event.key);

    if (event.key === 'Enter') {
      this.saveAddItem();
      event.preventDefault(); // Prevent form submission or any default behavior
    } else if (event.key === '-' || value <= 0) {
      event.preventDefault(); // Prevent entering negative or zero values
    }
  }


  depotList: any;
  getDepotDetails() {
    // console.log(this.SupplierId);
    this.supplier.getDepot(this.SelectedSupplier.SupplierId).subscribe(result => {
      this.depotList = result;
      // if (this.details.DepoId) {
      //   this.SelectedDepo.DepoId = this.details.DepoId;
      // }
      debugger
      console.log(this.depotList);
      if(this.dummyDepoId){
        this.dummyDepoId && this.dummyDepoId>0 ? this.SelectedDepo = this.depotList.find((p: any) => p.DepoId === this.dummyDepoId):null;

      }
    })
  }


  supplierList: any;
  buyerList: any;
  async getSupplierList() {
    let result = await this.supplier.getSupplierList().toPromise();
    if (result) {
      console.log(this.supplierList);
      this.supplierList = result;
      // this.SelectedSupplier.SupplierId = this.details.SupplierId;
      // if (this.SelectedSupplier.SupplierId) {
      //   this.getDepotDetails();
      // }
    }
  }

  getBuyerList() {
    // this.blocked = true;
    this.itemService.GetBuyer().subscribe(result => {
      // this.blocked = false;
      this.buyerList = result;
      // this.SelectedBuyer.PeopleID = this.details.BuyerId;
    })
  }
}

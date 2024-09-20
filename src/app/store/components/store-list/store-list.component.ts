import { Component, Input, OnInit } from '@angular/core';
import { StoreViewModel } from 'app/store/interfaces/store';
import { StoreBrandDc } from 'app/store/interfaces/store-brand-dc';
import { StoreService } from 'app/store/services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  @Input() storeId: number;
  isEditing: boolean;
  storeList: StoreViewModel[];
  selectedStoreBrandList: StoreBrandDc[];
  selectedStore: StoreViewModel;
  columnList: any[];
  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getColumns();
    this.isEditing = false;
    this.storeService.getStoreList().subscribe(x => {
      this.storeList = x;
    });
  }

  addNewStore() {
    this.storeId = 0;
    this.isEditing = true;
  }

  onClosePopup() {
    this.storeId = null;
    this.isEditing = false;
  }

  onSelectStore(store: StoreViewModel) {
    
    console.log('store: ', store);
    this.selectedStore = store;
    this.storeService.getBrandUsingStoreId(store.Id).subscribe(x => {
      console.log('x: ', x);
      this.selectedStoreBrandList = x;
    })
  }

  editStore(store: StoreViewModel) {
    this.storeId = store.Id;
    this.isEditing = true;
  }

  onUpdateStore(){
    this.isEditing = false;
    this.storeList = null;
    this.storeService.getStoreList().subscribe(x => {
      this.storeList = x;
    });
  }

  private getColumns(){
    this.columnList = [
      { field: 'CategoryName', header: 'Category' },
      { field: 'SubCategoryName', header: 'Sub-Category' },
      { field: 'SubsubcategoryName', header: 'Brand' }
    ]
  }
}

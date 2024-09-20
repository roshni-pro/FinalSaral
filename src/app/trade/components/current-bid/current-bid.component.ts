import { Component, OnInit } from '@angular/core';
import { BidService } from 'app/shared/services/bid.service';
import { PaginatorViewModel } from 'app/shared/interface/paginator-view-model';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-current-bid',
  templateUrl: './current-bid.component.html',
  styleUrls: ['./current-bid.component.scss']
})
export class CurrentBidComponent implements OnInit {
  paginatorViewModel: PaginatorViewModel;
  bidList: any[];
  totalRecords: number;
  rows: number;
  isLoading: boolean;
  constructor(private bidService: BidService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }
  isOpenPopup: boolean;
  isDeletePoPuP: boolean;
  popUpData: any;
  ApiResponse: any;
  blocked: boolean;

  ngOnInit() {
    this.rows = 25;
    this.paginatorViewModel = {
      Keyword: '',
      Skip: 0,
      Take: this.rows
    };

  }

  loadBids(event) {
    this.paginatorViewModel.Skip = event.first;
    this.paginatorViewModel.Take = event.rows;
    this.getData();
  }

  search() {
    this.paginatorViewModel.Skip = 0;
    this.paginatorViewModel.Take = this.rows;
    this.getData();
  }

  private getData() {
    this.isLoading = true;
    this.bidList = null;
    this.bidService.getItemPaginatorAsync(this.paginatorViewModel).subscribe(result => {
      this.bidList = result.ViewModel;
      console.log(' this.bidList :', this.bidList);
      this.totalRecords = result.Count;
      this.isLoading = false;
    });
  }



  Edit(bid) {
    
    console.log("pageData dfg dfg", bid);
    this.popUpData = bid;

    this.isOpenPopup = true;
  }

  save(popUpData) {
    console.log("popUpDatapopUpDatapopUpData dfg dfg", popUpData);
    this.bidService.UpdateBidUI(popUpData).subscribe(result => {
      this.ApiResponse = result;
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Bid Updated Successfully!!!' });

      this.isOpenPopup = false;
      this.getData()
    });
  }

  Delete(popUpData) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        this.bidService.InactiveAsyncA7UI(popUpData).subscribe(result => {
          this.ApiResponse = result;
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Bid Deleted Successfully!!!' });
          this.getData()
        });
      }
    });
  }
}


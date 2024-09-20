import { Component, OnInit, Input } from '@angular/core';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import { StockHistoryPageFilter, StockHistoryList, ExportStockHistoryList } from 'app/VirtualStockManagement/Interfaces/stock-history-page-filter';
import { StockHistoryService } from 'app/VirtualStockManagement/Services/stock-history.service';

@Component({
  selector: 'app-stock-history-partial',
  templateUrl: './stock-history-partial.component.html',
  styleUrls: ['./stock-history-partial.component.scss']
})
export class StockHistoryPartialComponent implements OnInit {
  @Input('filter') filter: StockHistoryPageFilter;
  stockHistory: StockHistoryList;
  exportStockHistory:ExportStockHistoryList
  isLoading: boolean;
  constructor(private stockHistoryService: StockHistoryService, private exportService: ExportServiceService) { }

  ngOnInit() {

    this.stockHistory = {
      PageList: null,
      TotalRecords: 0,
      StockHistoryData : null
    }
  }

  loadData(event) {
    console.log('load event is: ', event);
    this.filter.Skip = event.first;
    this.filter.Take = event.rows;
    this.isLoading = true;
    this.stockHistoryService.getStockList(this.filter).subscribe(x => {
      this.stockHistory = x;
      setTimeout(() => {
        this.isLoading = false;
      }, 100);

      console.log('this.stockHistoryList: ', this.stockHistory);
    });
  }

  Export() {
    this.filter.Skip = 0;
    this.filter.Take =this.stockHistory.TotalRecords;
    this.isLoading = true;
    this.stockHistoryService.getStockList(this.filter).subscribe(x => {
      this.exportStockHistory = x;
      if(this.exportStockHistory.PageList.length>0){
        this.exportService.exportAsExcelFile( this.exportStockHistory.PageList, 'stock history');
      }else{
        alert("List is Empty");
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
    });
    
  }

}

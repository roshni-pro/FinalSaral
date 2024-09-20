import { Component, OnInit } from '@angular/core';
import { DigitalSaleService } from 'app/shared/services/digital-sale.service';

@Component({
  selector: 'app-subcategory-target',
  templateUrl: './subcategory-target.component.html',
  styleUrls: ['./subcategory-target.component.scss']
})
export class SubcategoryTargetComponent implements OnInit 
{

  SubcategoryTargetList: any[];
  cols: any[];

    first = 0;

    rows = 10;

  constructor(    private digitalsaleService: DigitalSaleService 
    ) { }

  ngOnInit() 
  {
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }]

    this.digitalsaleService.GetAllSubcategoryTarget().subscribe(x => {
      this.SubcategoryTargetList = x;
    })
  }
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.first === (this.SubcategoryTargetList.length - this.rows);
}

isFirstPage(): boolean {
    return this.first === 0;
}

  

}

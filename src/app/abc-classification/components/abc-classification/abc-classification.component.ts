import { Component, OnInit } from '@angular/core';
import { CityService } from 'app/shared/services/city.service';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { ClusterService } from 'app/shared/services/cluster.service';
import { AbcclassificationService } from 'app/abc-classification/Services/abcclassification.service';
import { SelectItem } from 'primeng/api';
import { ExportServiceService } from 'app/shared/services/export-service.service';

@Component({
  selector: 'app-abc-classification',
  templateUrl: './abc-classification.component.html',
  styleUrls: ['./abc-classification.component.scss']
})
export class ABCClassificationComponent implements OnInit {
  cityList : any;
  warehouseList :any;
  CityId : any;
  WarehouseId : any;
  // categories : any;
  AbcClassificationReport : any;
  isInvalid : boolean;
  blocked : boolean;
  // categories: string[] = [];
  categories: any[];
  Status: any[];
  exportData: any[];
  catList : any[];

  constructor(private cityService : CityService, private warehouseService : WarehouseService,private exportService: ExportServiceService,
    private clusterservice : ClusterService,private abcclassificationService : AbcclassificationService) { 
      this.Status = [
        {label: 'A1', value: 'A1'},
        {label: 'A2', value: 'A2'},
        {label: 'A3', value: 'A3'},
        {label: 'A4', value: 'A4'},
        {label: 'A5', value: 'A5'},
        {label: 'B1', value: 'B1'},
        {label: 'B2', value: 'B2'},
        {label: 'B3', value: 'B3'},
        {label: 'B4', value: 'B4'},
        {label: 'C', value: 'C'},
    ];
      this.categories = this.Status;
    }

  ngOnInit() {
    this.CityId = "";
    this.WarehouseId = "";
    this.Status = [
      {label: 'A1', value: 'A1'},
      {label: 'A2', value: 'A2'},
      {label: 'A3', value: 'A3'},
      {label: 'A4', value: 'A4'},
      {label: 'A5', value: 'A5'},
      {label: 'B1', value: 'B1'},
      {label: 'B2', value: 'B2'},
      {label: 'B3', value: 'B3'},
      {label: 'B4', value: 'B4'},
      {label: 'C', value: 'C'},
  ];
    this.cityService.GetActiveCity().subscribe(result => {
      
      this.cityList = result;
    })
  }

  onsearch(searchdata) {
    this.clusterservice.GetWarehouseByCity(searchdata).subscribe(result => {
      this.warehouseList = result;
    })
  }

  filter(abcclassificationForm,CiytId,WarehouseId,categories)
  {
  
  let cat = [];
  for(var i in categories)
  {
    cat.push(categories[i].value)
  }
  

    if (abcclassificationForm.form.status == "VALID") {
      this.blocked = true;
    this.abcclassificationService.getAbcClassificationReport(CiytId,WarehouseId,cat).subscribe(result => {
      this.blocked = false;
      this.AbcClassificationReport = result;
      this.exportData = result;
    })
  }
  else{
    this.isInvalid = true;
  }
  }

  ExportReport()
  {
    this.exportService.exportAsExcelFile(this.exportData, 'exportABC Classification');
  }
}

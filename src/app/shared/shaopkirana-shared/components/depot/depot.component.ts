import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DepotService } from 'app/shared/services/depot.service';


@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class DepotComponent implements OnInit {
  @Input() supplierId: any;
  isForm : boolean;
  selectedDepotId: any;
  depoBySupplierList: any[];
  fieldsOnExpand: any[] = ["CompanyId","Address","CityName","CreatedBy","CreatedDate","DepoId","DepoCodes","DepoName","SupplierName","SupplierCode","StateName","UpdatedDate","PhoneNumber","ContactPerson"];
  cols : any[];
  constructor(private depotservice : DepotService) { }

  ngOnInit() {
    this.isForm = false;
    this.cols = [
      { field: 'DepoId', header: 'Depot ID' },
      { field: 'DepoName', header: 'Depot Name' },
      { field: 'SupplierName', header: 'Supplier Name' },
      { field: 'PhoneNumber', header: 'Phone Number' },
      { field: 'GSTin', header: 'GST No.' },
      { field: 'IsActive', header: 'Activation' }
  ];
    if(this.supplierId !=null){
      this.depotservice.GetDepotBySupplierId(this.supplierId).subscribe(result=>{
        this.depoBySupplierList = result;
        console.log(this.depoBySupplierList);
      });
    }
    
  }

  openAddForm(){
    this.isForm = true;
    console.log("lol");
    this.selectedDepotId = null;
  }

  openEditForm(selectedDepot){
    this.isForm = true;
    this.selectedDepotId = selectedDepot.DepoId;    
  }
  closeForm(){
    this.isForm = false;
  }

}

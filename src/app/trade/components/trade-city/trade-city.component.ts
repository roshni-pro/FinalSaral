import { Component, OnInit } from '@angular/core';
import { ItemService } from 'app/shared/services/item.service';
import { TradeitemmasterService } from 'app/shared/services/tradeitemmaster.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-trade-city',
  templateUrl: './trade-city.component.html',
  styleUrls: ['./trade-city.component.scss']
})
export class TradeCityComponent implements OnInit {
  cityList:any[];
  IsActive:boolean;
  blocked:boolean;
  constructor(private ItemServices : TradeitemmasterService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.ItemServices.GetAllCity().subscribe(result => {
      this.cityList = result;   
    });
  }
  activeCity(pageData)
  {
    console.log("PopupList", pageData);  
    this.confirmationService.confirm({
      message: 'Are you sure.You want to change Status for given City? because,it is a way to directly connecting  with End users.Creator is only responsible for this. Please make sure all the details added by you are correct and verified !!',
      accept: () => {
        this.ItemServices.UpdateCityList(pageData).subscribe(result => {
          if (result == false) {
            this.blocked = false;
            this.messageService.add({ severity: 'error', summary: 'city is already Activeted !!', detail: '' });
            setTimeout(() => {
              window.location.reload();
            }, 4000);

          } else {
            this.messageService.add({ severity: 'success', summary: 'City Update Successfully!', detail: '' });          
            this.ngOnInit();
          }
        })
      },
      reject: () => {     
         // window.location.reload();      
         this.ngOnInit();  
      
      }
    });
  }

}

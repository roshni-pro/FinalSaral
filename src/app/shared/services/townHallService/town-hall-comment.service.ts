import { Injectable } from '@angular/core';
import { TownHallCommentsSection } from '../../interface/townHall/town-hall-comments-section';
@Injectable({
  providedIn: 'root'
})
export class TownHallCommentService {

  constructor() { }

  getEmptyCommentObject(): TownHallCommentsSection {
    let townHallCommentsSection: TownHallCommentsSection = {
      Id: null,
      Month: (new Date()).getMonth(),
      Year: (new Date()).getFullYear(),
      TownHallKppComments: { ActiveCluster: '', ActiveKPP: '', AgentKPP: '' },
      TownHallCustomerDelightComments: { ActiveVerifiedStores: '', CRMLevel: '', DPAdded: '' },
      TownHallPurchaseComments: { FillRateAnalysis: '', InventoryDays: '' },
      TownHallSourcingComments: { ActiveBrandsAndVendors: '', ActiveItems: '', ActiveItemsKissanKirana: '' },
      TownHallOperationComments: { CancelOrder: '', TurnAroundTime: '' },
      TownHallSalesComments: { TotalSales: '', OnlineSales: '', KisanKiranaSales: '', OrderAndKisanKiranaRetailers: '', TotalOrders: '', TotalBrands: '' }
    };
    return townHallCommentsSection;
  }
}

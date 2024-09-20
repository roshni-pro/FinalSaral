import { TownHallKppComments } from './town-hall-kpp-comments';
import { TownHallCustomerDelightComments } from './town-hall-customer-delight-comments';
import { TownHallPurchaseComments } from './town-hall-purchase-comments';
import { TownHallSourcingComments } from './town-hall-sourcing-comments';
import { TownHallOperationComments } from './town-hall-operation-comments';
import { TownHallSalesComments } from './town-hall-sales-comments';

export interface TownHallCommentsSection {
    Id: any;
    Year: number;
    Month: number;
    TownHallKppComments: TownHallKppComments; 
    TownHallCustomerDelightComments: TownHallCustomerDelightComments;
    TownHallPurchaseComments: TownHallPurchaseComments;
    TownHallSourcingComments: TownHallSourcingComments;
    TownHallOperationComments: TownHallOperationComments;
    TownHallSalesComments: TownHallSalesComments;
}

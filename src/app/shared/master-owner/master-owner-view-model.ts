import { Master } from './master';
import { MasterOwners } from './master-owners';

export interface MasterOwnerViewModel {
    MasterObject: Master;  
    MasterOwnerList: MasterOwners[]; 
}

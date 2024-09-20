import { LedgerConfigurationDetailsVM } from './ledger-configuration-details-vm';
import { LedgerConfigurationMasterConditionVM } from './ledger-configuration-master-condition-vm';

export interface LedgerConfigurationMasterVM {
    Id: number;
    Name: string;
    Code: string;
    Action: string;
    EntityName: string;
    IsPublished: boolean;
    ledgerConfigurationMasterConditions: LedgerConfigurationMasterConditionVM[];
    ledgerConfigurationDetails: LedgerConfigurationDetailsVM[];
}

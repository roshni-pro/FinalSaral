export interface LedgerConfigurationMasterConditionVM
{
    Id: number;
    LedgerConfigurationMasterId: number;
    PropertyName: string;
    PropertyType: string;
    OldValue: string;
    NewValue: string;
    OtherValue: string;
    Operator: string;    // EqualTo  LessThanEqualTo  GreaterThanEqualTo  LessThan  GreaterThan
    MergeOperator: string;
    IsOtherValue: boolean;
    IsOldValueAnything: boolean;
    IsActive:boolean;
    CreatedBy:number;
}

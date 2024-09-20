export interface CustomerRetention 
{
    CustomerType: string;
    CustomerRetentionConfigDetails: CustomerRetentionConfigDetails[];
}

export interface CustomerRetentionConfigDetails  
{
    Id: number;
    Day: number;
    Type: number;
    WalletPoint: number;
    CustomerRetentionConfigurationId: number;     
    RetentionMessageDetails: RetentionMessageDetails[];
}

export interface RetentionMessageDetails
{
    Id: number;
    StartTime: string;
    Message: string;
}

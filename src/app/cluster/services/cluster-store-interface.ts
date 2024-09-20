export class clusterStoreInterface {
    ClusterId: number;
    StoreId: number;
    CustomerId: number;
    Name: string;
    StoreName: string;
    ClusterName: string;
    Skcode: string;
    SchedulerType: number;
    SkipWeeks: number;
    BeatSchedulers: [{
        Day: number,
        Priority: number,
        ClusterStoreBeatMappingId: number
    }];
    IsActive: boolean;
    IsDeleted: boolean
}
import { ANScheduleMaster } from './anschedule-master';
import { ANFrequencyMaster } from './anfrequency-master';
import { AutoNotificationCondition } from './auto-notification-condition';

export interface AutoNotification
    {
        Id: number;
        CityId: number | '' | null;
        WarehouseId: number | '' | null;
        ClusterId: number | '' | null;
        ANType: string;//Promotional/Event
        ANEventType: string;//Schedule/Transaction
        ANScheduleMasterId: number | null;
        ANFrequencyMasterId: number | null;
        DbObjectName: string;
        EntityName: string;

        StartDate: Date | string;
        EndDate: Date | string | null;

        RecurEvery: number | null;

        IsPublish: boolean;
        PublishBy: number | null;
        PublishDate: Date | string | null;

        TextMessage: string;

        TextNotification: string;

        AutoDialAudioFile: string;

        AutoDialUrl: string;

        AutoDialAudioText: string;

        SqlQuery: string;       
        CreatedDate: Date | string;
        ModifiedDate: Date | string | null;
        IsActive: boolean;
        IsDeleted: boolean;
        CreatedBy: number;
        ModifiedBy: number | null;
        EntityAction: string;
        ANScheduleMaster: ANScheduleMaster;
        ANFrequencyMaster: ANFrequencyMaster;
        
        AutoNotificationConditions: AutoNotificationCondition[];


        IsSupplierNotification: boolean|null;
        IsCustomerNotification: boolean|null;
        IsPeopleNotification: boolean|null;
        FCMNotification: string;
        AutoNotificationTitle: string;
        ClassName: string;
    }
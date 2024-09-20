import { AutoNotification } from './auto-notification';
import { OperatorMaster } from './operator-master';

export interface AutoNotificationCondition {
    AutoNotificationId: number;
    FieldName: string;
    DbObjectFieldName: string;
    FieldType: string;
    OperatorSign: string;
    Value1: string;
    Value2: string;
    SqlQuery: string;
    AutoNotification: AutoNotification;
    Id: number;

    //client side list
    operatorMasterList:OperatorMaster[];
}
import { OperatorFieldMapping } from './operator-field-mapping';

export interface OperatorMaster {
    OperatorName: string;
    OperatorSign: string;
    OperatorFieldMappings: OperatorFieldMapping[];
}

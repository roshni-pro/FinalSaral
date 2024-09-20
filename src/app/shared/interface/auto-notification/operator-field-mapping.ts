import { FieldTypeMaster } from './field-type-master';
import { OperatorMaster } from './operator-master';

export interface OperatorFieldMapping {
    FieldTypeId: number;
    OperatorMasterId: number;
    FieldTypeMaster: FieldTypeMaster;
    OperatorMaster: OperatorMaster;
}

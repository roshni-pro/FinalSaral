export interface ANFieldMaster {
    Id: number | null;
    ANEntityMasterId: number;
    FieldName: string;
    DbObjectFieldName: string;
    FieldType: string;
    SqlQuery: string;
}

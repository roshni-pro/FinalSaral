export interface Ladger {
    ID?: number;
    Name: string;
    Alias: string;
    GroupID: number;
    InventoryValuesAreAffected: boolean | null;
    Address: string | null;
    Country: string | null;
    PinCode: number | null;
    ProvidedBankDetails: boolean | null;
    PAN: string | null;
    RegistrationType: string | null;
    GSTno: string | null;
    Active: boolean
}

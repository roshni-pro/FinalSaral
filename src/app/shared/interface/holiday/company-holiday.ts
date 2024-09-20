export interface CompanyHoliday {
    ID: number;
    HolidayName: string;
    start: Date | null;
    end: Date | null;
    CreatedDate: Date | null;
    UpdatedDate: Date | null;
    WarehouseID: number | null;
    CityID: number | null;
}
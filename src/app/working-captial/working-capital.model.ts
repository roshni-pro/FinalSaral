export class WcDays {
    date : Date;
    IsHoliday: boolean;

    constructor(data?) {
            data && data.date ? this.date = new Date(data.date) : new Date();
            data && data.IsHoliday ? this.IsHoliday = data.IsHoliday : false;

    }
}
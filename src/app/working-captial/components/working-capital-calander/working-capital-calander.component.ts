import { WorkingCapitalService } from 'app/shared/services/working-capital.service';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { HolidayService } from 'app/shared/services/holiday/holiday.service';
import { CompanyHoliday } from 'app/shared/interface/holiday/company-holiday';
import { MessageService, ConfirmationService } from 'primeng/api';
import * as moment from 'moment';
import { WarehouseService } from 'app/shared/services/warehouse.service';
import { WcDays } from 'app/shared/interface/wcdays';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-working-capital-calander',
  templateUrl: './working-capital-calander.component.html',
  styleUrls: ['./working-capital-calander.component.scss']
})
export class WorkingCapitalCalanderComponent {

  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  @ViewChild('modalContent', { static: false }) modalContent: TemplateRef<any>;
  view: string = 'month';
  newEvent: any;
  viewDate: Date = new Date();
  CompanyHoliday: CompanyHoliday;
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  selectedCityList: any[];
  selectedWarehouseList: any[];
  isOpenPopup: boolean;
  isEdit: boolean;
  workingCapitalCalander: WcDays;
  currentEvent = { date: new Date(), IsHoliday: false };
  holidayList = [];
  selecteddatemsg = ''

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editHoliday(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('deleting event isL ', event);
        this.confirmationService.confirm({
          message: 'Are you sure that you want to Delete the Data?',
          accept: () => {
            this.holidayService.DeleteHoliday(Number(event.id)).subscribe(x => {
              this.HolidayList = this.HolidayList.filter(x => { return x.ID != event.id });
              this.convertToEventList();
            });
            this.messageService.add({ severity: 'success', summary: 'Deleted Successfully!', detail: '' });
          }
        });
      }
    }
  ];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  HolidayList: CompanyHoliday[];
  isInvalid: any;

  warehouseList: any[];
  cityList: any[];

  Holiday: any;
  blocked: boolean;
  constructor(private holidayService: HolidayService, private modal: NgbModal
    , private messageService: MessageService, private router: Router
    , private confirmationService: ConfirmationService, private warehouseService: WarehouseService, private workingcapitalservice: WorkingCapitalService) {
    let wcDays = [];
    //wcDays.push({date : new Date(), IsHoliday  : false});
    this.workingCapitalCalander = { Year: new Date().getFullYear(), Month: new Date().getMonth(), DaysList: wcDays };

    let dt = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    this.workingCapitalCalander.Year = new Date().getFullYear();
    this.workingCapitalCalander.Month = new Date().getMonth();
    for (let i = 0; i < new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(); i++) {
      this.workingCapitalCalander.DaysList.push({ date: this.addDays(new Date(new Date().getFullYear(), new Date().getMonth(), 1), i), IsHoliday: false });
    }
  }

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


  ngOnInit() {
    this.isEdit = false;
    this.isOpenPopup = false;
    this.blocked = true;
    this.holidayService.getholiday().subscribe(result => {
      this.HolidayList = result;
      this.Holiday = this.HolidayList;
      console.log('hOLIDAYlIST::', this.HolidayList);
      this.getCity();
      // for(var i in this.Holiday){
      //   this.Holiday[i].start = this.Holiday[i].start ? moment(this.Holiday[i].start).format('DD/MM/YYYY') : null     
      //   }
      this.blocked = false;
      this.convertToEventList();
      console.log('this. events: ', this.events);
      console.log('this.HolidayList: ', this.HolidayList);
    })
    let data = { currentYear: new Date().getFullYear(), currentMonth: new Date().getMonth() }
    this.workingcapitalservice.getWorkingCapitalCalender(data).subscribe(capitalCalender => {
      this.workingCapitalCalander.DaysList = capitalCalender.DaysList;
      
      this.holidayList = this.workingCapitalCalander.DaysList.filter(wkC => wkC.IsHoliday == true && (capitalCalender.Month == new Date(wkC.date).getMonth()));
    });

  }

  getWorkingCapitalCalender(viewDate) {
    
    let data = { currentYear: new Date(viewDate).getFullYear(), currentMonth: new Date(viewDate).getMonth() }
    this.workingcapitalservice.getWorkingCapitalCalender(data).subscribe(capitalCalender => {
      capitalCalender && capitalCalender.DaysList && capitalCalender.DaysList.length ? this.workingCapitalCalander.DaysList = capitalCalender.DaysList : '';
      
      this.holidayList = capitalCalender && capitalCalender.DaysList && capitalCalender.DaysList.length &&
        capitalCalender.DaysList.filter(wkC => wkC.IsHoliday == true && (capitalCalender.Month == new Date(wkC.date).getMonth())) ?
        capitalCalender.DaysList.filter(wkC => wkC.IsHoliday == true && (capitalCalender.Month == new Date(wkC.date).getMonth())) : [];
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    this.selecteddatemsg = '';
    this.isOpenPopup = true;
    this.newEvent = {
      id: 0,
      color: colors.red,
      allDay: true,
      start: new Date(date),
      end: new (Date),
      WarehouseID: null,
      CityID: null,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      title: '',
      actions: this.actions
    }

    this.currentEvent = { date: new Date(date), IsHoliday: true };
    //  this.newEvent.start = new Date(date);

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {

    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.selectedCityList = [];
    this.selectedWarehouseList = [];
    this.isEdit = false;
    this.isOpenPopup = true;

    this.newEvent = {
      id: 0,
      color: colors.red,
      allDay: true,
      start: new (Date),
      end: new (Date),
      WarehouseID: null,
      CityID: null,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      title: '',
      actions: this.actions
    }
  }



  save(currentEvent, form) {
    if (new Date().getMonth() == currentEvent.date.getMonth()) {
      // this.workingCapitalCalander.WcDaysList.splice(1, 1);
      let alreadyExists = this.workingCapitalCalander.DaysList.filter(day => currentEvent.date == day.date) &&
        this.workingCapitalCalander.DaysList.filter(day => new Date(currentEvent.date) == new Date(day.date))[0] ? true : false;
      // this.workingCapitalCalander.WcDaysList.push({date : new Date(currentEvent.date), IsHoliday  : true});
      this.isOpenPopup = false;
      let objectModifiedIndex = this.workingCapitalCalander.DaysList.findIndex(
        objectModified => new Date(objectModified.date).getDate() == new Date(currentEvent.date).getDate()
      );
      if (objectModifiedIndex) {
        this.workingCapitalCalander.DaysList[objectModifiedIndex] = { date: new Date(currentEvent.date), IsHoliday: true }
      }
      this.holidayList = this.workingCapitalCalander.DaysList.filter(wkC => wkC.IsHoliday == true && (this.workingCapitalCalander.Month == new Date(wkC.date).getMonth()));
    }
    else {
      this.selecteddatemsg = 'please select date from current month';
    }
  }


  saveCalender() {
    this.workingcapitalservice.SaveWCCalander(this.workingCapitalCalander).subscribe(result => {
      if (result.Id) {
        this.messageService.add({ severity: 'success', summary: 'Inserted Successfull!', detail: '' });
      }
    });
  }

  editHoliday(event: CalendarEvent) {
    this.newEvent = event;
    this.getWarehouseOnEdit(false);
    this.newEvent.start = new Date(this.newEvent.start);
    this.isEdit = true;
    this.isOpenPopup = true;
  }

  private convertToEventList() {
    this.events = [];
    if (this.HolidayList && this.HolidayList.length > 0) {
      this.HolidayList.forEach(element => {
        let evnt: any = {
          id: element.ID,
          title: element.HolidayName,
          WarehouseID: element.WarehouseID,
          CityID: element.CityID,
          start: new Date(element.start),
          end: new Date(element.end),
          color: colors.red,
          draggable: false,
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          actions: this.actions,
        }
        this.events.push(evnt);
      });
    }
  }

  private convertToEventHoliday(event: any): CompanyHoliday[] {
    // let companyHoliday: CompanyHoliday = {
    //   HolidayName: event.title,
    //   start: event.start,
    //   end: event.end,
    //   ID: Number(event.id),
    //   CreatedDate: null,
    //   UpdatedDate: null,
    //   CityID: null,
    //   WarehouseID: null
    // }
    let companyHolidayList: CompanyHoliday[] = [];
    if (this.selectedWarehouseList && this.selectedWarehouseList.length > 0) {
      this.selectedWarehouseList.forEach(wh => {
        let companyHoliday: CompanyHoliday = this.getCompanyHoliday(event);
        companyHolidayList.push(companyHoliday);
        companyHoliday.WarehouseID = wh.WarehouseId;
        companyHoliday.CityID = this.selectedCityList.filter(x => { return x.Cityid == wh.Cityid })[0].Cityid;
      });
    }

    return companyHolidayList;
  }

  getCity() {
    this.holidayService.getCityList().subscribe(x => {
      this.cityList = x;
      console.log('this.cityList : ', this.cityList);
    });
  }

  getWarehouse() {
    if (this.selectedCityList && this.selectedCityList.length > 0) {
      let commaSeperatedCityList = "";
      this.selectedCityList.forEach(x => {
        if (commaSeperatedCityList) {
          commaSeperatedCityList = commaSeperatedCityList + ',' + x.Cityid
        } else {
          commaSeperatedCityList = x.Cityid
        }
      });
      this.holidayService.GetWarehouseList(commaSeperatedCityList).subscribe(x => {
        this.warehouseList = x;
        console.log('this.warehouseList : ', this.warehouseList);
      });
    } else {
      this.warehouseList = [];
    }

  }

  getWarehouseOnEdit(isChanged: boolean) {
    let commaSeperatedCityList = this.newEvent.CityID;
    this.holidayService.GetWarehouseList(commaSeperatedCityList).subscribe(x => {
      this.warehouseList = x;
      console.log('this.warehouseList : ', this.warehouseList);
    });

    if (isChanged) {
      this.newEvent.WarehouseID = null;
    }
  }

  private convertToEventHolidayEntity(event: any): CompanyHoliday {
    let companyHoliday: CompanyHoliday = {
      HolidayName: event.title,
      start: event.start,
      end: event.end,
      ID: Number(event.id),
      CreatedDate: null,
      UpdatedDate: null,
      CityID: event.CityID,
      WarehouseID: event.WarehouseID,
    }
    return companyHoliday;
  }

  private getCompanyHoliday(event): CompanyHoliday {
    let companyHoliday: CompanyHoliday = {
      HolidayName: event.title,
      start: event.start,
      end: event.end,
      ID: Number(event.id),
      CreatedDate: null,
      UpdatedDate: null,
      CityID: null,
      WarehouseID: null
    }
    return companyHoliday;
  }

  prohibitPreviousOrNext(currentEvent) {
    if (new Date().getMonth() != currentEvent.getMonth()) {
      return true;
    }
  }
}
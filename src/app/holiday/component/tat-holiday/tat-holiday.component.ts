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
  selector: 'app-tat-holiday',
  templateUrl: './tat-holiday.component.html',
  styleUrls: ['./tat-holiday.component.scss']
})
export class TatHolidayComponent {

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

        // this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('This event is deleted!', event);
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
    , private confirmationService: ConfirmationService, private warehouseService: WarehouseService) { }
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
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  save(modalData, form) {
    let holiday: CompanyHoliday = null; 
    let holidayList = null;
    if(this.isEdit){
      holiday = this.convertToEventHolidayEntity(modalData);
    }else{
      holidayList = this.convertToEventHoliday(modalData);
    }
    
    if (form.invalid) {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    } else
      if (holiday && holiday.ID) {
        //if (holiday) {
        this.blocked = true;
        this.holidayService.EditHoliday(holiday).subscribe(result => {
          console.log(result);
          if (result) {
            this.CompanyHoliday = result;
            let addedHoliday = this.HolidayList.filter(x => { return x.ID == result.ID })[0];
            let index = this.HolidayList.indexOf(addedHoliday);
            this.HolidayList.splice(index, 1, this.CompanyHoliday);
            this.convertToEventList();
            this.isOpenPopup = false;
            this.blocked = false;
            this.messageService.add({ severity: 'success', summary: 'Updated Successfully!', detail: '' });
          } else {
            // already exists message 
            this.blocked = false;
            //this.isOpenPopup = true;
            this.messageService.add({ severity: 'error', summary: 'Data Already Exist!', detail: '' });
          }

        });
      } else {
        // this.blocked=true;
        this.holidayService.ADDholiday(holidayList).subscribe(result => {
          
          if (result) {
            
            console.log(result);
            this.CompanyHoliday = result;
            this.HolidayList.push(result);
            this.convertToEventList();
            this.isOpenPopup = false;
            // this.blocked=false;
            if(this.HolidayList != null){
            setTimeout(() => {
   

              this.messageService.add({ severity: 'success', summary: 'Added Successfully!', detail: '' });
              // this.showMap = true;
          }, 100);
        }
            //this.messageService.add({ severity: 'success', summary: 'Added Successfully!', detail: '' });
            window.location.reload();
          } else {
            // already exists message 
            this.blocked = false;
            //this.isOpenPopup = false;
            this.messageService.add({ severity: 'error', summary: 'Data Already Exist!', detail: '' });
          }
        });
      }


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

    if(isChanged){
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
}
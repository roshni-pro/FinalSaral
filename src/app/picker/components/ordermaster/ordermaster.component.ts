import { Component, OnInit } from '@angular/core';
import { EditPickerorderQty, CompletedPickerDispatch, GetItemOrdersListV2, GetItemOrdersList } from 'app/shared/interface/picker/picker';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { PickerService } from 'app/shared/services/picker/picker.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PeopleService } from 'app/shared/services/people.service';
import { ExportServiceService } from 'app/shared/services/export-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ordermaster',
  templateUrl: './ordermaster.component.html',
  styleUrls: ['./ordermaster.component.scss']
})
export class OrdermasterComponent implements OnInit {
  isSearch: boolean;
  isTable: boolean;
  warehouseList: any;
  clusterList: any;
  pickerList: any;
  dataList: any;
  blocked: boolean;
  isOpenPopupPayments: boolean;
  WarehouseId: any;
  ClusterId: any;
  getPeople: any;
  getPeoples: any;
  PeopleID: any;
  isInvalid: boolean;
  whname: any;
  data: any;
  selectedRow: any;
  isDetails: boolean;
  selectedRowDetails: any;
  DisplayName: any;
  TotalAssignmentAmount: any;
  pickerId: any;
  Isdispatch: any;
  Iscomplete: any;
  StartTime: any;
  EndTime: any;
  Data: any;
  datalist: any[];//aaaaa  
  Id: any;
  CreatedDate: any;
  CreatedBy: any;
  CreatedName: boolean;

  IsApproved: boolean;
  IsSelectOrder: any;
  exportpicker: any;
  userid: any;
  // pickerCancelOrder: boolean;
  comments: any;
  cancelOnNew: boolean = false;
  // cancelHide : boolean = false;
  // CancelBtn : boolean = false;
  picktimelist: any;
  entity: any;
  HistoryView: boolean = false;
  historyDetail: any;
  IsComplted: any;
  repicked: any;
  historyHide: boolean = false;
  term: number;
  DeliveryIssuanceId: any;
  ClusterName: any;
  DboyName: any;
  AgentName: any;
  checkerTimerList: any;
  makerTimerList: any;
  StartedTime: any;
  EndedTime: any;
  totalcount: any;
  skip: any;
  take: any;
  searchdata: any;
  whclForm: any;
  isMapped : boolean = false;
  notMapped : boolean = false;
  constructor(private pickerservice: PickerService, private messageService: MessageService,
    private peopleService: PeopleService, private confirmationService: ConfirmationService,) {
    this.IsSelectOrder = {};
    this.searchdata = {};
    // this.makerTimerList = {};
    // this.checkerTimerList = {};
    this.comments = {};
    this.entity = "OrderPickerDetails";
  }

  ngOnInit() {
    this.WarehouseId = '';
    this.ClusterId = "";
    this.IsComplted = null;
    this.pickerservice.GetAllWarehouseNew().subscribe(x => {
      this.warehouseList = x;
      this.blocked = false;
      console.log('x:', x);
    });
    this.peopleService.GetAll().subscribe(x => {
      this.getPeoples = x;
      console.log('GeTPeople:', this.getPeoples);
    });
  }
  getClusterlist(WarehouseId) {
    this.blocked = true;
    this.pickerservice.GetAllCluster(WarehouseId).subscribe(y => {
      this.clusterList = y;
      this.blocked = false;
      console.log('y:', y);
    });
  }

  load(event) {

    var Last = event.first ? event.first + event.rows : 20;
    this.skip = Last / event.rows;
    this.take = event.rows;
    this.filter(this.searchdata,0,0,false);
  }
  first : number=0;
  filter(searchdata,skip,take,status) {
   debugger
    this.first = 0;
    if(skip == 1)
    {
      this.skip = skip;
      this.take = take;
    }
    // if(WarehouseId != '' && ClusterId != '')
    // {
    //  this.IsComplted = "";
    //  IsComplted = undefined;
    // }
    if (searchdata.term == undefined && status==true) {
      if (searchdata.WarehouseId == undefined) {
        this.messageService.add({ severity: 'error', summary: 'Please Select Warehoues!', detail: '' });
        return;
      }
    }
    if (searchdata.term != undefined) {
      this.OrderIdfilter(searchdata.term);
    }
    
    if (searchdata.WarehouseId.value != "") {
      if (searchdata.ClusterId == "" || searchdata.ClusterId == undefined) {
        searchdata.ClusterId = 0;
        this.ClusterId = 0;
      }
    }
    if (searchdata.term == "" || searchdata.term == undefined) {
      searchdata.term = undefined;
    }
    // if (searchdata.IsComplted == undefined && searchdata.term == undefined) {
    //   this.blocked = true;
    //   // if (whclForm.form.status == "VALID") {
    //   this.pickerservice.ShowPickerListA7(searchdata.ClusterId, searchdata.WarehouseId, searchdata.IsComplted, this.skip, this.take).subscribe(y => {
    //     //
    //     debugger;
    //     if(!this.isMapped && !this.notMapped)
    //     {
    //     this.pickerList = y.PickerList;
    //     this.totalcount = y.Totalcount;
    //     this.exportpicker = this.pickerList;
    //     console.log('ys:', y);

    //     for (var i in this.pickerList) {
    //       this.repicked = this.pickerList[i].orderPickerDetails;
    //       if (this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 0) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'New Request';
    //       }
    //       if (this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 1) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'Cancelled';
    //       }
    //       if (this.pickerList[i].Status == 1 && this.pickerList[i].IsCanceled == 0) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'InProgress';
    //       }
    //       if (this.pickerList[i].Status == 1 && this.pickerList[i].IsCanceled == 1) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'Cancelled';
    //       }
    //       if (this.pickerList[i].Status == 2 && this.pickerList[i].IsCanceled == 0) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'Submitted';
    //       }
    //       if (this.pickerList[i].Status == 2 && this.pickerList[i].IsCanceled == 1) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'Cancelled';
    //       }
    //       if (this.pickerList[i].Status == 3 && this.pickerList[i].IsCanceled == 0) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         // this.pickerList[i].CurrentStatus = 'Dispatched';
    //         this.pickerList[i].CurrentStatus = 'Approved(RTD)';
    //       }
    //       if (this.pickerList[i].Status == 6 && this.pickerList[i].IsCanceled == 0) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         // this.pickerList[i].CurrentStatus = 'Dispatched';
    //         this.pickerList[i].CurrentStatus = 'Assignment Created';
    //       }
    //       if (this.pickerList[i].Status == 3 && this.pickerList[i].IsCanceled == 1) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'Cancelled';
    //       }
    //       if (this.pickerList[i].Status == 4) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'Cancelled';
    //       }
    //       // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1 && this.pickerList[i].IsCanceled == 0 )
    //       // {
    //       //   this.pickerList[i].CurrentStatus = 'RePicked';
    //       // }
    //       // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1  && this.pickerList[i].IsCanceled == 1 )
    //       // {
    //       //   this.pickerList[i].CurrentStatus = 'Cancelled';
    //       // }
    //       if (this.pickerList[i].Status == 5 && this.pickerList[i].IsCanceled == 0) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'RePicked';
    //       }
    //       if (this.pickerList[i].Status == 5 && this.pickerList[i].IsCanceled == 1) {
    //         for (var j in this.getPeoples) {
    //           if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
    //             this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
    //           }
    //         }
    //         this.pickerList[i].CurrentStatus = 'Cancelled';
    //       }
    //     }
    //     debugger;
    //     this.dataList = this.pickerList;
    //     if (this.pickerList.length == 0) {
    //       this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
    //     }
    //   }else{
    //     this.totalcount = null;
    //   }
    //     this.blocked = false;
    //   });
    //   // }
    //   // else {
    //   //   
    //   //   this.isInvalid = true;
    //   //   this.blocked = false;
    //   // }
    // }
    // else {
      debugger;
      if (searchdata.IsComplted == undefined) {
        searchdata.IsComplted = -1;
      }
        if (searchdata.WarehouseId.value == "") {
          this.statusfilter(searchdata.IsComplted);
        }
        else {
          this.pickerservice.getOrderPickerMasterList(searchdata.ClusterId, searchdata.WarehouseId.value, searchdata.IsComplted, this.skip, this.take).subscribe(y => {
            // 
            debugger;
            if(!this.isMapped && !this.notMapped){
            this.pickerList = y.PickerList;
            this.totalcount = y.Totalcount;
            this.exportpicker = this.pickerList;
            console.log('ys:', y);
            for (var i in this.pickerList) {
              this.repicked = this.pickerList[i].orderPickerDetails;
              if (this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 0) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'New Request';
              }
              if (this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 1) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'Rejected';
              }
              if (this.pickerList[i].Status == 1 && this.pickerList[i].IsCanceled == 0) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'InProgress';
              }
              if (this.pickerList[i].Status == 1 && this.pickerList[i].IsCanceled == 1) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'Rejected';
              }
              if (this.pickerList[i].Status == 2 && this.pickerList[i].IsCanceled == 0) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'Submitted';
              }
              if (this.pickerList[i].Status == 2 && this.pickerList[i].IsCanceled == 1) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'Rejected';
              }
              if (this.pickerList[i].Status == 3 && this.pickerList[i].IsCanceled == 0) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }

                this.pickerList[i].CurrentStatus = 'Approved';
              }
              if (this.pickerList[i].Status == 6 && this.pickerList[i].IsCanceled == 0) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }

                this.pickerList[i].CurrentStatus = 'Assignment Created';
              }
              if (this.pickerList[i].Status == 3 && this.pickerList[i].IsCanceled == 1) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'Rejected';
              }
              if (this.pickerList[i].Status == 4) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'Rejected';
              }
              // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1 && this.pickerList[i].IsCanceled == 0 )
              // {
              //   this.pickerList[i].CurrentStatus = 'RePicked';
              // }
              // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1  && this.pickerList[i].IsCanceled == 1 )
              // {
              //   this.pickerList[i].CurrentStatus = 'Cancelled';
              // }
              if (this.pickerList[i].Status == 5 && this.pickerList[i].IsCanceled == 0) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'RePicked';
              }
              if (this.pickerList[i].Status == 5 && this.pickerList[i].IsCanceled == 1) {
                for (var j in this.getPeoples) {
                  if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                    this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
                  }
                }
                this.pickerList[i].CurrentStatus = 'Rejected';
              }
            }
            debugger;
            this.dataList = this.pickerList;
            // if (searchdata.IsComplted == "All") {
            //   this.pickerList = this.dataList;
            // }
            // else {
            //   this.pickerList = this.dataList.filter(x => x.CurrentStatus.toString().toLowerCase().includes(searchdata.IsComplted.toLowerCase()));
            // }
            if (this.pickerList.length == 0) {
              this.messageService.add({ severity: 'error', summary: 'No Data Found!', detail: '' });
            }
          }else{
            this.totalcount = null;
          }
            this.blocked = false;
          });
        }
      


    // }
  }

  statusfilter(term) {
    // 
    if (this.WarehouseId == '' && this.ClusterId == '') {
      this.pickerservice.pickerListsA7().subscribe(x => {
        this.pickerList = x;
        for (var i in this.pickerList) {
          this.repicked = this.pickerList[i].orderPickerDetails;
          if (this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 0) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'New Request';
          }
          if (this.pickerList[i].Status == 0 && this.pickerList[i].IsCanceled == 1) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Rejected';
          }
          if (this.pickerList[i].Status == 1 && this.pickerList[i].IsCanceled == 0) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'InProgress';
          }
          if (this.pickerList[i].Status == 1 && this.pickerList[i].IsCanceled == 1) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Rejected';
          }
          if (this.pickerList[i].Status == 2 && this.pickerList[i].IsCanceled == 0) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Submitted';
          }
          if (this.pickerList[i].Status == 2 && this.pickerList[i].IsCanceled == 1) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Rejected';
          }
          if (this.pickerList[i].Status == 3 && this.pickerList[i].IsCanceled == 0) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            // this.pickerList[i].CurrentStatus = 'Dispatched';Assignment Created
            this.pickerList[i].CurrentStatus = 'Approved';
          }
          if (this.pickerList[i].Status == 6 && this.pickerList[i].IsCanceled == 0) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            // this.pickerList[i].CurrentStatus = 'Dispatched';Assignment Created
            this.pickerList[i].CurrentStatus = 'Assignment Created';
          }
          if (this.pickerList[i].Status == 3 && this.pickerList[i].IsCanceled == 1) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Rejected';
          }
          if (this.pickerList[i].Status == 4) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Rejected';
          }
          // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1 && this.pickerList[i].IsCanceled == 0 )
          // {
          //   this.pickerList[i].CurrentStatus = 'RePicked';
          // }
          // if(this.repicked[i].Status == 4 && this.pickerList[i].IsComplted == 1  && this.pickerList[i].IsCanceled == 1 )
          // {
          //   this.pickerList[i].CurrentStatus = 'Cancelled';
          // }
          if (this.pickerList[i].Status == 5 && this.pickerList[i].IsCanceled == 0) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'RePicked';
          }
          if (this.pickerList[i].Status == 5 && this.pickerList[i].IsCanceled == 1) {
            for (var j in this.getPeoples) {
              if (this.pickerList[i].ModifiedBy == this.getPeoples[j].PeopleID) {
                this.pickerList[i].ModifiedBy = this.getPeoples[j].DisplayName;
              }
            }
            this.pickerList[i].CurrentStatus = 'Rejected';
          }
        }
        debugger
        this.dataList = this.pickerList;

        if (term == "null") {
          this.pickerList = [];
        }
        else if (term == "All") {
          this.pickerList = this.dataList;
        }
        else {
          this.pickerList = this.dataList.filter(x => x.CurrentStatus.toString().toLowerCase().includes(term.toLowerCase()));
          console.log('DL', this.pickerList);
        }
      });
    }
    else {
      if (term == "null") {
        this.pickerList = this.dataList;
      }
      else {
        // 
        this.pickerList = this.dataList.filter(x => x.CurrentStatus.toString().toLowerCase().includes(term.toLowerCase()));
        // this.IsComplted = "";
        console.log('DL', this.pickerList);
      }
    }


  }

  OrderIdfilter(event) {
    debugger;
    // 
    let term = event;
    console.log(term);
    console.log('DL', this.dataList);
    this.pickerservice.SearchByPickerId(term).subscribe(x => {
      
      console.log('DLx', x);
      if(x != null && x.length > 0 && (this.searchdata.IsComplted == undefined || this.searchdata.IsComplted != undefined && (x[0].Status == Number.parseInt(this.searchdata.IsComplted) || Number.parseInt(this.searchdata.IsComplted) == -1)))
      {
        this.isMapped = true;
        this.pickerList = x;
        this.totalcount = x.length;
      }else{
        this.pickerList = [];
        this.totalcount = x.length;
        this.isMapped = false;
        this.notMapped = true;
        alert('No Data Found!!');
      }
      
    });
    var a = this.pickerList;
    // 
    if (term.length >= 1) {
      this.pickerList = this.dataList.filter(x => x.Id == term || x.CurrentStatus.toString().toLowerCase().includes(event.toLowerCase()));
      // this.term = null;
      console.log('DL', this.pickerList);
    }
    else {
      this.pickerList = [];
      this.pickerList = this.dataList;
    }
  }

  Comment:any
  openitem(d, e, WarehouseId) {
    debugger;
    this.datalist = [];//aaa
    this.makerTimerList = [];
    this.checkerTimerList = [];
    this.Comment = d.Comment;
    this.DeliveryIssuanceId = d.DeliveryIssuanceId > 0 ? d.DeliveryIssuanceId : d.MultiDeliveryIssuanceIds;
    this.TotalAssignmentAmount = d.TotalAssignmentAmount;
    this.selectedRowDetails = d;
    this.PeopleID = null; // to make deliveryboy empty done on 14feb at 3:53pm
    this.IsSelectOrder = d;
    this.CreatedName = this.IsSelectOrder.CreatedByName;
    this.ClusterName = d.ClusterName;
    this.DboyName = d.DBoyName;
    this.AgentName = d.AgentName;
    if (this.IsSelectOrder.CreatedByName == null) {
      for (var i in this.getPeoples) {
        if (d.CreatedBy == this.getPeoples[i].PeopleID) {
          this.CreatedName = this.getPeoples[i].DisplayName;
          console.log('displayNamessds66++::', this.CreatedName);
        }
      }
    }
    console.log('IsSelectOrder', this.IsSelectOrder)
    this.pickerservice.GetpickerofWarehouse(d.WarehouseId).subscribe(x => {
      this.getPeople = x;
      this.blocked = false;
      console.log('GeTPeople:', this.getPeople);

      for (var i in this.getPeople) {
        if (d.PickerPersonId == this.getPeople[i].PeopleID) {
          this.DisplayName = this.getPeople[i].DisplayName;
          console.log('displayName::', this.DisplayName);
        }
      }
    });
    this.pickerservice.getPickerTimerListByPickerId(this.selectedRowDetails.Id).subscribe(x => {
      this.picktimelist = x;
      for (var j in this.getPeoples) {
        for (var i in this.picktimelist) {
          if (this.picktimelist[i].CreatedBy == this.getPeoples[j].PeopleID) {
            this.picktimelist[i].CreatedBy = this.getPeoples[j].DisplayName;
          }

        }
      }
      // for(var i in this.picktimelist)
      // {
      //     var startTime = moment(this.picktimelist[i].StartTime, "HH:mm:ss a"),          
      //     endTime = moment(this.picktimelist[i].EndTime, "HH:mm:ss a");
      //     this.picktimelist[i].differenceHrs = moment.duration(endTime.diff(startTime));
      //     // alert(this.picktimelist[i].differenceHrs);
      //     if(this.picktimelist[i].differenceHrs == 'NaNNaN')
      //     {
      //       this.picktimelist[i].differenceHrs = '-';
      //     }
      //      console.log([this.picktimelist[i].differenceHrs.hours(), this.picktimelist[i].differenceHrs.minutes(), this.picktimelist[i].differenceHrs.seconds()].join(':'));
      //     console.log('dif in Mins: ', (this.picktimelist[i].differenceHrs.hours() * 60) + this.picktimelist[i].differenceHrs.minutes());
      //     // alert([this.picktimelist[i].differenceHrs.hours(),'hr', this.picktimelist[i].differenceHrs.minutes(),'min', this.picktimelist[i].differenceHrs.seconds(),'sec'].join(':'));
      //     // alert('this.picktimelist[i].differenceHrs in Mins: '+ (this.picktimelist[i].differenceHrs.hours() * 60) + this.picktimelist[i].differenceHrs.minutes());
      // }
      for (var k in this.picktimelist) {
        // 
        if (this.picktimelist[k].Type == 0) {
          // 
          this.makerTimerList.push(this.picktimelist[k]);
        }
        if (this.picktimelist[k].Type == 1) {
          // 
          this.checkerTimerList.push(this.picktimelist[k]);

        }
      }
      for (var i in this.makerTimerList) {
        var startTime = moment(this.makerTimerList[i].StartTime, "HH:mm:ss a"),
          endTime = moment(this.makerTimerList[i].EndTime, "HH:mm:ss a");
        // alert(this.makerTimerList[i].StartTime);
        // alert(this.makerTimerList[i].EndTime);
        this.makerTimerList[i].differenceHrs = moment.duration(endTime.diff(startTime));
        // alert(this.makerTimerList[i].differenceHrs);
        if (this.makerTimerList[i].differenceHrs == 'NaNNaN') {
          this.makerTimerList[i].differenceHrs = '-';
        }
        console.log([this.makerTimerList[i].differenceHrs.hours(), this.makerTimerList[i].differenceHrs.minutes(), this.makerTimerList[i].differenceHrs.seconds()].join(':'));
        console.log('dif in Mins: ', (this.makerTimerList[i].differenceHrs.hours() * 60) + this.makerTimerList[i].differenceHrs.minutes());

      }

      for (var i in this.checkerTimerList) {

        // this.StartedTime = this.checkerTimerList[i].StartTime;
        // this.EndedTime = this.checkerTimerList[i].EndTime
        this.StartedTime = this.checkerTimerList[i].StartTime ? moment(this.checkerTimerList[i].StartTime).format('HH:mm:ss') : null
        this.EndedTime = this.checkerTimerList[i].EndTime ? moment(this.checkerTimerList[i].EndTime).format('HH:mm:ss') : null

        var startTime = moment(this.StartedTime, "HH:mm:ss a"),
          endTime = moment(this.EndedTime, "HH:mm:ss a");
        this.checkerTimerList[i].differenceHrs = moment.duration(endTime.diff(startTime));
        if (this.checkerTimerList[i].differenceHrs == 'NaNNaN') {
          this.checkerTimerList[i].differenceHrs = '-';
        }
        // alert(this.checkerTimerList[i].differenceHrs.hours() + "hours" + ":" + this.checkerTimerList[i].differenceHrs.minutes() + "min" + ":"  + this.checkerTimerList[i].differenceHrs.seconds() + "sec")
        console.log([this.checkerTimerList[i].differenceHrs.hours(), this.checkerTimerList[i].differenceHrs.minutes(), this.checkerTimerList[i].differenceHrs.seconds()].join(':'));
        console.log('dif in Mins: ', (this.checkerTimerList[i].differenceHrs.hours() * 60) + this.checkerTimerList[i].differenceHrs.minutes());

      }

    })
    this.pickerservice.GetAllWarehouseNew().subscribe(x => {
      this.warehouseList = x;
      debugger;
      for (var i in this.warehouseList) {
        if (d.WarehouseId == this.warehouseList[i].value) {
          this.whname = this.warehouseList[i].label;
        }
      }
    });

    if (this.selectedRow != undefined) {
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted";
      }
    }else{
      this.selectedRow = e;
      if(this.selectedRow.path){
        this.selectedRow.path[1].className = "classForHoverEffect ng-tns-c5-1 ng-star-inserted selected";
      }
    }
    console.log(this.selectedRow);
    this.isDetails = true;
    this.data = this.selectedRowDetails.orderPickerDetails;
    //aaaaa
    this.pickerservice.getOrderPickerDetailsByOrderPickerMasterId(d.Id,d.WarehouseId).subscribe(pick=>{
      this.data = pick;
      for (var i in this.data) {
        // if (this.data[i].Qty >= this.data[i].DispatchedQty) {
        this.datalist.push(this.data[i]);
        for (var i in this.datalist) {
          if (this.datalist[i].IsFreeItem == 'Free') {
            this.datalist[i].IsFreeItem = 'Free';
          }
          else if (this.datalist[i].IsFreeItem == 'Not Free') {
            this.datalist[i].IsFreeItem = 'Not Free';
          }
          if (this.datalist[i].IsFreeItem == true) {
            this.datalist[i].IsFreeItem = 'Free';
          }
          else if (this.datalist[i].IsFreeItem == false) {
            this.datalist[i].IsFreeItem = 'Not Free';
          }
  
          if (this.datalist[i].Status == 0) {
            this.datalist[i].Status = 'No Action';
            // this.CancelBtn = true;
          }
          else if (this.datalist[i].Status == 1) {
            this.datalist[i].Status = 'Picker Accept';
          }
          else if (this.datalist[i].Status == 2) {
            this.datalist[i].Status = 'Approver Approved';
          }
          else if (this.datalist[i].Status == 3) {
            this.datalist[i].Status = 'Picker Reject';
          }
          else if (this.datalist[i].Status == 4) {
            this.datalist[i].Status = 'Approver Reject ';
          }
        }
        debugger;
        this.datalist.forEach(element => {
          var xboxes = 0;
          var xpieces = 0;
          if (element.PurchaseMinOrderQty > 0) {
            xboxes = element.Qty / element.PurchaseMinOrderQty;
            xpieces = element.Qty % element.PurchaseMinOrderQty;
          } else {
            xboxes = element.PurchaseMinOrderQty;
            xpieces = element.Qty;
          }
          // var box = xboxes.toFixed(1);
          var str = xboxes.toString();
          var numarray = str.split('.');
          element.Boxes = numarray[0];
          element.piece = xpieces;//numarray[1];
        });
        //console.log('dataaaaa:', this.datalist);
        // }
      }///aaaaa
    })
   
    this.pickerId = this.selectedRowDetails.Id;
    this.Isdispatch = this.selectedRowDetails.IsDispatched;
    this.Iscomplete = this.selectedRowDetails.IsComplted;
    this.IsApproved = this.selectedRowDetails.IsApproved;
    this.StartTime = this.selectedRowDetails.StartTime;
    this.EndTime = this.selectedRowDetails.EndTime;
    this.Id = this.selectedRowDetails.Id;
    this.CreatedDate = this.selectedRowDetails.CreatedDate;
    this.CreatedBy = this.selectedRowDetails.CreatedBy;
    this.DisplayName = this.selectedRowDetails.PickerPersonName;
    // this.peopleService.GetAll().subscribe(x => {
    //   this.getPeoples = x;
    //   this.blocked = false;
    //   console.log('GeTPeople:', this.getPeoples);

    // for (var i in this.getPeoples) {
    //   if (d.CreatedBy == this.getPeoples[i].PeopleID) {
    //     this.CreatedName = this.getPeoples[i].DisplayName;
    //     console.log('displayNamessds66++::', this.CreatedName);
    //   }
    // }
    // });

    if (this.StartTime != null && this.EndTime != null && this.Isdispatch == true && this.Iscomplete == true) {
      d.status = 'Ready To dispatched';
      console.log('status:', status);
    }
    if (this.StartTime != null && this.EndTime != null && this.Isdispatch == false && this.Iscomplete == true) {
      d.status = 'Completed not dispatched';
      console.log('status:', status);
    }
    this.isOpenPopupPayments = true;
    this.Data = true;
  }

  openHistory(d, e) {
    // 
    this.historyDetail = d;
    this.HistoryView = true;
    this.isDetails = true;
  }

  // updatecancelorder(){
  //   
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to perform this action?',
  //     accept: () => {
  //       // this.pickerCancelOrder=true;
  //       this.comments="";    
  //       this.userid = localStorage.getItem('userid');
  //       this.cancelOnNew = false;
  //     }

  //   });

  // }
  // updatecomments(comments){
  //   
  // this.userid=this.userid;

  //   this.pickerservice.Updatecomments( this.userid,comments,this.selectedRowDetails.Id).subscribe(result=>{
  //     
  //     this.messageService.add({ severity: 'success', summary: result, detail: '' });
  //     if(result == 'Picker Order Cancelled Successfully')
  //     {
  //       // this.cancelHide = true;
  //     }
  //     // this.pickerCancelOrder=false;
  //   })
  // }
  // cancel()
  // {
  //   // this.pickerCancelOrder=false;
  // }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    } else {
      if (this.isTable == true) {
        this.isTable = false;
      }
      this.isSearch = true;
    }
  }

  print() {
    // 
    this.historyHide = true;
  }

}

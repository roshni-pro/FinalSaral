import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PepolePilotService } from 'app/shared/services/pepole-pilot.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnyARecord } from 'dns';
import { FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { PeopleService } from 'app/shared/services/people.service';
import * as moment from 'moment';
import { CustomerService } from 'app/shared/services/customer.service';
import { environment } from 'environments/environment';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';


interface Warehouse {
  WarehouseId: number;
  WarehouseName: string;
  id: number;
}

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent implements OnInit {
  // @Input()ID : any;
  @Input() peopleDetails: any; salaryDeatils: any;
  @Input() peopleList: any;
  @Output() refreshParent = new EventEmitter();
  @Output() isdetailsclose = new EventEmitter<boolean>();
  public imagePath;
  imgURL: any;
  people: any;
  stateList: any[];
  designationList: any;
  ImageUrl: any;
  showSave:boolean=true
  salary: any;
  cityList: any;
  PeopleID: any;
  warehouseList: any[];
  departmentList: any;
  selectedDepartment: any;
  statusList: any;
  selectedStatus: any;
  index: number = 0;
  isInvalid: boolean;
  RoleList: any[];
  Role: SelectItem[];
  OldPeopleData:any
  selectedRole: any[];
  selectedWarehouse: any;
  Ware = [];
  reportList: any
  selectedRoleCopy: any;
  selectedWarehouseCopy: any
  file: any
  id: any;
  roles:any[];
  peopleInt: any[];
  primaryWarehouseList: any;
  baseURL: any;
  password: any;
  isAgent:boolean;
  warehouseArray:any=[];
  constructor(private messageService: MessageService,
     private customerservice: CustomerService, private pepolePilotService: PepolePilotService, private peopleService: PeopleService, private modalService: NgbModal, private router: Router
     , private confirmationService: ConfirmationService) {
    this.people = {}
    this.baseURL = environment.apiURL;
  }

  
  ngOnInit() {
    this.people = {};
    this.people.PeopleID = 0;
    this.people.Warehouses = [];
    this.people.OldWarehouses = [];
    this.people.id = [];
    this.isAgent=false;
    this.password = this.peopleDetails ? this.peopleDetails.Password : null;
    this.id = this.peopleDetails ? this.peopleDetails.PeopleID : null;
    this.pepolePilotService.GetWarehouse(this.id).subscribe(result => {
      console.log(result);
      this.warehouseList = result
      this.selectedWarehouse = this.warehouseList.filter(x => { return x.Selected == true }, x => x.WarehouseId);
      console.log(this.selectedWarehouse,"selectedWarehouse");
      
      this.selectedWarehouseCopy = JSON.parse(JSON.stringify(this.selectedWarehouse));
      this.people.Warehouses = this.selectedWarehouse;
    })

    if (this.peopleDetails) {
      
      this.people = this.peopleDetails;
      // this.reportList = this.peopleList.filter(x => x.PeopleID != this.people.PeopleID)
      this.peopleService.GetAll().subscribe(result => {
        this.reportList = result.filter(x => x.PeopleID != this.people.PeopleID)

      })
      this.pepolePilotService.City().subscribe(result => {
        if (this.people.Stateid) {
          this.cityList = result.filter(x => x.Stateid == this.people.Stateid);
        } else {
          this.cityList = result;
        }
      })

      this.pepolePilotService.Warehouse().subscribe(result => {
        this.warehouseArray=[];   
        if (this.people.Cityid) {              
          var warehouselist = result.filter(x => x.Cityid == this.people.Cityid);
          warehouselist.forEach(e=>{
            this.warehouseArray.push({
              WareHouseId:e.WarehouseId,
              WareHouseName:e.WarehouseName,
              Cityid:e.Cityid,
              CityName:e.CityName
            });
          });
          this.primaryWarehouseList=this.warehouseArray;    
          //  this.selectedWarehouse= this.people.WarehouseId; 
          if(this.people.WareHouseId==undefined){
            var wa=this.primaryWarehouseList.filter(x=>x.WareHouseId==this.people.WarehouseId);
            this.people.WareHouseId=wa[0].WareHouseId; }
            this.herr = this.people.WareHouseId
        }
        else {
          result.forEach(e=>{
            this.warehouseArray.push({
              WareHouseId:e.WarehouseId,
              WareHouseName:e.WarehouseName,
              Cityid:e.Cityid,
              CityName:e.CityName
            });
          });
          this.primaryWarehouseList=this.warehouseArray;
        }
      })


      // this.reportList = this.reportList.filter(x => x.PeopleID != this.people.PeopleID)
    } else {
      // this.reportList = this.peopleList
      this.peopleService.GetAll().subscribe(result => {
        this.reportList = result
      })

       //this.pepolePilotService.City().subscribe(result => {
      //   this.cityList = result;
      // });

      // this.pepolePilotService.Warehouse().subscribe(result => {
      //   this.primaryWarehouseList = result;
      // })
    }


    this.pepolePilotService.role(this.people.PeopleID).subscribe(result => {
      this.RoleList = result;
     console.log(this.RoleList)

      this.selectedRole = this.RoleList.filter(x => {
        return x.UserId != null;
      });
      this.selectedRoleCopy = JSON.parse(JSON.stringify(this.selectedRole));
    })
    this.pepolePilotService.Designation().subscribe(result => {
      this.designationList = result;
      console.log('this.designationList:', result);


    });
    this.pepolePilotService.Department().subscribe(result => {
      this.departmentList = result;
      console.log('this.departmentList : ' + result);
    });

    this.pepolePilotService.States().subscribe(result => {
      this.stateList = result;
      console.log('this.stateList :', result);

    });
  }

  selectedWarehouses() {
    debugger;
    var a = [];
    var b = [];
    var c = []
    // console.log(this.selectedWarehouse)
    this.selectedWarehouse.forEach(element => {
      console.log(element.id);
      a.push({ id: element.id });
      c.push(element.id);
    });
    this.people.Warehouses = a;
    this.people.id = c;
    // console.log(this.people.Warehouses)
    // console.log(this.selectedWarehouseCopy);

    this.selectedWarehouseCopy.forEach(element => {
      // console.log(element.id);
      b.push({ id: element.id })
    });
    this.people.OldWarehouses = b;
    // console.log(this.people.OldWarehouses);
    console.log(this.people.Warehouses);
    
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onSave(formName,people) {   
  debugger
    if(this.peopleDetails!=undefined)
    {
     if(this.peopleDetails.PeopleFirstName == "" || this.peopleDetails.PeopleFirstName==undefined || this.peopleDetails.PeopleFirstName == null )
    {
      this.showErrorMsg("Firstname is Required")
      return
    }
    if(this.peopleDetails.PeopleLastName == "" || this.peopleDetails.PeopleLastName==undefined || this.peopleDetails.PeopleLastName==null)
    {
      this.showErrorMsg("LastName is Required")
      return
    }
    if(this.peopleDetails.Email  == "" || this.peopleDetails.Email==undefined || this.peopleDetails.Email==null)
    {
      this.showErrorMsg("Email is Required")
      return
    }
    if(this.peopleDetails.Password =="" || this.peopleDetails.Password==undefined || this.peopleDetails.Password==null)
    {
      this.showErrorMsg("Password is Required")
       return
    }
    if(this.peopleDetails.Mobile =="" || this.peopleDetails.Mobile==undefined || this.peopleDetails.Mobile==null)
    {
      this.showErrorMsg("Mobile is Required")
      return
    }
    if(this.peopleDetails.Status =="" || this.peopleDetails.Status==undefined || this.peopleDetails.Status==null)
    {
      this.showErrorMsg("Status is Required")
      return
    }
    if(this.peopleDetails.Stateid =="" || this.peopleDetails.Stateid==undefined || this.peopleDetails.Stateid==null)
    {
      this.showErrorMsg("State is Required")
      return
    }
    if(this.peopleDetails.Cityid =="" || this.peopleDetails.Cityid==undefined || this.peopleDetails.Cityid==null)
    {
      this.showErrorMsg("City is Required")
      return
    }
    if(this.peopleDetails.Status=='OnRoll' && (this.peopleDetails.Empcode =="" || this.peopleDetails.Empcode==undefined || this.peopleDetails.Empcode==null))
    {
      this.showErrorMsg("Employee Code is Required")
      return
    }
    if(this.peopleDetails.DOB =="" || this.peopleDetails.DOB==undefined || this.peopleDetails.DOB==null)
    {
      this.showErrorMsg("Date Of Birth is Required")
      return
    }
    if(this.peopleDetails.DataOfJoin =="" || this.peopleDetails.DataOfJoin==undefined || this.peopleDetails.DataOfJoin==null)
    {
      this.showErrorMsg("DataOfJoin is Required")
      return
    }
    if(this.peopleDetails.Unit =="" || this.peopleDetails.Unit==undefined || this.peopleDetails.Unit==null)
    {
      this.showErrorMsg("Location is Required")
      return
    }
    if(this.peopleDetails.Department =="" || this.peopleDetails.Department==undefined || this.peopleDetails.Department==null)
    {
      this.showErrorMsg("Department is Required")
      return
    }
    if(this.peopleDetails.Desgination =="" || this.peopleDetails.Desgination==undefined || this.peopleDetails
    
    .Desgination==null)
    {
      this.showErrorMsg("Desgination is Required")
      return
    }
  }
    console.log(people,"people");
    if (formName.invalid) {
      this.isInvalid = true;
      return;
    }else{
    var obj = {
      OldRoles: this.selectedRoleCopy,
      NewRoles: this.selectedRole
    }
    for (var i=0; i< obj.NewRoles.length;i++) {
      if(obj.NewRoles[i].RoleName == "Agent")
      {
        this.isAgent  = true ;
      }
    }
    console.log(this.peopleDetails,"peopleDetails");
    console.log(this.people,"this.people");
    
    if (this.peopleDetails) {
      this.pepolePilotService.UpdatePeople(this.people).subscribe(result => {
      if (result.Succeeded) {
        for (var i in obj.NewRoles) {
          obj.NewRoles[i].SearchedUserId = result.UserID;
        }
        this.pepolePilotService.updateRoles(obj).subscribe(result => {
           this.refreshParent.emit();
        })
      } else {
        this.messageService.add({ severity: 'error', summary: result.ErrorMessage, detail: '' });
      }
      }, (err) => {
        this.messageService.add({ severity: 'error', summary: "something went wrong please try again", detail: '' });
      });
    } else {
      this.pepolePilotService.addPeople(this.people).subscribe(result => {
        if (result.Succeeded) {
          this.id = result.PeopleId;
          for (var i in obj.NewRoles) {
            obj.NewRoles[i].SearchedUserId = result.UserID;
          }
          this.pepolePilotService.updateRoles(obj).subscribe(result => {

            // this.router.navigateByUrl('layout/admin/people');
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            this.messageService.add({ severity: 'success', summary: "SuccessFully Added", detail: '' });
            this.showSave=false
          })
        } else {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.messageService.add({ severity: 'error', summary: result.ErrorMessage, detail: '' });
        }


      }, (err) => {
        this.messageService.add({ severity: 'error', summary: "something went wrong please try again", detail: '' });
      });

    }
  }
    // return !this.peopleDetails.some(this.peopleDetails);

  }
  
  // onSave(formName) {
  //   // localStorage.setItem ('People-List' , null)
  //   if (formName.invalid) {
  //     this.isInvalid = true;
  //     return;
  //   }else{
  //   var obj = {
  //     OldRoles: this.selectedRoleCopy,
  //     NewRoles: this.selectedRole
  //   }
    
  //   console.log(this.people.id)
  //   if (this.peopleDetails) {
  //     // this.people.Password = this.password != this.people.Password ? this.people.Password : null
  //     this.pepolePilotService.UpdatePeople(this.people).subscribe(result => {
  //       // if(result != "Success"){
  //       //      this.messageService.add({ severity: 'error', summary: result, detail: '' });
  //       // }else{
  //       this.pepolePilotService.updateRoles(obj).subscribe(result => {
  //         // this.messageService.add({ severity: 'success', summary: "SuccessFully Updated", detail: '' });
  //         this.refreshParent.emit();
  //       });
  //    // }
  //     }, (err) => {
  //       this.messageService.add({ severity: 'error', summary: "something went wrong please try again", detail: '' });
  //     });
  //   } else {
  //     this.pepolePilotService.addPeople(this.people).subscribe(result => {
  //       if (result.Succeeded) {
  //         this.id = result.PeopleId;
  //         for (var i in obj.NewRoles) {
  //           obj.NewRoles[i].SearchedUserId = result.UserID;
  //         }
  //         this.pepolePilotService.updateRoles(obj).subscribe(result => {

  //           // this.router.navigateByUrl('layout/admin/people');
  //           this.messageService.add({ severity: 'success', summary: "SuccessFully Added", detail: '' });
  //         })
  //       } else {
  //         this.messageService.add({ severity: 'error', summary: result.ErrorMessage, detail: '' });
  //       }


  //     }, (err) => {
  //       this.messageService.add({ severity: 'error', summary: "something went wrong please try again", detail: '' });
  //     });

  //   }
  // }
  //   // return !this.peopleDetails.some(this.peopleDetails);

  // }

  onChangeState(Stateid) {
    this.pepolePilotService.City().subscribe(result => {
      this.cityList = result.filter(x => x.Stateid == Stateid);
    });

  }
  onChangeCity(Cityid) {
    this.customerservice.getWareHouseByCity(Cityid).subscribe(result => {
      this.primaryWarehouseList = result.filter(x => x.Cityid == this.people.Cityid);

      console.log(this.warehouseList)
    })

  }
  herr:any
  BeatmapWHChange()
  {
    debugger;
    console.log("this.selectedRole",this.selectedRole);
    if(this.herr!=undefined){
    this.selectedRole.forEach(element=>
      {
        if(element.RoleName=="Sales Executive")
        {
          this.confirmationService.confirm({
            message: 'Changing the warehouse will clear the existing Beat Mapping for this Sales Executive. Do you want to continue?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            
            accept: () => {
            },
            reject: () => {
              this.people.WareHouseId = this.herr
            }
          });
        }
      })
    }
    
  }
  beforeChange(event: NgbTabChangeEvent) {
    debugger
    // dont do anything if id matches
  console.log(event);
  
  }
  changeTab(people) {
    console.log(this.OldPeopleData,"Old");
    console.log(people.Status,"New people")
    console.log(people.Empcode,"New people")
 }

  openNext(peopleEditForm: any) {
    if (peopleEditForm.form.status == "VALID") {
      this.index = (this.index === 2) ? 0 : this.index + 1;
    } else {
      this.isInvalid = true;
    }


  }
  Salary_Calculation(data) {
    this.people.Hra_Salary = (parseInt(data) * 40) / 100;
    this.people.PF_Salary = (((parseInt(data) * 75) / 100) * 12) / 100;
    this.people.ESI_Salary = (parseInt(data) * 6.5) / 100;
  }

  openPrev() {
    this.index = (this.index === 0) ? 2 : this.index - 1;
  }
  onCancel() {
    this.isdetailsclose.emit(false);
    this.router.navigateByUrl('layout/admin/people');
  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")

    };


  }

  uploadIdProof() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.pepolePilotService.uploadIdProof(this.id, formData).subscribe(result => {
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.people.Id_Proof = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }

  }

  uploadPanCardProof(){
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.pepolePilotService.uploadPanCardProof(this.id, formData).subscribe(result => {
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.isAgent  = false ;
          this.people.PanCard_Proof = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }


  }
  uploadAddressProof() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.pepolePilotService.uploadAddressProof(this.id, formData).subscribe(result => {
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.people.Address_Proof = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }

  }

  uploadMarksheet() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.pepolePilotService.uploadMarksheet(this.id, formData).subscribe(result => {
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.people.MarkSheet = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }

  }

  uploaderPresalary() {
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file[0])
      this.pepolePilotService.uploaderPresalary(this.id, formData).subscribe(result => {
        console.log(result)
        if (result != "Upload Unsuccessfull") {
          this.people.Pre_SalarySlip = result;
          this.messageService.add({ severity: 'success', summary: "Uploaded Successfully", detail: '' });
          this.file = [];
        } else {
          this.messageService.add({ severity: 'error', summary: "Upload Unsuccessfull", detail: '' });
        }

      }, (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });

      });
    }

  }

  onNext(tabObject, tabname, formName) {
    console.log('form is:', formName);
    console.log('tabObject is:', tabObject);
    console.log('tabname is:', tabname);
   this.roles = formName.form.value.role;
   for(var i=0; i< this.roles.length;i++)
   {
     if(this.roles[i].RoleName == "Agent"){
      this.isAgent  = true ;
     }
   }
   
    if (tabname == 'tab2') {
      if (formName.invalid) {
        this.isInvalid = true;
        return;
      } else {
        if (this.id != null) {
          this.isInvalid = false;
          tabObject.select(tabname);
        } else {
          this.messageService.add({ severity: "error", summary: "Please Save People first", detail: "" });
        }


      }
    } else {
      if (formName.invalid) {
        this.isInvalid = true;
        return;
      } else {
        this.isInvalid = false;
        tabObject.select(tabname);

      }
    }

  }

  onKeydown(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return (k !== 64 && event.keyCode !== 32);
  }

  close() {
    this.messageService.add({ severity: "success", summary: "Successfully", detail: "" });
    this.router.navigateByUrl('layout/admin/people');
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }
  spaceValidator(data, people)
{
  this.peopleList.filter(f => f.Empcode == people.Empcode)[0].Empcode = data.split(' ').join('');
}
showErrorMsg(msg)
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  this.messageService.add({ severity: 'error', summary: msg});
}

}

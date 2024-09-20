import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CountryService } from 'app/shared/services/country.service';
import { StateService } from 'app/shared/services/state.service';
import {Router} from '@angular/router';
import { PeopleService } from 'app/shared/services/people.service';
import { ZoneService } from 'app/shared/services/zone.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  @Input() Stateid: number;
  state : any;
  states : any[];
  vm : any;
  activestate:number;
  peopleList : any;
  zoneList : any;
  isInvalid: boolean;
  InterstateAmount:number;
  IntrastateAmount:number
  @Output() refreshParent = new EventEmitter(); 
  @Output() isdetailsclose = new EventEmitter<boolean>(); 

  constructor( private messageService : MessageService,private stateservice :StateService , private peopleservice :PeopleService ,private zoneservice : ZoneService, private router : Router) { this.state = {}; }

  ngOnInit() 
  {
    this.states = [
      { StateName: "Andaman and Nicobar Islands", AliasName: "AN", GSTNo: "35" },
      { StateName: "Andhra Pradesh", AliasName: "AP", GSTNo: "28" }, 
      { StateName: "Arunachal Pradesh", AliasName: "AR", GSTNo: "12" },
       { StateName: "Assam", AliasName: "AS", GSTNo: "18" },
      { StateName: "Bihar", AliasName: "BR", GSTNo: "10" },
       { StateName: "Chandigarh", AliasName: "CH", GSTNo: "4" },
       { StateName: "Chhattisgarh", AliasName: "CT", GSTNo: "22" }, 
       { StateName: "Dadra and Nagar Haveli", AliasName: "DN", GSTNo: "26" },
      { StateName: "Daman and Diu", AliasName: "DD", GSTNo: "25" },
      { StateName: "Delhi ", AliasName: "DL", GSTNo: "7" }, 
      { StateName: "Goa ", AliasName: "GA", GSTNo: "30" },
       { StateName: "Gujarat ", AliasName: "GJ", GSTNo: "24" }, 
       { StateName: "Haryana ", AliasName: "HR", GSTNo: "6" },
      { StateName: "Himachal Pradesh ", AliasName: "HP", GSTNo: "2" },
       { StateName: "Jammu and Kashmir ", AliasName: "JK", GSTNo: "1" },
        { StateName: "Jharkhand ", AliasName: "JH", GSTNo: "20" }, 
        { StateName: "Karnataka ", AliasName: "KA", GSTNo: "29" },
      { StateName: "Kerala ", AliasName: "KL", GSTNo: "32" },
       { StateName: "Lakshadweep ", AliasName: "LD", GSTNo: "31" },
        { StateName: "Madhya Pradesh ", AliasName: "MP", GSTNo: "23" }, 
        { StateName: "Maharashtra ", AliasName: "MH", GSTNo: "27" },
      { StateName: "Manipur ", AliasName: "MN", GSTNo: "14" }, 
      { StateName: "Meghalaya ", AliasName: "ML", GSTNo: "17" },
       { StateName: "Mizoram ", AliasName: "MZ", GSTNo: "15" }, 
       { StateName: "Nagaland ", AliasName: "NL", GSTNo: "13" },
      { StateName: "Orissa ", AliasName: "OR", GSTNo: "21" }, 
      { StateName: "Pondicherry ", AliasName: "PY", GSTNo: "34" },
       { StateName: "Punjab ", AliasName: "PB", GSTNo: "3" }, 
       { StateName: "Rajasthan ", AliasName: "RJ", GSTNo: "8" },
      { StateName: " Sikkim", AliasName: "SK", GSTNo: "11" },
       { StateName: "Tamil Nadu ", AliasName: "TL", GSTNo: "33" }, 
       { StateName: "Tripura ", AliasName: "TR", GSTNo: "16" },
        { StateName: "Uttaranchal ", AliasName: "UT", GSTNo: "5" },
      { StateName: "Uttar Pradesh ", AliasName: "UP", GSTNo: "9" },
       { StateName: "West Bengal", AliasName: "WB", GSTNo: "19" },
        { StateName: "Telangana", AliasName: "TG", GSTNo: "36" }
  ];


  this.vm = {};
    

  


    if(this.Stateid)
    {
      console.log(this.Stateid)
      this.vm = this.Stateid;
       
        console.log('GetByID: ', this.state);
      
  }


 

  

  this.peopleservice.GetAll().subscribe(result=>{
    
    this.peopleList=result;
  })
  this.zoneservice.GetAllZone().subscribe(result => {
    this.zoneList = result;
    
  })
}



keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
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


update(stateEditForm: any) 
{
  console.log(this.isdetailsclose)
  console.log('stateEditForm: ', stateEditForm);
  if (stateEditForm.form.status == "VALID") {
  console.log(this.vm);
  if(this.Stateid == null)
  {
    if(this.vm.InterstateAmount == undefined){
      this.vm.InterstateAmount = 0
    }
    else{
      this.vm.InterstateAmount = this.vm.InterstateAmount
    }
    if(this.vm.IntrastateAmount == undefined){
      this.vm.IntrastateAmount =0
    }
    else{
      this.vm.IntrastateAmount = this.vm.IntrastateAmount
    }
    // alert("inter"+this.InterstateAmount);
    // alert("intra"+this.IntrastateAmount);
    
  this.stateservice.addState(this.vm).subscribe(result => {
    
    console.log(result);

    if(result !="Already Exists"){
      this.router.navigateByUrl('layout/admin/state');
      this.state = result;
      this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
      
    }else{
      this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
      // this.router.navigateByUrl('layout/admin/state');
    }
     // this.expanded = false;
    },
  
  (err)=>{
    this.messageService.add({severity:'error', summary: 'Error!', detail:''});
  });
}
else{
  
  if(this.vm.InterstateAmount == undefined){
    this.vm.InterstateAmount = 0
  }
  else{
    this.vm.InterstateAmount = this.vm.InterstateAmount
  }
  if(this.vm.IntrastateAmount == undefined){
    this.vm.IntrastateAmount =0
  }
  else{
    this.vm.IntrastateAmount = this.vm.IntrastateAmount
  }
  this.stateservice.UpdateState(this.vm).subscribe(result => {
    
    console.log(this.Stateid);
    console.log(result);

    if(result !=null){
      this.router.navigateByUrl('layout/admin/state');
      this.state = result;
      this.messageService.add({severity:'success', summary: 'Add Successfully!', detail:''});
    }else{
      this.messageService.add({severity:'error', summary: 'Data Already Exist!', detail:''});
    }
     // this.expanded = false;
    },

  
  (err)=>{
    this.messageService.add({severity:'error', summary: 'Error!', detail:''});
  });
}
}else{
  this.isInvalid = true;
  this.messageService.add({severity:'error', summary: 'Please Fill required Fields!', detail:''});
}

}


// keyPressfilter(event: any) {
//   const pattern = /[0-9\+\-\ ]/;
//   let inputChar = String.fromCharCode(event.charCode);
//   if (event.keyCode != 8 && !pattern.test(inputChar)) {
//     event.preventDefault();
//   }
// }


onCancel(){
  this.isdetailsclose.emit(false);
  this.router.navigateByUrl('layout/admin/state')
}

dataChanged(state) {
 
 var temp = this.states.filter(x=> x.StateName == state);
 this.vm.StateName=temp[0].StateName;
 this.vm.AliasName=temp[0].AliasName;
 this.vm.GSTNo=temp[0].GSTNo;
}

}


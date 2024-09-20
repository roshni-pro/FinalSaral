import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators} from "@angular/forms";
import { SharedDataService } from 'app/angular-practice/service/shared-data.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-loginwith-flex',
  templateUrl: './loginwith-flex.component.html',
  styleUrls: ['./loginwith-flex.component.scss']
})
export class LoginwithFlexComponent implements OnInit {
  loginForm:FormGroup;
  mySubject = new BehaviorSubject("hello!");
  constructor(private sharedDataService:SharedDataService) { 
    this.loginForm=new FormGroup({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(12)])
    });
  }

  ngOnInit() {
  }

  buySugarinBulk(){
    //emitter emit kreha kuch value
    return new Observable(emitter=>{
      emitter.next("Suger is purchased")
    })
  }

  buySugarfromShop(){
    //observable a dependent on observable b
    //we need to observe value of b only
    // this.buySugarinBulk().subscribe(data=>{
    //   this.buySugarinQuantity('5kg').subscribe(res=>{
    //     console.log(res)
    //   })
    // })
    const newObserver =this.buySugarinBulk().pipe(switchMap(()=>{
      return this.buySugarinQuantity('5kg');
    }))
    newObserver.subscribe(data=>{
      console.log(data)
    })
    //ek observable lekr dusre trah ko observable return krenge
    //taki subscribe kre to directly vo chiz mile jo hme chahiye vo na mile jo nhi chahiye
  } 

  buySugarinQuantity(quantity){
    return new Observable(emitter=>{
      emitter.next(`suger with quantity ${quantity} here`)
    })
  }

  login(formValue){
    // this.buySugarfromShop();
    // console.log("logged",formValue);
    //this.mySubject.next(this.loginForm.value);
    this.sharedDataService.setData(this.loginForm.value)
  }

  signup(){
    // this.mySubject.subscribe(data=>{
    //   console.log(data);
    // })
    console.log(this.mySubject.getValue());   
  }

}

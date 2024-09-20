import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean>;

  initialize() {
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  constructor() {
    this.initialize();
  }

  public loading(state: boolean){
    this.isLoading.next(state); 
  }

}

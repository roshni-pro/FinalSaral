import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmModel } from '../component/confirm-model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  public confirModelObserver: BehaviorSubject<ConfirmModel> = new BehaviorSubject<ConfirmModel>(null);
  public confirmObserver: Subject<void> = new Subject<void>();
  constructor() { }

  reset() {
    let model = this.getDefaultConfirmModel();
    this.confirModelObserver.next(model);
  }

  confirm(model?: ConfirmModel): Observable<void> {
    let defaultModel = this.getDefaultConfirmModel();
    if (model) {
      debugger;
      defaultModel.show = true;
      defaultModel.StockId = (model.StockId == undefined) ? defaultModel.StockId : model.StockId;
      defaultModel.StockName = (model.StockName == undefined) ? defaultModel.StockName : model.StockName;
    }
    this.confirModelObserver.next(defaultModel);

    return this.confirmObserver.pipe(take(1));
  }

  accept() {
    this.confirmObserver.next();
  }
  cancel() {
    this.confirmObserver.error(null);
    this.confirmObserver = new Subject<void>();
  }

  private getDefaultConfirmModel(): ConfirmModel {
    debugger;
    let model: ConfirmModel = {
      show: false,
      StockId : null,
      StockName : null,
    }
    return model;
  }
}


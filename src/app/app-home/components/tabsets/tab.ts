import { Component, Input } from "@angular/core";

@Component({
  selector: 'tab',
  template: `
    <ng-content *ngIf="active"></ng-content>
  `,
  styleUrls: ['./tabStyle.scss']
})
export class Tab {

  @Input() title = '';
  @Input() active = false;
  @Input() disabled = false;

}
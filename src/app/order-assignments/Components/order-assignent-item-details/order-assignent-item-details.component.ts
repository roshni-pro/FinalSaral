import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-assignent-item-details',
  templateUrl: './order-assignent-item-details.component.html',
  styleUrls: ['./order-assignent-item-details.component.scss']
})
export class OrderAssignentItemDetailsComponent implements OnInit {

  displayTabs: any[];
  @Input() details: any[];

  @Output() isdetailsclose = new EventEmitter<boolean>();
  @Output() refreshParent = new EventEmitter();

  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit() {
 
  }

  ngOnChanges() {
    this.displayTabs = [{ field: 'overview', bool: true },
      // { field: 'edit-form', bool: false },
      // { field: 'history', bool: false },
    ];
    $('.nav .nav-item .nav-link').removeClass('active');
    $('#overview-btn').addClass('active');
  }

  closeDetails(isDetails: boolean) {
    this.isdetailsclose.emit(isDetails);
  }

  RefreshParent() {
    this.refreshParent.emit();
  }

}

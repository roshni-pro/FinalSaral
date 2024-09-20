import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mobile-tile',
  templateUrl: './mobile-tile.component.html',
  styleUrls: ['./mobile-tile.component.scss']
})
export class MobileTileComponent implements OnInit {
  @Input() section: any;
  @Input() ColumnCount: any;
  @Input() tileType: any;
  constructor(private dom: DomSanitizer,) { }

  ngOnInit() {
    console.log(this.section);
  }

  photoURL(imageUrl) {
    let thing = this.dom.bypassSecurityTrustResourceUrl(imageUrl);
    return thing;
  }

}

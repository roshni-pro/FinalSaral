import { Component, OnInit } from '@angular/core';
//  import * as jwt from 'jsonwebtoken';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IFrameComponent implements OnInit {
  param: string;
  Wid: number = 1;
  showIframe: boolean = true;

  constructor(private dom: DomSanitizer) { }

  ngOnInit() {
    this.param = 'http://reports.er15.xyz/public/question/ffaad5e4-bcfb-4926-82e5-68606c36abea?Wid=' + this.Wid + '#hide_parameters=Wid';
    let METABASE_SITE_URL = "http://reports.er15.xyz";
    let METABASE_SECRET_KEY = "1da30ab312f1211e6d78f4ae56a38254424674d58aa1b8b8120ecde5b61ab7ac";

    let payload = {
      resource: { dashboard: 8 },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    // const token = jwt.sign(payload, METABASE_SECRET_KEY);

    // let iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

  }

  photoURL() {
    let thing = this.dom.bypassSecurityTrustResourceUrl('http://reports.er15.xyz/public/question/ffaad5e4-bcfb-4926-82e5-68606c36abea?Wid=' + this.Wid + '#hide_parameters=Wid');
    return thing;
  }

  onchange() {
    this.showIframe = false;
    setTimeout(() => {
      this.showIframe = true;
    }, 200);
  }
}

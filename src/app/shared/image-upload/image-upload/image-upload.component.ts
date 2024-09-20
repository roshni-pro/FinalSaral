import { Component, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'environments/environment';
import { SkBuisnessLoanService } from 'app/sk-buisness-lead/services/sk-buisness-loan.service';

declare var Android: any;

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  private base64textString: any = "";
  public uploadImageBtn: boolean = false;
  imgURL: string | ArrayBuffer = '';
  @Input() isShowMyInputLogo: boolean | undefined;
  @Input() imagePath: string = '';
  @Input() type: any;
  @Input() SequenceNoId: Number = 0;
  @Input() SequenceName: string = '';
  @Input() uploadImagePage: any;
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() showUploadedImage: boolean = true;
  @Input() elecricityBill: boolean = false;
  @Output() detectchange = new EventEmitter();
  @Input() DocumentName : any;
  @Input() LeadMasterId: number;
  // @Output() compressDetectchange = new EventEmitter();
  file: File[] = [];
  apiurl = environment.apiURL;
  // public uploadFile;
  // public loading = false;
  @Input() frontImagePath: any;
  croppedImage: any = '';
  croppedBlob: Blob=new Blob([]);
  imageChangedEvent: any = '';
  isImageChangedEvent: boolean = false;
  eventImage: any;
  // @Input() adharfrontImage : any;
  // @Input() adharBackImage : any;
  constructor(private http: HttpClient,private _skBuisnessLoanService : SkBuisnessLoanService
    , private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit() {
    window.scroll(0, 0);
  }


  imageUpload(image : any) {
    //console.log('image byte array is 2:', image);
    this.detectchange.emit(image);
  }

  closeCroppedImage() {
    this.file = [];
    this.imageChangedEvent = null;
    this.isImageChangedEvent = false;
  }
  fileChangeEvent(event: any): void {
    this.isImageChangedEvent = true;
    this.uploadImageBtn = true;
    this.imageChangedEvent = event;
    console.log('imageChangedEvent', this.imageChangedEvent);
  }
  dataURLtoFile(dataurl: any, filename: string) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    filename = filename + '.' + mime.split('/')[1];
    let FileObj = new File([u8arr], filename, { type: mime });
    return FileObj;
  }
  selectedFile: File | null = null;
  blocked : boolean = false
  upload(file: any) {
    debugger;
    this.selectedFile = file.target.files[0];
    if (this.selectedFile) {
      this.blocked = true;
      debugger;
      if(this.SequenceName == 'PAN' || this.SequenceName == 'Aadhar')
      {
        this._skBuisnessLoanService.uploadPANorAadhar(this.selectedFile).subscribe(x => {
          this.blocked = false;
         
          debugger;
          this.detectchange.emit(x);
        })
      }
      if(this.SequenceName == 'Selfie' || this.SequenceName == 'BankStatement')
      {
        this._skBuisnessLoanService.uploadOtherDoc(this.selectedFile).subscribe(x => {
          this.blocked = false;
          debugger;
        
          this.detectchange.emit(x);
        })
      }      
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ArthmateServiceService } from 'app/sk-buisness-lead/services/arthmate-service.service';
import { environment } from 'environments/environment';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ViewChild, ElementRef } from '@angular/core';


interface UploadEvent {
    originalEvent: Event;
    files: File[];
}


@Component({
    selector: 'app-arthmate-stamp',
    templateUrl: './arthmate-stamp.component.html',
    styleUrls: ['./arthmate-stamp.component.scss']
})
export class ArthmateStampComponent implements OnInit {

    @ViewChild('fileRef', { static: false }) fileUploader: ElementRef<HTMLInputElement>;
    @ViewChild('fileRef1', { static: false }) fileUploader1: ElementRef<HTMLInputElement>;

    entity: any;
    showNewStamp: boolean = false;
    editDisplay: boolean = false;
    newstampPaperNo: any;
    PartnerName: string = ''
    stampAmount: any
    purpose: any
    selectedDate: any
    stampPaperNo: any
    LoanId: any
    UsedFor: string = ''
    UrlPath: any
    tempStampData: any[] = []
    blocked: boolean = false
    uploadedImageFilename: any
    url: any
    isPopupOpen: boolean = false
    arthmateStampData: any[] = []
    showImg: any
    selectedStampType: any = null
    stampType: any[] = [
        {
            'label': 'Used Stamp',
            'value': true
        },
        {
            'label': 'UnUsed Stamp',
            'value': false
        }
    ]
    constructor(private _service: ArthmateServiceService, private messageService: MessageService, private confirmationService: ConfirmationService) {
        this.entity = "ArthmateSlaLbaStampDetail"
        this.selectedStampType = this.stampType[1]

    }

    ngOnInit() {
        this.Search()

    }
    openLargeImage(img) {



        var newWindow = window.open('', '_blank');

        // Set the HTML content of the new window to display the image
        newWindow.document.write('<img id="fullscreenImage" src="' + img + '" style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0;" />');
    
        // Request full screen mode for the image element
        var imageElement = newWindow.document.getElementById('fullscreenImage');
        if (imageElement.requestFullscreen) {
            imageElement.requestFullscreen();
        } 
    }
    AddNewStamp() {
        this.uploadedImage = '';
        this.showNewStamp = true;
        this.OnClear()
        this._service.getArthmateSlaLbaStampAutoFilled().subscribe(res => {
            this.UsedFor = res.UsedFor
            this.stampAmount = res.StampAmount
            this.PartnerName = res.PartnerName
            this.purpose = res.Purpose
        })
    }



    Upload(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            this.uploadedImageFilename = event.target.files[0];
            reader.onload = (e: any) => {
                this.uploadedImage = e.target.result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    uploadedImage: any
    viewImage(fileRef: any) {
        if (fileRef.files && fileRef.files[0]) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.uploadedImage = e.target.result; // Store the uploaded image data
            };

            reader.readAsDataURL(fileRef.files[0]);
        }
    }

    OnSave() {
        console.log(this.url, "url")
        console.log(this.uploadedImageFilename, "uploadedImageFilename")
        console.log(this.stampPaperNo, "Stamp Paper Amount")
        console.log(this.stampAmount, "Stamp Paper Amount")
        console.log(this.purpose, "Stamp Paper Amount")

        if (this.stampPaperNo == null || this.stampPaperNo == undefined || this.stampPaperNo == 0) {
            alert("Enter Stamp Paper No.")
            return false;
        }
        if (this.uploadedImageFilename == undefined || this.uploadedImageFilename == null || this.uploadedImageFilename == '') {
            alert("Upload Image")
            return false;
        }
        // const payload=
        // {
        //   'LeadMasterId':0,
        //   'StampNumber':this.stampPaperNo,
        //   'StampAmount':this.stampAmount,
        //   'StampUrl':this.uploadedImageFilename,
        //   'UsedFor':this.UsedFor,
        //   'PartnerName':this.PartnerName,
        //   'Purpose':this.purpose,
        // }
        // console.log(payload,"Payload")
        const formData = new FormData();

        formData.append('file', this.uploadedImageFilename);
        formData.append('LeadMasterId', '0');
        formData.append('StampNumber', this.stampPaperNo);
        formData.append('StampAmount', this.stampAmount);
        formData.append('UsedFor', this.UsedFor);
        formData.append('PartnerName', this.PartnerName);
        formData.append('Purpose', this.purpose);
        // this.confirmationService.confirm({
        //     message: 'Are you sure that you want to Save?',
        //     accept: () => {

        var result;
        var r = confirm("Are you sure you want to Save Data ?");
        if (r == true) {
            result = "You have selected OK!";
            this.blocked = true
            this._service.AddStampPaperData(formData).subscribe((res: any) => {
                this.blocked = false;
                console.log(res, "res")
                this.showNewStamp = false;
                if (res != null) {
                    this.showSuccess(res.Msg);
                    this.Search();

                }
                this.tempStampData = []
            })
        }
        else {
            result = "Action Cancelled!";

        }
        //     },
        //     reject: () => {

        //     }
        // });
    }
    OnClear() {
        this.uploadedImage = '';
        this.UrlPath = null
        this.LoanId = null
        // this.stampAmount = null
        // this.purpose = null
        this.selectedDate = null
        this.stampPaperNo = null
        this.fileUploader.nativeElement.value = '';
        this.uploadedImageFilename = '';

    }
    delete(rowData) {
        if (this.tempStampData.length >= 0) {
            this.tempStampData = this.tempStampData.filter(x => !(x.UsedFor == rowData.UsedFor && x.stampAmount == rowData.stampAmount && x.PartnerName == rowData.PartnerName));
        }
    }

    View(url) {
        this.isPopupOpen = true;
       window.open(environment.apiURL + url)
        console.log(this.showImg);

    }
    showSuccess(msg) {
        this.messageService.add({ severity: 'success', summary: msg });
    }
    ViewUrl(url) {
        console.log(url, "url")
        this.isPopupOpen = true;
        this.showImg = url
    }
    Search() {
        this._service.getArthmateStampData(this.selectedStampType.value).subscribe(res => {
            console.log(res)
            this.arthmateStampData = res
        })
    }

    rowData: any;
    onEdit(rowData: any) {
        this.editDisplay = true
        this.rowData = rowData
        this.newstampPaperNo = this.rowData.StampPaperNo
        // this.Id=this.rowData.Id
        console.log(this.rowData.StampPaperNo);

    }
    stringUrl: string[];
    editRowData() {
        // this.fileUploader1.nativeElement.value = '';

        // this.uploadedImage = '';
        console.log(this.uploadedImageFilename, 'uploadedImageFilename');
        if (this.uploadedImageFilename == undefined || this.uploadedImageFilename == null || this.uploadedImageFilename == '') {
            alert("Upload Image")
            return false;
        }
        if (this.newstampPaperNo == undefined || this.newstampPaperNo == null || this.newstampPaperNo == 0) {
            alert("Enter Stamp Paper Number")
            return false;
        }
        // if (this.rowData.StampPaperNo == this.newstampPaperNo) {
        //     alert("Enter Different Stamp Paper Number")
        //     return false;
        // }
        var url = '';
        this.stringUrl = this.rowData.StampUrl.split('/');

        var len = this.stringUrl.length;
        url = this.stringUrl[len - 1]

        if (url == this.uploadedImageFilename.name) {
            alert("Upload Different Stamp Image")
            return false;
        }

        const formData = new FormData();

        formData.append('file', this.uploadedImageFilename);
        formData.append('ActivityAction', 'E');
        formData.append('stampFileName', this.uploadedImageFilename);
        formData.append('StampPaperNo', this.newstampPaperNo);
        formData.append('Id', this.rowData.Id);
        this.blocked = true
        this._service.EditRowData(formData).subscribe(res => {
            console.log(res);
            if(res != null){
                this.blocked = false;
                alert(res.Msg)
                // if(res.Status){
                //     this.showSuccess(res.Msg);
                // }
                this.editDisplay = false;
                this.Search();
            }
        })
    }
    onDelete(rowData: any) {
        var result;
        var r = confirm("Are you sure that you want to Delete Stamp Paper Number " + rowData.StampPaperNo + " ?");
        if (r == true) {
            result = "You have selected OK!";

            const formData = new FormData();

            formData.append('file', environment.apiURL + rowData.StampUrl);
            formData.append('ActivityAction', 'D');
            formData.append('stampFileName', environment.apiURL + rowData.StampUrl);
            formData.append('StampPaperNo', rowData.StampPaperNo);
            formData.append('Id', rowData.Id);
            this.blocked = true
            this._service.EditRowData(formData).subscribe(res => {
                console.log(res);
                if(res != null){
                    this.blocked = false;
                    // alert(res.Msg)
                    if(res.Status){
                        this.showSuccess(res.Msg);
                    }
                    else{
                        alert(res.Msg)
                    }
                    this.Search();
                }
            })
        } else {
            result = "Action Cancelled!";
        }


    }
    historyDisplay: boolean = false;
    historyDetails(rowData: any) {


        this.rowData = rowData;
        this.historyDisplay = true
    }
    cancel() {
        this.uploadedImage = '';
    }
    editCancel() {
        this.uploadedImage = '';
        this.fileUploader1.nativeElement.value = '';
        this.uploadedImageFilename = '';
    }
    onSavecancel() {
        this.uploadedImage = '';
        this.fileUploader.nativeElement.value = '';
        this.uploadedImageFilename = '';
    }
    download(value: any) {
        window.open(value);
    }
}

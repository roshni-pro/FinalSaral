import { Component, OnInit } from '@angular/core';
import { MembershipService } from 'app/shared/services/membership.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-membership-edit',
  templateUrl: './membership-edit.component.html',
  styleUrls: ['./membership-edit.component.scss']
})
export class MembershipEditComponent implements OnInit {
  MemberShip: any;
  file: any;
  public imagePath;
  isInvalid: boolean;
  ID: number;
  blocked: boolean;

  constructor(private memberShipService: MembershipService, private messageService: MessageService,
    private router: Router, private activateRoute: ActivatedRoute) {
    this.MemberShip = {};
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      
      this.ID = Number(params.get('Id'));
      this.file = null;
      if (this.ID && this.ID > 0) {
        this.blocked = true;
        this.memberShipService.GetmemberShipbyId(this.ID).subscribe(result => {
          this.blocked = false;
          this.MemberShip = result;
        })
      } else {
        this.ID = 0;
        this.MemberShip = {};
      }
    })
  }

  onSave(membershipForm: any) {
    if (membershipForm.form.status == "VALID") {
      this.isInvalid = false;
      if (this.ID == 0) {
        this.blocked = true;
        this.memberShipService.AddMemberShips(this.MemberShip).subscribe(result => {
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: 'MemberShip Added Sucessfully.', detail: '' });
          setTimeout(() => {
            this.router.navigateByUrl('/layout/admin/membership-page');
          }, 1000);
        },
          (err) => {
            //  alert("error")
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          });
      } else {
        this.blocked = true;
        this.memberShipService.UpdateMemberShip(this.MemberShip).subscribe(result => {
          this.blocked = false;
          this.messageService.add({ severity: 'success', summary: 'Update Sucessfully.', detail: '' });
          setTimeout(() => {
            this.router.navigateByUrl('/layout/admin/membership-page');
          }, 1000);
        },
          (err) => {
            //  alert("error")
            this.messageService.add({ severity: 'error', summary: 'Error!', detail: '' });
          });
      }

    } else {
      this.isInvalid = true;
      this.messageService.add({ severity: 'error', summary: 'Please Fill required Fields!', detail: '' });
    }
  }

  onCancel() {
    // this.isdetailsclose.emit(false);
    this.router.navigateByUrl('/layout/admin/membership-page')
  }

  upload(file: File[]) {
    this.file = file;
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.MemberShip.MemberShipLogo = reader.result;
    }
    (success) => {
      alert("image uploaded successfully")

    };
  }

  onUpload() {
    let formData = new FormData();
    if (this.file != null || this.file != undefined) {
      formData.append('file', this.file[0])
      this.blocked = true;
      this.memberShipService.UploadImage(formData).subscribe(result => {
        this.blocked = false;
        this.MemberShip.MemberShipLogo = result;
        this.messageService.add({ severity: 'success', summary: 'Uploaded Successfully!', detail: '' });
      })  
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Please select Image!', detail: '' });
    }
    
  }
}

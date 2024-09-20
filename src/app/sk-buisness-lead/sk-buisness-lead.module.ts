import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkBuisnessLeadRoutingModule } from './sk-buisness-lead-routing.module';
import { SkBuisnessLeadComponent } from './components/sk-buisness-lead/sk-buisness-lead.component';
import { SharedModule } from 'app/shared/shared.module';
import { ShaopkiranaSharedModule } from 'app/shared/shaopkirana-shared/shaopkirana-shared.module';
import { SKBuisnessSequenceComponent } from './components/skbuisness-sequence/skbuisness-sequence.component';
import { PanDataComponent } from './components/pan-data/pan-data.component';
import { AadharCardDetailComponent } from './components/aadhar-card-detail/aadhar-card-detail.component';
import { AadharVerificationComponent } from './components/aadhar-verification/aadhar-verification.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { BuisnessInfoComponent } from './components/buisness-info/buisness-info.component';
import { MsmeCertificationComponent } from './components/msme-certification/msme-certification.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { PhoneVerificationComponent } from './components/phone-verification/phone-verification.component';
import { EAgreementComponent } from './components/e-agreement/e-agreement.component';
import { LoanOfferRepaymentScheduleComponent } from './components/loan-offer-repayment-schedule/loan-offer-repayment-schedule.component';
import { ApproveOrRejectComponent } from './components/approve-or-reject/approve-or-reject.component';
import { SelfieImageComponent } from './components/selfie-image/selfie-image.component';
import { EmandetDetailsComponent } from './components/emandet-details/emandet-details.component';
import { ActivityHistroyComponent } from './components/activity-histroy/activity-histroy.component';
import { AdditionalDocumentsComponent } from './components/additional-documents/additional-documents.component';
import { ArthmateStampComponent } from './components/arthmate-stamp/arthmate-stamp.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ArthmateRepaymentUpdateComponent } from './components/arthmate-repayment-update/arthmate-repayment-update.component';



@NgModule({
  declarations: [SkBuisnessLeadComponent, SKBuisnessSequenceComponent, PanDataComponent, AadharCardDetailComponent, AadharVerificationComponent, BankDetailsComponent, BuisnessInfoComponent, MsmeCertificationComponent, PersonalInfoComponent, PhoneVerificationComponent, EAgreementComponent, LoanOfferRepaymentScheduleComponent, ApproveOrRejectComponent, SelfieImageComponent, EmandetDetailsComponent,
    ArthmateStampComponent, ActivityHistroyComponent, AdditionalDocumentsComponent,ArthmateRepaymentUpdateComponent],
  imports: [
    CommonModule,
    SkBuisnessLeadRoutingModule,
    ShaopkiranaSharedModule,
    SharedModule,
    FileUploadModule,
    ConfirmDialogModule
  ]
})
export class SkBuisnessLeadModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { ImageUploadComponent } from './image-upload/image-upload/image-upload.component';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        NgbModule,
        TranslateModule,
        ImageUploadComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        TranslateModule,
        PerfectScrollbarModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        ImageUploadComponent,
        
    ]
})
export class SharedModule { }

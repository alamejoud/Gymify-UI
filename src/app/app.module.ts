import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { LoginPageComponent } from './login-page/login-page.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TooltipModule } from 'primeng/tooltip';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { SignupPopupComponent } from './signup-popup/signup-popup.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserServiceService } from './Services/user-service.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { DialogModule } from 'primeng/dialog';
import { IdleServiceService } from './Services/idle-service.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AutoFocusModule } from 'primeng/autofocus';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { NbMenuModule } from '@nebular/theme';
import { ProfilePopupComponent } from './profile-popup/profile-popup.component';
import { tokenInterceptor } from './token.interceptor';
import { FileUploadModule } from 'primeng/fileupload';
import { FocusTrapModule } from 'primeng/focustrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginPopupComponent,
    SignupPopupComponent,
    PageNotFoundComponent,
    HomePageComponent,
    NavBarComponent,
    ProfilePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    CardModule,
    DividerModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    TooltipModule,
    TabMenuModule,
    RadioButtonModule,
    FormsModule,
    ToastModule,
    NgIdleKeepaliveModule.forRoot(),
    DialogModule,
    AutoFocusModule,
    ImageModule,
    AvatarModule,
    AvatarGroupModule,
    MenubarModule,
    MenuModule,
    PanelMenuModule,
    BadgeModule,
    ConfirmDialogModule,
    NbMenuModule.forRoot(),
    FileUploadModule,
    FocusTrapModule
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    UserServiceService,
    IdleServiceService,
    ConfirmationService,
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, withFetch } from '@angular/common/http';
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
import { SignUpServiceService } from './Services/sign-up-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginPopupComponent,
    SignupPopupComponent,
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
    ToastModule
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    SignUpServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

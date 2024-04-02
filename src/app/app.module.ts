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
import { NbButtonModule, NbChatModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { ProfilePopupComponent } from './profile-popup/profile-popup.component';
import { tokenInterceptor } from './token.interceptor';
import { FileUploadModule } from 'primeng/fileupload';
import { FocusTrapModule } from 'primeng/focustrap';
import { HomeComponent } from './home/home.component';
import { WorkoutComponent } from './workout/workout.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PaginatorModule } from 'primeng/paginator';
import { TrainerExerciseComponent } from './trainer-exercise/trainer-exercise.component';
import { AddExercisesComponent } from './add-exercises/add-exercises.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { DragDropModule } from 'primeng/dragdrop';
import { WorkoutPageComponent } from './workout-page/workout-page.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { BrowseWorkoutComponent } from './browse-workout/browse-workout.component';
import { ScrollerModule } from 'primeng/scroller';
import { ExerciseInfoComponent } from './exercise-info/exercise-info.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
    HomeComponent,
    WorkoutComponent,
    ExerciseComponent,
    ExerciseListComponent,
    TrainerExerciseComponent,
    AddExercisesComponent,
    WorkoutPageComponent,
    WorkoutListComponent,
    BrowseWorkoutComponent,
    ExerciseInfoComponent,
    ChatPageComponent
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
    FocusTrapModule,
    DropdownModule,
    InputGroupModule,
    InputGroupAddonModule,
    AutoCompleteModule,
    ChipModule,
    TagModule,
    DataViewModule,
    RatingModule,
    SkeletonModule,
    AccordionModule,
    ScrollPanelModule,
    PaginatorModule,
    InputTextareaModule,
    SidebarModule,
    DragDropModule,
    ScrollerModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbInputModule,
    NbButtonModule,
    NbToastrModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbChatModule,
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

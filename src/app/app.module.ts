import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WebviewDirective } from './directives/webview.directive';
// Services
import { ElectronService } from './providers/electron.service';
import { DatapeerService } from './providers/datapeer.service';
import { PeerconnectService } from './providers/peerconnect.service';
import { EncrDecrService } from './providers/encr-decr.service';

//Component
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HorarioComponent } from './components/horario/horario.component';
import { FormComponent } from './components/form/form.component';
import { NotesComponent } from './components/notes/notes.component';
import { HeaderComponent } from './components/header/header.component';
import { ChatComponent } from './components/chat/chat.component';
import { PlansComponent } from './components/plans/plans.component';
import { CardsComponent } from './components/cards/cards.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';

// modulos para animacion y estilos
import 'flatpickr/dist/flatpickr.css';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbCollapseModule, NgbTimepickerModule, NgbPopoverModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModules } from './material-config';



//Iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faAddressCard,faArchive, faBars, faComments ,faPlusCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import { ContactsComponent } from './components/contacts/contacts.component';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    HorarioComponent,
    FormComponent,
    HeaderComponent,
    ChatComponent,
    PlansComponent,
    CardsComponent,
    MainNavComponent,
    NotesComponent,
    ContactsComponent
  ],
  exports: [
    PlansComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModalModule,
    NgbCollapseModule,
    NgbTimepickerModule,
    NgbPopoverModule,NgbModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ToastrModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    LayoutModule,
    MaterialModules
  ],
  providers: [ElectronService,PeerconnectService, DatapeerService, EncrDecrService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    library.add(faCalendar,faAddressCard, faArchive, faBars, faComments, faPlusCircle, faTimesCircle);
  }
}

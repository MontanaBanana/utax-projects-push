import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HttpModule, Http, Response, BaseRequestOptions, RequestOptions, JsonpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReturnPage } from '../pages/return/return';
import { RequestedPage } from '../pages/requested/requested';
import { AppointmentPage } from '../pages/appointment/appointment';
import { AgreementPage } from '../pages/agreement/agreement';
import { StaffPage } from '../pages/staff/staff';
import { ContactPage } from '../pages/contact/contact';
import { CompanyPage } from '../pages/company/company';
import { TwitterPage } from '../pages/twitter/twitter';
import { FacebookPage } from '../pages/facebook/facebook';
import { PhotosPage } from '../pages/photos/photos';
import { SendAdditionalFormsPage } from '../pages/sendAdditionalForms/sendAdditionalForms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReturnPage,
    RequestedPage,
    AppointmentPage,
    AgreementPage,
    StaffPage,
    ContactPage,
    CompanyPage,
    TwitterPage,
    FacebookPage,
    PhotosPage,
    SendAdditionalFormsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReturnPage,
    RequestedPage,
    AppointmentPage,
    AgreementPage,
    StaffPage,
    ContactPage,
    CompanyPage,
    TwitterPage,
    FacebookPage,
    PhotosPage,
    SendAdditionalFormsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
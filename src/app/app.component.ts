import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';

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

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';


import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'https://taxmobileapp.com/apptemplate/app/457'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  lang: string = "en";
  translate: TranslateService;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public trans: TranslateService, private socialSharing: SocialSharing) {
    this.initializeApp();

  this.translate = trans;
    this.translate.setDefaultLang(this.lang);
  //translate.use('es');
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Return', component: ReturnPage },
      //{ title: 'Requested Forms', component: RequestedPage },
      { title: 'Appointment', component: AppointmentPage },
      { title: 'Agreement', component: AgreementPage },
      { title: 'Staff', component: StaffPage },
      { title: 'Contact', component: ContactPage },
      { title: 'Company', component: CompanyPage },
      { title: 'Twitter', component: TwitterPage },
      { title: 'Facebook', component: FacebookPage },
      { title: 'SendAdditionalForms', component: SendAdditionalFormsPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }
  
  swapLanguage() {
    if (this.lang == 'en') {
      this.lang = 'es';
    }
    else {
      this.lang = 'en';
    }
    this.translate.use(this.lang);
    MyApp.prototype.lang = this.lang;
  }

  openHome() { this.nav.setRoot(HomePage); }
  openReturn() { this.nav.setRoot(ReturnPage); }
  openAppointment() { this.nav.setRoot(AppointmentPage); }
  openAgreement() { this.nav.setRoot(AgreementPage); }
  openStaff() { this.nav.setRoot(StaffPage); }
  openContact() { this.nav.setRoot(ContactPage); }
  openCompany() { this.nav.setRoot(CompanyPage); }
  openTwitter() { this.nav.setRoot(TwitterPage); }
  openFacebook() { this.nav.setRoot(FacebookPage); }
  openSendAdditionalForms() { this.nav.setRoot(SendAdditionalFormsPage); }
  openShare() { this.socialSharing.share('Cain & All Professional Services', 'Cain & All Professional Services', 'https://taxmobileapp.com/images/projects/457-icon.png', 'https://taxmobileapp.com/share/457'); }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

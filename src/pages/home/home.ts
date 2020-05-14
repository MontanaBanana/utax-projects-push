import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { ReturnPage } from '../return/return';
import { RequestedPage } from '../requested/requested';
import { AppointmentPage } from '../appointment/appointment';
import { StaffPage } from '../staff/staff';
import { ContactPage } from '../contact/contact';
import { CompanyPage } from '../company/company';
import { SendAdditionalFormsPage } from '../sendAdditionalForms/sendAdditionalForms';

import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-home',
  templateUrl: 'https://taxmobileapp.com/apptemplate/home/542'
})
export class HomePage {
  public src;
  lang: string = "en";
  translate: TranslateService;

  constructor(public navCtrl: NavController,
              public http: Http, 
              public sanitizer: DomSanitizer, 
              public trans: TranslateService) 
  {
  	this.translate = trans;
	
  }

  swapLanguage() {
	  if (this.lang == 'en') {
		  this.lang = 'es';
	  }
	  else {
		  this.lang = 'en';
	  }
	  this.translate.use(this.lang);
	  HomePage.prototype.lang = this.lang;
  }
  
  goToReturn(event, item) {
    this.navCtrl.push(ReturnPage, {});
  }
  
  goToStaff(event, item) {
    this.navCtrl.push(StaffPage, {});
  }
  
  goToAppointment(event, item) {
    this.navCtrl.push(AppointmentPage, {});
  }
  
  goToContact(event, item) {
    this.navCtrl.push(ContactPage, {});
  }

  goToSendAdditionalForms(event, item) {
    this.navCtrl.push(SendAdditionalFormsPage, {});
  }

}

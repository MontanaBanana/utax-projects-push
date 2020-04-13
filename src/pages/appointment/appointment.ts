import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-appointment',
  templateUrl: 'https://taxmobileapp.com/apptemplate/appointment/517'
})
export class AppointmentPage {
  public src;

  constructor(public navCtrl: NavController, public http: Http, public sanitizer: DomSanitizer) {
	this.src = this.sanitizer.bypassSecurityTrustResourceUrl('https://taxmobileapp.com/blank.html');
	var projects = this.http.get('https://taxmobileapp.com/account/project/appointment_url/517');
			projects
				.map(res => res.json())
				.subscribe(data => {
					this.src = this.sanitizer.bypassSecurityTrustResourceUrl(data.appointment_url);
					console.log('my data: ', data);
				});
  }

}

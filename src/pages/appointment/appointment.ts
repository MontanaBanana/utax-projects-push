import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-appointment',
  templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/appointment/254'
})
export class AppointmentPage {
  public src;

  constructor(public navCtrl: NavController, public http: Http, public sanitizer: DomSanitizer) {
	this.src = this.sanitizer.bypassSecurityTrustResourceUrl('http://taxmobileapp-staging.montanab.com/blank.html');
	var projects = this.http.get('http://taxmobileapp-staging.montanab.com/account/project/appointment_url/254');
			projects
				.map(res => res.json())
				.subscribe(data => {
					this.src = this.sanitizer.bypassSecurityTrustResourceUrl(data.appointment_url);
					console.log('my data: ', data);
				});
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-appointment',
  templateUrl: '{hostname}/apptemplate/appointment/{project.id}'
})
export class AppointmentPage {
  public src;

  constructor(public navCtrl: NavController, public http: Http, public sanitizer: DomSanitizer) {
	this.src = this.sanitizer.bypassSecurityTrustResourceUrl('{hostname}/blank.html');
	var projects = this.http.get('{hostname}/account/project/appointment_url/{project.id}');
			projects
				.map(res => res.json())
				.subscribe(data => {
					this.src = this.sanitizer.bypassSecurityTrustResourceUrl(data.appointment_url);
					console.log('my data: ', data);
				});
  }

}

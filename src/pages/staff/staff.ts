import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-staff',
  templateUrl: 'https://taxmobileapp-staging.montanab.com/apptemplate/staff/130'
})
export class StaffPage {
  staff_items = [];
  constructor(public navCtrl: NavController, public http: Http) {
		var staff = this.http.get('https://taxmobileapp-staging.montanab.com/account/project/appstaff/130');
		staff
			.map(res => res.json())
			.subscribe(data => {
				this.staff_items = data.staff;
				console.log('my data: ', data);
			});
  }

}

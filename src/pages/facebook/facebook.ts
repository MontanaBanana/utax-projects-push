import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook.html'
})
export class FacebookPage {

  constructor(public navCtrl: NavController, public http: Http) {
	  
	var projects = this.http.get('https://taxmobileapp.com/account/project/facebook_url/476');
			projects
				.map(res => res.json())
				.subscribe(data => {
					window.open(data.facebook_url, '_system', 'location=yes');
					console.log('my data: ', data);
				});
	  
  }

/*  ionViewWillEnter() {
    window.open(facebookUrl, '_system', 'location=yes');
    return false;
  }
*/
  ionViewDidEnter() {
    this.navCtrl.setRoot(HomePage);
  }

}

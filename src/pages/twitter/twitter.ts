import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-twitter',
  templateUrl: 'twitter.html'
})
export class TwitterPage {

  constructor(public navCtrl: NavController, public http: Http) {
	var projects = this.http.get('https://taxmobileapp.com/account/project/twitter_url/276');
			projects
				.map(res => res.json())
				.subscribe(data => {
					window.open(data.twitter_url, '_system', 'location=yes');
					console.log('my data: ', data);
				});
  
  }
/*
  ionViewWillEnter() {
    window.open('https://twitter.com/MontanaBWeb', '_system', 'location=yes');
    return false;
  }
*/

  ionViewDidEnter() {
    this.navCtrl.setRoot(HomePage);
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-company',
  templateUrl: 'company.html'
})
export class CompanyPage {

  constructor(public navCtrl: NavController, public http: Http) {
	var projects = this.http.get('https://www.taxmobileapp.com/account/project/company_url/101');
			projects
				.map(res => res.json())
				.subscribe(data => {
					window.open(data.company_url, '_system', 'location=yes');
					console.log('my data: ', data);
				});
  
  
  }
/*
  ionViewWillEnter() {
    window.open('http://utaxmobile.com/', '_system', 'location=yes'); 
    return false;
  }
*/
  ionViewDidEnter() {
    this.navCtrl.setRoot(HomePage);
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-contact',
  templateUrl: 'https://taxmobileapp.com/apptemplate/contact/271'
})

export class ContactPage {
  location_items = [];
  map_url = '';

  constructor(public navCtrl: NavController, public http: Http, public plt: Platform, public iab: InAppBrowser) {
		if (this.plt.is('ios')) {
			this.map_url = 'maps:';
		}
		else if (this.plt.is('android')) {
			this.map_url = 'geo:';
		}
		else if (this.plt.is('mobileweb')) {
			this.map_url = '';
		}

		var locations = this.http.get('https://taxmobileapp.com/account/project/applocations/271');
		locations
			.map(res => res.json())
			.subscribe(data => {
				this.location_items = data.locations;
				console.log('my data: ', data);
			});
  }

  openUrl(address) {
        this.plt.ready().then(() => {
            //let browser = this.iab.open("https://maps.google.com",'_system','location=yes')
            let browser = this.iab.create("https://maps.google.com/?q="+address,'_system','location=yes');
	      /*.then(function(event) {
		// success
	      })
	      .catch(function(event) {
		// error
	      });*/
        });
  }    

}

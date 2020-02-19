import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ViewController } from "ionic-angular/index";
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { PhotosPage } from '../photos/photos';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-agreement',
  templateUrl: 'https://taxmobileapp.com/apptemplate/agreement/274'
})
export class AgreementPage {

    constructor(private nav:NavController, private viewCtrl:ViewController) {

    }

    dismissModal() {
	window.localStorage.setItem('accepted_agreement', '1');
	this.viewCtrl.dismiss();
    }

}

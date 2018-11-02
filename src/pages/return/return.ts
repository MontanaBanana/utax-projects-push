import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, Modal } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { PhotosPage } from '../photos/photos';
import { AgreementPage } from '../agreement/agreement';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-return',
  templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/return/254'
})
export class ReturnPage {

	cityValue:string = '';
	stateValue:string = '';

  constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController) {
        window.localStorage.setItem('accepted_agreement', '0');
  }

  ionViewDidEnter() {
	let modal = this.modalCtrl.create(AgreementPage);
	//modal.fireOtherLifecycles = false;
        modal.present();
  }

  /**
   * IF USER SELECTS 'REFERRAL', SHOW THE NAME FIELD
   */
  public onReferralTypeChange(selectedValue: any)
  {
    if ( selectedValue == "Referral")
    { //inline none
      document.getElementById('lbl_ref_name').style.display = 'inline';
      document.getElementById('ref_desc').style.display = 'inline';
    }
    else
    {
      document.getElementById('lbl_ref_name').style.display = 'none';
      document.getElementById('ref_desc').style.display = 'none';
    }
  }

  public submitReturn(form: any): void {
		//console.log('you submitted value:', form);


        if (window.localStorage.getItem('accepted_agreement') != '1') {
                let modal = this.modalCtrl.create(AgreementPage);
                modal.present();
        }
	else {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		form.project_id = 254;
		console.log(options);
		var p = this.http.post('http://taxmobileapp-staging.montanab.com/account/project/submitreturn', form, options)
					   .toPromise()
			   .then(
							data => { 
								//var response = data["user_id"];
								console.log(data.json());
								var my_data = data.json();
								console.log(my_data.user_id);
								//console.log(response.user_id);
								this.navCtrl.push(PhotosPage, {user_id: my_data.user_id});							
							},
							err => {
								alert('Couldn\'t submit return. Please try again later.');
							}
						)
			   .catch(this.handleErrorPromise);
		console.log(p);
	}

  }

  public checkIfAgreed() {
        if (!window.localStorage.getItem('accepted_agreement')) {
                let modal = this.modalCtrl.create(AgreementPage);
                modal.present();
        }
	return true;
  }

  check_deps(newValue) {
         if(newValue > 0) {
                 var i = 1;
                 while (i < 21) {
                        if(i <= newValue) {
                                document.getElementById('dependent_'+i).style.display = 'block';
                        } else {
                                document.getElementById('dependent_'+i).style.display = 'none';
                        }
                        i++;
                 }
                 document.getElementById('dependents').style.display = 'block';
         } else {
                 document.getElementById('dependents').style.display = 'none';
         }
  }

  
  zip_lookup(zipcode) {
	  if(zipcode <= 99950 && zipcode >= 501 && zipcode.length == 5) {
		var xmlhttp = new XMLHttpRequest();
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&sensor=true";
		var scope = this;
		
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var zipResponse = JSON.parse(this.responseText);
				var city = zipResponse.results[0].address_components[1].long_name;
				var state = zipResponse.results[0].address_components[3].long_name;

				scope.cityValue = city;
				scope.stateValue = state;
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	  }
  }
  
  show_spouse(filingStatus) {
	  if(filingStatus == 'married-filing-jointly' || filingStatus == 'married-filing-separately') {
		document.getElementById('spouse').style.display = 'block';
	  } else {
		 document.getElementById('spouse').style.display = 'none'; 
	  }
  }

    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }


}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, Modal, AlertController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotosPage } from '../photos/photos';
import { LoadingController } from 'ionic-angular';
import { AgreementPage } from '../agreement/agreement';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-return',
  templateUrl: 'https://taxmobileapp.com/apptemplate/return/481/version/1'
})
export class ReturnPage {

	cityValue:string = '';
	stateValue:string = '';
	public licensebase64Image: string;
	public uploadbase64Image: string;
	
	public address;
	public city;
	public date_of_birth;
	public driver_license;
	public email;
	public first_name;
	public id_expiration_date;
	public id_issue_date;
	public id_state;
	public last_name;
	public location;
	public middle_name;
	public phone;
	public spouse_ssn;
	public ssn;
	public zip;
	public referral_type;
	public referral_description;
	public referral_id;
	
	public bank_product;
	public direct_deposit;
	public refund_type:any = '';

	constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController, public alertCtrl: AlertController, public plt: Platform, private camera: Camera, public loadingCtrl: LoadingController) {
		window.localStorage.setItem('accepted_agreement', '0');
	
	}
	
	public formatPhoneInput(){
		var elem = document.getElementById('phone');
		console.log( elem );
	}
	

	ionViewDidEnter() {
		let modal = this.modalCtrl.create(AgreementPage);
		//modal.fireOtherLifecycles = false;
		modal.present();
	}
	
	
	/**
	 * format SSN
	 * as-you-type converts 111223333 into 111-22-3333
	 * note: error check on this new format with checkSsn()
	 */
	public formatSsn(fieldName: any)
	{ 
		/*
		if( fieldName == 'spouse_ssn'){
			this.spouse_ssn = this.spouse_ssn.toString().replace( /\s/g ,"").replace( /^(.{3,3})(.{2,2})(.{4,4})$/ ,"$1-$2-$3" );
		} else {
			this.ssn = this.ssn.toString().replace( /\s/g ,"").replace( /^(.{3,3})(.{2,2})(.{4,4})$/ ,"$1-$2-$3" ); 
		}
		*/
		
		if( fieldName == 'spouse_ssn' ){
			var formattedSsn = this.spouse_ssn;
		} else {
			var formattedSsn = this.ssn;
		}
		
		formattedSsn = formattedSsn.replace(/\D/g,'').substring(0,9); // First nine digits of input only
		
		var first3 = formattedSsn.substring(0,3);
		var next2 = formattedSsn.substring(3,5);
		var last4 = formattedSsn.substring(5,9);
		
		if( formattedSsn.length > 5 ){
			formattedSsn = first3 + '-' + next2 + '-' + last4;
		} else if( formattedSsn.length > 3 ){
			formattedSsn = first3 + '-' + next2;
		} else if( formattedSsn.length > 0 ){
			formattedSsn = first3;
		}
		
		if( fieldName == 'spouse_ssn' ){
			this.spouse_ssn = formattedSsn;
		} else {
			this.ssn = formattedSsn;
		}
		
	}
	
	
	/**
	 * format PHONE
	 * as-you-type converts 1112223333 into 111-222-3333
	 * note: error check on this new format with checkPhone()
	 */
	public formatPhone()
	{ 
		var formattedPhone = this.phone;
		formattedPhone = formattedPhone.replace(/\D/g,'').substring(0,10); // First ten digits of input only
		
		var zip = formattedPhone.substring(0,3);
		var middle = formattedPhone.substring(3,6);
		var last = formattedPhone.substring(6,10);
		
		if( formattedPhone.length > 6 ){
			formattedPhone = zip + '-' + middle + '-' + last;
		} else if( formattedPhone.length > 3 ){
			formattedPhone = zip + '-' + middle;
		} else if( formattedPhone.length > 0 ){
			formattedPhone = zip;
		}
		
		this.phone = formattedPhone;
		//this.phone = this.phone.replace( /\s/g ,"").replace( /^(.{3,3})(.{3,3})(.{4,4})$/ ,"$1-$2-$3" ).toString(); 
	}
	

	/**
	 * IF USER SELECTS 'REFERRAL', SHOW THE NAME FIELD
	 */
	public onReferralTypeChange(selectedValue: any)
	{
		if ( selectedValue == "Referral")
		{ //inline none
			document.getElementById('lbl_ref_name').style.display = 'block';
		}
		else
		{
			document.getElementById('lbl_ref_name').style.display = 'none';
		}
	}
	
	
	/**
	 * change id_state
	 */
	public setIdState(stateAbbv: any)
	{
		this.id_state = stateAbbv;
	}
	
	
	/**
	 * user selects withhold vs pay at filing
	 */
	onPaymentOptionsChange(e, name: any){
		
		//console.log(e);
		if( e._value == true ){
		
			if( name == 'bank_product' ){
				this.refund_type = 5;
				this.direct_deposit = false;
				this.direct_deposit.isChecked = false;
			} else if( name == 'direct_deposit' ){
				this.refund_type = 2;
				this.bank_product = false;
				this.bank_product.isChecked = false;
			}
			
		} else {
			
			this.refund_type = '';
		
		}
		
		console.log(name + ' / ' + this.refund_type);
	}


    public takePicture(){
        if (this.plt.is('ios')) {
            this.camera.getPicture({
                sourceType: 1,
                quality: 100,
                allowEdit: true,
                correctOrientation: true,
                saveToPhotoAlbum: false,
				targetWidth: 800,
				targetHeight: 800,
                destinationType: this.camera.DestinationType.DATA_URL,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE
            }).then((imageData) => {
				this.licensebase64Image = "data:image/jpeg;base64," + imageData;
                    this.presentLoading();
                    this.uploadbase64Image = imageData;
                    this.submitPhotos();
                }, (err) => {
                    console.log(err);
                });
        }
        else {
			this.camera.getPicture({
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: 1,
                quality: 100,
                allowEdit: false,
            }).then((imageData) => {
				this.licensebase64Image = "data:image/jpeg;base64," + imageData;
                    this.presentLoading();
                    this.uploadbase64Image = imageData;
                    this.submitPhotos();
                }, (err) => {
                    console.log(err);
                });
        }
    }


    public submitPhotos(): void {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var p = this.http.post('https://taxmobileapp.com/zxing-commandline/barcode.php', {imgData: this.uploadbase64Image, project_id: 481}, options)
                .subscribe(
                    data => {
						var scan_data = JSON.parse((<any>data)._body);
						this.address = scan_data.address;
						this.city = scan_data.city;
						this.cityValue = scan_data.city;
						this.date_of_birth = scan_data.date_of_birth;
						this.driver_license = scan_data.driver_license;
						this.first_name = scan_data.first_name;
						this.id_expiration_date = scan_data.id_expiration_date;
						this.id_issue_date = scan_data.id_issue_date;
						this.id_state = scan_data.id_state;
						this.stateValue = scan_data.id_state;
						this.last_name = scan_data.last_name;
						this.middle_name = scan_data.middle_name;
						this.zip = scan_data.zip;
						
						// change value of id_state select box
						this.setIdState(scan_data.id_state);
                    }
				);
        console.log(p);
    }


    public presentLoading() {
        let loader = this.loadingCtrl.create({
        	content: "Uploading...",
			duration: 1000
        });
        loader.present();
    }

    public presentSuccess() {
        let loader = this.loadingCtrl.create({
        	content: "Upload success!",
			duration: 500
        });
        loader.present();
    }


	public scanLicense() {
	
		/*
		this.barcodeScanner.scan(
		      {
			  preferFrontCamera : true, // iOS and Android
			  showFlipCameraButton : true, // iOS and Android
			  showTorchButton : true, // iOS and Android
			  torchOn: true, // Android, launch with the torch switched on (if available)
			  prompt : "Place a barcode inside the scan area", // Android
			  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
			  formats : "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
			  orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
			  disableAnimations : false, // iOS
			  disableSuccessBeep: false // iOS and Android
		      }).then((barcodeData) => {
			  alert("We got a barcode\n" +
				"Result: " + barcodeData.text + "\n" +
				"Format: " + barcodeData.format + "\n" +
				"Cancelled: " + barcodeData.cancelled);
		      }, (err) => { 
			  alert("Scanning failed: " + err);
		      }
		   );
		*/
	
	}
	

	public submitReturn(form: any): void {

		// add refund_type to form
		form.refund_type = this.refund_type;
		
		//console.log('you submitted value:', form);

		//required fields
		var formValid = true;
		
		//reset messages
		var errorsDivs = document.getElementsByClassName('validation-error') as HTMLCollectionOf<HTMLElement>;
	    for(var i = 0; i < errorsDivs.length; i++){
	        errorsDivs[i].style.display = "none";
	    }
		
		//Check for errors
		//first_name
		if(this.first_name == '' || typeof this.first_name === 'undefined') {
			document.getElementById('first_name_error').style.display = 'block';
			formValid = false;
		}
		
		//last_name
		if(this.last_name == '' || typeof this.last_name === 'undefined') {
			document.getElementById('last_name_error').style.display = 'block';
			formValid = false;
		}
		
		//ssn
		if(this.ssn == '' || typeof this.ssn === 'undefined') {
			document.getElementById('ssn_error').style.display = 'block';
			formValid = false;
		} else { 
			if(!this.checkSsn(this.ssn)) {
				alert('ssn not valid');
				document.getElementById('ssn_format_error').style.display = 'block';
				formValid = false;
			}
		}

		// referral_type / referral_description
		if (document.getElementById("how_did_you_required")) {
			// They have enabled this as required, so check it.
			if (this.referral_type == '' || typeof this.referral_type == 'undefined') {
				document.getElementById("how_did_you_hear_error").style.display = 'block';
				formValid = false;
			}

			if (this.isVisible(document.getElementById('lbl_ref_name'))) {
				if (this.referral_description == '' || typeof this.referral_description == 'undefined') {
					document.getElementById('referral_description_error').style.display = 'block';
					formValid = false;
				}
			}
		}
		
		// referral_id
		if (document.getElementById("referral_id_required")) {
			// They have enabled this as required, so check it.
			if (this.referral_id == '' || typeof this.referral_id == 'undefined') {
				document.getElementById("referral_id_error").style.display = 'block';
				formValid = false;
			}
		}
		
		//spouse_ssn
		if(this.isVisible(document.getElementById('spouse_ssn'))) {
			if(this.spouse_ssn == '' || typeof this.spouse_ssn === 'undefined') {
				document.getElementById('spouse_ssn_error').style.display = 'block';
				formValid = false;
			} else{ 
				if(!this.checkSsn(this.spouse_ssn)) {
					document.getElementById('spouse_ssn_format_error').style.display = 'block';
					formValid = false;
				}
			}
		}
		
		//phone
		if(this.phone == '' || typeof this.phone === 'undefined') {
			document.getElementById('phone_error').style.display = 'block';
			formValid = false;
		} else{
			if(!this.checkPhone(this.phone)) {
				document.getElementById('phone_format_error').style.display = 'block';
				formValid = false;
			}
		}
		
		//email
		if(this.email == '' || typeof this.email === 'undefined') {
			document.getElementById('email_error').style.display = 'block';
			formValid = false;
		}
		
		//location
		if(this.location == '' || typeof this.location === 'undefined') {
			document.getElementById('location_error').style.display = 'block';
			formValid = false;
		}
		

		if(formValid) {
	        if (window.localStorage.getItem('accepted_agreement') != '1') {
	        	let modal = this.modalCtrl.create(AgreementPage);
				modal.present();
	        }
			else {
				document.getElementById('submitButton').setAttribute('disabled', 'true');
				let headers = new Headers({ 'Content-Type': 'application/json' });
				let options = new RequestOptions({ headers: headers });
				form.project_id = 481;
				console.log(options);
				console.log(form);
				var p = this.http.post('https://www.taxmobileapp.com/account/project/submitreturn', form, options)
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
		} else {
			let alert = this.alertCtrl.create({
		    	subTitle: 'Please check the form for errors.',
				buttons: ['OK']
		    });
		    alert.present();
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
		if (zipcode <= 99950 && zipcode >= 501 && zipcode.length == 5) {
			var xmlhttp = new XMLHttpRequest();
			var url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC2KqTLcgrn-anE9CRggKM9-y2WNkc8fOM&address="+zipcode+"&sensor=true";
			var scope = this;
			
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var zipResponse = JSON.parse(this.responseText);
					//var city = zipResponse.results[0].address_components[1].long_name;
					//var state = zipResponse.results[0].address_components[3].long_name;
					var city = '';
					var state = '';
					var abbv = '';
					
					var address_components = zipResponse.results[0].address_components;
				    address_components.forEach(function(component){
				      var types = component.types;
						types.forEach(function(type){
							if(type == 'locality') {
								city = component.long_name;
							}
							if(type == 'sublocality') {
								city = component.long_name;
							}
							if(type == 'administrative_area_level_1') {
								state = component.long_name;
								abbv = component.short_name;
							}
						});
				    });
	
					scope.cityValue = city;
					//scope.stateValue = state;
					scope.stateValue = abbv;
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
	
	
	public checkPhone(inputtxt) {
		var phoneno = /^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})$/;
		var phonenoFormatted = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		if(inputtxt.match(phoneno) || inputtxt.match(phonenoFormatted)) {
			return true;
		}
		else {
			return false;
		}
	}

	
	public checkSsn(inputtxt) {
		var ssnno = /^\(?([0-9]{3})\)?([0-9]{2})?([0-9]{4})$/; // 111223333
		var ssnoWithDashes = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{2}[-\s\.]{0,1}[0-9]{4}$/; // 111-22-3333
		if(inputtxt.match(ssnno) || inputtxt.match(ssnoWithDashes)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	
	public isVisible(el) {
		return (el.offsetParent !== null)
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

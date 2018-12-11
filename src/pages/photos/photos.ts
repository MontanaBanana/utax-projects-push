import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-photos',
  templateUrl: 'https://taxmobileapp.com/apptemplate/photos/251'
})
export class PhotosPage {
	public user_id: string;
	public w2base64Image: string;
	public ten99base64Image: string;
	public sscbase64Image: string;
	public licensebase64Image: string;
	public miscbase64Image: string;
	public uploadbase64Image: string;
	
	public takePicture(img_name: string){
		if (this.plt.is('ios')) {
			this.camera.getPicture({
				sourceType: 1,
				targetWidth: 500,
				targetHeight: 500,
				quality: 50,
				allowEdit: false,
				correctOrientation: false,
				saveToPhotoAlbum: true,
				destinationType: this.camera.DestinationType.FILE_URI,
				encodingType: this.camera.EncodingType.JPEG,
				mediaType: this.camera.MediaType.PICTURE
			}).then((imageData) => {
				//alert(imageData);
			  // imageData is a base64 encoded string
			    //alert('img_name: ' + img_name);
				if (img_name == 'w2') {
					this.w2base64Image = imageData;
				}
				else if (img_name == 'ten99') {
					this.ten99base64Image = imageData;
				}
				else if (img_name == 'ssc') {
					this.sscbase64Image = imageData;
				}
				else if (img_name == 'license') {
					this.licensebase64Image = imageData;
				}
				else if (img_name == 'misc') {
					this.miscbase64Image = imageData;
				}
				this.uploadbase64Image = imageData;
				
				//this.presentLoading();
				//img = "data:image/jpeg;bases64," + 
				//this.w2base64Image = "data:image/jpeg;base64," + imageData;
			}, (err) => {
				console.log(err);
			});
		}
		else {
			this.camera.getPicture({
				destinationType: this.camera.DestinationType.DATA_URL,
				sourceType: 1,
				quality: 20,
				allowEdit: false,
			}).then((imageData) => {
			  // imageData is a base64 encoded string
			    //alert(imageData);
				if (img_name == 'w2') {
					this.w2base64Image = "data:image/jpeg;base64," + imageData;
				}
				else if (img_name == 'ten99') {
					this.ten99base64Image = "data:image/jpeg;base64," + imageData;
				}
				else if (img_name == 'ssc') {
					this.sscbase64Image = "data:image/jpeg;base64," + imageData;
				}
				else if (img_name == 'license') {
					this.licensebase64Image = "data:image/jpeg;base64," + imageData;
				}
				else if (img_name == 'misc') {
					this.miscbase64Image = "data:image/jpeg;base64," + imageData;
				}
				this.presentLoading();

				this.uploadbase64Image = imageData;
				this.submitPhotos(img_name);
				

			}, (err) => {
				console.log(err);
			});		
		}
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
	
	public goHome() {
		this.presentSuccess();
		this.navCtrl.push(HomePage);
	}

    public submitPhotos(img_name: string): void {
		//console.log('you submitted value:', form);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
		//console.log(options);
        var p = this.http.post('https://taxmobileapp.com/account/project/submitreturnimages', {imgData: this.uploadbase64Image, img_name: img_name, user_id: this.user_id, project_id: 251}, options)
				   .toPromise()
                   .then(
						data => {
							//this.presentSuccess();
							//alert(data);
							//var response = data["user_id"];
							//console.log(data.json());
							//var my_data = data.json();
							//console.log(my_data.user_id);
							//console.log(response.user_id);
							//this.navCtrl.push(PhotosPage, {user_id: my_data.user_id});							
						}
					)
                   .catch(this.handleErrorPromise);
        console.log(p);
    }

    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    private handleErrorPromise (error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }

	constructor(public http: Http, public navCtrl: NavController, private camera: Camera, public loadingCtrl: LoadingController, public plt: Platform, public navParams: NavParams) {

		//this.translate.setDefaultLang('es');	
		//this.translate.use('es');
		this.user_id = navParams.get('user_id');
		console.log('inside the photo page: ' + this.user_id);
		const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}
/*
		this.camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:
		 let base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
		 // Handle error
		});	
	*/
	}
	
	
}

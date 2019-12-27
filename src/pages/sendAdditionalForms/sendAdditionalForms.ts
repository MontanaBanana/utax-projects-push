import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-send-additional-forms',
  templateUrl: 'https://taxmobileapp.com/apptemplate/sendAdditionalForms/71'
})



export class SendAdditionalFormsPage {
  private imageURI: string;
  private image1URI: string = "";
  private image2URI: string = "";
  private image3URI: string = "";
  private image4URI: string = "";
  private image5URI: string = "";
  private image6URI: string = "";
  private image7URI: string = "";
  private image8URI: string = "";
  private image9URI: string = "";
  private image_data: any;
  private ssn: string = "";
  //sender: Observable<any>;

  constructor(public navCtrl:   NavController, 
  				public navParams: NavParams,
              			private http: Http, 
  				private camera: Camera, 
  				private loadingCtrl: LoadingController, 
				public plt: Platform, 
  				private toastCtrl:   ToastController) 
  {

  }

  getAdditionalImage() : void
  {
                if (this.plt.is('ios')) {
                        this.camera.getPicture({
                                sourceType: 1,
                                targetWidth: 1000,
                                targetHeight: 1000,
                                quality: 90,
                                allowEdit: false,
                                correctOrientation: false,
                                saveToPhotoAlbum: false,
                                destinationType: this.camera.DestinationType.DATA_URL,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE
                        }).then((imageData) => {
				this.image_data = imageData;
				this.imageURI = "data:image/jpeg;base64," + imageData;
                        }, (err) => {
                                console.log(err);
                        });
                }
                else {
                        this.camera.getPicture({
                                destinationType: this.camera.DestinationType.DATA_URL,
                                sourceType: 1,
                                quality: 90,
                                allowEdit: false,
                        }).then((imageData) => {
				this.image_data = imageData;
				this.imageURI = "data:image/jpeg;base64," + imageData;
                        }, (err) => {
                                console.log(err);
                        });
                }




  }


  uploadAdditionalFile()
  {
    if ( this.imageURI === null || this.imageURI === undefined )
    {
       this.presentToast("You must first select an image!");
       return;
    }

    if ( this.processSSN( this.ssn ) == false ) return;

    let loader = this.loadingCtrl.create({
                content: "Uploading..."
    });
    loader.present();

    let headers = new Headers();
    //headers.append( 'Accept', 'application/json' );
    headers.append( 'Content-Type', 'application/json' );

    const options = new RequestOptions({ headers: headers });

    let postData = {
                    img_data: this.image_data,
                    filename: String(Date.now()) + '.jpg',
                    usr_ssn: this.ssn,
                    project_id: '71'
    };

    if (this.image1URI.length == 0) {
	this.image1URI = this.imageURI;
    } 
    else if (this.image2URI.length == 0) {
	this.image2URI = this.imageURI;
    } 
    else if (this.image3URI.length == 0) {
	this.image3URI = this.imageURI;
    } 
    else if (this.image4URI.length == 0) {
	this.image4URI = this.imageURI;
    } 
    else if (this.image5URI.length == 0) {
	this.image5URI = this.imageURI;
    } 
    else if (this.image6URI.length == 0) {
	this.image6URI = this.imageURI;
    } 
    else if (this.image7URI.length == 0) {
	this.image7URI = this.imageURI;
    } 
    else if (this.image8URI.length == 0) {
	this.image8URI = this.imageURI;
    } 
    else if (this.image9URI.length == 0) {
	this.image9URI = this.imageURI;
    } 

    this.http.post('https://taxmobileapp.com/account/project/additional_uploads/addFiles', JSON.stringify(postData), options)
                .map(res => res.json())
                .subscribe(res => {
                                    console.log(res);
                                    loader.dismiss();
                                    this.presentToast("Image Uploaded Successfully");
                                  });
  }

  /**
   * CLEAN AND VALIDATE ENTERED SSN
   */
  processSSN( s:string )
  {
    let clean:string = "";

    for( let i:number = 0; i < s.length; i++ )
    {
      if ( s[i] == "-" ) continue;
      clean += s[i];
    }
    
    if ( clean.length < 9 || clean.length > 9 )
    {
       this.presentToast("Improper number of digits!");
       return false;
    } else {
      this.ssn = clean;
      return true;
    }
  }

  goHome()
  {
    this.navCtrl.setRoot(HomePage, {});
  }

  presentToast(msg) 
  {
  	let toast = this.toastCtrl.create({
  		message: msg,
  		duration: 3000,
  		position: 'bottom'
  	});

  	toast.onDidDismiss(() => {
  		console.log('Dismissed toast');
  	});

  	toast.present();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad SendAdditionalFilesPage');
  }

}

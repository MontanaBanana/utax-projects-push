import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-send-additional-forms',
  templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/sendAdditionalForms/254'
})



export class SendAdditionalFormsPage {
	public imageURI: any;
  public img_data: any;
  public ssn: string = "";
  //sender: Observable<any>;

  constructor(public navCtrl:   NavController, 
  						public navParams: NavParams,
              public http: Http, 
  						private camera:   Camera, 
  						public loadingCtrl: LoadingController, 
  						public toastCtrl:   ToastController) 
  {

  }

  getAdditionalImage()
  {
        const options: CameraOptions = {
                quality: 100,
                destinationType: this.camera.DestinationType.FILE_URI,
                sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }

    //TODO: find how to get filename out of returned object
        this.camera.getPicture(options).then((imageData) => {
          this.imageURI = "data:image/jpeg;base64," + imageData;
          this.img_data = imageData;
        }, (err) => {
                console.log(err);
                this.presentToast(err);
        });
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
                    img_data: this.img_data,
                    filename: String(Date.now()) + '.jpg',
                    usr_ssn: this.ssn,
                    project_id: '254'
    };

    this.http.post('http://taxmobileapp-staging.montanab.com/account/project/additional_uploads/addFiles', JSON.stringify(postData), options)
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

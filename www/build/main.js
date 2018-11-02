webpackJsonp([0],{

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReturnPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__photos_photos__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__agreement_agreement__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ReturnPage = (function () {
    function ReturnPage(navCtrl, http, modalCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.cityValue = '';
        this.stateValue = '';
        window.localStorage.setItem('accepted_agreement', '0');
    }
    ReturnPage.prototype.ionViewDidEnter = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__agreement_agreement__["a" /* AgreementPage */]);
        //modal.fireOtherLifecycles = false;
        modal.present();
    };
    /**
     * IF USER SELECTS 'REFERRAL', SHOW THE NAME FIELD
     */
    ReturnPage.prototype.onReferralTypeChange = function (selectedValue) {
        if (selectedValue == "Referral") {
            document.getElementById('lbl_ref_name').style.display = 'inline';
            document.getElementById('ref_desc').style.display = 'inline';
        }
        else {
            document.getElementById('lbl_ref_name').style.display = 'none';
            document.getElementById('ref_desc').style.display = 'none';
        }
    };
    ReturnPage.prototype.submitReturn = function (form) {
        //console.log('you submitted value:', form);
        var _this = this;
        if (window.localStorage.getItem('accepted_agreement') != '1') {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__agreement_agreement__["a" /* AgreementPage */]);
            modal.present();
        }
        else {
            var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
            form.project_id = 254;
            console.log(options);
            var p = this.http.post('http://taxmobileapp-staging.montanab.com/account/project/submitreturn', form, options)
                .toPromise()
                .then(function (data) {
                //var response = data["user_id"];
                console.log(data.json());
                var my_data = data.json();
                console.log(my_data.user_id);
                //console.log(response.user_id);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__photos_photos__["a" /* PhotosPage */], { user_id: my_data.user_id });
            }, function (err) {
                alert('Couldn\'t submit return. Please try again later.');
            })
                .catch(this.handleErrorPromise);
            console.log(p);
        }
    };
    ReturnPage.prototype.checkIfAgreed = function () {
        if (!window.localStorage.getItem('accepted_agreement')) {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__agreement_agreement__["a" /* AgreementPage */]);
            modal.present();
        }
        return true;
    };
    ReturnPage.prototype.check_deps = function (newValue) {
        if (newValue > 0) {
            var i = 1;
            while (i < 21) {
                if (i <= newValue) {
                    document.getElementById('dependent_' + i).style.display = 'block';
                }
                else {
                    document.getElementById('dependent_' + i).style.display = 'none';
                }
                i++;
            }
            document.getElementById('dependents').style.display = 'block';
        }
        else {
            document.getElementById('dependents').style.display = 'none';
        }
    };
    ReturnPage.prototype.zip_lookup = function (zipcode) {
        if (zipcode <= 99950 && zipcode >= 501 && zipcode.length == 5) {
            var xmlhttp = new XMLHttpRequest();
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipcode + "&sensor=true";
            var scope = this;
            xmlhttp.onreadystatechange = function () {
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
    };
    ReturnPage.prototype.show_spouse = function (filingStatus) {
        if (filingStatus == 'married-filing-jointly' || filingStatus == 'married-filing-separately') {
            document.getElementById('spouse').style.display = 'block';
        }
        else {
            document.getElementById('spouse').style.display = 'none';
        }
    };
    ReturnPage.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.message || error);
    };
    ReturnPage.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    return ReturnPage;
}());
ReturnPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-return',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/return/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]])
], ReturnPage);

//# sourceMappingURL=return.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgreementPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AgreementPage = (function () {
    function AgreementPage(nav, viewCtrl) {
        this.nav = nav;
        this.viewCtrl = viewCtrl;
    }
    AgreementPage.prototype.dismissModal = function () {
        window.localStorage.setItem('accepted_agreement', '1');
        this.viewCtrl.dismiss();
    };
    return AgreementPage;
}());
AgreementPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-agreement',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/agreement/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["k" /* ViewController */]])
], AgreementPage);

//# sourceMappingURL=agreement.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppointmentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppointmentPage = (function () {
    function AppointmentPage(navCtrl, http, sanitizer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.sanitizer = sanitizer;
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl('http://taxmobileapp-staging.montanab.com/blank.html');
        var projects = this.http.get('http://taxmobileapp-staging.montanab.com/account/project/appointment_url/254');
        projects
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.src = _this.sanitizer.bypassSecurityTrustResourceUrl(data.appointment_url);
            console.log('my data: ', data);
        });
    }
    return AppointmentPage;
}());
AppointmentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-appointment',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/appointment/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]])
], AppointmentPage);

//# sourceMappingURL=appointment.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StaffPage = (function () {
    function StaffPage(navCtrl, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.staff_items = [];
        var staff = this.http.get('http://taxmobileapp-staging.montanab.com/account/project/appstaff/254');
        staff
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.staff_items = data.staff;
            console.log('my data: ', data);
        });
    }
    return StaffPage;
}());
StaffPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-staff',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/staff/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], StaffPage);

//# sourceMappingURL=staff.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ContactPage = (function () {
    function ContactPage(navCtrl, http, plt, iab) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.plt = plt;
        this.iab = iab;
        this.location_items = [];
        this.map_url = '';
        if (this.plt.is('ios')) {
            this.map_url = 'maps:';
        }
        else if (this.plt.is('android')) {
            this.map_url = 'geo:';
        }
        else if (this.plt.is('mobileweb')) {
            this.map_url = '';
        }
        var locations = this.http.get('http://taxmobileapp-staging.montanab.com/account/project/applocations/254');
        locations
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.location_items = data.locations;
            console.log('my data: ', data);
        });
    }
    ContactPage.prototype.openUrl = function (address) {
        var _this = this;
        this.plt.ready().then(function () {
            //let browser = this.iab.open("https://maps.google.com",'_system','location=yes')
            var browser = _this.iab.create("https://maps.google.com/?q=" + address, '_system', 'location=yes');
            /*.then(function(event) {
          // success
            })
            .catch(function(event) {
          // error
            });*/
        });
    };
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/contact/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendAdditionalFormsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SendAdditionalFormsPage = (function () {
    //sender: Observable<any>;
    function SendAdditionalFormsPage(navCtrl, navParams, http, camera, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.ssn = "";
    }
    SendAdditionalFormsPage.prototype.getAdditionalImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        //TODO: find how to get filename out of returned object
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = "data:image/jpeg;base64," + imageData;
            _this.img_data = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    SendAdditionalFormsPage.prototype.uploadAdditionalFile = function () {
        var _this = this;
        if (this.imageURI === null || this.imageURI === undefined) {
            this.presentToast("You must first select an image!");
            return;
        }
        if (this.processSSN(this.ssn) == false)
            return;
        var loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        //headers.append( 'Accept', 'application/json' );
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var postData = {
            img_data: this.img_data,
            filename: String(Date.now()) + '.jpg',
            usr_ssn: this.ssn,
            project_id: '254'
        };
        this.http.post('http://taxmobileapp-staging.montanab.com/account/project/additional_uploads/addFiles', JSON.stringify(postData), options)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(res);
            loader.dismiss();
            _this.presentToast("Image Uploaded Successfully");
        });
    };
    /**
     * CLEAN AND VALIDATE ENTERED SSN
     */
    SendAdditionalFormsPage.prototype.processSSN = function (s) {
        var clean = "";
        for (var i = 0; i < s.length; i++) {
            if (s[i] == "-")
                continue;
            clean += s[i];
        }
        if (clean.length < 9 || clean.length > 9) {
            this.presentToast("Improper number of digits!");
            return false;
        }
        else {
            this.ssn = clean;
            return true;
        }
    };
    SendAdditionalFormsPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */], {});
    };
    SendAdditionalFormsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SendAdditionalFormsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendAdditionalFilesPage');
    };
    return SendAdditionalFormsPage;
}());
SendAdditionalFormsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-send-additional-forms',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/sendAdditionalForms/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
], SendAdditionalFormsPage);

//# sourceMappingURL=sendAdditionalForms.js.map

/***/ }),

/***/ 178:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 178;

/***/ }),

/***/ 222:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 222;

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PhotosPage = (function () {
    function PhotosPage(http, navCtrl, camera, loadingCtrl, plt, navParams) {
        this.http = http;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.plt = plt;
        this.navParams = navParams;
        //this.translate.setDefaultLang('es');	
        //this.translate.use('es');
        this.user_id = navParams.get('user_id');
        console.log('inside the photo page: ' + this.user_id);
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
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
    PhotosPage.prototype.takePicture = function (img_name) {
        var _this = this;
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
            }).then(function (imageData) {
                //alert(imageData);
                // imageData is a base64 encoded string
                //alert('img_name: ' + img_name);
                if (img_name == 'w2') {
                    _this.w2base64Image = imageData;
                }
                else if (img_name == 'ten99') {
                    _this.ten99base64Image = imageData;
                }
                else if (img_name == 'ssc') {
                    _this.sscbase64Image = imageData;
                }
                else if (img_name == 'license') {
                    _this.licensebase64Image = imageData;
                }
                else if (img_name == 'misc') {
                    _this.miscbase64Image = imageData;
                }
                _this.uploadbase64Image = imageData;
                //this.presentLoading();
                //img = "data:image/jpeg;bases64," + 
                //this.w2base64Image = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.camera.getPicture({
                destinationType: this.camera.DestinationType.DATA_URL,
                sourceType: 1,
                quality: 20,
                allowEdit: false,
            }).then(function (imageData) {
                // imageData is a base64 encoded string
                //alert(imageData);
                if (img_name == 'w2') {
                    _this.w2base64Image = "data:image/jpeg;base64," + imageData;
                }
                else if (img_name == 'ten99') {
                    _this.ten99base64Image = "data:image/jpeg;base64," + imageData;
                }
                else if (img_name == 'ssc') {
                    _this.sscbase64Image = "data:image/jpeg;base64," + imageData;
                }
                else if (img_name == 'license') {
                    _this.licensebase64Image = "data:image/jpeg;base64," + imageData;
                }
                else if (img_name == 'misc') {
                    _this.miscbase64Image = "data:image/jpeg;base64," + imageData;
                }
                _this.presentLoading();
                _this.uploadbase64Image = imageData;
                _this.submitPhotos(img_name);
            }, function (err) {
                console.log(err);
            });
        }
    };
    PhotosPage.prototype.presentLoading = function () {
        var loader = this.loadingCtrl.create({
            content: "Uploading...",
            duration: 1000
        });
        loader.present();
    };
    PhotosPage.prototype.presentSuccess = function () {
        var loader = this.loadingCtrl.create({
            content: "Upload success!",
            duration: 500
        });
        loader.present();
    };
    PhotosPage.prototype.goHome = function () {
        this.presentSuccess();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
    };
    PhotosPage.prototype.submitPhotos = function (img_name) {
        //console.log('you submitted value:', form);
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        //console.log(options);
        var p = this.http.post('http://taxmobileapp-staging.montanab.com/account/project/submitreturnimages', { imgData: this.uploadbase64Image, img_name: img_name, user_id: this.user_id, project_id: 254 }, options)
            .toPromise()
            .then(function (data) {
            //this.presentSuccess();
            //alert(data);
            //var response = data["user_id"];
            //console.log(data.json());
            //var my_data = data.json();
            //console.log(my_data.user_id);
            //console.log(response.user_id);
            //this.navCtrl.push(PhotosPage, {user_id: my_data.user_id});							
        })
            .catch(this.handleErrorPromise);
        console.log(p);
    };
    PhotosPage.prototype.handleErrorObservable = function (error) {
        console.error(error.message || error);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(error.message || error);
    };
    PhotosPage.prototype.handleErrorPromise = function (error) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    };
    return PhotosPage;
}());
PhotosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-photos',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/photos/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], PhotosPage);

//# sourceMappingURL=photos.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CompanyPage = (function () {
    function CompanyPage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        var projects = this.http.get('http://taxmobileapp-staging.montanab.com/account/project/company_url/254');
        projects
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
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
    CompanyPage.prototype.ionViewDidEnter = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    return CompanyPage;
}());
CompanyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-company',template:/*ion-inline-start:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/company/company.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{"Company"|translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    &nbsp;\n\n</ion-content>\n\n'/*ion-inline-end:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/company/company.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], CompanyPage);

//# sourceMappingURL=company.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TwitterPage = (function () {
    function TwitterPage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        var projects = this.http.get('http://taxmobileapp-staging.montanab.com/account/project/twitter_url/254');
        projects
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
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
    TwitterPage.prototype.ionViewDidEnter = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    return TwitterPage;
}());
TwitterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-twitter',template:/*ion-inline-start:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/twitter/twitter.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{"Twitter"|translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    &nbsp;\n\n</ion-content>\n\n'/*ion-inline-end:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/twitter/twitter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], TwitterPage);

//# sourceMappingURL=twitter.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FacebookPage = (function () {
    function FacebookPage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        var projects = this.http.get('http://taxmobileapp-staging.montanab.com/account/project/facebook_url/254');
        projects
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            window.open(data.facebook_url, '_system', 'location=yes');
            console.log('my data: ', data);
        });
    }
    /*  ionViewWillEnter() {
        window.open(facebookUrl, '_system', 'location=yes');
        return false;
      }
    */
    FacebookPage.prototype.ionViewDidEnter = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    return FacebookPage;
}());
FacebookPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-facebook',template:/*ion-inline-start:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/facebook/facebook.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{"Facebook"|translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    &nbsp;\n\n</ion-content>\n\n'/*ion-inline-end:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/facebook/facebook.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]])
], FacebookPage);

//# sourceMappingURL=facebook.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(382);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_return_return__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_requested_requested__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_appointment_appointment__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_agreement_agreement__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_staff_staff__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_contact_contact__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_company_company__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_twitter_twitter__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_facebook_facebook__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_photos_photos__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_sendAdditionalForms_sendAdditionalForms__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__ = __webpack_require__(285);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_return_return__["a" /* ReturnPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_requested_requested__["a" /* RequestedPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_appointment_appointment__["a" /* AppointmentPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_agreement_agreement__["a" /* AgreementPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_staff_staff__["a" /* StaffPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_company_company__["a" /* CompanyPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_twitter_twitter__["a" /* TwitterPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_facebook_facebook__["a" /* FacebookPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_photos_photos__["a" /* PhotosPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_sendAdditionalForms_sendAdditionalForms__["a" /* SendAdditionalFormsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */]]
                }
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_return_return__["a" /* ReturnPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_requested_requested__["a" /* RequestedPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_appointment_appointment__["a" /* AppointmentPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_agreement_agreement__["a" /* AgreementPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_staff_staff__["a" /* StaffPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_company_company__["a" /* CompanyPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_twitter_twitter__["a" /* TwitterPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_facebook_facebook__["a" /* FacebookPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_photos_photos__["a" /* PhotosPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_sendAdditionalForms_sendAdditionalForms__["a" /* SendAdditionalFormsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_return_return__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_appointment_appointment__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_agreement_agreement__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_staff_staff__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_contact_contact__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_company_company__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_twitter_twitter__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_facebook_facebook__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_sendAdditionalForms_sendAdditionalForms__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = MyApp_1 = (function () {
    function MyApp(platform, statusBar, splashScreen, trans) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.trans = trans;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.lang = "en";
        this.initializeApp();
        this.translate = trans;
        this.translate.setDefaultLang(this.lang);
        //translate.use('es');
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Return', component: __WEBPACK_IMPORTED_MODULE_5__pages_return_return__["a" /* ReturnPage */] },
            //{ title: 'Requested Forms', component: RequestedPage },
            { title: 'Appointment', component: __WEBPACK_IMPORTED_MODULE_6__pages_appointment_appointment__["a" /* AppointmentPage */] },
            { title: 'Agreement', component: __WEBPACK_IMPORTED_MODULE_7__pages_agreement_agreement__["a" /* AgreementPage */] },
            { title: 'Staff', component: __WEBPACK_IMPORTED_MODULE_8__pages_staff_staff__["a" /* StaffPage */] },
            { title: 'Contact', component: __WEBPACK_IMPORTED_MODULE_9__pages_contact_contact__["a" /* ContactPage */] },
            { title: 'Company', component: __WEBPACK_IMPORTED_MODULE_10__pages_company_company__["a" /* CompanyPage */] },
            { title: 'Twitter', component: __WEBPACK_IMPORTED_MODULE_11__pages_twitter_twitter__["a" /* TwitterPage */] },
            { title: 'Facebook', component: __WEBPACK_IMPORTED_MODULE_12__pages_facebook_facebook__["a" /* FacebookPage */] },
            { title: 'SendAdditionalForms', component: __WEBPACK_IMPORTED_MODULE_13__pages_sendAdditionalForms_sendAdditionalForms__["a" /* SendAdditionalFormsPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            //this.splashScreen.hide();
        });
    };
    MyApp.prototype.swapLanguage = function () {
        if (this.lang == 'en') {
            this.lang = 'es';
        }
        else {
            this.lang = 'en';
        }
        this.translate.use(this.lang);
        MyApp_1.prototype.lang = this.lang;
    };
    MyApp.prototype.openHome = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]); };
    MyApp.prototype.openReturn = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_return_return__["a" /* ReturnPage */]); };
    MyApp.prototype.openAppointment = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_appointment_appointment__["a" /* AppointmentPage */]); };
    MyApp.prototype.openAgreement = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_agreement_agreement__["a" /* AgreementPage */]); };
    MyApp.prototype.openStaff = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_8__pages_staff_staff__["a" /* StaffPage */]); };
    MyApp.prototype.openContact = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_contact_contact__["a" /* ContactPage */]); };
    MyApp.prototype.openCompany = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_10__pages_company_company__["a" /* CompanyPage */]); };
    MyApp.prototype.openTwitter = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_11__pages_twitter_twitter__["a" /* TwitterPage */]); };
    MyApp.prototype.openFacebook = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_12__pages_facebook_facebook__["a" /* FacebookPage */]); };
    MyApp.prototype.openSendAdditionalForms = function () { this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_sendAdditionalForms_sendAdditionalForms__["a" /* SendAdditionalFormsPage */]); };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = MyApp_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/app/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_14__ngx_translate_core__["c" /* TranslateService */]])
], MyApp);

var MyApp_1;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__return_return__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__appointment_appointment__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__staff_staff__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_contact__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sendAdditionalForms_sendAdditionalForms__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_toPromise__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = HomePage_1 = (function () {
    function HomePage(navCtrl, http, sanitizer, trans) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.sanitizer = sanitizer;
        this.trans = trans;
        this.lang = "en";
        this.translate = trans;
    }
    HomePage.prototype.swapLanguage = function () {
        if (this.lang == 'en') {
            this.lang = 'es';
        }
        else {
            this.lang = 'en';
        }
        this.translate.use(this.lang);
        HomePage_1.prototype.lang = this.lang;
    };
    HomePage.prototype.goToReturn = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__return_return__["a" /* ReturnPage */], {});
    };
    HomePage.prototype.goToStaff = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__staff_staff__["a" /* StaffPage */], {});
    };
    HomePage.prototype.goToAppointment = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__appointment_appointment__["a" /* AppointmentPage */], {});
    };
    HomePage.prototype.goToContact = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__contact_contact__["a" /* ContactPage */], {});
    };
    HomePage.prototype.goToSendAdditionalForms = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__sendAdditionalForms_sendAdditionalForms__["a" /* SendAdditionalFormsPage */], {});
    };
    return HomePage;
}());
HomePage = HomePage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',
        templateUrl: 'http://taxmobileapp-staging.montanab.com/apptemplate/home/254'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["c" /* DomSanitizer */],
        __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */]])
], HomePage);

var HomePage_1;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RequestedPage = (function () {
    function RequestedPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return RequestedPage;
}());
RequestedPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-requested',template:/*ion-inline-start:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/requested/requested.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>{{"Requested"|translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <h3>Requested</h3>\n\n\n\n  <p>\n\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam id lacus sagittis ultricies. Cras dapibus venenatis tellus, dictum hendrerit quam eleifend et. Morbi quis lorem lectus. Aliquam finibus massa posuere efficitur tincidunt. Quisque et elit vitae elit feugiat condimentum ut ac velit. Aliquam ligula dolor, iaculis ut rhoncus sit amet, molestie quis orci.\n\n  </p>\n\n</ion-content>\n\n'/*ion-inline-end:"/var/www/vhosts/taxmobileapp-staging.montanab.com/httpdocs/public/projects/254/utax-ionic-template/src/pages/requested/requested.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], RequestedPage);

//# sourceMappingURL=requested.js.map

/***/ })

},[377]);
//# sourceMappingURL=main.js.map
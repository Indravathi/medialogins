import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  FB_APP_ID: number = 495858277463909;
  constructor(public navCtrl: NavController, 	public fb: Facebook,) {
    this.fb.browserInit(this.FB_APP_ID, "v2.8");
  }
  connectwithfb(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
	 let env = this;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.fb.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      env.fb.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        alert(user.name);
        alert(user.gender);
        alert(user.picture);
        // env.nativeStorage.setItem('user',
        // {
        //   name: user.name,
        //   gender: user.gender,
        //   picture: user.picture
        // })
        // .then(function(){
        //   nav.push(UserPage);
        // }, function (error) {
        //   console.log(error);
        // })
      })
    }, function(error){
     alert(error);
    });
  }

  connectwithgoogle(){
    alert(9);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EventsServiceService } from '../events-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  router:  Router, 
              private http: HttpClient,
              public alertController: AlertController,
              public storage: Storage,
              public events: EventsServiceService) { 

  }

  ngOnInit() {

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'OPS!',
      subHeader: '',
      message: 'Credenciais invalidas',
      buttons: ['OK']
    });

    await alert.present();
  }

  login(form){
    let data = {
      username: form.value.username,
      password: form.value.password
    }

    this.http.post("http://localhost:8001/login", data, {
      headers: { 
        'Access-Control-Allow-Origin': '*' ,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json', 
        "Access-Control-Allow-Credentials": "true",
        'Content-Type': 'application/json', 
      }
    })
      .subscribe(data => {
        //console.log(data)
        if (data[0]) {
          this.storage.set('user', data[0]);
          this.events.publishSomeData({
            userType: data[0]["TipoPessoa"],
            user: data[0]
          })
        
          this.router.navigateByUrl('folder/Inbox');
        } else {
          this.presentAlert()
        }
       }, error => {
        this.presentAlert()
        console.log(error);
      });
  }
}

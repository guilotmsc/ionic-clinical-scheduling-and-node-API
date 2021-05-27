import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EventsServiceService } from '../events-service.service';
//import { timeStamp } from 'console';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

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
    message: 'Dados inválidos',
    buttons: ['OK']
    });

    await alert.present();
  }

  async successAlert() {
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Sucesso!',
    subHeader: '',
    message: 'Senha alterada com sucesso',
    buttons: ['OK']
    });

    await alert.present();
  }

  reset(form){
    let data = {
      cpf: form.value.cpf,
      contact: form.value.contact,
      password: form.value.password
    }

    this.http.post("http://localhost:8001/reset-password", data, {
      headers: { 
        'Access-Control-Allow-Origin': '*' ,
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Accept': 'application/json', 
        "Access-Control-Allow-Credentials": "true",
        'Content-Type': 'application/json', 
      }
    })
      .subscribe(data => {
        console.log(data)
        if (data[0]) {
          this.successAlert()
        
          this.router.navigateByUrl('/login');
        } else {
          this.presentAlert()
        }
       }, error => {
        this.presentAlert()
        console.log(error);
      });
  }

}

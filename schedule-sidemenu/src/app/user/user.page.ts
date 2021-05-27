import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private  router:  Router, 
              private http: HttpClient,
              public alertController: AlertController) { }

  ngOnInit() {

  }

  async presentAlert(title, message) {
    const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: title,
    subHeader: '',
    message: message,
    buttons: ['OK']
    });

    await alert.present();
  }

  handleSubmit(form){
    let data = {
      username: form.value.username,
      password: form.value.password,
      people: form.value.people,
    }

    this.http.post("http://localhost:8001/register", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Concluído!', 'Seu cadastro realizado com sucesso!')
        this.router.navigateByUrl('folder/Inbox');
       }, error => {    
        console.log(error);
      });
  }
}

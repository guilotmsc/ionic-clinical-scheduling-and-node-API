import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agreement-type',
  templateUrl: './agreement-type.page.html',
  styleUrls: ['./agreement-type.page.scss'],
})
export class AgreementTypePage implements OnInit {

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
      description: form.value.description
    }

    this.http.post("http://localhost:8001/procedure-type", data, {
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

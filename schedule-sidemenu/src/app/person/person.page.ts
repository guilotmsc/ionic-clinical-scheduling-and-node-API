import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})

export class PersonPage implements OnInit {

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
      name: form.value.name,
      username: form.value.username,
      birthdate: form.value.birthdate,
      document: form.value.document,
      gender: form.value.gender,
      cpf: form.value.cpf,
      naturalness: form.value.naturalness,
      civil_status: form.value.civil_status,
      nationality: form.value.nationality,
      schooling: form.value.schooling,
      previous_profession: form.value.previous_profession,
      current_profession: form.value.current_profession,
      emergency_contact: form.value.emergency_contact,
      degree_of_kinship: form.value.degree_of_kinship,
      type: form.value.type
    }

    this.http.post("http://localhost:8001/person", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        if (data[0]) {
          this.presentAlert('Concluído!', 'Seu cadastro realizado com sucesso!')
          this.router.navigateByUrl('/person-list');
        } else {
          this.presentAlert('OPS!', 'Ocorreu um erro ao realizar o cadastro.')
        }
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Ocorreu um erro ao realizar o cadastro.')
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.page.html',
  styleUrls: ['./specialist.page.scss'],
})
export class SpecialistPage implements OnInit {

  public people: any[] = []

  constructor(private  router:  Router, 
              private http: HttpClient,
              public alertController: AlertController) { }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getPeople()
  }

  getPeople() {
    this.http.get('http://localhost:8001/specialists-by-type', {})
      .subscribe((data: any[]) => {
        this.people = [];

        for (let i = 0; i < data.length; i++) {
          this.people.push(data[i])
        }
      })
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
      specialty: form.value.specialty,
      crm: form.value.crm,
      person: form.value.person,
    }

    this.http.post("http://localhost:8001/specialist", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Concluído!', 'Seu cadastro realizado com sucesso!')
        this.router.navigateByUrl('/specialist-list');
       }, error => {    
        console.log(error);
      });
  }
}

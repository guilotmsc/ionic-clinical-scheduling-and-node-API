import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.page.html',
  styleUrls: ['./specialist-list.page.scss'],
})
export class SpecialistListPage implements OnInit {

  public specialists: any[] = []

  constructor(private  router:  Router,
              private http: HttpClient,
              public alertController: AlertController) {
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getSpecialists()
  }

  getSpecialists() {
    this.http.get('http://localhost:8001/specialists', {})
      .subscribe((data: any[]) => {
        this.specialists = [];

        for (let i = 0; i < data.length; i++) {
          this.specialists.push(data[i])
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

  async delete(id) {
    let data = {
      id: id
    }

    this.http.post("http://localhost:8001/specialist/delete", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Feito!', 'Especialista removido com sucesso!')
        this.getSpecialists()
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Especialista já vinculado, não pode ser removido!')
      });
  }

}

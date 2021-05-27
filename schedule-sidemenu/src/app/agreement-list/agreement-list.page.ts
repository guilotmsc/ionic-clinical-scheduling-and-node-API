import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.page.html',
  styleUrls: ['./agreement-list.page.scss'],
})

export class AgreementListPage implements OnInit {

  public agreements: any[] = []

  constructor(private  router:  Router,
              private http: HttpClient,
              public alertController: AlertController) {
    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getAgreements()
  }

  getAgreements() {
    this.http.get('http://localhost:8001/agreements', {})
      .subscribe((data: any[]) => {
        this.agreements = [];

        for (let i = 0; i < data.length; i++) {
          this.agreements.push(data[i])
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

    this.http.post("http://localhost:8001/agreement/delete", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Feito!', 'Convênio removido com sucesso!')
        this.getAgreements()
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Convênio já vinculado, não pode ser removido!')
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.page.html',
  styleUrls: ['./procedure-list.page.scss'],
})
export class ProcedureListPage implements OnInit {

  public procedures: any[] = []

  constructor(private  router:  Router,
              private http: HttpClient,
              public alertController: AlertController) {
    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getProcedures()
  }

  getProcedures() {
    this.http.get('http://localhost:8001/procedures', {})
      .subscribe((data: any[]) => {
        this.procedures = [];

        for (let i = 0; i < data.length; i++) {
          this.procedures.push(data[i])
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

    this.http.post("http://localhost:8001/procedure/delete", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Feito!', 'Procedimento removido com sucesso!')
        this.getProcedures()
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Procedimento já vinculado, não pode ser removido!')
      });
  }

}

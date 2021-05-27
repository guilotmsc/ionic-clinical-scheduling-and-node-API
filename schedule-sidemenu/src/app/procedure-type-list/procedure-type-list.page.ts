import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-procedure-type-list',
  templateUrl: './procedure-type-list.page.html',
  styleUrls: ['./procedure-type-list.page.scss'],
})
export class ProcedureTypeListPage implements OnInit {

  public procedureTypes: any[] = []

  constructor(private  router:  Router,
              private http: HttpClient,
              public alertController: AlertController) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getProcedureTypes()
  }

  getProcedureTypes() {
    this.http.get('http://localhost:8001/procedure-types', {})
      .subscribe((data: any[]) => {
        this.procedureTypes = [];

        for (let i = 0; i < data.length; i++) {
          this.procedureTypes.push(data[i])
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

    this.http.post("http://localhost:8001/procedure-type/delete", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Feito!', 'Tipo de Procedimento removido com sucesso!')
        this.getProcedureTypes()
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Tipo de Procedimento já vinculado, não pode ser removido!')
      });
  }

}

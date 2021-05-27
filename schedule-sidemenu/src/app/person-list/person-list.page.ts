import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.page.html',
  styleUrls: ['./person-list.page.scss'],
})
export class PersonListPage implements OnInit {

  public people: any[] = []

  constructor(private  router:  Router,
              private http: HttpClient,
              public alertController: AlertController,
              public storage: Storage) {
    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getPeople()
  }

  getPeople() {
    this.http.get('http://localhost:8001/people', {})
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

  edit(person) {
    this.storage.set('person', person)
    this.router.navigateByUrl('/person-edit');
  }

  async delete(id) {
    let data = {
      id: id
    }

    console.log(id)

    this.http.post("http://localhost:8001/person/delete", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Feito!', 'Pessoa removida com sucesso!')
        this.getPeople()
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Pessoa já vinculada, não pode ser removida!')
      });
  }

}

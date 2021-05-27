import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';
import { EventsServiceService } from '../events-service.service';
import { AppComponent } from '../app.component'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.page.html',
  styleUrls: ['./schedule-list.page.scss'],
})
export class ScheduleListPage implements OnInit {

  public schedules: any[] = []
  public userType = '';

  constructor(private  router:  Router,
              private http: HttpClient,
              public alertController: AlertController,
              public storage: Storage,
              public events: EventsServiceService) {
    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getSchedules()
  }

  getSchedules() {
    this.storage.get('user').then((val) => {
      let query = ''

      this.userType = val["TipoPessoa"]

      if (val["TipoPessoa"] === 'Fisioterapeuta') {
        query = ' where especialista.IdPessoa = ' + val["IdPessoa"]
      } else if (val["TipoPessoa"] === 'Paciente') {
        query = ' where pessoa.IdPessoa = ' + val["IdPessoa"]
      }
    
      this.http.get('http://localhost:8001/schedules?query=' + query, {})
        .subscribe((data: any[]) => {
          this.schedules = [];

          for (let i = 0; i < data.length; i++) {
            this.schedules.push(data[i])
          }
        })
    });
  }

  newAppointment(schedule) {
    if (schedule.Status === 1) {
      return
    }

    this.storage.get('user').then((val) => {
      let query = ''

      this.userType = val["TipoPessoa"]

      if (val["TipoPessoa"] === 'Fisioterapeuta') {
        this.storage.set('schedule', schedule)
  
        this.router.navigateByUrl('/appointment');  
      } else if (val["TipoPessoa"] === 'Funcionario') {
        this.storage.set('schedule', schedule)
  
        this.router.navigateByUrl('/schedule-edit');
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

    this.http.post("http://localhost:8001/schedule/delete", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Feito!', 'Pessoa removida com sucesso!')
        this.getSchedules()
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Pessoa já vinculada, não pode ser removida!')
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';

import { AlertController } from '@ionic/angular';
import { EventsServiceService } from '../events-service.service';
import { AppComponent } from '../app.component'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.page.html',
  styleUrls: ['./attendance-list.page.scss'],
})
export class AttendanceListPage implements OnInit {

  public appointments: any[] = []
  public userType = '';

  constructor(private  router:  Router,
              private http: HttpClient,
              public alertController: AlertController,
              public storage: Storage) {
    
  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getAppointments()
  }

  showAttendance(appointment) {
    this.storage.set('appointment', appointment)
  
    this.router.navigateByUrl('/attendance-show');
  }

  getAppointments() {
    this.storage.get('user').then((val) => {
      let query = ''

      this.userType = val["TipoPessoa"]

      if (val["TipoPessoa"] === 'Fisioterapeuta') {
        query = ' where especialista.IdPessoa = ' + val["IdPessoa"]
      } else if (val["TipoPessoa"] === 'Paciente') {
        query = ' where pessoa.IdPessoa = ' + val["IdPessoa"]
      }
    
      this.http.get('http://localhost:8001/appointments?query=' + query, {})
        .subscribe((data: any[]) => {
          this.appointments = [];

          for (let i = 0; i < data.length; i++) {
            this.appointments.push(data[i])
          }
        })
    });
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

    console.log(id)

    this.http.post("http://localhost:8001/schedule/delete", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Feito!', 'Pessoa removida com sucesso!')
        this.getAppointments()
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Pessoa já vinculada, não pode ser removida!')
      });
  }

}

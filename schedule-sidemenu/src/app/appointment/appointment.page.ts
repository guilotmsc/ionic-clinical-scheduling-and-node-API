import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../events-service.service';
import { Storage } from '@ionic/storage';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  private schedule = null
  private patient = null;
  private specialist = null;

  public patientName: string

  constructor(private events: EventsServiceService,
            public storage: Storage,
            private http: HttpClient,
            public alertController: AlertController,
            private  router:  Router) {
    this.storage.get('schedule').then((val) => {
      this.schedule = val.IdAgendamento
      this.patient = val.IdPessoa
      this.specialist = val.IdEspecialista
      this.patientName = val.paciente
    })
  }

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
      specialist: this.specialist,
      patient: this.patient,
      schedule: this.schedule,
      weight: form.value.weight,
      height: form.value.height,
      imc: form.value.imc,
      diagnosis: form.value.diagnosis
    }

    this.http.post("http://localhost:8001/appointment", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Concluído!', 'Consulta finalizada com sucesso!')
        this.router.navigateByUrl('/attendance-list');
       }, error => {    
        console.log(error);
      });
  }

}

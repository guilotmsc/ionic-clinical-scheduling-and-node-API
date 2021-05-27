import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../events-service.service';
import { Storage } from '@ionic/storage';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-edit',
  templateUrl: './schedule-edit.page.html',
  styleUrls: ['./schedule-edit.page.scss'],
})
export class ScheduleEditPage implements OnInit {

  scheduleId: number

  constructor(private events: EventsServiceService,
              public storage: Storage,
              private http: HttpClient,
              public alertController: AlertController,
              private  router:  Router,
              private datePipe: DatePipe) {
    this.storage.get('schedule').then((val) => {
      this.scheduleId = val.IdAgendamento
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

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  transformTime(date) {
    return this.datePipe.transform(date, 'hh:mm');
  }

  handleSubmit(form){
    let data = {
      date: this.transformDate(form.value.date),
      time: this.transformTime(form.value.time),
      specialist: form.value.specialist,
      agreement: form.value.agreement,
      patient: form.value.patient
    }
  }

}

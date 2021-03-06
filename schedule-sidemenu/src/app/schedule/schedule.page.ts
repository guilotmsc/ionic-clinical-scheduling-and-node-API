import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  public agreements: any[] = []
  public specialists: any[] = []
  public patients: any[] = []

  constructor(private  router:  Router, 
    private http: HttpClient,
    public alertController: AlertController,
    private datePipe: DatePipe) { 
      
  }
  
  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.getAgreements()
    this.getSpecialists()
    this.getPatients()
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

  getSpecialists() {
    this.http.get('http://localhost:8001/specialists', {})
      .subscribe((data: any[]) => {
        this.specialists = [];

        for (let i = 0; i < data.length; i++) {
          this.specialists.push(data[i])
        }
      })
  }

  getPatients() {
    this.http.get('http://localhost:8001/patients', {})
      .subscribe((data: any[]) => {
        this.patients = [];

        for (let i = 0; i < data.length; i++) {
          this.patients.push(data[i])
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

    this.http.post("http://localhost:8001/schedule", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        this.presentAlert('Conclu??do!', 'Seu cadastro realizado com sucesso!')
        this.router.navigateByUrl('/schedule-list');
       }, error => {    
        console.log(error);
      });
  }

}

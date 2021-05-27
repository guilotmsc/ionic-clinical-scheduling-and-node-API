import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../events-service.service';
import { Storage } from '@ionic/storage';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-attendance-show',
  templateUrl: './attendance-show.page.html',
  styleUrls: ['./attendance-show.page.scss'],
})
export class AttendanceShowPage implements OnInit {

  private weigth: string
  private heigth: string
  private imc: string
  private specialist: string
  private patient: string
  private date: string
  private hour: string
  private diagnosis: string

  constructor(private events: EventsServiceService,
    public storage: Storage,
    private http: HttpClient,
    public alertController: AlertController,
    private  router:  Router) {
      this.storage.get('appointment').then((val) => {
        console.log(val)
        this.date = val.DataConsulta
        this.patient = val.paciente
        this.specialist = val.especialista
        this.diagnosis = val.DiagnosticoClinico
        this.weigth = val.peso
        this.heigth = val.altura
        this.imc = val.imc
        this.hour = val.HoraFormatada
      })
  }

  ngOnInit() {
    
  }

}

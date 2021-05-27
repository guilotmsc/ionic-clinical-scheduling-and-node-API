import { Component, OnInit } from '@angular/core';
import { EventsServiceService } from '../events-service.service';
import { Storage } from '@ionic/storage';
import { Router } from  "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.page.html',
  styleUrls: ['./person-edit.page.scss'],
})
export class PersonEditPage implements OnInit {

  public id: number
  public name: string
  public cpf: string
  public birthdate: string
  public document: string
  public gender: string
  public naturalness: string
  public civil_status: string
  public nationality: string
  public schooling: string
  public previous_profession: string
  public current_profession: string
  public emergency_contact: string
  public degree_of_kinship: string
  public type: string

  constructor(private events: EventsServiceService,
    public storage: Storage,
    private http: HttpClient,
    public alertController: AlertController,
    private  router:  Router,
    private datePipe: DatePipe) {
      this.storage.get('person').then((val) => {
        this.id = val.IdPessoa
        this.name = val.Nome 
        this.cpf = val.CPF
        this.birthdate = this.datePipe.transform(val.DataNascimento, 'MMM d, y');
        this.document = val.RG
        this.gender = val.Sexo
        this.naturalness = val.Naturalidade
        this.civil_status = val.EstadoCivil
        this.nationality = val.Nacionalidade
        this.schooling = val.Escolaridade
        this.previous_profession = val.ProfissaoAnterior
        this.current_profession = val.ProfissaoAtual
        this.emergency_contact = val.ContatoEmergencial
        this.degree_of_kinship = val.GrauParentesco
        this.type = val.TipoPessoa
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
      id: this.id,
      name: form.value.name,
      birthdate: form.value.birthdate,
      document: form.value.document,
      gender: form.value.gender,
      cpf: form.value.cpf,
      naturalness: form.value.naturalness,
      civil_status: form.value.civil_status,
      nationality: form.value.nationality,
      schooling: form.value.schooling,
      previous_profession: form.value.previous_profession,
      current_profession: form.value.current_profession,
      emergency_contact: form.value.emergency_contact,
      degree_of_kinship: form.value.degree_of_kinship,
      type: form.value.type
    }

    this.http.post("http://localhost:8001/person-edit", data, {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
      .subscribe(data => {
        if (data[0]) {
          this.presentAlert('Concluído!', 'Cadastro atualizado com sucesso!')
          this.router.navigateByUrl('/person-list');
        } else {
          this.presentAlert('OPS!', 'Ocorreu um erro ao atualizar o cadastro.')
        }
       }, error => {
        console.log(error);
        this.presentAlert('OPS!', 'Ocorreu um erro ao atualizar o cadastro.')
      });
  }
}
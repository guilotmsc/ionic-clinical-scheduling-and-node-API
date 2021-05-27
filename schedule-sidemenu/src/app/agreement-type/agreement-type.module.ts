import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreementTypePageRoutingModule } from './agreement-type-routing.module';

import { AgreementTypePage } from './agreement-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreementTypePageRoutingModule
  ],
  declarations: [AgreementTypePage]
})
export class AgreementTypePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedureTypePageRoutingModule } from './procedure-type-routing.module';

import { ProcedureTypePage } from './procedure-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedureTypePageRoutingModule
  ],
  declarations: [ProcedureTypePage]
})
export class ProcedureTypePageModule {}

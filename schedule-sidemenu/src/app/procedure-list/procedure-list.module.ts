import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedureListPageRoutingModule } from './procedure-list-routing.module';

import { ProcedureListPage } from './procedure-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedureListPageRoutingModule
  ],
  declarations: [ProcedureListPage]
})
export class ProcedureListPageModule {}

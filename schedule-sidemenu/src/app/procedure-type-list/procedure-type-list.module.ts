import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedureTypeListPageRoutingModule } from './procedure-type-list-routing.module';

import { ProcedureTypeListPage } from './procedure-type-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedureTypeListPageRoutingModule
  ],
  declarations: [ProcedureTypeListPage]
})
export class ProcedureTypeListPageModule {}

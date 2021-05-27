import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialistListPageRoutingModule } from './specialist-list-routing.module';

import { SpecialistListPage } from './specialist-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialistListPageRoutingModule
  ],
  declarations: [SpecialistListPage]
})
export class SpecialistListPageModule {}

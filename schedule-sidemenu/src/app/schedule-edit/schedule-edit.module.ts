import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleEditPageRoutingModule } from './schedule-edit-routing.module';

import { ScheduleEditPage } from './schedule-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleEditPageRoutingModule
  ],
  declarations: [ScheduleEditPage]
})
export class ScheduleEditPageModule {}

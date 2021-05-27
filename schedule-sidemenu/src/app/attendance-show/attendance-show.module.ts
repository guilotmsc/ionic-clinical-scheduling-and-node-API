import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceShowPageRoutingModule } from './attendance-show-routing.module';

import { AttendanceShowPage } from './attendance-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceShowPageRoutingModule
  ],
  declarations: [AttendanceShowPage]
})
export class AttendanceShowPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientAttendancePageRoutingModule } from './patient-attendance-routing.module';

import { PatientAttendancePage } from './patient-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientAttendancePageRoutingModule
  ],
  declarations: [PatientAttendancePage]
})
export class PatientAttendancePageModule {}

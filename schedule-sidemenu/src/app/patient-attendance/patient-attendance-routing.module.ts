import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientAttendancePage } from './patient-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: PatientAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientAttendancePageRoutingModule {}

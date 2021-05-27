import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceShowPage } from './attendance-show.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceShowPageRoutingModule {}

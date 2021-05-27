import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleEditPage } from './schedule-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleEditPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistListPage } from './specialist-list.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialistListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialistListPageRoutingModule {}

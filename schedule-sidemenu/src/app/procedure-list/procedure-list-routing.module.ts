import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedureListPage } from './procedure-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProcedureListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedureListPageRoutingModule {}

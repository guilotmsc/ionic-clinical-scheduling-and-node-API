import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedureTypeListPage } from './procedure-type-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProcedureTypeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedureTypeListPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedureTypePage } from './procedure-type.page';

const routes: Routes = [
  {
    path: '',
    component: ProcedureTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedureTypePageRoutingModule {}

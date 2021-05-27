import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreementTypePage } from './agreement-type.page';

const routes: Routes = [
  {
    path: '',
    component: AgreementTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementTypePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreementListPage } from './agreement-list.page';

const routes: Routes = [
  {
    path: '',
    component: AgreementListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreementListPageRoutingModule {}

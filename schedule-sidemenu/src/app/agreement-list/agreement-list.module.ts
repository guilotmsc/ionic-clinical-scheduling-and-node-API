import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgreementListPageRoutingModule } from './agreement-list-routing.module';

import { AgreementListPage } from './agreement-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreementListPageRoutingModule
  ],
  declarations: [AgreementListPage]
})
export class AgreementListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontPageRoutingModule } from './front-page-routing.module';
import { FrontPageComponent } from './front-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FrontPageComponent
  ],
  imports: [
    CommonModule,
    FrontPageRoutingModule,
    SharedModule
  ]
})
export class FrontPageModule { }

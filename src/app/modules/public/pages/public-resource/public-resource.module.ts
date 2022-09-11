import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicResourceRoutingModule } from './public-resource-routing.module';
import { PublicResourceComponent } from './public-resource.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PublicResourceComponent
  ],
  imports: [
    CommonModule,
    PublicResourceRoutingModule,
    SharedModule
  ]
})
export class PublicResourceModule { }

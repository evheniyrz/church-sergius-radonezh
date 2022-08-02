import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicResourceRoutingModule } from './public-resource-routing.module';
import { PublicResourceComponent } from './public-resource.component';


@NgModule({
  declarations: [
    PublicResourceComponent
  ],
  imports: [
    CommonModule,
    PublicResourceRoutingModule
  ]
})
export class PublicResourceModule { }

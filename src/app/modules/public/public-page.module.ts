import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PublicPageRoutingModule } from './public-page-routing.module';
import { PublicPageComponent } from './public-page.component';
import { PublicPageHeaderComponent } from './components/public-page-header/public-page-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    PublicPageComponent,
    PublicPageHeaderComponent
  ],
  imports: [
    CommonModule,
    PublicPageRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PublicPageModule { }

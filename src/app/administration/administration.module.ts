import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './page/administration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContentEditorComponent } from './components/content-editor/content-editor.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdministrationComponent,
    ContentEditorComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule
  ]
})
export class AdministrationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { contentReducers } from './content.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('content', contentReducers),
    EffectsModule.forFeature([])
  ]
})
export class AdminDashboardStoreModule { }

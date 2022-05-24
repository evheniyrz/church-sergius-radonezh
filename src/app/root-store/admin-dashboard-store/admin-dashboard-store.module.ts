import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // StoreModule.forFeature([]),
    EffectsModule.forFeature([])
  ]
})
export class AdminDashboardStoreModule { }

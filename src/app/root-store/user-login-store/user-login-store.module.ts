import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { loginFeature } from '.';
import { RedirectEffect } from './effects/user-login-redirect.effect';
import { UserLoginEffect } from './effects/user-login.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(loginFeature),
    EffectsModule.forFeature([UserLoginEffect, RedirectEffect])
  ]
})
export class UserLoginStoreModule { }
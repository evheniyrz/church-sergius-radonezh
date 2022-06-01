import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardStoreModule } from './content-store/content-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { UserLoginStoreModule } from './user-login-store/user-login-store.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './root.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    UserLoginStoreModule,
    AdminDashboardStoreModule
  ]
})
export class RootStoreModule { }
// environment.production
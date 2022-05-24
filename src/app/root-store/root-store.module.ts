import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardStoreModule } from './admin-dashboard-store/admin-dashboard-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { UserLoginStoreModule } from './user-login-store/user-login-store.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
    EffectsModule.forRoot([]),
    UserLoginStoreModule,
    AdminDashboardStoreModule
  ]
})
export class RootStoreModule { }
// environment.production
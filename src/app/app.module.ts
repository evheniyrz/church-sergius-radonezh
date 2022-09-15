import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageGuard } from './guards/admin-page/admin-page.guard';
import { RootStoreModule } from './root-store/root-store.module';
import { LoginPageModule } from './login-page/login-page.module';
import { ApiModule } from './api/api.module';
import '@angular/common/locales/global/ru';
import { ErrorPageComponent } from './error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    RootStoreModule,
    HttpClientModule,
    LoginPageModule,
    ApiModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    AdminPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

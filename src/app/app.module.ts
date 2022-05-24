import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AdminPageGuard } from './guards/admin-page/admin-page.guard';
import { RootStoreModule } from './root-store/root-store.module';
import { LoginService } from './login-services/login/login.service';
import { LoginPageModule } from './login-page/login-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    RootStoreModule,
    HttpClientModule,
    LoginPageModule
  ],
  providers: [
    LoginService,
    AdminPageGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from './services/content/content.service';
import { LoginService } from './services/login/login.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ContentService,
    LoginService
  ]
})
export class ApiModule { }

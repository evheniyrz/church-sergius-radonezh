import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule(
  {
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule
    ],
    declarations: [
      LoginFormComponent
    ],
    exports: [
      LoginFormComponent
    ]
  }
)
export class SharedModule { }
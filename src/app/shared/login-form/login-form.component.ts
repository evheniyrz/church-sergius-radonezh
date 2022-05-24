import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFormValue } from './model/login-form-value.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnDestroy {
  @Output() onFormSubmit: EventEmitter<LoginFormValue> = new EventEmitter();

  public sharedLoginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.sharedLoginForm = this.fb.group({
      email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
      password: this.fb.control('', { validators: [Validators.required] })
    },
      {
        updateOn: 'blur'
      });
  }

  get emailControl(): FormControl {
    return this.sharedLoginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.sharedLoginForm.get('password') as FormControl;
  }

  public emitFormValue(): void {
    if (null != this.sharedLoginForm && this.sharedLoginForm.valid) {
      this.onFormSubmit.next(this.sharedLoginForm.value);
    }
  }

  ngOnDestroy(): void {
    this.onFormSubmit.complete();
    this.onFormSubmit = void (0) as any;
  }

}

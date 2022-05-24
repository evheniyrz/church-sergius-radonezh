import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAdminAccess } from '../root-store/user-login-store';
import { LoginFormValue } from '../shared/login-form/model/login-form-value.model';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private store: Store) { }

  public setUser(formValue: LoginFormValue): void {
    this.store.dispatch(getAdminAccess({ credentials: formValue }));
  }
}

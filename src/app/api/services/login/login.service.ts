import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from 'src/app/root-store/user-login-store/models/login-payload.model';
import { UserLoginResponse } from './models/login-success-response.model';


@Injectable()
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public loginUser(payload: LoginPayload): Observable<UserLoginResponse | null> {
    return this.httpClient.post<UserLoginResponse | null>('users', payload);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { LoginRequest, LoginResponse, UserData } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(userData: UserData) {
    return this.http.post<UserData>(
      'http://localhost:8000/auth/register/',
      userData
    );
  }

  public login(user: LoginRequest) {
    return this.http
      .post<LoginResponse>('http://localhost:8000/auth/login/', user)
      .pipe(
        tap((res) => {
          localStorage.setItem('auth_token', res.access);
          localStorage.setItem('auth_refresh_token', res.refresh);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, UserData } from '../interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

export interface DecodedToken {
  exp: number;
  iat: number;
  token_type: string;
  user_id: number;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public getExpiration(): moment.Moment {
    return moment.unix(this.getdecodeToken().exp);
  }

  private getdecodeToken(): DecodedToken {
    return jwt.decodeToken(this.getAuthToken());
  }

  public getAuthToken(): string {
    return localStorage.getItem('auth_token');
  }

  public isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return token ? moment().isBefore(this.getExpiration()) : false;
  }

  public logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token');
  }

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

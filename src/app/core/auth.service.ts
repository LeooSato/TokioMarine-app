import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthResponse, LoginRequest, SignupRequest, UserResponse } from './model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly TOKEN_KEY = 'token';
  meCache?: UserResponse;

  register(data: SignupRequest) {
    return this.http.post<UserResponse>('/auth/register', data);
  }

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>('/auth/login', data);
  }

  async handleLogin(data: LoginRequest) {
    const res = await firstValueFrom(this.login(data));
    if (res?.token) {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      await this.refreshMe();
      await this.router.navigateByUrl('/transfers');
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.meCache = undefined;
    this.router.navigateByUrl('/login');
  }

  get token() { return localStorage.getItem(this.TOKEN_KEY) ?? ''; }
  isLoggedIn() { return !!this.token; }

  me() {
    return this.http.get<UserResponse>('/auth/me');
  }

  async refreshMe() {
    this.meCache = await firstValueFrom(this.me());
    return this.meCache;
  }
}

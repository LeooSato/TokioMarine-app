import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
<div class="row justify-content-center">
  <div class="col-md-5">
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="h4 mb-3">Login</h2>
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="needs-validation">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input class="form-control" formControlName="username"
                   [class.is-invalid]="submitted && form.controls.username.invalid">
            <div class="invalid-feedback">Informe seu username.</div>
          </div>

          <div class="mb-3">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control" formControlName="password"
                   [class.is-invalid]="submitted && form.controls.password.invalid">
            <div class="invalid-feedback">Informe sua senha.</div>
          </div>

          <button class="btn btn-primary w-100" [disabled]="loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <div class="text-muted mt-3">
          Não tem conta? <a routerLink="/register">Cadastre-se</a>
        </div>

        <div *ngIf="error" class="alert alert-danger mt-3 py-2">{{ error }}</div>
      </div>
    </div>
  </div>
</div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  loading = false;
  error = '';
  submitted = false;

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  async submit(){
    this.submitted = true;
    if (this.form.invalid) return;
    this.error = ''; this.loading = true;
    try { await this.auth.handleLogin(this.form.value as any); }
    catch(e:any){ this.error = e?.error?.message ?? 'Falha no login'; }
    finally { this.loading = false; }



  }
}

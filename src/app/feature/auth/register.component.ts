import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h2 class="h4 mb-3">Cadastro</h2>

          <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <div class="mb-3">
              <label class="form-label">Nome completo</label>
              <input class="form-control" formControlName="fullName">
            </div>

            <div class="mb-3">
              <label class="form-label">Username</label>
              <input class="form-control" formControlName="username">
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input class="form-control" formControlName="email">
            </div>

            <div class="mb-3">
              <label class="form-label">Senha</label>
              <input type="password" class="form-control" formControlName="password">
            </div>

            <button type="submit"
                    class="btn btn-success w-100"
                    [disabled]="form.invalid || loading"
                    [attr.aria-busy]="loading">
              @if (loading) {
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Cadastrando...
              } @else {
                Cadastrar
              }
            </button>
          </form>

          @if (error) {
            <div class="alert alert-danger mt-3">{{ error }}</div>
          }
        </div>
      </div>
    </div>
  </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) return;
    this.error = '';
    this.loading = true;

    this.auth.register(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login'], { queryParams: { registered: '1' } });
      },
      error: e => {
        this.loading = false;
        this.error = e?.error?.message ?? 'Falha no registro';
      }
    });
  }
}

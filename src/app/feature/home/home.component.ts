import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  template: `
<div class="row g-3">
  <div class="col-12">
    <div class="p-4 bg-light rounded border">
      @if (!auth.isLoggedIn()) {
        <h1 class="h4 mb-2">Bem-vindo ao sistema</h1>
        <p class="mb-0">Faça login ou crie sua conta para usar as funcionalidades.</p>
      } @else {
        <h1 class="h4 mb-2">Olá, {{auth.meCache?.username }} </h1>
        <p class="mb-0">Acesse suas transferências ou crie uma nova.</p>
      }
    </div>
  </div>

  @if (!auth.isLoggedIn()) {
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Entrar</h5>
          <p class="card-text">Acesse com sua conta para visualizar e criar transferências.</p>
          <a routerLink="/login" class="btn btn-primary">Ir para Login</a>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Cadastro</h5>
          <p class="card-text">
            Crie sua conta para obter seu <code>accountNumber</code> e usar o sistema.
          </p>
          <a routerLink="/register" class="btn btn-outline-primary">Criar Conta</a>
        </div>
      </div>
    </div>
  } @else {
    <div class="col-12 col-lg-8 mx-auto">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-1">Sua conta</h5>
          <p class="text-muted mb-3">
            Account: <code>{{ auth.meCache?.accountNumber || '—' }}</code>
          </p>

          <div class="d-flex flex-wrap gap-2">
            <a routerLink="/transfers/new" class="btn btn-primary">Nova Transferência</a>
            <a routerLink="/transfers" class="btn btn-outline-secondary">Ver Minhas Transfers</a>
          </div>
        </div>
      </div>
    </div>
  }
</div>
  `
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}

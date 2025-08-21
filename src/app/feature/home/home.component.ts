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
      <h1 class="h4 mb-2">Bem-vindo ao sistema</h1>
      <p *ngIf="!auth.isLoggedIn()" class="mb-0">Faça login/cadastro para usar as funcionalidades.</p>
      <p *ngIf="auth.isLoggedIn()"class="mb-0"> Fique a vontade para realizar suas transferencias e verificar todas</p>
    </div>
  </div>

  <div class="col-md-6">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Entrar</h5>
        <p class="card-text">Acesse com sua conta para visualizar e criar transferências.</p>
        <a routerLink="/login" class="btn btn-primary" *ngIf="!auth.isLoggedIn()">Ir para Login</a>
        <span class="badge bg-success" *ngIf="auth.isLoggedIn()">Você já está autenticado</span>
      </div>
    </div>
  </div>

  <div class="col-md-6">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Cadastro</h5>
        <p class="card-text">Crie sua conta para obter seu <code>accountNumber</code> e usar o sistema.</p>
        <a routerLink="/register" class="btn btn-outline-primary" *ngIf="!auth.isLoggedIn()">Criar Conta</a>
        <a routerLink="/transfers" class="btn btn-outline-secondary" *ngIf="auth.isLoggedIn()">Ir para Transfers</a>
      </div>
    </div>
  </div>
</div>
  `
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}

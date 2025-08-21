import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" routerLink="/home">TokioMarine</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="mainNav" class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link" routerLink="/home">Home</a></li>
        <!-- descomente se já tiver telas de transfer -->
        <!-- <li class="nav-item"><a class="nav-link" routerLink="/transfers">Transfers</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/transfers/new">Nova</a></li> -->
      </ul>

      <ul class="navbar-nav ms-auto" *ngIf="!auth.isLoggedIn()">
        <li class="nav-item"><a class="nav-link" routerLink="/login">Login</a></li>
        <li class="nav-item"><a class="nav-link" routerLink="/register">Cadastro</a></li>
      </ul>
      <div class="d-flex align-items-center gap-2" *ngIf="auth.isLoggedIn()">
        <span class="text-light small">Olá, {{auth.meCache?.username }}</span>
        <button class="btn btn-outline-light btn-sm" (click)="logout()">Sair</button>
      </div>
    </div>
  </div>
</nav>

<main class="container my-4">
  <router-outlet/>
</main>
  `

})
export class AppComponent {
  constructor(public auth: AuthService) {}
  logout(){ this.auth.logout(); }
}

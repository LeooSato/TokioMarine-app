import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransferService } from '../../core/transfer.service';
import { TransferResponse } from '../../core/model';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-transfers-list',
  imports: [CommonModule, RouterLink],
  template: `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="h4 mb-0">Minhas Transferências</h2>
    <a routerLink="/transfers/new" class="btn btn-primary">+ Nova</a>
  </div>

  <div *ngIf="loading" class="alert alert-info py-2">Carregando...</div>
  <div *ngIf="error" class="alert alert-danger py-2">{{ error }}</div>

  <table *ngIf="!loading && !error && items.length" class="table table-striped table-hover">
    <thead class="table-light">
      <tr>
        <th>#</th><th>From</th><th>To</th><th>Amount</th><th>Fee</th><th>Transfer Date</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let t of items">
        <td>{{t.id}}</td>
        <td><code>{{t.accountFrom}}</code></td>
        <td><code>{{t.accountTo}}</code></td>
        <td>{{t.amount}}</td>
        <td>{{t.fee}}</td>
        <td>{{t.transferDate}}</td>
      </tr>
    </tbody>
  </table>

  <p *ngIf="!loading && !error && !items.length" class="text-muted">Nenhuma transferência encontrada.</p>
  `
})
export class TransfersListComponent {
  private api = inject(TransferService);
  private auth = inject(AuthService);

  items: TransferResponse[] = [];
  loading = true;
  error = '';

  async ngOnInit() {
    if (!this.auth.meCache) { try { await this.auth.refreshMe(); } catch {} }
    this.api.listMine().subscribe({
      next: r => { this.items = r; this.loading = false; },
      error: e => { this.error = e?.error?.message ?? 'Erro ao carregar'; this.loading = false; }
    });
  }
}

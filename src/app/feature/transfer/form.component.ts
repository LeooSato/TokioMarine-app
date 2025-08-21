import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TransferService } from '../../core/transfer.service';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../core/user.service';
import { Contact } from '../../core/model';

@Component({
  standalone: true,
  selector: 'app-transfer-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="h4 mb-0">Nova Transferência</h2>
    <a routerLink="/transfers" class="btn btn-outline-secondary">Voltar</a>
  </div>

  <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="card shadow-sm">
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Minha conta (From)</label>
          <input class="form-control" formControlName="accountFrom" readonly>
          <div class="invalid-feedback d-block" *ngIf="submitted && form.controls.accountFrom.invalid">
            Minha conta inválida.
          </div>
        </div>

        <div class="col-md-6">
          <label class="form-label">Destinatário (Nome)</label>
          <select class="form-select" formControlName="accountTo">
            <option value="" disabled selected>Selecione um destinatário</option>
            <option *ngFor="let c of contacts" [value]="c.accountNumber">{{ c.fullName }}</option>
          </select>
          <div class="invalid-feedback d-block" *ngIf="submitted && form.controls.accountTo.invalid">
            Escolha um destinatário.
          </div>
          <div class="invalid-feedback d-block" *ngIf="submitted && form.errors?.['sameAccount']">
            Não é permitido transferir para sua própria conta.
          </div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Valor</label>
          <input class="form-control" type="number" step="0.01" formControlName="amount">
          <div class="invalid-feedback d-block" *ngIf="submitted && form.controls.amount.invalid">
            Informe um valor maior que 0.
          </div>
        </div>

        <div class="col-md-4">
          <label class="form-label">Data da transferência</label>
          <input class="form-control" type="date" formControlName="transferDate" [attr.min]="today">
          <div class="invalid-feedback d-block" *ngIf="submitted && form.controls.transferDate.invalid">
            Informe uma data válida (>= hoje).
          </div>
        </div>
      </div>

      <div class="mt-4 d-flex gap-2">
        <button class="btn btn-primary" [disabled]="loading">
          {{ loading ? 'Agendando...' : 'Agendar' }}
        </button>
        <a class="btn btn-outline-secondary" routerLink="/transfers">Cancelar</a>
      </div>

      <div *ngIf="error" class="alert alert-danger mt-3 py-2">{{ error }}</div>
    </div>
  </form>
  `
})
export class TransferFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(TransferService);
  private auth = inject(AuthService);
  private people = inject(UserService);
  private router = inject(Router);

  contacts: Contact[] = [];
  today = new Date().toISOString().slice(0,10);
  loading = false;
  error = '';
  submitted = false;

  form = this.fb.group({
    accountFrom: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    accountTo:   ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    amount:      [null as any, [Validators.required, Validators.min(0.01)]],
    transferDate:['', Validators.required]
  }, { validators: [this.notSelfTransfer()] });

  async ngOnInit() {
    const me = this.auth.meCache ?? await this.auth.refreshMe();
    this.form.patchValue({ accountFrom: me?.accountNumber ?? '', transferDate: this.today });

    this.people.listContacts().subscribe({
      next: list => this.contacts = list,
      error: e => this.error = e?.error?.message ?? 'Falha ao carregar destinatários'
    });
  }

  notSelfTransfer() {
    return (group: AbstractControl): ValidationErrors | null => {
      const from = group.get('accountFrom')?.value;
      const to   = group.get('accountTo')?.value;
      return from && to && from === to ? { sameAccount: true } : null;
    };
  }

  submit() {
    this.submitted = true;
    this.error = '';
    if (this.form.invalid) return;

    this.loading = true;
    const payload = this.form.value as any;
    this.api.create(payload).subscribe({
      next: _ => { this.loading = false; this.router.navigateByUrl('/transfers'); },
      error: e => { this.loading = false; this.error = e?.error?.message ?? 'Falha ao agendar'; }
    });
  }
}
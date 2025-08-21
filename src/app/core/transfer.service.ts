import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransferRequest, TransferResponse } from './model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TransferService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  listAll(): Observable<TransferResponse[]> {
    return this.http.get<TransferResponse[]>('/api/transfers');
  }

  // filtra no front pelas minhas contas (enquanto não houver endpoint dedicado)
  listMine(): Observable<TransferResponse[]> {
    const my = this.auth.meCache?.accountNumber || '';
    return this.listAll().pipe(
      map(list => list.filter(t => t.accountFrom === my || t.accountTo === my))
    );
  }

  create(data: TransferRequest): Observable<TransferResponse> {
    return this.http.post<TransferResponse>('/api/transfers', data);
  }
}

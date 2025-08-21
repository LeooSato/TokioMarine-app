import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  listContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/auth/contacts'); // deve estar autenticado
  }
}
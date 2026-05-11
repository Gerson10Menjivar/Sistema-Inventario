import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  // Método para el login (Pág 9 del PDF)
  login(credenciales: any): Observable<any> {
    // Fíjate bien en estas comillas: son ` no '
    return this.http.post(`${this.url}/usuarios/login`, credenciales);
  }

  // Método para guardar el token (Pág 9 del PDF)
  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  eliminarToken(): void {
    localStorage.removeItem('token');
  }
}
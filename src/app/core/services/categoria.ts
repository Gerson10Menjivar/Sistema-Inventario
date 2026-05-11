import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/categorias';

  private getHeaders() {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // 1. Obtener todas
  obtenerTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.url, { headers: this.getHeaders() });
  }

  // --- ESTA ES LA QUE TE FALTA Y POR ESO DA ERROR ---
  // 1.5 Obtener una por ID (Para que el formulario se llene al editar)
  obtenerPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  // 2. CREAR
  crear(categoria: any): Observable<any> {
    return this.http.post(this.url, categoria, { headers: this.getHeaders() });
  }

  // 3. Actualizar
  actualizar(id: string, categoria: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, categoria, { headers: this.getHeaders() });
  }

  // 4. Eliminar
  borrar(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() });
  }
}
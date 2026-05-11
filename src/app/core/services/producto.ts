import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  // Asegúrate de que este puerto coincida con tu backend de Node
  private url = 'http://localhost:3000/api/productos';

  /**
   * Recuperamos el token para todas las peticiones de productos
   */
  private getHeaders() {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // 1. Obtener todos (GET /api/productos)
  obtenerTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.url, { headers: this.getHeaders() });
  }

  // 2. Obtener uno solo (GET /api/productos/:id)
  obtenerPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  // 3. Crear (POST /api/productos)
  crear(producto: any): Observable<any> {
    return this.http.post(this.url, producto, { headers: this.getHeaders() });
  }

  // 4. Actualizar (PUT /api/productos/:id)
  actualizar(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, producto, { headers: this.getHeaders() });
  }

  // 5. Borrar (DELETE /api/productos/:id)
  borrar(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getHeaders() });
  }
}
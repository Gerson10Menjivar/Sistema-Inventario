import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private http = inject(HttpClient);
  
  // 1. Mantenemos la de movimientos para el POST (Registrar)
  private apiUrl = 'http://localhost:3000/api/movimientos';
  
  // 2. Agregamos la del historial para el GET (Tabla)
  private historialUrl = 'http://localhost:3000/api/historial';

  registrarMovimiento(movimiento: any): Observable<any> {
    return this.http.post(this.apiUrl, movimiento);
  }

  // 3. Modificamos esta función para que use la URL de historial
  obtenerHistorial(): Observable<any[]> {
    return this.http.get<any[]>(this.historialUrl);
  }
}
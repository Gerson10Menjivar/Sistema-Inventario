import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimientoService } from '../../../../core/services/movimiento';
import { Navbar } from '../../../../layout/navbar/navbar';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css'] // Por si decides añadir estilos personalizados luego
})
export class Historial implements OnInit {
  private movService = inject(MovimientoService);
  private cdr = inject(ChangeDetectorRef);

  // Arreglo para almacenar los movimientos que vienen del backend
  movimientos: any[] = [];
  cargando: boolean = true;

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.cargando = true;
    this.movService.obtenerHistorial().subscribe({
      next: (res: any[]) => {
        this.movimientos = res;
        this.cargando = false;
        console.log('Historial obtenido:', this.movimientos);
        
        // Obligamos a Angular a renderizar los nuevos datos inmediatamente
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al cargar el historial:', err);
      }
    });
  }
}
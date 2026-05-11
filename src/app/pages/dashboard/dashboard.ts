import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../core/services/producto'; 
import { CategoriaService } from '../../core/services/categoria'; 
import { Navbar } from '../../layout/navbar/navbar'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar], 
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  private prodService = inject(ProductoService);
  private catService = inject(CategoriaService);

  totalProductos: number = 0;
  totalCategorias: number = 0;
  productosSinStock: number = 0;
  
  // Variable para manejar el estado de carga y que no se vea el "0" feo
  cargando: boolean = true;

  ngOnInit() {
    // Al iniciar, disparamos la carga de datos
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.cargando = true;

    // 1. Cargar Categorías
    this.catService.obtenerTodas().subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : (res.categorias || res.data || []);
        this.totalCategorias = lista.length;
      }
    });

    // 2. Cargar Productos
    this.prodService.obtenerTodos().subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : (res.productos || res.data || []);
        this.totalProductos = lista.length;
        this.productosSinStock = lista.filter((p: any) => p.stock <= 0).length;
        
        // Finalizamos el estado de carga
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar Dashboard:', err);
        this.cargando = false;
      }
    });
  }
}
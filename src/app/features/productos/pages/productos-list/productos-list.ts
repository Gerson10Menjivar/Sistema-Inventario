import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 👈 Importante para los filtros
import { ProductoService } from '../../../../core/services/producto';
import { Navbar } from '../../../../layout/navbar/navbar'; // 👈 Asegúrate de la ruta de tu navbar

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, Navbar], // 👈 Agregamos FormsModule y Navbar
  templateUrl: './productos-list.html',
  styleUrl: './productos-list.css'
})
export class ProductosList implements OnInit {
  private prodService = inject(ProductoService);
  private cdr = inject(ChangeDetectorRef);

  productos: any[] = [];          // Datos originales
  productosFiltrados: any[] = []; // Datos que se muestran
  categorias: string[] = [];      // Lista de categorías para el select

  // Variables de filtro
  filtroNombre: string = '';
  filtroCategoria: string = '';

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.prodService.obtenerTodos().subscribe({
      next: (data: any) => {
        this.productos = Array.isArray(data) ? data : (data.productos || []);
        this.productosFiltrados = [...this.productos];

        // Extraer categorías únicas para el filtro
        const nombresCat = this.productos
          .map(p => p.categoria?.nombre)
          .filter(c => c);
        this.categorias = Array.from(new Set(nombresCat));

        this.cdr.detectChanges();
      },
      error: (e) => console.error('Error al cargar productos:', e)
    });
  }

  // Lógica de filtrado
  aplicarFiltros() {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const coincideCat = this.filtroCategoria === '' || p.categoria?.nombre === this.filtroCategoria;
      return coincideNombre && coincideCat;
    });
  }

  verStockBajo() {
    this.filtroNombre = '';
    this.filtroCategoria = '';
    this.productosFiltrados = this.productos.filter(p => p.stock < 5);
  }

  limpiarFiltros() {
    this.filtroNombre = '';
    this.filtroCategoria = '';
    this.productosFiltrados = [...this.productos];
  }

  borrar(id: string) {
    if (confirm('¿Deseas eliminar este producto del inventario?')) {
      this.prodService.borrar(id).subscribe({
        next: () => this.obtenerProductos(),
        error: (err) => console.error('Error al borrar:', err)
      });
    }
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos-list.html',
  styleUrl: './productos-list.css'
})
export class ProductosList {
  // 1. Catálogo de categorías (La "llave" para el nombre)
  public categorias = [
    { id: 501, nombre: 'Electrónica' },
    { id: 502, nombre: 'Hogar / Oficina' }
  ];

  // 2. Lista de productos usando 'catId' para relacionar
  public productos = [
    { id: 1, nombre: 'Laptop Gamer', catId: 501, precio: 1200, stock: 15, icono: '💻' },
    { id: 2, nombre: 'Silla Ergonómica', catId: 502, precio: 250, stock: 5, icono: '🪑' },
    { id: 3, nombre: 'Teclado Mecánico', catId: 501, precio: 80, stock: 20, icono: '⌨️' }
  ];

  // 3. Función lógica para obtener el nombre de la categoría por su ID
  getNombreCategoria(id: number): string {
    const cat = this.categorias.find(c => c.id === id);
    return cat ? cat.nombre : 'Sin Categoría';
  }

  eliminar(id: number) {
    if(confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productos = this.productos.filter(p => p.id !== id);
    }
  }
}

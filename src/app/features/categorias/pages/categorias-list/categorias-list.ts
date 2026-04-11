import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias-list.html',
  styleUrl: './categorias-list.css'
})
export class CategoriasList {
  public categorias = [
    { id: 501, nombre: 'Electrónica', desc: 'Laptops, mouses y teclados', icono: '💻' },
    { id: 502, nombre: 'Hogar / Oficina', desc: 'Escritorios y sillas pro', icono: '🏠' }
  ];

  borrar(id: number) {
    if(confirm('¿Eliminar categoría? Esto afectará a los productos vinculados.')) {
      this.categorias = this.categorias.filter(c => c.id !== id);
    }
  }
}
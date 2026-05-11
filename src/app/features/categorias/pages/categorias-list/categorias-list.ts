import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { CategoriaService } from '../../../../core/services/categoria';
import { Navbar } from '../../../../layout/navbar/navbar'; // 👈 Importamos el Navbar

@Component({
  selector: 'app-categorias-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar], // 👈 Lo agregamos aquí
  templateUrl: './categorias-list.html',
  styleUrl: './categorias-list.css'
})
export class CategoriasList implements OnInit {
  private catService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef); 
  
  categorias: any[] = [];

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.catService.obtenerTodas().subscribe({
      next: (data: any) => {
        this.categorias = Array.isArray(data) ? data : (data.categorias || [data]);
        this.cdr.detectChanges(); 
      },
      error: (e) => console.error('Error al cargar categorías:', e)
    });
  }

  borrar(id: string) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.catService.borrar(id).subscribe({
        next: () => {
          this.obtenerCategorias(); 
        },
        error: (err) => console.error('Error al borrar:', err)
      });
    }
  }
}
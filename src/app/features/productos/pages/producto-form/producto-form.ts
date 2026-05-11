import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../core/services/producto';
import { CategoriaService } from '../../../../core/services/categoria';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './producto-form.html'
})
export class ProductoForm implements OnInit {
  private prodService = inject(ProductoService);
  private catService = inject(CategoriaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id: string | null = null;
  categorias: any[] = []; 

  producto: any = {
    nombre: '',
    desc: '',
    precio: null,
    stock: null,
    categoria: '' 
  };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarCategorias();

    if (this.id) {
      this.prodService.obtenerPorId(this.id).subscribe({
        next: (res: any) => {
          // CAMBIO CLAVE: Asignamos cada propiedad manualmente
          // Esto asegura que si el backend responde con objetos,
          // nosotros solo tomemos los valores que el formulario necesita.
          this.producto = {
            nombre: res.nombre,
            desc: res.desc,
            precio: res.precio,
            stock: res.stock,
            // Si categoria es un objeto (por el populate), extraemos el _id
            categoria: (res.categoria && typeof res.categoria === 'object') 
                       ? res.categoria._id 
                       : res.categoria
          };
        },
        error: (err: any) => console.error('Error al cargar producto:', err)
      });
    }
  }

  cargarCategorias() {
    this.catService.obtenerTodas().subscribe({
      next: (res: any) => {
        this.categorias = Array.isArray(res) ? res : (res.categorias || []);
      },
      error: (err: any) => console.error('Error al cargar categorías:', err)
    });
  }

  guardar() {
    if (!this.producto.nombre || !this.producto.categoria) {
      return alert('El nombre y la categoría son obligatorios');
    }

    if (this.id) {
      this.prodService.actualizar(this.id, this.producto).subscribe({
        next: () => {
          alert('✅ Producto actualizado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (err: any) => console.error(err)
      });
    } else {
      this.prodService.crear(this.producto).subscribe({
        next: () => {
          alert('✅ Producto creado con éxito');
          this.router.navigate(['/productos']);
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}
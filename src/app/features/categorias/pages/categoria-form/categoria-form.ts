import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CategoriaService } from '../../../../core/services/categoria';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.css'
})
export class CategoriaForm implements OnInit {
  private catService = inject(CategoriaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id: string | null = null;
  categoria = { nombre: '', desc: '' };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // Agregamos : any para que la terminal no de error
      this.catService.obtenerPorId(this.id).subscribe({
        next: (res: any) => {
          this.categoria = res;
        },
        error: (err: any) => {
          console.error('Error al cargar:', err);
        }
      });
    }
  }

  guardar() {
    if (!this.categoria.nombre.trim()) return alert('Nombre obligatorio');

    if (this.id) {
      this.catService.actualizar(this.id, this.categoria).subscribe({
        next: (res: any) => {
          alert('¡Actualizado!');
          this.router.navigate(['/categorias']);
        },
        error: (err: any) => console.error(err)
      });
    } else {
      this.catService.crear(this.categoria).subscribe({
        next: (res: any) => {
          alert('¡Creado!');
          this.router.navigate(['/categorias']);
        },
        error: (err: any) => console.error(err)
      });
    }
  }
}
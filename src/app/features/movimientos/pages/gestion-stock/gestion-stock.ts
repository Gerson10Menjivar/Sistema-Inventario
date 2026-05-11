import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductoService } from '../../../../core/services/producto'; 
import { MovimientoService } from '../../../../core/services/movimiento'; 
import { Router } from '@angular/router';
import { Navbar } from '../../../../layout/navbar/navbar'; 

@Component({
  selector: 'app-gestion-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar], 
  templateUrl: './gestion-stock.html' 
})
export class GestionStockComponent implements OnInit {
  // Inyecciones
  private prodService = inject(ProductoService);
  private movService = inject(MovimientoService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  productos: any[] = [];
  
  movimiento = {
    producto: '',
    usuario: '',
    tipo: 'entrada',
    cantidad: 1,
    motivo: ''
  };

  ngOnInit() {
    this.cargarProductos();
    this.configurarUsuario();
  }

  configurarUsuario() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      // Intentamos obtener el ID de diferentes formas comunes
      this.movimiento.usuario = user._id || user.id || user.uid || (user.user ? user.user._id : ''); 
      console.log('Usuario detectado para movimiento:', this.movimiento.usuario);
    } else {
      console.warn('⚠️ No se encontró sesión de usuario activa.');
    }
  }

  cargarProductos() {
    this.prodService.obtenerTodos().subscribe({
      next: (res: any) => {
        // Normalizamos la respuesta por si viene en un objeto o array directo
        this.productos = Array.isArray(res) ? res : (res.productos || res.data || []);
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  registrar() {
    this.movimiento.cantidad = Number(this.movimiento.cantidad);

    // Validaciones
    if (!this.movimiento.producto) return alert('Por favor, selecciona un producto');
    if (!this.movimiento.usuario) return alert('Error: Sesión expirada. Por favor, inicia sesión de nuevo.');
    if (this.movimiento.cantidad <= 0) return alert('La cantidad debe ser mayor a 0');

    this.movService.registrarMovimiento(this.movimiento).subscribe({
      next: (res: any) => {
        alert(res.mensaje || 'Movimiento registrado con éxito');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        alert(err.error?.mensaje || 'Error al procesar el movimiento');
      }
    });
  }

  // Nueva función para navegar al Dashboard
  volver() {
    this.router.navigate(['/dashboard']);
  }
}
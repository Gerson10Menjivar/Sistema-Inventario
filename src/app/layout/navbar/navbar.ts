import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Eliminamos el OnInit y la variable fija esAdmin
  private router = inject(Router);

  /**
   * Este "get" es la clave. 
   * Angular revisará el localStorage automáticamente 
   * cada vez que se necesite mostrar el botón en el HTML.
   */
  get esAdmin(): boolean {
    const rol = localStorage.getItem('rol');
    return rol === 'admin';
  }

  salir() {
    // 1. Borramos el token y el rol para cerrar la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    
    // 2. Mandamos al usuario al login
    this.router.navigate(['/login']);
  }
}
import { Routes } from '@angular/router';

// 1. Importaciones de Auth y Páginas principales
import { Login } from './features/auth/pages/login/login'; 
import { Dashboard } from './pages/dashboard/dashboard';

// 2. Importaciones de Productos
import { ProductosList } from './features/productos/pages/productos-list/productos-list';
import { ProductoForm } from './features/productos/pages/producto-form/producto-form';

// 3. Importaciones de Categorías
import { CategoriasList } from './features/categorias/pages/categorias-list/categorias-list';
import { CategoriaForm } from './features/categorias/pages/categoria-form/categoria-form';

// 4. Importaciones de Movimientos - CORREGIDAS
// Fíjate que ahora importamos "GestionStockComponent" (el nombre real de tu clase)
import { GestionStockComponent } from './features/movimientos/pages/gestion-stock/gestion-stock';
import { Historial } from './features/movimientos/pages/historial/historial';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  
  // SECCIÓN PRODUCTOS
  { path: 'productos', component: ProductosList },
  { path: 'productos/nuevo', component: ProductoForm },
  { path: 'productos/editar/:id', component: ProductoForm }, 
  
  // SECCIÓN CATEGORÍAS
  { path: 'categorias', component: CategoriasList },
  { path: 'categorias/nuevo', component: CategoriaForm },
  { path: 'categorias/editar/:id', component: CategoriaForm }, 
  
  // SECCIÓN MOVIMIENTOS
  // Usamos el nombre corregido aquí también
  { path: 'movimientos', component: GestionStockComponent },
  { path: 'historial', component: Historial },

  // Cualquier ruta no definida manda al login
  { path: '**', redirectTo: 'login' }
];
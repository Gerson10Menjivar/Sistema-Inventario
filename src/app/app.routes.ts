import { Routes } from '@angular/router';
// 1. Importamos tus componentes de inventario
import { Dashboard } from './pages/dashboard/dashboard';
import { ProductosList} from './features/productos/pages/productos-list/productos-list';
import { CategoriasList } from './features/categorias/pages/categorias-list/categorias-list';

export const routes: Routes = [
  // 2. Definimos las rutas siguiendo el estilo del docente
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard},
  { path: 'productos', component: ProductosList },
  { path: 'categorias', component: CategoriasList }
];
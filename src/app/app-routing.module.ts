import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { EmpresasComponent } from './componentes/empresas/empresas.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { MenuDeNavegacionComponent } from './componentes/menu-de-navegacion/menu-de-navegacion.component';
import { ProductosComponent } from './componentes/productos/productos.component';

const routes: Routes = [
  {path:"menu-de-navegacion", component: MenuDeNavegacionComponent},
  {path: "iniciar-sesion", component: IniciarSesionComponent},
  {path: "empresas", component: EmpresasComponent},
  {path: "empleados", component: EmpleadosComponent},
  {path: "productos", component: ProductosComponent},
  {path: "**", component: IniciarSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

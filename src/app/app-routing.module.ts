import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './componentes/empresas/empresas.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { MenuDeNavegacionComponent } from './componentes/menu-de-navegacion/menu-de-navegacion.component';

const routes: Routes = [
  {path:"menu-de-navegacion", component: MenuDeNavegacionComponent},
  {path: "iniciar-sesion", component: IniciarSesionComponent},
  {path: "empresas", component: EmpresasComponent},
  {path: "**", component: IniciarSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

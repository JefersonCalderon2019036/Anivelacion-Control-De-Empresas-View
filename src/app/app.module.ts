import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { MenuDeNavegacionComponent } from './componentes/menu-de-navegacion/menu-de-navegacion.component';
import { EmpleadosComponent } from './componentes/empleados/empleados.component';
import { EmpresasComponent } from './componentes/empresas/empresas.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    MenuDeNavegacionComponent,
    EmpleadosComponent,
    EmpresasComponent,
    ProductosComponent,
    MiPerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

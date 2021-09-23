import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userServicios } from 'src/app/servicios/user.servicios';

@Component({
  selector: 'app-menu-de-navegacion',
  templateUrl: './menu-de-navegacion.component.html',
  styleUrls: ['./menu-de-navegacion.component.scss']
})
export class MenuDeNavegacionComponent implements OnInit {
  bloqueobotones: any;
  rol: string;
  bloquebotones2: any;

  constructor(
    private _router: Router,
    public _userServicios: userServicios
  ) { 
    this.rol = this._userServicios.getrol()
  }

  ngOnInit(): void {
    this.bloqueoroladmin()
  }

  serrarsecion(){
    window.localStorage.clear()
    this._router.navigate(['/iniciar-sesion'])
  }

  bloqueoroladmin(){
    if(this.rol != "EMPRESA"){
      this.bloqueobotones = true
      this.bloquebotones2 = false
    }else{
      this.bloqueobotones = false
      this.bloquebotones2 = true
    }
  }
}

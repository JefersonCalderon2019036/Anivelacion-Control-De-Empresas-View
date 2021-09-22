import { Component, OnInit } from '@angular/core';
import { userServicios } from 'src/app/servicios/user.servicios';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [userServicios]
})
export class EmpleadosComponent implements OnInit {
  rol: any;
  bloqueobotones: any;

  constructor(
    public _userServicios: userServicios
  ) { 
    this.rol = this._userServicios.getrol()
  }

  ngOnInit(): void {
    
  }

  rbloqueorol(){

  }
}

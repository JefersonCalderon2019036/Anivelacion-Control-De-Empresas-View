import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/modelos/user.modelo';
import { userServicios } from 'src/app/servicios/user.servicios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
  providers: [userServicios]
})
export class IniciarSesionComponent implements OnInit {
  ModeloUser: user;

  constructor(
    private _userServicios:userServicios,
    private _router: Router
  ) { 
    this.ModeloUser = new user("","","","",0,"","","")
  }

  ngOnInit(): void {
  }

  login(){
    this._userServicios.login(this.ModeloUser).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem("idmiuser", res.user._id)
        this._router.navigate(['/empresas'])
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido '+res.user.username,
          showConfirmButton: false,
          timer: 2500
        })
      },error =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido '+<any>error.error.message,
          showConfirmButton: false,
          timer: 2500
        })
      }
    )
  }
}

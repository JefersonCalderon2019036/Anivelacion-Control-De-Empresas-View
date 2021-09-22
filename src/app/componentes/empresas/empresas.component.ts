import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/modelos/user.modelo';
import { userServicios } from 'src/app/servicios/user.servicios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
  providers: [userServicios]
})
export class EmpresasComponent implements OnInit {
  datosempresas: any;
  ModeloUser: user;

  constructor(
    public _userServicios: userServicios
  ) { 
    this.ModeloUser = new user("","","","",0,"","","")
  }

  ngOnInit(): void {
    this.getEmpresas()
  }

  getEmpresas(){
    this._userServicios.getEmpresas().subscribe(
      res => {
        this.datosempresas = res.empresas
        console.log(this.datosempresas)
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.message,
        })
      }
    )
  }

  saveEmpresa(){
    this._userServicios.saveEmpresa(this.ModeloUser).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La empresa con el nombre de: '+this.ModeloUser.name+' fue creada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEmpresas()
      },  error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.message,
        })
      }
    )
  }

  datecaputre(id: any){
    this.ModeloUser._id = id
  }
  
  removeEmpresa(){
    this._userServicios.removeEmpresa(this.ModeloUser._id, this.ModeloUser).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La empresa con el nombre de: '+res.userRemoved.name+' fue eliminada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEmpresas()
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.message,
        })
      }
    )
  }

  updateEmpresa(){
    console.log(this.ModeloUser)
    this._userServicios.updateEmpresa(this.ModeloUser._id, this.ModeloUser).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La empresa con el nombre de: '+res.userUpdated.name+' fue eliminada correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEmpresas()
      }, error => {
        console.log(<any>error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: <any>error.error.message,
        })
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { empleado } from 'src/app/modelos/empleado.modelo';
import { empleadoServicios } from 'src/app/servicios/empleado.servicios';
import { userServicios } from 'src/app/servicios/user.servicios';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  providers: [userServicios,empleadoServicios]
})
export class EmpleadosComponent implements OnInit {
  rol: any;
  bloqueobotones: any;
  datosempleados: any;
  ModelosEmpleados: empleado
  busqueda = {search: ""}
  namecompay: any;

  constructor(
    public _userServicios: userServicios,
    public _empleadoServicios: empleadoServicios
  ) { 
    this.rol = this._userServicios.getrol()
    this.namecompay = this._userServicios.getname()
    this.ModelosEmpleados = new empleado("","","","","")
  }

  ngOnInit(): void {
    this.bloqueoroladmin()
    this.getEmpleados()
  }

  bloqueoroladmin(){
    if(this.rol != "EMPRESA"){
      this.bloqueobotones = false
    }else{
      this.bloqueobotones = true
    }
  }

  getEmpleados(){
    this._empleadoServicios.getEmpleados().subscribe(
      res => {
        console.log(res)
        this.datosempleados = res.empleadosFind.empleados
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

  AgregarUnEmpleado(){
    this._empleadoServicios.setEmpleado(this.ModelosEmpleados).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: this.ModelosEmpleados.name+" "+this.ModelosEmpleados.lastname,
          showConfirmButton: false,
          timer: 1500
        })
        this.getEmpleados()
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

  removeEmpleado(id: any){
    Swal.fire({
      title: 'Seguro que deseas eliminar este empleado?',
      text: "No podras recuperar los datos si lo eliminas",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._empleadoServicios.removeEmpleado(id).subscribe(
          res => {
            Swal.fire(
              'Deleted!',
              'Su usuario fue eliminado correctamente',
              'success'
            )
            this.getEmpleados()
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
    })
  }

  datos(id: any){
    this.ModelosEmpleados._id = id;
  }

  Actualizar(){
    this._empleadoServicios.updateEmpleado(this.ModelosEmpleados._id, this.ModelosEmpleados).subscribe(
      res =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Actualizado',
          showConfirmButton: false,
          timer: 2500
        })
        this.getEmpleados()
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

  Buscar(){
    if(this.busqueda.search == ""){
      this.getEmpleados()
    }else{
      this._empleadoServicios.search(this.busqueda).subscribe(
        res => {
          this.datosempleados = res.resultSearch
          console.log(res)
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

  Imprimir(){
    const doc = new jsPDF();
    autoTable(doc, { html: '#table-empleados' })
    doc.save("Tabla De Empleados de "+this.namecompay+".pdf")
  }
}

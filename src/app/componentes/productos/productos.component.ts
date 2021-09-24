import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { productos } from 'src/app/modelos/productos.modelo';
import { productoServicios } from 'src/app/servicios/productos.servicios';
import { userServicios } from 'src/app/servicios/user.servicios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  providers: [productoServicios]
})
export class ProductosComponent implements OnInit {
  datos: any;
  orden = {orden: "", cant: "", tipo:"", search: "", search2: 0}
  rol: any;
  namecompay: any;
  ModeloProductos: productos;

  constructor(
    public _userServicios: userServicios,
    public _productoServicios: productoServicios
  ) { 
    this.rol = this._userServicios.getrol()
    this.namecompay = this._userServicios.getname()
    this.ModeloProductos = new productos("","","",0,0,"")
  }

  ngOnInit(): void {
    this.orden.orden = "SotckAsc";
    this.orden.tipo = "name";
    this.listproducto()
  }
  listproducto(){
    this._productoServicios.listProductos(this.orden).subscribe(
      res => {
        this.datos = res.productos
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

  setProducto(){
    this._productoServicios.setProducto(this.ModeloProductos).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.orden.orden = "SotckAsc";
        this.listproducto()
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

  Imprimir(){
    const doc = new jsPDF();
    autoTable(doc, { html: '#table-productos' })
    doc.save("Tabla de productos de "+this.namecompay+".pdf")
  }

  obtenerid(datos: any){
    this.ModeloProductos = datos;
  }

  Vender(){
    this._productoServicios.simuVenta(this.orden, this.ModeloProductos._id).subscribe(
      res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.orden.orden = "SotckAsc";
        this.listproducto()
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

  busqueda(){
    if(this.orden.tipo == "number"){
      this._productoServicios.searchP(this.orden).subscribe(
        res => {
          this.datos = res.resultSearch
        }, error => {
          console.log(<any>error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: <any>error.error.message,
          })
        }
      )
    }else{
      this.orden.search2 = Number(this.orden.search)
      this._productoServicios.searchP(this.orden).subscribe(
        res => {
          this.datos = res.resultSearch
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
}
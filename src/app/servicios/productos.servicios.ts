import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { productos } from '../modelos/productos.modelo';
import { serviciosglobales } from "./rutas.servicios";

@Injectable({
    providedIn: 'root'
})
export class productoServicios{

    url: string;
    token: any;
    public encabezadosintoken = new HttpHeaders().set('Content-Type','application/json');
    public encabezadocontoken = this.encabezadosintoken.set('Authorization', this.getToken());
    

    constructor(public _http: HttpClient){
        this.url = serviciosglobales.url
    }

    //funcion para obtener todos los productos
    listProductos(datos: any):Observable<any>{
        let params = JSON.stringify(datos)
        return this._http.put(this.url+"listProductos", datos, {headers: this.encabezadocontoken})
    }

    //funcion para agregar un productos
    setProducto(datos: productos): Observable<any>{
        let params = JSON.stringify(datos)
        return this._http.post(this.url+"setProducto", params, {headers: this.encabezadocontoken})
    }

    simuVenta(datos: any, id: any):Observable<any>{
        let params = JSON.stringify(datos)
        return this._http.put(this.url+"simuVenta/"+id, params, {headers: this.encabezadocontoken})
    }

    //funcion para obtener el token
    getToken(){
        var token2 = localStorage.getItem('token');
        if(token2 != 'undefined'){
          this.token = token2;
        }else{
          this.token = null;
        }
        return this.token;
    }
}
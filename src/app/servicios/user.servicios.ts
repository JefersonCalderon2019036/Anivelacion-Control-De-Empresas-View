import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { user } from '../modelos/user.modelo';
import { serviciosglobales } from "./rutas.servicios";

@Injectable({
    providedIn: 'root'
})
export class userServicios{

    url: string;
    token: any;
    public encabezadosintoken = new HttpHeaders().set('Content-Type','application/json');
    public encabezadocontoken = this.encabezadosintoken.set('Authorization', this.getToken());
    

    constructor(public _http: HttpClient){
        this.url = serviciosglobales.url
    }

    //funcion para iniciar secion
    login(datos: user): Observable<any>{
        let params = JSON.stringify(datos);
        return this._http.post(this.url+"login", params, {headers: this.encabezadosintoken})
    }

    //funcion para obtener todas las empresas
    getEmpresas(): Observable<any>{
        return this._http.get(this.url+"getEmpresas", {headers: this.encabezadocontoken})
    }

    //funcion para guardar las empresas
    saveEmpresa(datos: user):Observable<any>{
        let params = JSON.stringify(datos)
        return this._http.post(this.url+"saveEmpresa", params, {headers: this.encabezadocontoken})
    }
    
    //funcion para editar una empresa
    updateEmpresa(id: any, datos: user):Observable<any>{
        let params = JSON.stringify(datos)
        return this._http.put(this.url+"updateEmpresa/"+id, params, {headers: this.encabezadocontoken})
    }

    //funcion para eliminar una empresa
    removeEmpresa(id: any, datos: user): Observable<any>{
        let params = JSON.stringify(datos)
        return this._http.put(this.url+"removeEmpresa/"+id, params, {headers: this.encabezadocontoken})
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

    getrol(){
        var token2 = localStorage.getItem('rol');
        if(token2 != 'undefined'){
          this.token = token2;
        }else{
          this.token = null;
        }
        return this.token;
    }
}
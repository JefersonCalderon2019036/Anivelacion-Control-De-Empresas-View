import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
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
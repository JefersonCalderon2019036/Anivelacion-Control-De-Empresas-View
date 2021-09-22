import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-de-navegacion',
  templateUrl: './menu-de-navegacion.component.html',
  styleUrls: ['./menu-de-navegacion.component.scss']
})
export class MenuDeNavegacionComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  serrarsecion(){
    window.localStorage.clear()
    this._router.navigate(['/iniciar-sesion'])
  }
}

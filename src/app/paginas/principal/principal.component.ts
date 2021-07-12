import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  opcion: string | undefined; 
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/principal', opcion:undefined, title: 'Sistema de Matriculas', icon: 'home', class: 'active' },
  { path: '/principal/busqueda', opcion:'busqueda', title: 'Busqueda de Materias', icon: 'manage_search', class: '' },
  { path: '/principal/matricula', opcion:'matricula', title: 'Matricularse', icon: 'post_add', class: '' },
  { path: '/periodo', opcion:'periodo', title: 'Periodo', icon: 'list_alt', class: '' }

];

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private location: Location, private route:Router) { }

  selected: string = "";

  user:String | null= "";

  menuItems: any[] | undefined;

  ngOnInit() {
    console.log(sessionStorage.getItem('nombre'));
    if(sessionStorage.getItem('nombre')==null){
      this.route.navigate([""]);
    }
    this.selected = (this.location.path().split("/"))[2];
    console.log(this.selected)
    this.location.onUrlChange(val => {
        this.selected = (val.split("/"))[2];
        console.log(this.selected)
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.user=sessionStorage.getItem('nombre');
  }

  Salir(){
    sessionStorage.clear();
    console.log(sessionStorage.getItem('nombre'));
    this.route.navigate([""]);
  }

}

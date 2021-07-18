import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignatura } from 'src/app/model/asignatura';
import { Departmanento } from 'src/app/model/departamento';
import { Periodo } from 'src/app/model/periodo';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

constructor(private http:HttpClient) { }

Url='http://localhost:8080/api/';


getDepartamentos(): Observable<any>{
  return this.http.get<Departmanento>(this.Url+"departamento/");
}


getPeriodos(): Observable<any>{
  return this.http.get<Periodo>(this.Url+"periodo/");
}

getAsignaturas(departamento:number,periodo:number):Observable<any>{
  return this.http.get<Asignatura>(this.Url+"asignatura/"+departamento+"/"+periodo);
}

getCursos(asignatura:number, periodo:number): Observable<any>{
  return this.http.get(this.Url+"curso/"+asignatura+"/"+periodo);
}

}

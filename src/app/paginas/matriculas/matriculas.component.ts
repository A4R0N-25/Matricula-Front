import { Component, OnInit } from '@angular/core';
import { Matricula } from 'src/app/model/matricula';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css']
})
export class MatriculasComponent implements OnInit {

  constructor(private service: ServiciosService) { }

  matriculas: Matricula[]=[]

  columnsToDisplay = ['N°', 'Periodo', 'CreditosTotales', 'Fecha'];

  ngOnInit() {
    this.getMatriculas()
  }

  getMatriculas(){
    this.matriculas=[]
    this.service.obtenerAllMatriculasEstudiante(sessionStorage.getItem('correo')).subscribe(res =>{
      console.log(res)
      res.forEach((element: { codigo: any; creditosTotales: any; fecha: any; periodo: any; detalles: any; }) => {
        this.matriculas.push({
          codigo: element.codigo,
          creditosTotales: element.creditosTotales,
          fecha: element.fecha,
          periodo: element.periodo,
          detalles: element.detalles
        })
        
      });
    })
  }


}

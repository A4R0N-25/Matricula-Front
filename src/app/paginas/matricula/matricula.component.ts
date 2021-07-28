import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Curso } from 'src/app/model/curso';
import { MatriculaRQ } from 'src/app/model/matriculaRQ';
import { Periodo } from 'src/app/model/periodo';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  constructor(private service: ServiciosService) { }

  busqueda = new FormGroup({
    periodo: new FormControl('', [Validators.required]),
    curso: new FormControl('', [Validators.required])
  });

  listaPeriodos: Periodo[] = [];

  per: number = 0

  nrc = true;

  value = 'Clear me';

  cursos: Curso[] = []

  creditos:number=0

  codigoCurso: any

  matricula: MatriculaRQ | undefined


  ngOnInit() {
    this.getPeriodos()
  }

  getPeriodos() {
    this.listaPeriodos = [];
    this.service.getPeriodos().subscribe(res => {
      this.listaPeriodos.length = 0
      res.forEach((element: { codigo: any; nombre: any; estado: any }) => {
        if (element.estado == "ACT") {
          this.listaPeriodos.push({
            codigo: element.codigo,
            nombre: element.nombre,
            estado: element.estado
          })
        }
      });
    })
  }

  seleccion() {
    if (this.per != 0 && this.per != undefined) {
      this.nrc = false;
    } else {
      this.nrc = true
    }
  }

  addNRC() {
    if(this.cursos.length==0){
      this.addToCursos()
    }else{
      console.log("dos")
      let repetido=false;
      this.cursos.forEach(data => {
        if (data.nrc == this.codigoCurso) {
          Swal.fire('NRC ya agregado')
          repetido=true
        } 
      })
      if(!repetido){
      this.addToCursos()
    }
  }
}

  addToCursos() {
    this.service.getCurso(this.codigoCurso).subscribe(res => {
      this.creditos += res.creditos
      this.cursos.push({
        codigo: res.codigo,
        nrc: res.nrc,
        cupo: res.cupo,
        disponible: res.disponible,
        asignatura: res.asignatura,
        creditos: res.creditos,
        carreras: res.carreras,
        horarios: res.horarios
      })
    }, error => {
      Swal.fire('NRC no encontrado')
    })
  }


  matricularse(){
    if(this.busqueda.controls['periodo'].valid && this.cursos.length>0){
      this.matricula = {
        correo : sessionStorage.getItem('correo'),
        periodo: this.per,
        cursos: []
      }
      this.cursos.forEach(data =>{
        this.matricula?.cursos.push(data.codigo)
      })
      console.log("Matricula:"+this.matricula.correo)
      console.log("Matricula:"+this.matricula.periodo)
      console.log("Matricula:"+this.matricula.cursos)
      this.service.matricularse(this.matricula).subscribe(res => {
        Swal.fire('Matriculado exitosamente')
      }, error =>{
        Swal.fire('No se realizo la matricula')
      })
    }else{
      Swal.fire('Debe seleccionar un periodo y almenos una materia')
    }
  }


  borrarCurso(cur:number){
    this.cursos = this.cursos.filter(item => item.nrc !== cur);
    this.creditos=0
    this.cursos.forEach(element => {
      this.creditos +=element.creditos
    })
  }
}

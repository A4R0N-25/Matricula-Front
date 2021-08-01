import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { Curso } from 'src/app/model/curso';
import { Matricula } from 'src/app/model/matricula';
import { MatriculaRQ } from 'src/app/model/matriculaRQ';
import { Periodo } from 'src/app/model/periodo';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatriculaDetalle } from 'src/app/model/matriculaDetalle';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  constructor(private service: ServiciosService, private _snackBar: MatSnackBar) { }

  busqueda = new FormGroup({
    periodo: new FormControl('', [Validators.required]),
    curso: new FormControl('', [Validators.required])
  });

  listaPeriodos: Periodo[] = [];

  per: number = 0

  nrc = true;

  value = 'Clear me';

  cursos: Curso[] = []

  creditos: number = 0

  codigoCurso: any

  matricula: MatriculaRQ | undefined

  matriculaInfo: Matricula = new Matricula

  ngOnInit() {
    this.getPeriodos()

  }

  buscarMatricula() {
    this.service.buscarMatricula(sessionStorage.getItem('correo'), this.per).subscribe(res => {
      //console.log(res)
      this.matriculaInfo = {
        codigo: res.codigo,
        periodo: res.periodo,
        fecha: res.fecha,
        creditosTotales: res.creditosTotales,
        detalles: res.detalle
      }
    })
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
      this.buscarMatricula();
      this.nrc = false;
    } else {
      this.matriculaInfo=new Matricula
      this.nrc = true
    }
  }

  addNRC() {
    if (this.cursos.length == 0) {
      this.addToCursos()
    } else {
      console.log("dos")
      let repetido = false;
      this.cursos.forEach(data => {
        if (data.nrc == this.codigoCurso) {
          Swal.fire('NRC ya agregado')
          repetido = true
        }
      })
      if (!repetido) {
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
      this._snackBar.open("NRC no encontrado", "cerrar",{duration:2500});
    })
  }


  matricularse() {
    if (this.busqueda.controls['periodo'].valid && this.cursos.length > 0) {
      this.matricula = {
        matricula: this.matriculaInfo?.codigo,
        correo: sessionStorage.getItem('correo'),
        periodo: this.per,
        cursos: []
      }
      this.cursos.forEach(data => {
        this.matricula?.cursos.push(data.codigo)
      })
      this.cursos = []
      this.creditos=0
      /*console.log("Matricula:" + this.matricula.matricula)
      console.log("Matricula:" + this.matricula.correo)
      console.log("Matricula:" + this.matricula.periodo)
      console.log("Matricula:" + this.matricula.cursos)*/
      this.service.matricularse(this.matricula).subscribe(res => {
        this.buscarMatricula()
        //console.log(res)
        res.forEach((element: string,index: number) => {
          setTimeout(() => {
              
            this._snackBar.open(element, "cerrar", {
                duration: 2500,
                verticalPosition: 'bottom', // 'top' | 'bottom'
                horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
            });
            

        }, index * (2500+500));
        });
      }, error => {
        //Swal.fire('No se realizo la matricula')
        console.log(error.error)
        error.error.forEach((element: string, index: any) => {
          //console.log("error: " + element)
          setTimeout(() => {
              
            this._snackBar.open(element, "cerrar", {
                duration: 2500,
                verticalPosition: 'bottom', // 'top' | 'bottom'
                horizontalPosition: 'center' //'start' | 'center' | 'end' | 'left' | 'right'
            });
            

        }, index * (2500+500));
        });
      })
    } else {
      Swal.fire('Debe seleccionar un periodo y almenos una materia')
    }
  }


  borrarCurso(cur: number) {
    this.cursos = this.cursos.filter(item => item.nrc !== cur);
    this.creditos = 0
    this.cursos.forEach(element => {
      this.creditos += element.creditos
    })
  }

  borrarDetalleMatricula(detalle: MatriculaDetalle) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Estas apunto de borrar "+detalle.materia+"("+ detalle.nrc+")",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.borrarDetalleMatricula(detalle.codigo).subscribe(res => {
          this.buscarMatricula()
          Swal.fire(
            'Eliminado!',
            'La materia: '+detalle.nrc+" - "+detalle.materia,
            'success'
          )
        }, error =>{
          Swal.fire(
            'No se logro eliminar!',
            'La materia: '+detalle.nrc+" - "+detalle.materia,
            'error'
          )
        })

      }
    })

  }
}


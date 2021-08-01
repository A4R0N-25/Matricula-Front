import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/model/carrera';
import { Estudiante } from 'src/app/model/estudiante';
import { ServiciosService } from 'src/app/services/servicios/Servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private route: Router, private service: ServiciosService, private _snackBar: MatSnackBar) { }

  registrar = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    identificacion: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    career: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repassword: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required])
  });

  carreras: Carrera[] = []

  estudiante: Estudiante = new Estudiante

  ngOnInit() {
    this.getCarreras()
  }

  getCarreras() {
    this.carreras = []
    this.service.obtenerAllCarreras().subscribe(res => {
      res.forEach((element: { codigo: any; nombre: any; }) => {
        this.carreras.push({
          codigo: element.codigo,
          nombre: element.nombre
        })

      });
    })
  }

  registrarse() {
    if (this.registrar.valid) {
      this.estudiante = {
        tipo: this.registrar.controls["tipo"].value,
        identificacion: this.registrar.controls["identificacion"].value,
        nombre: this.registrar.controls["nombre"].value,
        apellido: this.registrar.controls["apellido"].value,
        correo: this.registrar.controls["correo"].value,
        carrera: this.registrar.controls["career"].value,
        genero: this.registrar.controls["genero"].value,
        contraseña: this.registrar.controls["password"].value,
        telefono: this.registrar.controls["telefono"].value,
        direccion: this.registrar.controls["direccion"].value
      }
      this.service.nuevoEstudiante(this.estudiante).subscribe(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro Exitoso',
          showConfirmButton: false,
          timer: 1500
        })
        sessionStorage.setItem('correo', this.registrar.controls['correo'].value + "@espe.edu.ec")
        sessionStorage.setItem('nombre', this.registrar.controls['correo'].value);
        this.route.navigate(["principal"]);
      }, error =>{
        this._snackBar.open("Hubo un error", "cerrar");
      })
    } else {
      this._snackBar.open("Complete todos los campos", "cerrar");
    }
  }
}

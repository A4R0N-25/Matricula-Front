import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { LoginServiceService } from 'src/app/services/loginService.service';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private service: LoginServiceService) { }

  login = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  auth: boolean = false

  ngOnInit() {
    //sessionStorage.setItem('nombre','Brandon');
    if (sessionStorage.getItem('nombre') != null) {
      this.route.navigate(["principal"]);
    }
  }

  Verificar() {
    let user = new Login();
    user.correo = this.login.controls['correo'].value;
    user.password = this.login.controls['password'].value;

    this.service.autenticar(user).then(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Correcto',
        showConfirmButton: false,
        timer: 1500
      })
      var correo = this.login.controls['correo'].value.split("@");
      sessionStorage.setItem('nombre', correo[0]);
      this.route.navigate(["principal"]);
    },err => {
      console.log("Falla de validacion")
    })
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error en Credenciales',
      showConfirmButton: false,
      timer: 1500
    })
    this.login.controls['password'].reset();
    this.login.markAllAsTouched();

  }



}

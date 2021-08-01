import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { LoginServiceService } from 'src/app/services/loginService.service';
import { Login } from 'src/app/model/login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private service: LoginServiceService,private _snackBar: MatSnackBar) { }

  login = new FormGroup({
    correo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  auth: boolean = false

  ngOnInit() {
    //sessionStorage.setItem('nombre','Brandon');
    if (sessionStorage.getItem('nombre') != null) {
      this.route.navigate(["principal"]);
    }
  }

  registrar(){
    this.route.navigate(["registrar"])
  }

  Verificar() {
    let user = new Login();
    user.correo = this.login.controls['correo'].value+"@espe.edu.ec";
    user.password = this.login.controls['password'].value;

    this.service.autenticar(user).then(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Correcto',
        showConfirmButton: false,
        timer: 1500
      })
      sessionStorage.setItem('correo', this.login.controls['correo'].value+"@espe.edu.ec")
      sessionStorage.setItem('nombre', this.login.controls['correo'].value);
      this.route.navigate(["principal"]);
    },err => {
      this._snackBar.open(err.error, "cerrar",{duration:2500});
      this.login.controls['password'].reset();
      this.login.markAllAsTouched();
    })

  }



}

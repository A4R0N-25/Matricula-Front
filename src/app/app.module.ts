import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { TablaComponent } from './paginas/tabla/tabla.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatriculaComponent } from './paginas/matricula/matricula.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import { LoginServiceService } from './services/loginService.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiciosService } from './services/servicios/Servicios.service';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    TablaComponent,
    MatriculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    NgbModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [LoginServiceService,ServiciosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

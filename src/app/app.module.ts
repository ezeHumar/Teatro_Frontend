import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Inject, Injectable } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { DetalleUsuarioComponent } from './componentes/usuario/detalle-usuario/detalle-usuario.component';
import { ListaUsuarioComponent } from './componentes/usuario/lista-usuario/lista-usuario.component';
import { ListaActividadComponent } from './componentes/actividad/lista-actividad/lista-actividad.component';
import { ListaArtistaComponent } from './componentes/artista/lista-artista/lista-artista.component';
import { ListaEdicionComponent } from './componentes/edicion/lista-edicion/lista-edicion.component';
import { ListaEspacioComponent } from './componentes/espacio/lista-espacio/lista-espacio.component';
import { ListaObraComponent } from './componentes/obra/lista-obra/lista-obra.component';
import { ListaTagComponent } from './componentes/tag/lista-tag/lista-tag.component';
import { UsuariosMock } from './servicios/usuarios-mock';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsuariosService } from './servicios/usuarios-service';
import { EditarUsuarioComponent } from './componentes/usuario/editar-usuario/editar-usuario.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LoginComponent } from './componentes/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from'./servicios/auth-guard';
import { AuthInterceptorService } from'./servicios/auth-interceptor.service';
import { FormEspacioComponent } from './componentes/espacio/form-espacio/form-espacio.component';
import { DetalleEspacioComponent } from './componentes/espacio/detalle-espacio/detalle-espacio.component';
import { EditarEspacioComponent } from './componentes/espacio/editar-espacio/editar-espacio.component';
import { EditarObraComponent } from './componentes/obra/editar-obra/editar-obra.component';
import { DetalleObraComponent } from './componentes/obra/detalle-obra/detalle-obra.component';
import { FormObraComponent } from './componentes/obra/form-obra/form-obra.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormActividadComponent } from './componentes/actividad/form-actividad/form-actividad.component';
import { DetalleActividadComponent } from './componentes/actividad/detalle-actividad/detalle-actividad.component';
import { EditarActividadComponent } from './componentes/actividad/editar-actividad/editar-actividad.component';
import { FormEdicionComponent } from './componentes/edicion/form-edicion/form-edicion.component';
import { DetalleEdicionComponent } from './componentes/edicion/detalle-edicion/detalle-edicion.component';
import { EditarEdicionComponent } from './componentes/edicion/editar-edicion/editar-edicion.component';
import { EditarArtistaComponent } from './componentes/artista/editar-artista/editar-artista.component';
import { DetalleArtistaComponent } from './componentes/artista/detalle-artista/detalle-artista.component';
import { FormArtistaComponent } from './componentes/artista/form-artista/form-artista.component';
import { FormParticipanteComponent } from './componentes/participante/form-participante/form-participante.component';
import { ListaParticipanteComponent } from './componentes/participante/lista-participante/lista-participante.component';
import { DetalleParticipanteComponent } from './componentes/participante/detalle-participante/detalle-participante.component';
import { EditarParticipanteComponent } from './componentes/participante/editar-participante/editar-participante.component';
import { EditarTagComponent } from './componentes/tag/editar-tag/editar-tag.component';
import { FormTagComponent } from './componentes/tag/form-tag/form-tag.component';
import { HeaderComponent } from './componentes/layout/header/header.component';
import { SidenavComponent } from './componentes/layout/sidenav/sidenav.component';
import { WelcomeComponent } from './componentes/welcome/welcome.component';
import { FormdataUploadComponent } from './componentes/formdata-upload/formdata-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './componentes/modal/modal.component';
import { DatePipe } from '@angular/common';
import { ModalEliminarComponent } from './componentes/modal-eliminar/modal-eliminar.component';

@NgModule({
  declarations: [
    AppComponent,
    FormUsuarioComponent,
    DetalleUsuarioComponent,
    ListaUsuarioComponent,
    ListaActividadComponent,
    ListaArtistaComponent,
    ListaEdicionComponent,
    ListaEspacioComponent,
    ListaObraComponent,
    ListaTagComponent,
    EditarUsuarioComponent,
    RegisterComponent,
    LoginComponent,
    FormEspacioComponent,
    DetalleEspacioComponent,
    EditarEspacioComponent,
    EditarObraComponent,
    DetalleObraComponent,
    FormObraComponent,
    FormActividadComponent,
    DetalleActividadComponent,
    EditarActividadComponent,
    FormEdicionComponent,
    DetalleEdicionComponent,
    EditarEdicionComponent,
    EditarArtistaComponent,
    DetalleArtistaComponent,
    FormArtistaComponent,
    FormParticipanteComponent,
    ListaParticipanteComponent,
    DetalleParticipanteComponent,
    EditarParticipanteComponent,
    EditarTagComponent,
    FormTagComponent,
    HeaderComponent,
    SidenavComponent,
    WelcomeComponent,
    FormdataUploadComponent,
    ModalComponent,
    ModalEliminarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'http://maps.google.com/maps/api/js?sensor=false',
      libraries: ['places']
    }),
    NgbModule
  ],
  providers: [
    UsuariosMock,
    UsuariosService,
    CookieService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

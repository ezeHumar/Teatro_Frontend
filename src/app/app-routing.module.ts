import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUsuarioComponent } from './componentes/usuario/form-usuario/form-usuario.component';
import { ListaUsuarioComponent } from './componentes/usuario/lista-usuario/lista-usuario.component';
import { DetalleUsuarioComponent } from './componentes/usuario/detalle-usuario/detalle-usuario.component';
import { ListaActividadComponent } from './componentes/actividad/lista-actividad/lista-actividad.component';
import { ListaArtistaComponent } from './componentes/artista/lista-artista/lista-artista.component';
import { ListaEdicionComponent } from './componentes/edicion/lista-edicion/lista-edicion.component';
import { ListaObraComponent } from './componentes/obra/lista-obra/lista-obra.component';
import { ListaTagComponent } from './componentes/tag/lista-tag/lista-tag.component';
import { EditarUsuarioComponent } from './componentes/usuario/editar-usuario/editar-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AuthGuard } from './servicios/auth-guard';
import { FormEspacioComponent } from './componentes/espacio/form-espacio/form-espacio.component';
import { DetalleEspacioComponent } from './componentes/espacio/detalle-espacio/detalle-espacio.component';
import { EditarEspacioComponent } from './componentes/espacio/editar-espacio/editar-espacio.component';
import { ListaEspacioComponent } from './componentes/espacio/lista-espacio/lista-espacio.component';
import { FormObraComponent } from './componentes/obra/form-obra/form-obra.component';
import { EditarObraComponent } from './componentes/obra/editar-obra/editar-obra.component';
import { DetalleObraComponent } from './componentes/obra/detalle-obra/detalle-obra.component';
import { DetalleActividadComponent } from './componentes/actividad/detalle-actividad/detalle-actividad.component';
import { EditarActividadComponent } from './componentes/actividad/editar-actividad/editar-actividad.component';
import { FormActividadComponent } from './componentes/actividad/form-actividad/form-actividad.component';
import { DetalleEdicionComponent } from './componentes/edicion/detalle-edicion/detalle-edicion.component';
import { EditarEdicionComponent } from './componentes/edicion/editar-edicion/editar-edicion.component';
import { FormEdicionComponent } from './componentes/edicion/form-edicion/form-edicion.component';
import { FormArtistaComponent } from './componentes/artista/form-artista/form-artista.component';
import { EditarArtistaComponent } from './componentes/artista/editar-artista/editar-artista.component';
import { DetalleArtistaComponent } from './componentes/artista/detalle-artista/detalle-artista.component';
import { CommonModule } from '@angular/common';
import { DetalleParticipanteComponent } from './componentes/participante/detalle-participante/detalle-participante.component';
import { EditarParticipanteComponent } from './componentes/participante/editar-participante/editar-participante.component';
import { FormParticipanteComponent } from './componentes/participante/form-participante/form-participante.component';
import { ListaParticipanteComponent } from './componentes/participante/lista-participante/lista-participante.component';
import { EditarTagComponent } from './componentes/tag/editar-tag/editar-tag.component';
import { FormTagComponent } from './componentes/tag/form-tag/form-tag.component';
import { WelcomeComponent } from './componentes/welcome/welcome.component';
import { FormdataUploadComponent } from './componentes/formdata-upload/formdata-upload.component';


const routes: Routes = [
  { path: 'subir/', component: FormdataUploadComponent}, 
  { path: 'tags/detalle/:id', component: DetalleObraComponent, canActivate: [AuthGuard] }, 
  { path: 'tags/editar/:id', component: EditarTagComponent, canActivate: [AuthGuard] },
  { path: 'tags/formtag', component: FormTagComponent, canActivate: [AuthGuard] }, 
  { path: 'participantes/detalle/:id', component: DetalleParticipanteComponent, canActivate: [AuthGuard] }, 
  { path: 'participantes/editar/:id', component: EditarParticipanteComponent, canActivate: [AuthGuard] },
  { path: 'participantes/formparticipante', component: FormParticipanteComponent, canActivate: [AuthGuard] }, 
  { path: 'artistas/detalle/:id', component: DetalleArtistaComponent, canActivate: [AuthGuard] }, 
  { path: 'participantes', component: ListaParticipanteComponent, canActivate: [AuthGuard] },
  { path: 'artistas/editar/:id', component: EditarArtistaComponent, canActivate: [AuthGuard] },
  { path: 'artistas/formartista', component: FormArtistaComponent, canActivate: [AuthGuard] }, 
  { path: 'ediciones/detalle/:id', component: DetalleEdicionComponent, canActivate: [AuthGuard] }, 
  { path: 'ediciones/editar/:id', component: EditarEdicionComponent, canActivate: [AuthGuard] },
  { path: 'ediciones/formedicion', component: FormEdicionComponent, canActivate: [AuthGuard] }, 
  { path: 'actividades/detalle/:id', component: DetalleActividadComponent, canActivate: [AuthGuard] }, 
  { path: 'actividades/editar/:id', component: EditarActividadComponent, canActivate: [AuthGuard] },
  { path: 'actividades/formactividad', component: FormActividadComponent, canActivate: [AuthGuard] }, 
  { path: 'obras/detalle/:id', component: DetalleObraComponent, canActivate: [AuthGuard] }, 
  { path: 'obras/editar/:id', component: EditarObraComponent, canActivate: [AuthGuard] },
  { path: 'obras/formobra', component: FormObraComponent, canActivate: [AuthGuard] }, 
  { path: 'espacios/editar/:id', component: EditarEspacioComponent, canActivate: [AuthGuard] }, 
  { path: 'espacios/detalle/:id', component: DetalleEspacioComponent, canActivate: [AuthGuard] }, 
  { path: 'espacios', component: ListaEspacioComponent, canActivate: [AuthGuard] }, 
  { path: 'espacios/formespacio', component: FormEspacioComponent, canActivate: [AuthGuard] }, 
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/detalle/:id', component: DetalleUsuarioComponent,canActivate: [AuthGuard] },
  { path: 'usuarios/formusuario', component: FormUsuarioComponent, canActivate: [AuthGuard] }, 
  { path: 'usuarios', component: ListaUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'actividades', component: ListaActividadComponent, canActivate: [AuthGuard] },
  { path: 'artistas', component: ListaArtistaComponent, canActivate: [AuthGuard] },
  { path: 'ediciones', component: ListaEdicionComponent, canActivate: [AuthGuard] },
  // { path: 'espacios', component: ListaEspacioComponent, canActivate: [AuthGuard] },
  { path: 'obras', component: ListaObraComponent, canActivate: [AuthGuard] },
  { path: 'tags', component: ListaTagComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

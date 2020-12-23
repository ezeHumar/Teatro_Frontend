import { Component, OnInit } from '@angular/core';
import { UsuariosService } from "src/app/servicios/usuarios-service";
import { Usuario } from 'src/app/modelos/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleUsuarioComponent } from '../detalle-usuario/detalle-usuario.component';
import { ModalEliminarComponent } from '../../modal-eliminar/modal-eliminar.component';



@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})

export class ListaUsuarioComponent implements OnInit {


  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private usuarioServicio: UsuariosService) { }


  usuarios: Usuario[] = [];
  filtro: string;

  nombreFiltro: string;
  apellidoFiltro: string;
  emailFiltro: string;

  busquedaCheck: string;
  busquedaTexto: string;

  listaCargada: boolean = false;//Indica si ya se hizo el GET de la lista

  ngOnInit(): void {
    this.usuarioServicio.refreshNeeded$
      .subscribe(() => {
        this.getUsuarios();
      });
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioServicio.getList().subscribe(usuarios =>{
      this.usuarios = usuarios;
      this.listaCargada=true;
    });
  }

  deleteUsuario(id: number) {
    this.usuarioServicio.delete(id).subscribe();
  }

  irDetalle(id) {
    this.router.navigate(['/usuarios/detalle/', id]);
    console.log(id);
  }

  search() {
    if (this.filtro != "") {
      this.usuarios = this.usuarios.filter(res => {
        return res.nombre.toLocaleLowerCase().match(this.filtro.toLocaleLowerCase());
      });
    } else if (this.filtro == "") {
      this.ngOnInit();
    }

  }

  busqueda2() {

    switch (this.busquedaCheck) {
      case 'nombre':
        this.usuarioServicio.getListPorNombre(this.busquedaTexto).subscribe(usuarios => this.usuarios = usuarios);
        break;
      case 'apellido':
        this.usuarioServicio.getListPorApellido(this.busquedaTexto).subscribe(usuarios => this.usuarios = usuarios);
        break;
      case 'email':
        this.usuarioServicio.getListPorEmail(this.busquedaTexto).subscribe(usuarios => this.usuarios = usuarios);
        break;
      case 'ninguno':
        this.ngOnInit();
        break;
      default: this.ngOnInit();

    }

  }

  busqueda() {
    if (this.nombreFiltro == "") {
      this.nombreFiltro = null;
    }

    if (this.apellidoFiltro == "") {
      this.apellidoFiltro = null;
    }

    if (this.emailFiltro == "") {
      this.emailFiltro = null;
    }

    this.usuarioServicio.getListFiltered(this.nombreFiltro, this.apellidoFiltro, this.emailFiltro).subscribe(usuarios => this.usuarios = usuarios)

  }

  limpiarFiltro() {
    this.nombreFiltro = null;
    this.apellidoFiltro = null;
    this.emailFiltro = null;
  }

  open(usuario: Usuario) {
    const modalRef = this.modalService.open(DetalleUsuarioComponent);
    modalRef.componentInstance.elemento = usuario;
  }

  openEliminar(id: number) {
    const modalRef = this.modalService.open(ModalEliminarComponent);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      if (receivedEntry == true) {
        this.deleteUsuario(id);
      }
    })
  }
}

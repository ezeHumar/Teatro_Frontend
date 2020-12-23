import { Usuario } from '../modelos/usuario';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuariosMock {

//   public usuarios: Usuario[]=[{nombre: 'Franco', apellido: 'Gomez', fechaNacimiento: '29/09/1996', email: 'humarezequiel@gmail.com', esAdmin: true, esOperador: false},
//   {nombre: 'Raul', apellido: 'Lasala', fechaNacimiento: '08/03/1987', email: 'raulas@gmail.com', esAdmin: false, esOperador: true}];


  public getList(){
    //   return this.usuarios;
  }

  public get(id:number){
    //   return this.usuarios[id];

  }

  public post(u:Usuario){
    //   this.usuarios.push(u);

  }

  public put(u:Usuario){

  }

  public delete(id:number){

  }
}

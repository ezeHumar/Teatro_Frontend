import { Artista } from './artista';
import { Actividad } from './actividad';
import { Tag } from './tag';
import { Obra } from './obra';

export class Participante {

    public nombre:string;
    public apellido:string;
    public fechaNacimiento:string;
    public email:string;
    public contrasenia: string;
    public interesesObras: Obra[];
    public interesesArtistas: Artista[];
    public interesesTags: Tag[];
    public interesesActividades: Actividad[];
    // public valoraciones: Valoracion[];
    public asistencias: Actividad[];
        // public notificaciones: Notificacion[];


    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public getFechaNacimiento(): string {
        return this.fechaNacimiento;
    }

    public setFechaNacimiento(fechaNacimiento: string): void {
        this.fechaNacimiento = fechaNacimiento;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getContrasenia(): string {
        return this.contrasenia;
    }

    public setContrasenia(contrasenia: string): void {
        this.contrasenia = contrasenia;
    }

    public getInteresesObras(): Obra[] {
        return this.interesesObras;
    }

    public setInteresesObras(interesesObras: Obra[]): void {
        this.interesesObras = interesesObras;
    }

    public getInteresesArtistas(): Artista[] {
        return this.interesesArtistas;
    }

    public setInteresesArtistas(interesesArtistas: Artista[]): void {
        this.interesesArtistas = interesesArtistas;
    }

    public getInteresesTags(): Tag[] {
        return this.interesesTags;
    }

    public setInteresesTags(interesesTags: Tag[]): void {
        this.interesesTags = interesesTags;
    }

    public getInteresesActividades(): Actividad[] {
        return this.interesesActividades;
    }

    public setInteresesActividades(interesesActividades: Actividad[]): void {
        this.interesesActividades = interesesActividades;
    }

    public getAsistencias(): Actividad[] {
        return this.asistencias;
    }

    public setAsistencias(asistencias: Actividad[]): void {
        this.asistencias = asistencias;
    }


}

import { Actividad } from './actividad';

export class Edicion {

    public id: string;
    public titulo:string;
    public descripcion:string;
    public linkFotos:string;
    public fechaInicio:string;
    public fechaFin:string;
    public horaInicio:string;
    public horaFin:string;
    public actividades:Actividad[];
    public nombreFotos: string[];

    public constructor(){
        
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public getLinkFotos(): string {
        return this.linkFotos;
    }

    public setLinkFotos(linkFotos: string): void {
        this.linkFotos = linkFotos;
    }

    public getFechaInicacio(): string {
        return this.fechaInicio;
    }

    public setFechaInicio(fechaInicacio: string): void {
        this.fechaInicio = fechaInicacio;
    }

    public getFechaFin(): string {
        return this.fechaFin;
    }

    public setFechaFin(fechaFin: string): void {
        this.fechaFin = fechaFin;
    }

    public getHoraInicio(): string {
        return this.horaInicio;
    }

    public setHoraInicio(horaInicio: string): void {
        this.horaInicio = horaInicio;
    }

    public getHoraFin(): string {
        return this.horaFin;
    }

    public setHoraFin(horaFin: string): void {
        this.horaFin = horaFin;
    }

    public getActividades(): Actividad[] {
        return this.actividades;
    }

    public setActividades(actividades: Actividad[]): void {
        this.actividades = actividades;
    }

    public getNombreFotos(): string[] {
        return this.nombreFotos;
    }

    public setNombreFotos(nombreFotos: string[]): void {
        this.nombreFotos = nombreFotos;
    }

}

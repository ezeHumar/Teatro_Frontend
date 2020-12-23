import { Tag } from './tag';
import { Artista } from './artista';

export class Obra {

    public id: number;
    public nombre:string;
    public descripcion:string;
    public entradasEntregadas:number;
    public duracion:number;
    public artistaParticipante:Artista[];
    public tags:Tag[];
    public nombreFotos: string[];

    constructor(){

    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    public getEntradasEntregadas(): number {
        return this.entradasEntregadas;
    }

    public setEntradasEntregadas(entradasEntregadas: number): void {
        this.entradasEntregadas = entradasEntregadas;
    }

    public getDuracion(): number {
        return this.duracion;
    }

    public setDuracion(duracion: number): void {
        this.duracion = duracion;
    }

    public getArtistaParticipante(): Artista[] {
        return this.artistaParticipante;
    }

    public setArtistaParticipante(artistaParticipante: Artista[]): void {
        this.artistaParticipante = artistaParticipante;
    }

    public getTags(): Tag[] {
        return this.tags;
    }

    public setTags(tags: Tag[]): void {
        this.tags = tags;
    }

    public getNombreFotos(): string[] {
        return this.nombreFotos;
    }

    public setNombreFotos(nombreFotos: string[]): void {
        this.nombreFotos = nombreFotos;
    }
}

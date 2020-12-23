import { Obra } from './obra';
import { Espacio } from './espacio';
import { Tag } from './tag';
import { Evento } from './evento';

export class Actividad {

    public id: number;
    public obra:Obra;
    public espacio:Espacio;
    public fecha:string;
    public hora:string;
    public tags:Tag[];
    public evento:Evento[];

    constructor(){
        
    }

    public getObra(): Obra {
        return this.obra;
    }

    public setObra(obra: Obra): void {
        this.obra = obra;
    }

    public getEspacio(): Espacio {
        return this.espacio;
    }

    public setEspacio(espacio: Espacio): void {
        this.espacio = espacio;
    }

    public getFecha(): string {
        return this.fecha;
    }

    public setFecha(fecha: string): void {
        this.fecha = fecha;
    }

    public getHora(): string {
        return this.hora;
    }

    public setHora(hora: string): void {
        this.hora = hora;
    }

    public getTags(): Tag[] {
        return this.tags;
    }

    public setTags(tags: Tag[]): void {
        this.tags = tags;
    }

    public getEvento(): Evento[] {
        return this.evento;
    }

    public setEvento(evento: Evento[]): void {
        this.evento = evento;
    }



}

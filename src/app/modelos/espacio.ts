import { Direccion } from './direccion';

export class Espacio {

    public id:number;
    public nombre:string;
    public descripcion:string;
    public ubicacion:Direccion;
    public capacidad:number;
    public abierto:boolean;

    public constructor(){
        
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

    public getUbicacion(): Direccion {
        return this.ubicacion;
    }

    public setUbicacion(ubicacion: Direccion): void {
        this.ubicacion = ubicacion;
    }

    public getCapacidad(): number {
        return this.capacidad;
    }

    public setCapacidad(capacidad: number): void {
        this.capacidad = capacidad;
    }

    public isAbierto(): boolean {
        return this.abierto;
    }

    public setAbierto(abierto: boolean): void {
        this.abierto = abierto;
    }



}

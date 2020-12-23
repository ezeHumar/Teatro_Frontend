export class Direccion {

    public provincia:string;
    public ciudad:string;
    public calle:string;
    public numero:number;
    public latitud:number;
    public longitud:number;

    public constructor(){
        
    }

    public getProvincia(): string {
        return this.provincia;
    }

    public setProvincia(provincia: string): void {
        this.provincia = provincia;
    }

    public getCiudad(): string {
        return this.ciudad;
    }

    public setCiudad(ciudad: string): void {
        this.ciudad = ciudad;
    }

    public getCalle(): string {
        return this.calle;
    }

    public setCalle(calle: string): void {
        this.calle = calle;
    }

    public getNumero(): number {
        return this.numero;
    }

    public setNumero(numero: number): void {
        this.numero = numero;
    }

    public getLatitud(): number {
        return this.latitud;
    }

    public setLatitud(latitud: number): void {
        this.latitud = latitud;
    }

    public getLongitud(): number {
        return this.longitud;
    }

    public setLongitud(longitud: number): void {
        this.longitud = longitud;
    }

}

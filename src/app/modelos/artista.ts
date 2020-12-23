export class Artista {

    public id: number;
    public nombre:string;
    public apellido:string;
    public fechaNacimiento:string;
    public apodo:string;
    public nombreFotos: string[];

    constructor(){
        
    }

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

    public getApodo(): string {
        return this.apodo;
    }

    public setApodo(apodo: string): void {
        this.apodo = apodo;
    }

    public getNombreFotos(): string[] {
        return this.nombreFotos;
    }

    public setNombreFotos(nombreFotos: string[]): void {
        this.nombreFotos = nombreFotos;
    }
;
}

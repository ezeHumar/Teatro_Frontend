export class Usuario {
    public nombre:string;
    public apellido:string;
    public fechaNacimiento:string;
    public email:string;
    public contrasenia: string;
    public esAdmin:boolean;
    public esOperador:boolean;

    // public constructor(nombre:string, apellido:string, fechaNacimiento:string, email:string,contrasenia:string, esAdmin:boolean, esOperador:boolean){
    //     this.nombre=nombre;
    //     this.apellido=apellido;
    //     this.fechaNacimiento=fechaNacimiento;
    //     this.email=email;
    //     this.contrasenia=contrasenia;
    //     this.esAdmin=esAdmin;
    //     this.esOperador=esOperador;
    // }

    public constructor(){

    }

    public getNombre(){
        return this.nombre;
    }

    public getApellido(){
        return this.apellido;
    }

    public getFechaNacimiento(){
        return this.fechaNacimiento;
    }

    public getEmail(){
        return this.email;
    }
    public getContrasenia(): string {
        return this.contrasenia;
    }

    public setContrasenia(contrasenia: string): void {
        this.contrasenia = contrasenia;
    }

    public getEsAdmin(){
        return this.esAdmin;
    }

    public getEsOperador(){
        return this.esOperador;
    }

    public setNombre(nombre:string){
        this.nombre=nombre;
    }

    public setApellido(apellido:string){
        this.apellido=apellido;
    }

    public setFechaNacimiento(fechaNacimiento:string){
        this.fechaNacimiento=fechaNacimiento;
    }

    public setEmail(email:string){
        this.email=email;
    }

    public setEsAdmin(esAdmin:boolean){
        this.esAdmin=esAdmin;
    }

    public setEsOperador(esOperador:boolean){
        this.esOperador=esOperador;
    }
}

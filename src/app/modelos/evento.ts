export class Evento {

    private entradasAgotadas:boolean;
    private suspendido:boolean;
    private demora:number;

    constructor(){
        
    }

    public isEntradasAgotadas(): boolean {
        return this.entradasAgotadas;
    }

    public setEntradasAgotadas(entradasAgotadas: boolean): void {
        this.entradasAgotadas = entradasAgotadas;
    }

    public isSuspendido(): boolean {
        return this.suspendido;
    }

    public setSuspendido(suspendido: boolean): void {
        this.suspendido = suspendido;
    }

    public getDemora(): number {
        return this.demora;
    }

    public setDemora(demora: number): void {
        this.demora = demora;
    }

}

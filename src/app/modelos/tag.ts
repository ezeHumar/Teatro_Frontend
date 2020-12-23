export class Tag {

    public id:number;
    public tag:string;

    constructor(){
        
    }

    public getTag(): string {
        return this.tag;
    }

    public setTag(tag: string): void {
        this.tag = tag;
    }


}

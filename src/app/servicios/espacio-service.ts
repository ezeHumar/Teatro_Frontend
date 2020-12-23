import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Espacio } from '../modelos/espacio';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const url= `${environment.apiUrl}` + 'espacios/';

@Injectable({
    providedIn: 'root'
})
export class EspacioService{

    private _refreshNeeded$ = new Subject<void>();

    constructor(private http: HttpClient){

    }

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Espacio[]>{
        return this.http.get<Espacio[]>(url);
    }

    getListFiltered (nombre: string, capacidadMin: string, capacidadMax:string, ciudad: string, condicion: string): Observable<Espacio[]>{
        
        let params = new HttpParams();
        
        if(nombre!=null){
            params=params.append("nombre", nombre);
        }

        if(capacidadMin!=null){
            params=params.append("capacidadMin", capacidadMin);
        }

        if(capacidadMax!=null){
            params=params.append("capacidadMax", capacidadMax);
        }

        if(ciudad!=null){
            params=params.append("ciudad", ciudad);
        }

        if(condicion!=null){
            params=params.append("condicion", condicion);
        }
        
        return this.http.get<Espacio[]>(url+"", {params: params});
    }

    get (i:number): Observable<Espacio>{
      return this.http.get<Espacio>(url+i);
  
    }

    getNoBorrables (): Observable<number[]>{
        return this.http.get<number[]>(url+"noborrables");
    }

    post (u:Espacio): Observable<Espacio>{
        return this.http.post<Espacio>(url, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (u:Espacio): Observable<Espacio>{
        return this.http.put<Espacio>(url, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    delete (id:number): Observable<{}>{
        return this.http.delete(url+id).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }
}



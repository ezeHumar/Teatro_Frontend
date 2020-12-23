import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Actividad } from '../modelos/actividad';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const url= `${environment.apiUrl}` + 'actividades/';

@Injectable({
    providedIn: 'root'
})
export class ActividadService{

    private _refreshNeeded$ = new Subject<void>();

    constructor(private http: HttpClient){

    }

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Actividad[]>{
        return this.http.get<Actividad[]>(url);
    }

    getListFiltered (idObras: string[], idEspacios: string[], edicionId: string, horaMin: string, horaMax: string, fechaMin: string, fechaMax: string): Observable<Actividad[]>{
        

        let params = new HttpParams();

        if (idObras!=null){
            for (let i = 0; i < idObras.length; i++) {
                params = params.append("idObras", idObras[i]);
            }
        }

        if (idEspacios!=null){
            for (let i = 0; i < idEspacios.length; i++) {
                params = params.append("idEspacios", idEspacios[i]);
            }
        }

        if(edicionId!=null){
            params=params.append("idEdicion", edicionId);
        }

        if(horaMin!=null){
            params=params.append("horaMin", horaMin);
        }

        if(horaMax!=null){
            params=params.append("horaMax", horaMax);
        }

        if(fechaMin!=null){
            params=params.append("fechaMin", fechaMin);
        }

        if(fechaMax!=null){
            params=params.append("fechaMax", fechaMax);
        }

        return this.http.get<Actividad[]>(url+"", {params: params});
    }

    get (i:number): Observable<Actividad>{
      return this.http.get<Actividad>(url+i);
  
    }

    getNoBorrables (): Observable<number[]>{
        return this.http.get<number[]>(url+"noborrables");
      }

    post (u:Actividad): Observable<Actividad>{
        return this.http.post<Actividad>(url, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (u:Actividad): Observable<Actividad>{
        return this.http.put<Actividad>(url, u, httpOptions).pipe(
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

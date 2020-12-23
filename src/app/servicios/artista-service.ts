import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Artista } from '../modelos/artista';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const url= `${environment.apiUrl}` + 'artistas/';

@Injectable({
    providedIn: 'root'
})
export class ArtistaService{

    private _refreshNeeded$ = new Subject<void>();

    constructor(private http: HttpClient){

    }

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Artista[]>{
        return this.http.get<Artista[]>(url);
    }

    getListFiltered (nombre: string, apellido: string, idObras: string[], idTags: string[]): Observable<Artista[]>{
        let params = new HttpParams();

        if(nombre!=null){
            params=params.append("nombre", nombre);
        }
        if(apellido!=null){
            params=params.append("apellido", apellido);
        }
        if (idObras!=null){
            for (let i = 0; i < idObras.length; i++) {
                params = params.append("idObras", idObras[i]);
            }
        }
        if (idTags!=null){
            for (let i = 0; i < idTags.length; i++) {
                params = params.append("idTags", idTags[i]);
            }
        }

        return this.http.get<Artista[]>(url+"", {params: params});
    }

    get (i:number): Observable<Artista>{
      return this.http.get<Artista>(url+i);
  
    }

    getNoBorrables (): Observable<number[]>{
        return this.http.get<number[]>(url+"noborrables");
    }

    post (u:Artista): Observable<Artista>{
        return this.http.post<Artista>(url, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (u:Artista): Observable<Artista>{
        return this.http.put<Artista>(url, u, httpOptions).pipe(
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

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Obra } from '../modelos/obra';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const url= `${environment.apiUrl}` + 'obras/';

@Injectable({
    providedIn: 'root'
})
export class ObraService{

    private _refreshNeeded$ = new Subject<void>();

    constructor(private http: HttpClient){

    }

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Obra[]>{
        return this.http.get<Obra[]>(url);
    }

    getListFiltered (idArtistas: string[], idTags: string[], nombre: string): Observable<Obra[]>{
        let params = new HttpParams();
        
        if(nombre!=null){
            params=params.append("nombre", nombre);
        }
        if (idArtistas!=null){
            for (let i = 0; i < idArtistas.length; i++) {
                params = params.append("idArtistas", idArtistas[i]);
            }
        }
        if (idTags!=null){
            for (let i = 0; i < idTags.length; i++) {
                params = params.append("idTags", idTags[i]);
            }
        }
        return this.http.get<Obra[]>(url+"", {params: params});
    }

    get (i:number): Observable<Obra>{
      return this.http.get<Obra>(url+i);
  
    }

    getNoBorrables (): Observable<number[]>{
        return this.http.get<number[]>(url+"noborrables");
    }

    post (u:Obra): Observable<Obra>{
        return this.http.post<Obra>(url, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (u:Obra): Observable<Obra>{
        return this.http.put<Obra>(url, u, httpOptions).pipe(
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

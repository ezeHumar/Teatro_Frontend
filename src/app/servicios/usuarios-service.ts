import { Usuario } from '../modelos/usuario';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const usuariosUrl= `${environment.apiUrl}` + 'usuarios/';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    private isUserLoggedIn;

    constructor(private http: HttpClient, private cookies: CookieService){
        this.isUserLoggedIn=false;
    }

    private _refreshNeeded$ = new Subject<void>();

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Usuario[]>{
        return this.http.get<Usuario[]>(usuariosUrl);
    }

    getListFiltered (nombre: string, apellido: string, email: string): Observable<Usuario[]>{
        let params = new HttpParams();

        if(nombre!=null){
            params=params.append("nombre", nombre);
        }
        if(apellido!=null){
            params=params.append("apellido", apellido);
        }
        if(email!=null){
            params=params.append("email", email);
        }

        return this.http.get<Usuario[]>(usuariosUrl+"", {params: params});
    }

    getListPorNombre (nombre:string): Observable<Usuario[]>{
        let params = new HttpParams().set("nombre",nombre);
        return this.http.get<Usuario[]>(usuariosUrl+"buscarNombre/", {params: params});
    }

    getListPorApellido (apellido:string): Observable<Usuario[]>{
        let params = new HttpParams().set("apellido",apellido)
        return this.http.get<Usuario[]>(usuariosUrl+"buscarApellido/", {params: params});
    }

    getListPorEmail (email:string): Observable<Usuario[]>{
        let params = new HttpParams().set("email",email)
        return this.http.get<Usuario[]>(usuariosUrl+"buscarEmail/", {params: params});
    }

    get (i:number): Observable<Usuario>{
      return this.http.get<Usuario>(usuariosUrl+i);
  
    }

    post (u:Usuario): Observable<Usuario>{
        return this.http.post<Usuario>(usuariosUrl, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (u:Usuario): Observable<Usuario>{
        return this.http.put<Usuario>(usuariosUrl, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    delete (id:number): Observable<{}>{
        return this.http.delete(usuariosUrl+id).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }
}

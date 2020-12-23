import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Participante } from '../modelos/participante';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const url= `${environment.apiUrl}` + 'participantes/';

@Injectable({
    providedIn: 'root'
})
export class ParticipanteService {

    private _refreshNeeded$ = new Subject<void>();

    constructor(private http: HttpClient){

    }

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Participante[]>{
        return this.http.get<Participante[]>(url);
    }

    getListFiltered (nombre: string, apellido: string, email: string): Observable<Participante[]>{
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


        return this.http.get<Participante[]>(url+"", {params: params});
    }

    get (i:number): Observable<Participante>{
      return this.http.get<Participante>(url+i);
  
    }

    post (p:Participante): Observable<Participante>{
        return this.http.post<Participante>(url, p, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (p:Participante): Observable<Participante>{
        return this.http.put<Participante>(url, p, httpOptions).pipe(
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
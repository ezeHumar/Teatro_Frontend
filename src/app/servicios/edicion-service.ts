import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Edicion } from '../modelos/edicion';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const url= `${environment.apiUrl}` + 'ediciones/';

@Injectable({
    providedIn: 'root'
})
export class EdicionService{

    private _refreshNeeded$ = new Subject<void>();

    constructor(private http: HttpClient){

    }

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Edicion[]>{
        return this.http.get<Edicion[]>(url);
    }

    get (i:number): Observable<Edicion>{
      return this.http.get<Edicion>(url+i);
  
    }

    post (u:Edicion): Observable<Edicion>{
        return this.http.post<Edicion>(url, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (u:Edicion): Observable<Edicion>{
        return this.http.put<Edicion>(url, u, httpOptions).pipe(
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

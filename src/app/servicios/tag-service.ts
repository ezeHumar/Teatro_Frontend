import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tag } from '../modelos/tag';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const url= `${environment.apiUrl}` + 'tags/';

@Injectable({
    providedIn: 'root'
})
export class TagService{

    private _refreshNeeded$ = new Subject<void>();

    constructor(private http: HttpClient){

    }

    get refreshNeeded$(){
        return this._refreshNeeded$;
    }

    getList (): Observable<Tag[]>{
        return this.http.get<Tag[]>(url);
    }

    get (i:number): Observable<Tag>{
      return this.http.get<Tag>(url+i);
  
    }

    getNoBorrables (): Observable<number[]>{
        return this.http.get<number[]>(url+"noborrables");
      }

    post (u:Tag): Observable<Tag>{
        return this.http.post<Tag>(url, u, httpOptions).pipe(
            tap(()=> {
                this._refreshNeeded$.next();
            })
        );
    }

    put (u:Tag): Observable<Tag>{
        return this.http.put<Tag>(url, u, httpOptions).pipe(
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

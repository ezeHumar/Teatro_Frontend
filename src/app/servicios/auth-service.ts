import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isUserLoggedIn;

    constructor(private http: HttpClient, private cookies: CookieService){
        this.isUserLoggedIn=false;
    }
    
    login(u: any): Observable<any>{
        return this.http.post(`${environment.apiUrl}` + 'login/admin', u);
    }

    setToken(token: string) {
        this.cookies.set("token", token);
        this.isUserLoggedIn=true;
    }
    getToken() {
        return this.cookies.get("token");
    }

    isLogged(){
        if (this.cookies.get("token")){
            return true;
        }

        return false;
    }

    setIsUserLoggedIn(state:boolean){
        this.isUserLoggedIn=state;
    }

    logOut(){
        this.cookies.delete("token");
    }
}

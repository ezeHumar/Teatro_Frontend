import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Router } from '@angular/router';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private cookies: CookieService, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {
    
    const token: string = this.cookies.get('token');

    let request = req;

    if(token){
      request=req.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.authService.logOut();
          this.router.navigate(['/login']);
        }

        return throwError( err );

      })
    );
  }

}

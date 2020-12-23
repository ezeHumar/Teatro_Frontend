import { Injectable } from'@angular/core';
import { Router } from'@angular/router';
import { CanActivate } from'@angular/router';
import { AuthService } from './auth-service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private authServicio: AuthService, private router: Router) {}


    canActivate() {
        if (!this.authServicio.isLogged()) {
            console.log('No estás logueado');
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) {

  }
  canActivate(): any{

    return sessionStorage.getItem('userLogged')!== null ?true:
    this.routesValidation()

  }

  routesValidation() {
    this.router.navigateByUrl('/lucky')
    return false;
  }

}

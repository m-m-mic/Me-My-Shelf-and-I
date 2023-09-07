import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree {
    let loggedIn;

    this.authenticationService.loggedIn$.subscribe(
      (value) => (loggedIn = value),
    );

    if (!loggedIn) {
      this.router.navigate(['welcome']);
      return false;
    }
    return true;
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.getUser().pipe(
      map((user) => {
        if (route.data['blockAuthenticated']) {
          return user ? this.router.parseUrl('/dashboard') : true;
        }
        return user
          ? true
          : this.router.parseUrl(
              route.data['redirectToSignIn'] ? '/sign-in' : '/',
            );
      }),
    );
  }
}

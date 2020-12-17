import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private authService : AuthService) { }

  canActivate() {
    return this.authService.appUser$.pipe(
      map(appUser => appUser.isAdmin)
    )
  }
}

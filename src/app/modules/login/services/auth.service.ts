import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { tap, shareReplay, ReplaySubject, BehaviorSubject, catchError, of, map } from 'rxjs';
import { JwtUserData, Role } from 'src/common-modules/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginSubject$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  public login(email: string, password: string) {
    return this.http.post('http://localhost:8000/login', {email, password})
      .pipe(
        tap((authResult: any) => {
          const decodedJwt: {
            email: string,
            role: Role,
            iat: number, 
            eat: number
          } = jwtDecode(authResult.idToken);
        
          this.initLogInStorage(
            decodedJwt.email,
            decodedJwt.role,
            authResult.idToken,
            JSON.stringify(decodedJwt.eat.valueOf())
          );

          this.loginSubject$.next(true);
        }),
        shareReplay()
      );
  }

  private initLogInStorage(email: string, role: string, token: string, expires_at: string) {
    localStorage.removeItem('cart');
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    localStorage.setItem('id_token', token);
    localStorage.setItem('expires_at', expires_at);
  }

  private initLogOutStorage() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('cart');
  }

  public logOut() {
    this.initLogOutStorage();
    this.loginSubject$.next(false);

    this.router.navigateByUrl('');
  }

  public isLoggedIn() {
    const expiration = this.getExpiration();
    const token = localStorage.getItem('id_token');
    return token && expiration && expiration > Date.now();
  }

  public isAdmin() {
    if(!this.isLoggedIn()) return false;

    const role = localStorage.getItem('role');
    return (role !== null) && (role == Role.ADMIN);
  }

  public getExpiration() {

    const expiration = localStorage.getItem("expires_at");
    if (!expiration)
      return false;
    
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  } 

  public hasAnyRole(roles: Role[]) {
    const currentRole = localStorage.getItem('role');
    if(currentRole && roles.includes(currentRole as Role))
      return true;

    return false;
  }
}

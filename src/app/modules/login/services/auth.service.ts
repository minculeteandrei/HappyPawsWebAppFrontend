import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginSubject$ = new BehaviorSubject<boolean>(false);
  public loggedIn = false;

  constructor(private http: HttpClient) { }

  public login(email: string, pass: string) {
    return this.http.post('http://localhost:5000/login', {email, pass})
      .pipe(
        tap(res => this.setSession),
        shareReplay()
      );
  }

  private setSession(authResult: {idToken: string, iat: number, eat: number}) {
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(authResult.eat.valueOf()));
  }

  public logOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    const expiration = this.getExpiration();
    return expiration && Date.now() < this.getExpiration();
  }

  public getExpiration() {

    const expiration = localStorage.getItem("expires_at");
    if (!expiration)
      return false;
    
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  } 
}

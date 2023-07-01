import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  public register(
    nume: string,
    prenume: string,
    phone: string,
    email: string,
    password: string 
  ) {
    return this.http.post('http://localhost:8000/register', {
      nume,
      prenume,
      phone,
      email,
      password
    });
  }
}

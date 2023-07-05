import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/common-modules/interfaces/interface';
import { ContactFormDataType } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getUserData(username: string): Observable<User> {
    return this.http.get(`http://localhost:8080/api/users/${username}`) as Observable<User>;
  }

  portContactEmail(emailData: ContactFormDataType) {
    return this.http.post('http://localhost:8080/api/contact/send', emailData);
  }
}

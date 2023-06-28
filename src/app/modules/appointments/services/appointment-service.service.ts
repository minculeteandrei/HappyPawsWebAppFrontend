import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Appointment } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  public refreshTableSubject = new Subject<void>();
  constructor(private http: HttpClient) { }

  getAvailableHours(year:number, month: number, day: number): Observable<number[]> {
    let query = new HttpParams();
    query = query.appendAll({year, month, day});

    return this.http.get('http://localhost:8080/api/appointments/available-hours', {
      params: query
    }) as Observable<number[]>;
  }

  getAllAppointments(): Observable<Appointment[]> {
    const role = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    let query = new HttpParams();
    if(role && email) {
      query = query.append('role', role);
      query = query.append('username', email);
    }

    return this.http.get('http://localhost:8080/api/appointments/', {
      params: query
    }) as Observable<Appointment[]>;
  }

  putAppointment(appointment: Appointment) {
    return this.http.put(`http://localhost:8080/api/appointments/${appointment.id}`, appointment);
  }

  deleteAppointment(id: number) {
    return this.http.delete(`http://localhost:8080/api/appointments/${id}`);
  }

  postAppointment(appointment: Appointment) {
    const username = localStorage.getItem('email');

    if(username){
      let query = new HttpParams();
      query = query.append('username', username);

      return this.http.post('http://localhost:8080/api/appointments/', appointment, {
        params: query,
      });
    }

    return throwError(() => {});
  }
}

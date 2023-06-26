import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAvailableHours(year:number, month: number, day: number) {
    let query = new HttpParams();
    query = query.appendAll({year, month, day});

    return this.http.get('http://localhost:8080/appointments/available-hours', {
      params: query
    });
  }
}

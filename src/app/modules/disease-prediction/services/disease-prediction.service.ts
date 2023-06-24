import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiseasePredictionService {

  constructor(private http: HttpClient) { }

  getDiseasePrediction(symptoms: string[]) {
    let queryParams = new HttpParams();
    for (let i = 0; i < symptoms.length; i++) {
      queryParams = queryParams.append(`symptom${i + 1}`, symptoms[i]);
    }
    return this.http.get('http://localhost:5000/predict', {
      params: queryParams
    });
  }
}

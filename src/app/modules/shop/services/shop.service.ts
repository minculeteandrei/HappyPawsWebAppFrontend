import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/interfaces';
import { Cart } from '../domain/cart';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get("http://localhost:8080/api/products/") as Observable<Product[]>;
  }

  deleteProduct(id: number) {
    const email = localStorage.getItem('email');
    let query = new HttpParams();
    if(email) {
      query = query.append('username', email);
    }

    return this.http.delete(`http://localhost:8080/api/products/${id}`, {
      params: query
    });
  }

  postOrder(cart: Cart) {
    const email = localStorage.getItem('email');
    let query = new HttpParams();
    if(email) {
      query = query.append('username', email);
    }
    return this.http.post('http://localhost:8080/api/order/', cart, {
      params: query
    });
  }

  postProduct(formData: FormData) {
    return this.http.post('http://localhost:8080/api/products/', formData);
  }
}

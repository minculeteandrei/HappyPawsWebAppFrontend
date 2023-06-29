import { Component, OnInit } from '@angular/core';
import { Cart } from '../shop-page/domain/cart';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  cart: Cart;
  noCart = false;
  sum: number;
  
  ngOnInit(): void {
    const cartString = localStorage.getItem('cart');
    if(!cartString) {
      this.noCart = true;   
      return;
    } 
    
    this.cart = new Cart(JSON.parse(cartString));
    this.sum = this.cart.getSum();
    console.log(this.cart);
  }

}

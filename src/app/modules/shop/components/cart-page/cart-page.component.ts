import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from '../shop-page/domain/cart';
import { CartItem, Product } from '../../interfaces/interfaces';
import { EMPTY, Subscription, catchError, finalize } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-page',
  host: {
    class: "flex flex-col grow"
  },
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy{
  cart: Cart | undefined;
  sum: number;
  createOrderSubscription: Subscription;
  loadingOrder = false;

  constructor(private shopService: ShopService, private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    const cartString = localStorage.getItem('cart');
    if(!cartString) {
      return;
    } 
    
    this.cart = new Cart(JSON.parse(cartString));
    this.sum = this.cart.getSum();
    console.log(this.cart);
  }

  onIncreaseQuantityClicked(product: Product) {
    if(this.cart) {
      this.cart.addProduct(product);
      this.sum = this.cart.getSum();
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  onDecreaseQuantityClicked(product: Product) {
    if(this.cart) {
      this.cart.removeProduct(product);
      this.sum = this.cart.getSum();
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  onRemoveFromCartClicked(product: Product) {
    if(this.cart) {
      this.cart.removeProduct(product, true);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    if(this.cart && this.cart.items.length > 0)
      this.sum = this.cart.getSum();
  } 

  clearCart() {
    this.cart = undefined;
    localStorage.removeItem('cart');
  }

  onCreateOrderClicked() {
    if(this.cart) {
      this.loadingOrder = true;
      this.createOrderSubscription = this.shopService.postOrder(this.cart)
        .pipe(
          catchError(_ => {
            this.snackBar.open('Failed create order', 'Dismiss', { duration: 3000 });
            return EMPTY;
          }),
          finalize(() => {this.loadingOrder = false;})
        ).subscribe(_ => {
          this.snackBar.open('Order created successfully', 'Dismiss', { duration: 3000 });
          this.clearCart();
        })
    }
  }

  ngOnDestroy(): void {
    if(this.createOrderSubscription)
      this.createOrderSubscription.unsubscribe();
  }

}

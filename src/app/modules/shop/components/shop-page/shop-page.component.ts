import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { EMPTY, Observable, Subject, catchError, take, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/interfaces';
import { Cart } from './domain/cart';
import { AuthService } from 'src/app/modules/login/services/auth.service';
import { PATHS } from 'src/common-modules/constants/constants';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnDestroy, OnInit{
  dataSource$: Observable<Product[]>;
  destroy$ = new Subject<void>();
  cart: Cart;
  isAdmin = false;
  paths = PATHS;

  constructor(
    private shopService: ShopService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dataSource$ = this.fetchProducts();
    this.isAdmin = this.authService.isAdmin();

    this.initCart();
  }

  fetchProducts() {
    return this.shopService.getProducts()
      .pipe(
        takeUntil(this.destroy$),
        catchError(_ => {
          this.snackBar.open('Failed to fetch products', 'Dismiss', { duration: 3000 });
          const prevUrl = localStorage.getItem('previous_url');

          if(prevUrl)
            this.router.navigateByUrl(prevUrl);
          else
            this.router.navigateByUrl('/');
          return EMPTY;
        })
      )
  }

  initCart() {
    const tempCart = localStorage.getItem('cart');
    if (!tempCart) {
      this.cart = new Cart();
      return;
    }
    this.cart = new Cart(JSON.parse(tempCart));
  }

  onAddProductToCartClicked(product: Product) {
    if(!this.authService.isLoggedIn()){
      this.router.navigateByUrl(PATHS.LOGIN_PAGE);
      return;
    }

    this.cart.addProduct(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.snackBar.open('Product added to cart', 'Dismiss', { duration: 3000 });
  }

  onDeleteProductClicked(id: number) {
    this.shopService.deleteProduct(id)
      .pipe(
        takeUntil(this.destroy$),
        catchError(_ => {
          this.snackBar.open('Failed to delete product', 'Dismiss', { duration: 3000 });
          return EMPTY;
        })
      ).subscribe(_ => {
        this.snackBar.open('Product deleted successfully', 'Dismiss', { duration: 3000 });
        this.dataSource$ = this.fetchProducts();
      });
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }
}

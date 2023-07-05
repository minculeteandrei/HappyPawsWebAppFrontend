import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { EMPTY, Observable, Subject, catchError, finalize, switchMap, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/interfaces';
import { Cart } from '../../domain/cart';
import { AuthService } from 'src/app/modules/login/services/auth.service';
import { PATHS } from 'src/common-modules/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/common-modules/components/confirmation-dialog/confirmation-dialog.component';
import { DialogAction, Resource } from 'src/common-modules/interfaces/interface';

@Component({
  selector: 'app-shop-page',
  host: {
    class: "flex flex-col grow"
  },
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnDestroy, OnInit{
  dataSource$: Observable<Product[]>;
  destroy$ = new Subject<void>();
  cart: Cart;
  isAdmin = false;
  paths = PATHS;
  loadingShop = false;

  constructor(
    private shopService: ShopService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource$ = this.fetchProducts();
    this.isAdmin = this.authService.isAdmin();

    this.initCart();
  }

  fetchProducts() {
    this.loadingShop = true;
    return this.shopService.getProducts()
      .pipe(
        takeUntil(this.destroy$),
        catchError(_ => {
          this.snackBar.open('Nu s-au putut incarca produsele', 'Dismiss', { duration: 3000 });
          const prevUrl = localStorage.getItem('previous_url');

          if(prevUrl)
            this.router.navigateByUrl(prevUrl);
          else
            this.router.navigateByUrl('/');
          return EMPTY;
        }),
        finalize(() => {this.loadingShop = false;})
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
    this.cart.addProduct(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.snackBar.open('Produsul a fost adaugat in cos', 'Dismiss', { duration: 3000 });
  }

  openDialog(action: string, resourceName: string) {
    return this.dialog.open(ConfirmationDialog, {data: {action, resourceName}});
  }

  onDeleteProductClicked(product: Product) {
      this.openDialog(DialogAction.Delete, Resource.Product).afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(_ => {
          if(_ && product.id) {
              this.loadingShop = true;
              return this.shopService.deleteProduct(product.id);
            }
            return EMPTY;
          }),
        catchError(_ => {
          this.snackBar.open('Nu s-a putut sterge produsul', 'Dismiss', { duration: 3000 });
          return EMPTY;
        }),
        finalize(() => {this.loadingShop = false;})
      ).subscribe(_ => {
        this.cart.removeProduct(product, true);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.snackBar.open('Produsul a fost sters cu succes', 'Dismiss', { duration: 3000 });
        this.dataSource$ = this.fetchProducts();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

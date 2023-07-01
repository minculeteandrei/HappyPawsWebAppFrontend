import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Subscription, catchError, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { PATHS } from 'src/common-modules/constants/constants';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-new-product-page',
  host: {
    class: "flex flex-col grow"
  },
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent implements OnDestroy{
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  imageUploaded = false;
  loadingAddProduct = false;
  addProductSubscription: Subscription;
  formData = new FormData();
  imageTypeError = false;
  addProductForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.pattern(/[0-9]+/g), Validators.required]),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private shopService: ShopService, 
    private snackBar: MatSnackBar,
    private router: Router
    ) {}
  
  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if(fileList.length < 1) return;

    const image: File = fileList[0];
    if(image.type.split('/')[0] !== 'image') {
      this.imageTypeError = true;
      return;
    }

    this.imageUploaded = true;
    this.imageTypeError = false;
    this.formData.append('image', image, image.name);
  }

  formatFormData() {
    const formVal = this.addProductForm.value;
    if(formVal.productName && formVal.price && formVal.description) {
      const productFromForm: Product = {
        name: formVal.productName,
        price: +formVal.price,
        description: formVal.description
      }
      
      const blobOverrides = new Blob([JSON.stringify(productFromForm)], {
        type: 'application/json',
      });
      this.formData.append('product', blobOverrides);
    }
  }
  
  onAddProductClicked() {
    if(this.formData.get('image')) {
      this.formatFormData();
      this.loadingAddProduct = true;

      this.addProductSubscription = this.shopService
        .postProduct(
          this.formData,
        ).pipe(
          catchError(_ => {
            this.snackBar.open('Failed to add new product', 'Dismiss', { duration: 3000 });
            return EMPTY;
          }),
          finalize(() => { this.loadingAddProduct = false; })
        ).subscribe(_ => {
          this.snackBar.open('Successfully added new product', 'Dismiss', { duration: 3000 });
          // this.formData.forEach(_ => {this.formData.delete(_.toString())});
          this.router.navigateByUrl(PATHS.SHOP_PAGE);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.addProductSubscription)
      this.addProductSubscription.unsubscribe();
  }
}

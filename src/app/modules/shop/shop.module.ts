import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { ShopRoutingModule } from './shop-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from "../../../common-modules/pipes/pipes.module";
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NewProductPageComponent } from './components/new-product-page/new-product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
    declarations: [
        ShopPageComponent,
        CartPageComponent,
        NewProductPageComponent
    ],
    imports: [
        ShopRoutingModule,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        PipesModule,
        MatProgressSpinnerModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ]
})
export class ShopModule { }

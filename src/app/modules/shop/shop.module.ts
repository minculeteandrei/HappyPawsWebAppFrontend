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



@NgModule({
    declarations: [
        ShopPageComponent,
        CartPageComponent
    ],
    imports: [
        ShopRoutingModule,
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        PipesModule,
        MatProgressSpinnerModule
    ]
})
export class ShopModule { }

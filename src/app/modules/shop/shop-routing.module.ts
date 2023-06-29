import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopPageComponent } from "./components/shop-page/shop-page.component";
import { CartPageComponent } from "./components/cart-page/cart-page.component";

const routes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        component: ShopPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule { }
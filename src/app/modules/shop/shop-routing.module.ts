import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopPageComponent } from "./components/shop-page/shop-page.component";
import { CartPageComponent } from "./components/cart-page/cart-page.component";
import { NewProductPageComponent } from "./components/new-product-page/new-product-page.component";
import { RoleGuard } from "../login/guards/role.guard";
import { Role } from "src/common-modules/interfaces/interface";

const routes: Routes = [
    {
        path: 'cart',
        component: CartPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'add',
        component: NewProductPageComponent,
        canActivate: [RoleGuard],
        data: {
            role: [Role.ADMIN]
        },
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
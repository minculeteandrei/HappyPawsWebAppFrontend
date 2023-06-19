import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ServiciiPageComponent } from "./components/servicii-page/servicii-page.component";

const routes: Routes = [
    {
        path: '',
        component: ServiciiPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServiciiRoutingModule { }
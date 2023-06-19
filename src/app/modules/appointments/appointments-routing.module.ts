import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppointmentsPageComponent } from "./components/appointments-page/appointments-page.component";

const routes: Routes = [
    {
        path: '',
        component: AppointmentsPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiseasePredictionPageComponent } from "./components/disease-prediction-page/disease-prediction-page.component";

const routes: Routes = [
    {
        path: '',
        component: DiseasePredictionPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiseasePredictionRoutingModule { }
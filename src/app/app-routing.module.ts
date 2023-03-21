import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/components/home-page/home-page.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

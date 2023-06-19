import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './modules/login/guards/authenticated.guard';

const routes: Routes = [
  { 
    path: 'galerie', 
    loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryPageModule)  
  },
  { 
    path: 'servicii', 
    loadChildren: () => import('./modules/servicii/servicii.module').then(m => m.ServiciiModule)  
  },
  { 
    path: 'programari', 
    loadChildren: () => import('./modules/appointments/appointments.module').then(m => m.AppointmentsModule)  
  },
  { 
    path: 'contact', 
    loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)  
  },
  { 
    path: 'login', 
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)  
  },
  { 
    path: 'register', 
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)  
  },
  { 
    path: 'shop', 
    loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)  
  },
  { 
    path: 'admin', 
    canActivate: [AuthenticatedGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)  
  },
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

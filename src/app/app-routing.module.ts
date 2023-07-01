import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './modules/login/guards/authenticated.guard';
import { LoggedInGuard } from './modules/login/guards/logged-in.guard';
import { Role } from 'src/common-modules/interfaces/interface';
import { RoleGuard } from './modules/login/guards/role.guard';

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
    canActivate: [AuthenticatedGuard, RoleGuard],
    data: {
      role: [Role.USER, Role.DOCTOR]
    },
    loadChildren: () => import('./modules/appointments/appointments.module').then(m => m.AppointmentsModule)  
  },
  { 
    path: 'contact', 
    loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule)  
  },
  { 
    path: 'disease-prediction', 
    canActivate: [AuthenticatedGuard],
    loadChildren: () => import('./modules/disease-prediction/disease-prediction.module').then(m => m.DiseasePredictionModule)  
  },
  { 
    path: 'login', 
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)  
  },
  { 
    path: 'register', 
    canActivate: [LoggedInGuard],
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
  {
    path: '**',
    redirectTo: '',
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

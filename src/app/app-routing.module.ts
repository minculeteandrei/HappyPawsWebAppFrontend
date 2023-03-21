import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'galerie', 
    loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryModule)  
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

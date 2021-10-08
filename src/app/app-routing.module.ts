import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Config } from 'protractor';
import { AuthGuardService } from './service/auth-guard.service';
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./pages/image-viewer/gallery.module').then(
        (m) => m.GalleryModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
];

const config: Config = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

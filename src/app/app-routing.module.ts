import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Config } from 'protractor';
import { ArticleEditComponent } from './pages/admin/article-edit/article-edit.component';
import { ArticlesListComponent } from './pages/admin/articles-list/articles-list.component';
import { ImageListComponent } from './pages/admin/image-list/image-list.component';
import { ImageEditComponent } from './pages/admin/image-edit/image-edit.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'images',
        component: ImageListComponent,
      },
      {
        path: 'images/:id',
        component: ImageEditComponent,
      },
      {
        path: 'articles',
        component: ArticlesListComponent,
      },
      {
        path: 'articles/:id',
        component: ArticleEditComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
    component: HomeComponent,
  },
];

const config: Config = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

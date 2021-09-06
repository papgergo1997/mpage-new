import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Config } from 'protractor';
import { ArticleEditComponent } from './edit/article-edit/article-edit.component';
import { ArticlesListComponent } from './pages/admin/articles-list/articles-list.component';
import { ImageListComponent } from './pages/admin/image-list/image-list.component';
import { ImageEditComponent } from './edit/image-edit/image-edit.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "images",
        component: ImageListComponent
      },
      {
        path: "images/:id",
        component: ImageEditComponent
      },
      {
        path: "articles",
        component: ArticlesListComponent
      },
      {
        path: "articles/:id",
        component: ArticleEditComponent
      }
    ]
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: ":id",
    component: GalleryComponent
  }


];

const config: Config = [

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Config } from 'protractor';
import { ArticleEditComponent } from './edit/article-edit/article-edit.component';
import { PaintingEditComponent } from './edit/photo-edit/painting-edit.component';
import { ArticlesListComponent } from './list/articles-list/articles-list.component';
import { PaintingsListComponent } from './list/paintings-list/paintings-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "images",
        component: PaintingsListComponent
      },
      {
        path: "images/:id",
        component: PaintingEditComponent
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
  }
];

const config: Config = [

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

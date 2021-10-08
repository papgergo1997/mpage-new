import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ImageListComponent } from './image-list/image-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'images',
        component: ImageListComponent,
      },
      {
        path: 'articles',
        component: ArticlesListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

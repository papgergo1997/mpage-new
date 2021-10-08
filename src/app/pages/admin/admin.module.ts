import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';

@NgModule({
  declarations: [
    AdminComponent,
    ArticleEditComponent,
    ArticlesListComponent,
    ImageListComponent,
    ImageEditComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    FlexLayoutModule,
    AdminRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxPhotoEditorModule,
  ],
})
export class AdminModule {}

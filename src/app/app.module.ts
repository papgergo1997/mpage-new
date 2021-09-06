import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AdminComponent } from './pages/admin/admin.component';
import { SideNavComponent } from './pages/admin/side-nav/side-nav.component';
import { AdminNavComponent } from './pages/admin/admin-nav/admin-nav.component';
import { AdminFooterComponent } from './pages/admin/admin-footer/admin-footer.component';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './pipe/filter.pipe';
import { HomeComponent } from './pages/home/home.component';
import { ItemCardContainerComponent } from './pages/home/item-card-container/item-card-container.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { ItemCardComponent } from './pages/home/item-card/item-card.component';
import { SliderPipe } from './pipe/slider.pipe';
import { ArticlesListComponent } from './pages/admin/articles-list/articles-list.component';
import { ArticleEditComponent } from './pages/admin/article-edit/article-edit.component';
import { ArticleFilterPipe } from './pipe/article-filter.pipe';
import { ArticleCardComponent } from './pages/home/article-card/article-card.component';
import { ArticleCardContainerComponent } from './pages/home/article-card-container/article-card-container.component';
import { ImageListComponent } from './pages/admin/image-list/image-list.component';
import { ImageEditComponent } from './pages/admin/image-edit/image-edit.component';
import { GalleryComponent } from './pages/image-viewer/gallery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SideNavComponent,
    AdminNavComponent,
    AdminFooterComponent,
    FilterPipe,
    HomeComponent,
    ItemCardContainerComponent,
    ItemCardComponent,
    SliderPipe,
    ArticlesListComponent,
    ArticleEditComponent,
    ArticleFilterPipe,
    ArticleCardComponent,
    ArticleCardContainerComponent,
    ImageListComponent,
    ImageEditComponent,
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CarouselModule,
    WavesModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxPhotoEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

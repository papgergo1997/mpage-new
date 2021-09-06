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
import { SideNavComponent } from './pageComponents/side-nav/side-nav.component';
import { AdminNavComponent } from './pageComponents/admin-nav/admin-nav.component';
import { AdminFooterComponent } from './pageComponents/admin-footer/admin-footer.component';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './pipe/filter.pipe';
import { HomeComponent } from './pages/home/home.component';
import { ItemCardContainerComponent } from './pageComponents/item-card-container/item-card-container.component';
import { SliderComponent } from './pageComponents/slider/slider.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { ItemCardComponent } from './pageComponents/item-card/item-card.component';
import { SliderPipe } from './pipe/slider.pipe';
import { ArticlesListComponent } from './list/articles-list/articles-list.component';
import { ArticleEditComponent } from './edit/article-edit/article-edit.component';
import { ArticleFilterPipe } from './pipe/article-filter.pipe';
import { ArticleCardComponent } from './pageComponents/article-card/article-card.component';
import { ArticleCardContainerComponent } from './pageComponents/article-card-container/article-card-container.component';
import { ImageListComponent } from './pages/admin/image-list/image-list.component';
import { ImageEditComponent } from './edit/image-edit/image-edit.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
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
    SliderComponent,
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

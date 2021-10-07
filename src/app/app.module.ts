import { NgModule } from '@angular/core';
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
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './pipe/filter.pipe';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { ItemCardComponent } from './pages/home/item-card/item-card.component';
import { ArticleCardComponent } from './pages/home/article-card/article-card.component';
import { ArticleCardContainerComponent } from './pages/home/article-card-container/article-card-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ItemCardContainerComponent } from './pages/home/item-card-container/item-card-container.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    ItemCardContainerComponent,
    ItemCardComponent,
    ArticleCardComponent,
    ArticleCardContainerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CarouselModule,
    WavesModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxPhotoEditorModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

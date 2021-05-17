import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
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
import { PaintingsListComponent } from './list/paintings-list/paintings-list.component';
import { PhotoUploadFormComponent } from './photo-upload-form/photo-upload-form.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PaintingEditComponent } from './edit/painting-edit/painting-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SideNavComponent,
    AdminNavComponent,
    AdminFooterComponent,
    PaintingsListComponent,
    PhotoUploadFormComponent,
    PhotoDetailsComponent,
    PhotoListComponent,
    PaintingEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

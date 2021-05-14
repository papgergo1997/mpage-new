import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AdminComponent } from './pages/admin/admin.component';
import { SideNavComponent } from './pageComponents/side-nav/side-nav.component';
import { AdminNavComponent } from './pageComponents/admin-nav/admin-nav.component';
import { AdminFooterComponent } from './pageComponents/admin-footer/admin-footer.component';
import { PaintingsListComponent } from './list/paintings-list/paintings-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SideNavComponent,
    AdminNavComponent,
    AdminFooterComponent,
    PaintingsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

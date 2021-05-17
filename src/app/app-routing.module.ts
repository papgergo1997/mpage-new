import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Config } from 'protractor';
import { PaintingEditComponent } from './edit/painting-edit/painting-edit.component';
import { PaintingsListComponent } from './list/paintings-list/paintings-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoUploadFormComponent } from './photo-upload-form/photo-upload-form.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "paintings",
        component: PaintingsListComponent
      },
      {
        path: "paintings/:id",
        component: PaintingEditComponent
      }
    ]
  },
  {
    path: "upload",
    component: PhotoUploadFormComponent
  },
  {
    path: "phdetails",
    component: PhotoDetailsComponent
  }
];

const config: Config = [

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Config } from 'protractor';
import { PaintingsListComponent } from './list/paintings-list/paintings-list.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "pList",
        component: PaintingsListComponent
      }
    ]
  }
];

const config: Config = [

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

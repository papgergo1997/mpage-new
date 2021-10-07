import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [GalleryComponent],
  imports: [CommonModule, GalleryRoutingModule, FlexLayoutModule],
})
export class GalleryModule {}

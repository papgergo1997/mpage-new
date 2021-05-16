import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PhotoUploadService } from '../service/photo-upload.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos: any[];

  constructor(private pUService: PhotoUploadService) { }

  ngOnInit(): void {
    this.pUService.getFiles(6).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    ).subscribe(photos => this.photos = photos)
  };

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../model/photo';
import { PhotoUploadService } from '../service/photo-upload.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos$: Observable<Photo[]>;

  constructor(private pUService: PhotoUploadService) { }

  ngOnInit(): void {
    this.photos$ = this.pUService.photos.snapshotChanges().pipe(
      map(changes =>
        //store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }

}

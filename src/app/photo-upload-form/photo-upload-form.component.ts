import { Component, OnInit } from '@angular/core';
import { Photo } from '../model/photo';
import { PhotoUploadService } from '../service/photo-upload.service';

@Component({
  selector: 'app-photo-upload-form',
  templateUrl: './photo-upload-form.component.html',
  styleUrls: ['./photo-upload-form.component.scss']
})
export class PhotoUploadFormComponent implements OnInit {

  selectedFiles: FileList;
  currentPhoto: Photo;
  percentage: number = 0;

  constructor(private pUService: PhotoUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentPhoto = new Photo(file);
    this.pUService.pushFileToStorage(this.currentPhoto).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  };
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, map } from 'rxjs/operators';
import { Photo } from 'src/app/model/photo';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {

  image: Image;
  selectedFiles: FileList;
  currentPhoto: Photo;
  percentage: number = 0;
  fullPercentage: number = 0;
  selectedFullFiles: FileList;
  currentFullPhoto: Photo;

  constructor(
    private activatedRoute: ActivatedRoute,
    private iService: ImageService,
    private pUploadService: PhotoUploadService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => this.iService.get(params.id))
    ).subscribe(image => this.image = image)
  }

  onUpdate(form: NgForm, image: Image): void {
    if (image.id == '') {
      this.iService.create(image)
        .then(
          () => {
            this.router.navigate(['admin/images']);
            this.toaster.success('Sikeres létrehozás!', 'Létrehozva', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    } else {
      this.iService.update(image)
        .then(
          () => {
            this.router.navigate(['admin/images']);
            this.toaster.info('Sikeres frissítés!', 'Frissítve', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    }

  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
  selectFullFile(event): void {
    this.selectedFullFiles = event.target.files;
  }

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentPhoto = new Photo(file);

    this.pUploadService.pushFileToStorage(this.currentPhoto).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        this.pUploadService.getFiles(1).snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )).subscribe(photo => this.image.picture = photo.map(photo => photo.url).toString())
      },
      error => {
        console.log(error);
      }
    );


  };

  uploadFull(): void {
    const fullFile = this.selectedFullFiles.item(0);
    this.selectedFullFiles = undefined;
    this.currentFullPhoto = new Photo(fullFile);

    this.pUploadService.pushFileToStorage(this.currentFullPhoto).subscribe(
      percentage => {
        this.fullPercentage = Math.round(percentage);
        this.pUploadService.getFiles(1).snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )).subscribe(photo => this.image.fullPicture = photo.map(photo => photo.url).toString())
      },
      error => {
        console.log(error);
      }
    );
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, map } from 'rxjs/operators';
import { Photo } from 'src/app/model/photo';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';
//for cropper
import { CroppedEvent } from 'ngx-photo-editor';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss'],
})
export class ImageEditComponent implements OnInit {
  //for cropper
  imageChangedEvent: any;
  base64: any;
  //
  //For pop-up
  @Input() image: Image = new Image();
  isOpened: boolean;
  //
  selectedFiles: any;
  currentPhoto: Photo;
  percentage: number = 0;
  fullPercentage: number = 100;
  selectedFullFiles: FileList;
  currentFullPhoto: Photo;
  submitted: boolean = false;
  imageForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.minLength(4)]),
    size: new FormControl('', Validators.pattern('^[1-9]{1,2}:([1-9]|10)')),
    type: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
    fullPicture: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private iService: ImageService,
    private pUploadService: PhotoUploadService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.imageForm.patchValue(this.image);
  }

  onUpdate(): void {
    if (this.image.id == '') {
      this.iService
        .create(this.imageForm.value)
        .then(() => {
          this.close();
          this.toaster.success('Successfully created!', 'Created', {
            timeOut: 3000,
          });
        })
        .catch((error) => console.log(error));
    } else {
      this.iService
        .update(this.imageForm.value)
        .then(() => {
          this.close();
          this.toaster.info('Successfully updated!', 'Updated', {
            timeOut: 3000,
          });
        })
        .catch((error) => console.log(error));
    }
    this.submitted = true;
  }

  uploadFunction(num: number, photo: Photo, full: boolean) {
    this.pUploadService.pushFileToStorage(photo).subscribe(
      (percentage) => {
        if (full == true) {
          this.fullPercentage = Math.round(percentage);
          this.pUploadService
            .getFiles(num)
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
            .subscribe((photo) => {
              this.imageForm.patchValue({
                fullPicture: photo.map((photo) => photo.url).toString(),
              });
              this.image.fullPicture = photo
                .map((photo) => photo.url)
                .toString();
            });
        } else if (full == false) {
          this.percentage = Math.round(percentage);
          this.pUploadService
            .getFiles(num)
            .snapshotChanges()
            .pipe(
              map((changes) =>
                changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
              )
            )
            .subscribe((photo) => {
              this.imageForm.patchValue({
                picture: photo.map((photo) => photo.url).toString(),
              });
              this.image.picture = photo.map((photo) => photo.url).toString();
            });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  upload(): void {
    this.fullPercentage = 0;
    const file = this.selectedFiles;
    this.selectedFiles = undefined;
    this.currentPhoto = new Photo(file);

    const fullFile = this.selectedFullFiles.item(0);
    this.selectedFullFiles = undefined;
    this.currentFullPhoto = new Photo(fullFile);

    this.uploadFunction(2, this.currentPhoto, false);
    this.uploadFunction(1, this.currentFullPhoto, true);
  }

  //For Cropper
  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
    this.selectedFullFiles = event.target.files;
  }

  imageCropped(event: CroppedEvent) {
    this.selectedFiles = event.file;
  }
  //

  //For Modal

  close() {
    this.image.isOpened = false;
    this.imageForm.reset()
  }
}

import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent implements OnInit {
  //for cropper
  imageChangedEvent: any;
  base64: any;
  //
  image: Image;
  selectedFiles: any;
  currentPhoto: Photo;
  percentage: number = 0;
  fullPercentage: number = 0;
  selectedFullFiles: FileList;
  currentFullPhoto: Photo;
  submitted: boolean = false;
  imageForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl(''),
    size: new FormControl(''),
    type: new FormControl(''),
    picture: new FormControl(''),
    fullPicture: new FormControl('')
  })

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
    ).subscribe(image => {
      this.image = image
      this.imageForm.patchValue(image)
    })
  }

  onUpdate(): void {
    if (this.image.id == '') {
      this.iService.create(this.imageForm.value)
        .then(
          () => {
            this.router.navigate(['admin/images']);
            this.toaster.success('Successfully created!', 'Created', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    } else {
      this.iService.update(this.imageForm.value)
        .then(
          () => {
            this.router.navigate(['admin/images']);
            this.toaster.info('Successfully updated!', 'Updated', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    }
    this.submitted = true;
  }

  // selectFile(event): void {
  //   this.selectedFiles = event.target.files;
  // }
  selectFullFile(event): void {
    this.selectedFullFiles = event.target.files;
  }

  uploadFunction(num: number, photo: Photo, full: boolean) {
    this.pUploadService.pushFileToStorage(photo).subscribe(
      percentage => {
        if (full == true) {
          this.fullPercentage = Math.round(percentage);
          this.pUploadService.getFiles(num).snapshotChanges().pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )).subscribe(photo => {
              this.imageForm.patchValue({fullPicture: photo.map(photo => photo.url).toString()})
              this.image.fullPicture = photo.map(photo => photo.url).toString()
            })
        } else if (full == false) {
          this.percentage = Math.round(percentage);
          this.pUploadService.getFiles(num).snapshotChanges().pipe(
            map(changes =>
              changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )).subscribe(photo => {
              this.imageForm.patchValue({picture: photo.map(photo => photo.url).toString()})
              this.image.picture = photo.map(photo => photo.url).toString()
            })
        }
      },
      error => {
        console.log(error);
      }

    );
  }

  upload(): void {
    if (this.selectedFiles != undefined && this.selectedFullFiles == undefined) {
      const file = this.selectedFiles;
      this.selectedFiles = undefined;
      this.currentPhoto = new Photo(file);

      this.uploadFunction(1, this.currentPhoto, false);

      // this.pUploadService.pushFileToStorage(this.currentPhoto).subscribe(
      //   percentage => {
      //     this.percentage = Math.round(percentage);
      //     this.pUploadService.getFiles(this.gIN).snapshotChanges().pipe(
      //       map(changes =>
      //         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      //       )).subscribe(photo => this.image.picture = photo.map(photo => photo.url).toString())
      //   },
      //   error => {
      //     console.log(error);
      //   }

      // );
    } else if (this.selectedFullFiles != undefined && this.selectedFiles == undefined) {
      const fullFile = this.selectedFullFiles.item(0);
      this.selectedFullFiles = undefined;
      this.currentFullPhoto = new Photo(fullFile);

      this.uploadFunction(1, this.currentFullPhoto, true);
    } else {
      const file = this.selectedFiles;
      this.selectedFiles = undefined;
      this.currentPhoto = new Photo(file);

      const fullFile = this.selectedFullFiles.item(0);
      this.selectedFullFiles = undefined;
      this.currentFullPhoto = new Photo(fullFile);

      this.uploadFunction(2, this.currentPhoto, false);
      this.uploadFunction(1, this.currentFullPhoto, true);
    }
    // if (this.selectedFullFiles != undefined) {
    //   const fullFile = this.selectedFullFiles.item(0);
    //   this.selectedFullFiles = undefined;
    //   this.currentFullPhoto = new Photo(fullFile);
    //   this.pUploadService.pushFileToStorage(this.currentFullPhoto).subscribe(
    //     percentage => {
    //       this.fullPercentage = Math.round(percentage);
    //       this.pUploadService.getFiles(1).snapshotChanges().pipe(
    //         map(changes =>
    //           changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //         )).subscribe(photo => this.image.fullPicture = photo.map(photo => photo.url).toString())
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // }
  };

  //  uploadFull(): void {
  //    const fullFile = this.selectedFullFiles.item(0);
  //    this.selectedFullFiles = undefined;
  //    this.currentFullPhoto = new Photo(fullFile);

  //    this.pUploadService.pushFileToStorage(this.currentFullPhoto).subscribe(
  //      percentage => {
  //        this.fullPercentage = Math.round(percentage);
  //        this.pUploadService.getFiles(1).snapshotChanges().pipe(
  //          map(changes =>
  //            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  //          )).subscribe(photo => this.image.fullPicture = photo.map(photo => photo.url).toString())
  //      },
  //      error => {
  //        console.log(error);
  //      }
  //    );
  //  }

  //for cropper
  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
  };

  imageCropped(event: CroppedEvent) {
    this.selectedFiles = event.file;
  };
  //

}

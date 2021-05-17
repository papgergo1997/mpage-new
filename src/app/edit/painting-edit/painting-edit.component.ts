import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Painting } from 'src/app/model/painting';
import { Photo } from 'src/app/model/photo';
import { PaintingsService } from 'src/app/service/paintings.service';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';

@Component({
  selector: 'app-painting-edit',
  templateUrl: './painting-edit.component.html',
  styleUrls: ['./painting-edit.component.scss']
})
export class PaintingEditComponent implements OnInit {

  painting: Painting;
  selectedFiles: FileList;
  currentPhoto: Photo;
  percentage: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pService: PaintingsService,
    private pUploadService: PhotoUploadService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => this.pService.get(params.id))
    ).subscribe(painting => this.painting = painting)
  }

  onUpdate(form: NgForm, painting: Painting): void {
    if (painting.id == '') {
      this.pService.create(painting)
        .then(
          () => {
            this.router.navigate(['admin/paintings']);
            this.toaster.success('Sikeres létrehozás!', 'Létrehozva', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    } else {
      this.pService.update(painting)
        .then(
          () => {
            this.router.navigate(['admin/paintings']);
            this.toaster.info('Sikeres frissítés!', 'Frissítve', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    }

  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
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
          )).subscribe(photo => this.painting.picture = photo.map(photo => photo.url).toString())
      },
      error => {
        console.log(error);
      }
    );
  };
}

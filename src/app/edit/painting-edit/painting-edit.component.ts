import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  paintings$: Observable<Painting> = this.activatedRoute.params.pipe(
    switchMap(params => this.pService.get(params.id))
  );
  selectedFiles: FileList;
  currentPhoto: Photo;
  percentage: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pService: PaintingsService,
    private pUploadService: PhotoUploadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, painting: Painting): void {
    if (painting.id == '') {
      this.pService.create(painting)
        .then(
          () => this.router.navigate(['admin/paintings']))
        .catch(error => console.log(error));
    } else {
      this.pService.update(painting)
        .then(
          () => this.router.navigate(['admin/paintings']))
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
      },
      error => {
        console.log(error);
      }
    );
  };
}

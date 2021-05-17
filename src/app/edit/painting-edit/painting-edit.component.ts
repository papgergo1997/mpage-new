import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Painting } from 'src/app/model/painting';
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
  )

  constructor(
    private activatedRoute: ActivatedRoute,
    private pService: PaintingsService,
    private pUploadService: PhotoUploadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, painting: Painting): void {
    if (painting.id != '0') {
      this.pService.update(painting)
      this.router.navigate(['paintings'])

    } else {
      this.pService.create(painting).then(
        ev => this.router.navigate(['paintings'])
      ).catch(error => console.log(error));
    }

  }
}

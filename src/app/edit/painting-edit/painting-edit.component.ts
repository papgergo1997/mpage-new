import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Painting } from 'src/app/model/painting';
import { PaintingsService } from 'src/app/service/paintings.service';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';

@Component({
  selector: 'app-painting-edit',
  templateUrl: './painting-edit.component.html',
  styleUrls: ['./painting-edit.component.scss']
})
export class PaintingEditComponent implements OnInit {

  constructor(private pService: PaintingsService, private pUploadService: PhotoUploadService) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, painting: Painting): void {
    this.pService.update(painting)
  }
}

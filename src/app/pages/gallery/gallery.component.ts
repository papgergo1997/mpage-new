import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/model/image';
import { switchMap} from 'rxjs/operators';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  image: Image;
  @Input() images: Image[];

  constructor(private activatedRoute: ActivatedRoute, 
    private iService: ImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => this.iService.get(params.id))
    ).subscribe(image => this.image = image)
  }

}

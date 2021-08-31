import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/model/image';
import { switchMap } from 'rxjs/operators';
import { ImageService } from 'src/app/service/image.service';
import { Observable, of } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  animations: [
    'slide', [
      state('slide1', style({

      })),
      state('slide2', style({

      })),
      transition('slide1 => slide2', [

      ]),
      transition('slide2 => slide1', [

      ]),
    ]
  ],
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  num: number = 0;
  image: Image;
  images$: Observable<Image[]>;
  swappedImages$: Observable<Image[]>;

  constructor(private activatedRoute: ActivatedRoute,
    private iService: ImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => this.iService.get(params.id))
    ).subscribe(image => {
      this.image = image;
    });
    this.images$ = this.iService.list$;
    this.images$.subscribe(images => {
      for (let i = 0; i < images.length; i++) {
        if (images[i].id == this.image.id) {
          let sortedImages = [];
          images.slice(images.indexOf(images[i]), images.length).forEach(item => sortedImages.push(item));
          images.slice(images.indexOf(images[0]), images.indexOf(images[i])).forEach(item => sortedImages.push(item));
          this.swappedImages$ = of(sortedImages);
        }
      }

    })

  };

  right() {
    this.swappedImages$.subscribe(images => {
      if (this.num < images.length - 1) {
        this.num++;
      } else {
        this.num = 0;
      }
      console.log(this.num)
    })
  };

  left() {
    this.swappedImages$.subscribe(images => {
      if (this.num != 0) {
        this.num--;
      } else {
        this.num = images.length - 1;
      }
      console.log(this.num)
    })
  };

  toogle() {

  };

}

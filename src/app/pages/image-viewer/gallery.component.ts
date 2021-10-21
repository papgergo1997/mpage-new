import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/model/image';
import { switchMap } from 'rxjs/operators';
import { ImageService } from 'src/app/service/image.service';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  transform: number;
  selectedIndex = 0;
  slide1Or2: boolean = true;
  num: number = 0;
  image: Image = new Image();
  images$: Observable<Image[]>;
  swappedImages$: Observable<Image[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private iService: ImageService
  ) {
    this.transform = 100;
    this.selectedIndex = 0;
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.iService.get(params.id)))
      .subscribe((image) => {
        this.image = image;
      });
    this.images$ = this.iService.list$;
    this.subscription = this.images$.subscribe((images) => {
      for (let i = 0; i < images.length; i++) {
        if (images[i].id == this.image.id) {
          let sortedImages = [];
          images
            .slice(images.indexOf(images[i]), images.length)
            .forEach((item) => sortedImages.push(item));
          images
            .slice(images.indexOf(images[0]), images.indexOf(images[i]))
            .forEach((item) => sortedImages.push(item));
          this.swappedImages$ = of(sortedImages);
        }
      }
    });
  }

  left() {
    this.swappedImages$.subscribe((images) => {
      if (this.selectedIndex != 0) {
        this.selectedIndex--;
      } else {
        this.selectedIndex = images.length - 1;
      }
    });
  }

  right() {
    this.swappedImages$.subscribe((images) => {
      if (this.selectedIndex < images.length - 1) {
        this.selectedIndex++;
      } else {
        this.selectedIndex = 0;
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

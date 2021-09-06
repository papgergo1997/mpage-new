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
  // animations: [
  //   trigger('fade', [
  //     state('slide1', style({
  //       opacity: 1,
  //     })),
  //     state('slide2', style({
  //       opacity: 0,
  //     })),
  //     transition('slide1 => slide2', [
  //       animate('0.2s')
  //     ]),
  //     transition('slide2 => slide1', [
  //       animate('0.5s')
  //     ]),
  //   ]),
  //   trigger('slide', [
  //     state('slide1', style({
  //       opacity: 1,
  //       transform: 'translateX(0%)'
  //     })),
  //     state('slide2', style({
  //       opacity: 0,
  //       transform: 'translateX(100%)'
  //     })),
  //     transition('slide1 => slide2', [
  //       animate('0.2s ease-in', style({ transform: 'translateX(-100%)' }))
  //     ]),
  //     transition('slide2 => slide1', [
  //       animate('0.5s ease-in', style({ transform: 'translateX(0%)' }))
  //     ])
  //   ])
  // ],
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  transform: number;
  selectedIndex = 0;
  slide1Or2: boolean = true;
  num: number = 0;
  image: Image;
  images$: Observable<Image[]>;
  swappedImages$: Observable<Image[]>;

  constructor(private activatedRoute: ActivatedRoute,
    private iService: ImageService) {
    this.transform = 100;
    this.selectedIndex = 0;
  }

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

  // animation() {
  //   this.slide1Or2 = false
  //   console.log(this.slide1Or2)
  //   setTimeout(() => {
  //     this.slide1Or2 = true
  //     console.log(this.slide1Or2)
  //   }, 500);
  // }

  left() {
    this.swappedImages$.subscribe(images => {
      if (this.selectedIndex != 0) {
        this.selectedIndex--;
      } else {
        this.selectedIndex = images.length - 1;
      }
    })
  };


  right() {
    this.swappedImages$.subscribe(images => {
      if (this.selectedIndex < images.length - 1) {
        this.selectedIndex++;
      } else {
        this.selectedIndex = 0;
      }
    })
  }

}

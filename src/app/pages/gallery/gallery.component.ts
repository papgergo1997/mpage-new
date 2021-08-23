import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/model/image';
import { switchMap} from 'rxjs/operators';
import { ImageService } from 'src/app/service/image.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  image: Image;
  images$: Observable<Image[]>;
  swappedImages$: Observable<Image[]>;

  constructor(private activatedRoute: ActivatedRoute, 
    private iService: ImageService) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => this.iService.get(params.id))
    ).subscribe(image => {
      this.image = image;
    });
    this.images$ = this.iService.list$;
      this.images$.subscribe(images => {        
        console.log(images)
        for(let i = 0; i < images.length; i ++){
          if(images[i].id == this.image.id){
            let swapper = images[0];
            images[0] = images[i];
            images[i] = swapper;
            this.swappedImages$ = of(images); 
          }
        }
        
        })
    
  }

}

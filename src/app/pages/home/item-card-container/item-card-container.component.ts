import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-item-card-container',
  templateUrl: './item-card-container.component.html',
  styleUrls: ['./item-card-container.component.scss'],
})
export class ItemCardContainerComponent implements OnInit {
  @Output() images$: Observable<Image[]>;

  constructor(private iService: ImageService) {}

  ngOnInit(): void {
    this.images$ = this.iService.list$;
  }
}

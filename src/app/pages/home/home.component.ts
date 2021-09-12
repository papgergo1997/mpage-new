import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() images$: Observable<Image[]> = new Observable<Image[]>();

  showFiller = false;

  constructor(private iService: ImageService) { }

  ngOnInit(): void {
    this.images$ = this.iService.list$;
  }

}

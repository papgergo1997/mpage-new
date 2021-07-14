import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/model/painting';
import { PaintingsService } from 'src/app/service/paintings.service';

@Component({
  selector: 'app-item-card-container',
  templateUrl: './item-card-container.component.html',
  styleUrls: ['./item-card-container.component.scss']
})
export class ItemCardContainerComponent implements OnInit {

  @Output() paintings$: Observable<Painting[]>;

  constructor(private pService: PaintingsService) { }

  ngOnInit(): void {
    this.paintings$ = this.pService.list$;
  }

}

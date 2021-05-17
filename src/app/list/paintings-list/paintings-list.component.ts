import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/model/painting';
import { PaintingsService } from 'src/app/service/paintings.service';

@Component({
  selector: 'app-paintings-list',
  templateUrl: './paintings-list.component.html',
  styleUrls: ['./paintings-list.component.scss']
})
export class PaintingsListComponent implements OnInit {

  list$: Observable<Painting[]> = new Observable<Painting[]>();

  constructor(private pService: PaintingsService) { }

  ngOnInit(): void {
    this.list$ = this.pService.list$;
  }

  onDelete(painting: Painting): void {
    this.pService.remove(painting);
  }

}

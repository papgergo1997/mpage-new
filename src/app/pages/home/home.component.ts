import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/model/painting';
import { PaintingsService } from 'src/app/service/paintings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() paintings$: Observable<Painting[]> = new Observable<Painting[]>();

  constructor(private pService: PaintingsService) { }

  ngOnInit(): void {
    this.paintings$ = this.pService.list$;
  }

}

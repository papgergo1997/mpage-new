import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaintingsService } from './service/paintings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mpage-project';
  items$: Observable<any>
  constructor(
    private pService: PaintingsService
  ) {
    this.items$ = this.pService.list$;
  }

}

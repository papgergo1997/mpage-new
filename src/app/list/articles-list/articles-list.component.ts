import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  list$: Observable<void>;
  filterKey: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(): void {

  }

}

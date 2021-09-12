import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article = new Article();

  constructor() { }

  ngOnInit(): void {
  }

}

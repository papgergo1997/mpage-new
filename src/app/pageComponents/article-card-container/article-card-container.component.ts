import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-card-container',
  templateUrl: './article-card-container.component.html',
  styleUrls: ['./article-card-container.component.scss']
})
export class ArticleCardContainerComponent implements OnInit {

  @Output() articles$: Observable<Article[]> = new Observable<Article[]>();

  constructor(private artService: ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.artService.list$;
  }

}

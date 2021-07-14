import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  list$: Observable<Article[]> = new Observable<Article[]>();
  filterKey: string = '';

  constructor(
    private articleService: ArticleService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.list$ = this.articleService.list$;
  }

  onDelete(article: Article): void {
    this.articleService.remove(article);
    this.toaster.warning('Successfull delete!', 'Deleted', { timeOut: 3000 });
  }

}

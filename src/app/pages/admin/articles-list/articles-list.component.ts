import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  //Material Paginator
  @ViewChild('paginator') paginator: MatPaginator;
  //
  @Output() article: Article = new Article();

  list$: Observable<Article[]> = new Observable<Article[]>();
  //Material Table
  dataSource: MatTableDataSource<Article>;
  displayedColumns: string[] = ['title', 'abstract', 'photo', 'link', 'edit'];
  //

  constructor(
    private articleService: ArticleService,
    private phUService: PhotoUploadService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.list$ = this.articleService.list$;
    //Material Table and paginator
    this.subscription = this.articleService.list$.subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
    });
  }
  //for Material filter
  filterTable(filterValue: string) {
    this.dataSource.filter = filterValue.toLowerCase();
  }

  onDelete(article: Article): void {
    this.articleService.remove(article);
    this.phUService.deleteFile(article.photoName, article.photoId);
    this.toaster.warning('Successfull delete!', 'Deleted', { timeOut: 3000 });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

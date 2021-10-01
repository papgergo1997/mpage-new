import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  //Material Paginator
  @ViewChild ('paginator') paginator: MatPaginator;
  //

  list$: Observable<Article[]> = new Observable<Article[]>();
  filterKey: string = '';
  //Material Table
  dataSource: MatTableDataSource<Article>;
  displayedColumns: string[] = ['title', 'abstract', 'photo', 'link', 'edit']
  //

  constructor(
    private articleService: ArticleService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.list$ = this.articleService.list$;
    //Material Table and paginator
    this.articleService.list$.subscribe(list=>{
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
    })
  }
  //for Material filter
  filterTable (filterValue :string) {
    this.dataSource.filter = filterValue.toLowerCase();
  }

  onDelete(article: Article): void {
    if(!confirm('Are you sure you want to delete this item?')){
      return
    } else {
     this.articleService.remove(article);
    this.toaster.warning('Successfull delete!', 'Deleted', { timeOut: 3000 });
    }
  }

}

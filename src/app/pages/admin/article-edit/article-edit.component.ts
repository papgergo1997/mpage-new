import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, map } from 'rxjs/operators';
import { Article } from 'src/app/model/article';
import { Photo } from 'src/app/model/photo';
import { ArticleService } from 'src/app/service/article.service';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {

  article: Article;
  selectedFiles: FileList;
  currentPhoto: Photo;
  percentage: number = 0;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private pUploadService: PhotoUploadService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => this.articleService.get(params.id))
    ).subscribe(article => this.article = article)
  }

  onUpdate(form: NgForm, article: Article): void {
    if (article.id == '') {
      this.articleService.create(article)
        .then(
          () => {
            this.router.navigate(['admin/articles']);
            this.toaster.success('Succesfully created!', 'Created', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    } else {
      this.articleService.update(article)
        .then(
          () => {
            this.router.navigate(['admin/articles']);
            this.toaster.info('Successfully updated!', 'Updated', { timeOut: 3000 });
          })
        .catch(error => console.log(error));
    }
  };

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  };

  upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentPhoto = new Photo(file);

    this.pUploadService.pushFileToStorage(this.currentPhoto).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        this.pUploadService.getFiles(1).snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )).subscribe(photo => this.article.photo = photo.map(photo => photo.url).toString())
      },
      error => {
        console.log(error);
      }
    );
  };

}

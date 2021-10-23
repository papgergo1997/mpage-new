import { Component, Input, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormControl } from '@angular/forms';
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
  styleUrls: ['./article-edit.component.scss'],
})
export class ArticleEditComponent implements OnInit {
  @Input() article: Article;
  @Input() newArticle: boolean;
  selectedFiles: FileList;
  currentPhoto: Photo;
  percentage: number = 100;
  submitted: boolean = false;
  //Reactive Forms START
  articleForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    abstract: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    link: new FormControl('', [Validators.required]),
    photo: new FormControl('', Validators.required),
  });
  //

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private pUploadService: PhotoUploadService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.articleForm.patchValue(this.article);
  }

  onUpdate(): void {
    if (this.article.id == '') {
      this.articleService
        .create(this.articleForm.value)
        .then(() => {
          this.close();
          this.articleForm.reset();
          this.toaster.success('Succesfully created!', 'Created', {
            timeOut: 3000,
          });

        })
        .catch((error) => console.log(error));
    } else {
      this.articleService
        .update(this.articleForm.value)
        .then(() => {
          this.close()
          this.toaster.info('Successfully updated!', 'Updated', {
            timeOut: 3000,
          });
        })
        .catch((error) => console.log(error));
    }
    this.submitted = true;
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.percentage = 0;
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentPhoto = new Photo(file);

    this.pUploadService.pushFileToStorage(this.currentPhoto).subscribe(
      (percentage) => {
        this.percentage = Math.round(percentage);
        this.pUploadService
          .getFiles(1)
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .subscribe((photo) => {
            this.articleForm.patchValue({
              photo: photo.map((photo) => photo.url).toString(),
            });
            this.article.photo = photo.map((photo) => photo.url).toString();
          });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //For Modal

  close() {
    this.article.isOpened = false;
    this.submitted = false;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Article } from '../model/article';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService<Article>{

  constructor(
    public fireStore: AngularFirestore,
  ) {
    super(fireStore, 'articles')
  }
  get(id: string): Observable<Article> {
    if (id == '0') {
      return of(new Article())
    } else {
      return this.collection.doc(id).valueChanges({
        idField: 'id'
      });
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Image } from '../model/image';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends BaseService<Image> {

  constructor(
    public fireStore: AngularFirestore,
  ) {
    super(fireStore, 'paintings')
  }
  get(id: string): Observable<Image> {
    if (id == '0') {
      return of(new Image())
    } else {
      return this.collection.doc(id).valueChanges({
        idField: 'id'
      });
    }
  };
}

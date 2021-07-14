import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Painting } from '../model/painting';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService extends BaseService<Painting> {

  constructor(
    public fireStore: AngularFirestore,
  ) {
    super(fireStore, 'paintings')
  }
  get(id: string): Observable<Painting> {
    if (id == '0') {
      return of(new Painting())
    } else {
      return this.collection.doc(id).valueChanges({
        idField: 'id'
      });
    }
  };
}

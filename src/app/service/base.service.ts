import { stringify } from '@angular/compiler/src/util';
import { Injectable, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: string }> {

  list$: Observable<any>;
  collection: AngularFirestoreCollection<any>;

  constructor(private fireStore: AngularFirestore,
    @Inject('entityName') entityName: string,) {
    this.collection = this.fireStore.collection(entityName);
    this.list$ = this.collection.valueChanges({
      idField: 'id'
    });
  }



}

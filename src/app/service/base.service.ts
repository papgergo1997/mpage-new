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
  };

  get(id: string): Observable<T> {
    return this.collection.doc(id).valueChanges({
      idField: 'id'
    });
  };

  create(doc: any): Promise<any> {
    return this.collection.add({ ...doc });
  };

  update(doc: any): Promise<any> {
    const id = doc.id;
    delete doc.id;
    return this.collection.doc(id).update({ ...doc });
  };

}

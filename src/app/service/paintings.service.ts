import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Painting } from '../model/painting';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService extends BaseService<Painting> {

  constructor(
    public fireStore: AngularFirestore
  ) {
    super(fireStore, 'paintings')
  }
}

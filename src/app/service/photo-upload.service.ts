import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Photo } from '../model/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  private basePath: string = '/uploads';

  photos: AngularFireList<Photo>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    this.photos = this.getFiles(100);
  }

  pushFileToStorage(photo: Photo): Observable<number> {
    const filePath: string = `${this.basePath}/${photo.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, photo.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            // photo.key = (Math.random() * 10000).toPrecision(4).toString();
            photo.url = downloadURL;
            photo.name = photo.file.name;
            this.saveFileData(photo);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }

  private saveFileData(photo: Photo): void {
    this.db.list(this.basePath).push(photo);
  }

  getFiles(numberItems: number): AngularFireList<Photo> {
    return this.db.list(this.basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(
    photoName: string,
    photoId: string,
    secondPhotoName?: string
  ): void {
    this.deleteFileDatabase(photoId)
      .then(() => {
        if (secondPhotoName) {
          this.deleteFileStorage(photoName);
          this.deleteFileStorage(secondPhotoName);
        }
        this.deleteFileStorage(photoName);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}

import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';
import { MatPaginator } from '@angular/material/paginator';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  //Material Paginator
  @ViewChild('paginator') paginator: MatPaginator;
  //
  list$: Observable<Image[]> = new Observable<Image[]>();
  @Output() image: Image = new Image();
  @Output() newImage: boolean = true;
  filterKey: string = '';
  //Material Table
  dataSource: MatTableDataSource<Image>;
  displayedColumns: string[] = [
    'name',
    'description',
    'size',
    'type',
    'picture',
    'edit',
  ];
  //
  constructor(private iService: ImageService, private toaster: ToastrService, private phUService: PhotoUploadService) {}

  ngOnInit(): void {
    this.list$ = this.iService.list$;
    //Material Table and paginator
    this.subscription = this.iService.list$.subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
    });
  }
  //for Material filter
  filterTable(filterValue: string) {
    this.dataSource.filter = filterValue.toLowerCase();
  }
  //
  onDelete(image: Image): void {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    } else {
      this.iService.remove(image);
      this.phUService.deleteFile(image.pictureName.split(',')[0], image.pictureId[image.pictureId.length -2], image.pictureName.split(',')[1], image.pictureId[image.pictureId.length -1])
      this.toaster.warning('Successfull delete!', 'Deleted', { timeOut: 3000 });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

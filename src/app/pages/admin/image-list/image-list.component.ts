import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit, AfterViewInit {

  list$: Observable<Image[]> = new Observable<Image[]>();
  list: Image[];
  filterKey: string = '';

  constructor(private iService: ImageService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.list$ = this.iService.list$;
    this.iService.list$.subscribe(list=>this.list = list)
  }

  onDelete(image: Image): void {
    this.iService.remove(image);
    this.toaster.warning('Successfull delete!', 'Deleted', { timeOut: 3000 });
  }

  //Material Table Test
  dataSource: MatTableDataSource<Image>;
  displayedColumns: string[] = ['name', 'description', 'size', 'type', 'picture','edit']
  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.list)
  }

}

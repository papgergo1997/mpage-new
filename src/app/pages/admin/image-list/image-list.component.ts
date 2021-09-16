import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  //Material Paginator
  @ViewChild ('paginator') paginator: MatPaginator;
  //
  list$: Observable<Image[]> = new Observable<Image[]>();
  filterKey: string = '';
  //Material Table
  dataSource: MatTableDataSource<Image>;
  displayedColumns: string[] = ['name', 'description', 'size', 'type', 'picture','edit']
  //
  constructor(private iService: ImageService,
    private toaster: ToastrService,
    ) { }

  ngOnInit(): void {
    this.list$ = this.iService.list$;
    //Material Table and paginator
    this.iService.list$.subscribe(list=>{
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
    })
  }
  //for Material filter
  filterTable (filterValue :string) {
    this.dataSource.filter = filterValue.toLowerCase();
 }

  onDelete(image: Image): void {
    this.iService.remove(image);
    this.toaster.warning('Successfull delete!', 'Deleted', { timeOut: 3000 });
  }







}

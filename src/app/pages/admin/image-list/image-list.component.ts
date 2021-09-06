import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  list$: Observable<Image[]> = new Observable<Image[]>();
  filterKey: string = '';

  constructor(private iService: ImageService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.list$ = this.iService.list$;
  }

  onDelete(image: Image): void {
    this.iService.remove(image);
    this.toaster.warning('Successfull delete!', 'Deleted', { timeOut: 3000 });
  }

}

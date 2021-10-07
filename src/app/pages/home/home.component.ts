import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('gallery', { read: ViewContainerRef })
  itemContainerRef: ViewContainerRef;
  @ViewChild('articles', { read: ViewContainerRef })
  articleContainerRef: ViewContainerRef;
  @Output()
  images$: Observable<Image[]> = new Observable<Image[]>();

  showFiller = false;

  constructor(
    private iService: ImageService,
    private authService: AuthService,
    private cfr: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.images$ = this.iService.list$;
    this.loadComponents();
  }
  logout() {
    this.authService.logout();
  }
  loggedIn() {
    return this.authService.isLoggedIn;
  }
  loadComponents() {
    this.vcr.clear();
    import('./item-card-container/item-card-container.component').then(
      ({ ItemCardContainerComponent }) => {
        let itemCardContainerComp = this.itemContainerRef.createComponent(
          this.cfr.resolveComponentFactory(ItemCardContainerComponent)
        );
      }
    );
    import('./article-card-container/article-card-container.component').then(
      ({ ArticleCardContainerComponent }) => {
        let articleCardContainerComp = this.articleContainerRef.createComponent(
          this.cfr.resolveComponentFactory(ArticleCardContainerComponent)
        );
      }
    );
  }
}

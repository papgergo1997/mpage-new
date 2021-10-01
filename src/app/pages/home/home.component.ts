import { Component, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from 'src/app/model/image';
import { ImageService } from 'src/app/service/image.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() images$: Observable<Image[]> = new Observable<Image[]>();

  showFiller = false;
  isLoggedIn: boolean;

  constructor(private iService: ImageService, private authService: AuthService) {
    console.log(this.isLoggedIn)
   }

  ngOnInit(): void {
    this.images$ = this.iService.list$;
    this.isLoggedIn = this.authService.isAuthenticated;
  }
  logout(){
    this.authService.logout()
  }

}

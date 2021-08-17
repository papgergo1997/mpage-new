import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() images: Image[];

  constructor() { }

  ngOnInit(): void {
  }

}

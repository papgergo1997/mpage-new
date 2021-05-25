import { Component, Input, OnInit } from '@angular/core';
import { Painting } from 'src/app/model/painting';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() images: Painting[];

  constructor() { }

  ngOnInit(): void {
  }

}

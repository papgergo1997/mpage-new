import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() image: Image;

  constructor() {}

  ngOnInit(): void {}
}

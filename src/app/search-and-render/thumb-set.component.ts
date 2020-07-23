import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../models';


@Component({
  selector: 'app-thumb-set',
  templateUrl: './thumb-set.component.html',
  styleUrls: ['./thumb-set.component.scss']
})
export class ThumbSetComponent implements OnInit {
  @Input() searchResults: Array<SearchResult> = [];

  throttle = 300;
  scrollDistance = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

}

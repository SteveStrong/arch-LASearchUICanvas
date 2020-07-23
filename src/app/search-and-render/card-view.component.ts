import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';



import { SearchResult } from '../models';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit, OnChanges {
  @Input() item: SearchResult;
  @Input() searchTextList: Array<string>;
  highlightOn: Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.highlightOn = this.searchTextList ? this.searchTextList : [];
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        if (propName === 'searchTextList') {
          this.highlightOn = this.searchTextList ? this.searchTextList : [];
        }
      }
    }
  }

}

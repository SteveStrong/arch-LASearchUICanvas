import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../models';

// https://github.com/flavens/material-flexlayout/tree/master/src/app
// https://material.angular.io/components/grid-list/examples



@Component({
  selector: 'app-card-set',
  templateUrl: './card-set.component.html',
  styleUrls: ['./card-set.component.scss']
})
export class CardSetComponent implements OnInit {
  @Input() searchResults: Array<SearchResult> = [];
  @Input() searchTextList: Array<string>;

  throttle = 300;
  scrollDistance = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  onScrollDown() {
    // if (!this.pinnedView && this.nextPageUrl) {
    //     const s1 = this.service.searchNextPage$(this.nextPageUrl, this.currentPinContext, this.user).subscribe(({ payload, nextPageUrl }) => {
    //         this.payload = this.payload.concat(payload);
    //         this.displayResults = this.payload;
    //         this.nextPageUrl = nextPageUrl;
    //         s1.unsubscribe();
    //     });
    // }
  }

}

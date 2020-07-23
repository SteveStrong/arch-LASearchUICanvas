import { Component, OnInit, Input } from '@angular/core';


import { SearchResult } from '../models';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  @Input() item: SearchResult;
  
  constructor() { }

  ngOnInit(): void {
  }

}

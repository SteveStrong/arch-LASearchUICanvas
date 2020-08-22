import { Component, OnInit } from '@angular/core';
import { LegalCaseService } from '../models/legal-case.service';

@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {

  constructor(private lcService: LegalCaseService) { }

  ngOnInit(): void {
  }

}

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ResultItem } from '../../models/resultItem';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input() results: Array<ResultItem>;
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Output() onGetPage = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  getPage(page) {
    this.onGetPage.emit(page);
  }

}

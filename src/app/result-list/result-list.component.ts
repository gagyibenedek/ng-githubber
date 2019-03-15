import { Component, Input, OnInit } from '@angular/core';
import ResultItem from '../../models/resultItem';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input() results: Array<ResultItem>;

  constructor() { }

  ngOnInit() {
  }

}

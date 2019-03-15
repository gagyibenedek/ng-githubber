import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResultItem } from 'src/models/resultItem';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent implements OnInit {
  @Input() result: ResultItem;
  @Output() onGetIssues = new EventEmitter<string>();
  public detailsVisible: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  getIssues() {
    this.onGetIssues.emit(this.result.fullName);
  }

  toggleDetails() {
    this.detailsVisible = !this.detailsVisible;
  }
}

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ResultItem } from '../../models/resultItem';
import { IssueItem } from 'src/models/issueItem';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {
  @Input() results: Array<ResultItem>;
  @Input() totalItems: number;
  @Input() currentPage: number;
  @Input() issues: Array<IssueItem>;
  @Input() isIssuesPanelOpen: boolean;
  @Input() issuesCount: number;
  @Output() onGetPage = new EventEmitter<string>();
  @Output() onGetIssues = new EventEmitter<string>();
  @Output() onCloseIssuesPanel = new EventEmitter<undefined>();
  @Output() onShowTenMore = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() { }

  getPage(page: string) {
    this.onGetPage.emit(page);
  }

  closeIssuesPanel() {
    this.onCloseIssuesPanel.emit();
  }

  getIssues(fullName: string) {
    this.onGetIssues.emit(fullName);
  }

  showTenMore() {
    this.onShowTenMore.emit();
  }

}

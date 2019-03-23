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
  @Output() onShowCharts = new EventEmitter<string>();
  @Output() onGetIssues = new EventEmitter<string>();
  @Output() onCloseIssuesPanel = new EventEmitter<undefined>();

  constructor() { }

  ngOnInit() { }

  getPage(page: string) {
    this.onGetPage.emit(page);
  }

  closeIssuesPanel() {
    this.onCloseIssuesPanel.emit();
  }

  showCharts(repo: string) {
    this.onShowCharts.emit(repo);
  }

  getIssues(repo: string) {
    this.onGetIssues.emit(repo);
  }

  getAgeClasses(days):SeverityClasses {
    return {
      ok: days <= 5,
      warn: days > 5 && days < 20,
      old: days >= 20
    }
  }

  getLastUpdatedClasses(days):SeverityClasses {
    return {
      ok: days <= 2,
      warn: days > 2 && days < 7,
      old: days >= 7
    }
  }

}

interface SeverityClasses {
  ok: boolean;
  warn: boolean;
  old: boolean;
}

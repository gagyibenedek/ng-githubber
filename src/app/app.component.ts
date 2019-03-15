import { Component } from '@angular/core';

import { ResultItem, parseResultItem } from '../models/resultItem';
import { IssueItem, parseIssueItem } from '../models/issueItem';
import { GitHubService } from './services/git-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public results: Array<ResultItem> = [];
  public totalItems: number;
  public currentPage: number;
  public issues: Array<IssueItem> = [];
  public isIssuesPanelOpen: boolean = false;
  public issuesCount: number = 0;

  public spinnerVisible: boolean = false;

  constructor(private gitHubService: GitHubService) {}

  onSearch(searchTerm: string) {
    this.spinnerVisible = true;
    this.isIssuesPanelOpen = false;
    this.gitHubService.search(searchTerm).subscribe((data:any) => {
      this.results = data.items.map(parseResultItem);
      this.totalItems = data.total_count;
      this.currentPage = 1;
      this.spinnerVisible = false;
    })
  }

  onGetPage(page: number) {
    this.spinnerVisible = true;
    this.gitHubService.getPage(page).subscribe((data:any) => {
      this.results = data.items.map(parseResultItem);
      this.currentPage = page;
      this.spinnerVisible = false;
    })
  }

  onGetIssues(fullName: string) {
    this.spinnerVisible = true;
    this.gitHubService.getIssues(fullName).subscribe((data:any) => {
      this.issues = data.items.map(parseIssueItem);
      this.issuesCount = data.total_count;
      this.isIssuesPanelOpen = true;
      this.spinnerVisible = false;
    })
  }

  onCloseIssuesPanel() {
    this.isIssuesPanelOpen = false;
    this.issues = [];
  }

  onShowAllIssues() {
    this.spinnerVisible = true;
    this.gitHubService.getAllIssues(this.issuesCount).subscribe((data:any) => {
      this.issues = data.items.map(parseIssueItem);
      this.isIssuesPanelOpen = true;
      this.spinnerVisible = false;
    })
  }
}

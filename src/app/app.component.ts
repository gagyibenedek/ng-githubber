import { Component } from '@angular/core';

import { ResultItem, parseResultItem } from '../models/resultItem';
import { IssueItem, parseIssueItem } from '../models/issueItem';
import { ChartData, commitDataToBarChartDataArray, prDataToPieChartDataArray } from '../models/chartData'
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
    this.isIssuesPanelOpen = false;
    this.gitHubService.getPage(page).subscribe((data:any) => {
      this.results = data.items.map(parseResultItem);
      this.currentPage = page;
      this.spinnerVisible = false;
    })
  }

  onShowCharts(repo: string) {
    this.gitHubService.getCommits(repo).subscribe((data:any) => {
      const chartData: Array<ChartData> = commitDataToBarChartDataArray(data.items);
      this.results = this.results.map(result => {
        if(result.fullName === repo) {
          result.commitChartData = chartData;
          if(!chartData.length) {
            result.noCommitData = true;
          }
        }
        return result;
      })
    })

    this.gitHubService.getClosedPRs(repo).subscribe((data:any) => {
      const chartData: Array<ChartData> = prDataToPieChartDataArray(data.items);
      this.results = this.results.map(result => {
        if(result.fullName === repo) {
          result.prChartData = chartData;
          if(!chartData.length) {
            result.noPRData = true;
          }
        }
        return result;
      });
    });
  }

  onGetIssues(repo: string) {
    this.spinnerVisible = true;
    this.gitHubService.getIssues(repo).subscribe((data:any) => {
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
}

import { Component } from '@angular/core';

import { ResultItem, parseResultItem } from '../models/resultItem';
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
  public spinnerVisible: boolean = false;

  constructor(private gitHubService: GitHubService) {

  }

  onSearch(searchTerm: string) {
    this.spinnerVisible = true;
    this.gitHubService.search(searchTerm).subscribe((data:any) => {
      this.results = data.items.map(parseResultItem);
      this.totalItems = data.total_count;
      this.currentPage = 1;
      this.spinnerVisible = false;
    })
  }

  onGetPage(page: number) {
    this.gitHubService.getPage(page).subscribe((data:any) => {
      this.results = data.items.map(parseResultItem);
      this.currentPage = page;
    })
  }
}

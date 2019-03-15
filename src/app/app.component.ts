import { Component } from '@angular/core';

import ResultItem from '../models/resultItem';
import { GitHubService } from './services/git-hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public results: Array<ResultItem> = [];

  constructor(private gitHubService: GitHubService) {

  }

  onSearch(searchTerm: string) {
    this.gitHubService.search(searchTerm).subscribe((data:any) => {
      this.results = data.items.map((item:any) => {
        const resultItem: ResultItem = {
          name: item.name,
          fullName: item.full_name,
          url: item.url
        };
        return resultItem;
      })
    })
  }
}

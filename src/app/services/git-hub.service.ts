import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class GitHubService {
  private currentTerm: string;
  private currentFullName: string;
  private currentPage: number = 0; 
  constructor(private http: HttpClient) { }

  search(term: string) {
    this.currentTerm = term;
    return this.http.get(`https://api.github.com/search/repositories?per_page=10&page=1&q=${this.currentTerm}`);
  }

  getPage(page: number) {
    return this.http.get(`https://api.github.com/search/repositories?per_page=10&page=${page}&q=${this.currentTerm}`);
  }

  getIssues(fullName: string) {
    this.currentFullName = fullName;
    return this.http.get(`https://api.github.com/search/issues?sort=created&per_page=5&page=1&q=state:open+repo:${this.currentFullName}`);
  }

  getCommits(repo: string) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 3);
    const dateString = date.toISOString().slice(0,10); //yyyy-mm-dd
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({
        "Accept": "application/vnd.github.cloak-preview"
      }), 
    };
    return this.http
      .get(`https://api.github.com/search/commits?per_page=100&sort=author-date&q=repo:${repo}+author-date:>${dateString}`, 
        requestOptions);
  }

  getClosedPRs(repo: string) {
    return this.http.get(`https://api.github.com/search/issues?per_page=100&order=created&q=state:closed+type:pr+repo:${repo}`);
  }
}

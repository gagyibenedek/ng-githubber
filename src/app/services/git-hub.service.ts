import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GitHubService {
  private currentTerm: string;
  constructor(private http: HttpClient) { }

  search(term) {
    this.currentTerm = term;
    return this.http.get(`https://api.github.com/search/repositories?per_page=10&page=1&q=${this.currentTerm}`);
  }

  getPage(page) {
    return this.http.get(`https://api.github.com/search/repositories?per_page=10&page=${page}&q=${this.currentTerm}`);
  }
}

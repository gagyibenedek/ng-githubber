import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GitHubService {

  constructor(private http: HttpClient) { }

  search(term) {
    return this.http.get(`https://api.github.com/search/repositories?q=${term}`);
  }
}

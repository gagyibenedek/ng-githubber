import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GitHubService } from './git-hub.service';

fdescribe('GitHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      GitHubService
    ]
  }));

  it('should be created', inject([GitHubService], (gitHubService: GitHubService) => {
    expect(gitHubService).toBeTruthy();
  }));

  it('should use the correct term for search', inject(
      [GitHubService, HttpTestingController],
      (gitHubService: GitHubService, backend: HttpTestingController) => {
        const term = 'angular';
        gitHubService.search(term).subscribe();

        backend.expectOne({
            url: `https://api.github.com/search/repositories?per_page=10&page=1&q=${term}`
          })
          .flush({});
    })
  );

  it('should use the correct  and term for pagination', inject(
    [GitHubService, HttpTestingController],
    (gitHubService: GitHubService, backend: HttpTestingController) => {
      const term = 'angular';
      gitHubService.search(term).subscribe();
      backend.expectOne({
          url: `https://api.github.com/search/repositories?per_page=10&page=1&q=${term}`
        })
        .flush({});

      const page = 1;
      gitHubService.getPage(page).subscribe();
      backend.expectOne({
        url: `https://api.github.com/search/repositories?per_page=10&page=${page}&q=${term}`
      })
      .flush({});
    })
  );

  it('should use the correct parameters for getting the commits', inject(
    [GitHubService, HttpTestingController],
    (gitHubService: GitHubService, backend: HttpTestingController) => {
      const repo = 'angular';
      gitHubService.getCommits(repo).subscribe();
      const date = new Date();
      date.setFullYear(date.getFullYear() - 3);
      const dateString = date.toISOString().slice(0,10);

      const mockReq = backend.expectOne({
          url: `https://api.github.com/search/commits?per_page=100&sort=author-date&q=repo:${repo}+author-date:>${dateString}`
        });
      expect(mockReq.request.headers.get("Accept")).toEqual("application/vnd.github.cloak-preview");
      mockReq.flush({});
  })
);
});

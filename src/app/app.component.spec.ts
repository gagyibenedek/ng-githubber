import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { AppComponent } from './app.component';
import { GitHubService } from './services/git-hub.service';
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';

import * as ResultItemModel from '../models/resultItem';

const mockGitHubService = {
  search: ()=>{
    return {subscribe: ()=>{}};
  }
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockSearch,
        MockResultList,
        MockSpinner
      ],
      providers:[{ provide: GitHubService, useValue: mockGitHubService }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    mockService = fixture.debugElement.injector.get(GitHubService)
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should run a search with the correct term and sets the state correctly', () => {
    const term = 'angular';
    const data = {
      items: [ResultItemModel.dummyResultItem],
      total_count: 1
    };

    const parseSpy = jasmine.createSpy('parseResultItem').and.returnValue(ResultItemModel.dummyResultItem);
    spyOnProperty(ResultItemModel, 'parseResultItem', 'get').and.returnValue(parseSpy);
    spyOn(mockService, 'search').and.returnValue(of(data))
    fixture.debugElement.query(By.directive(MockSearch)).triggerEventHandler('onSearch', term);
    fixture.detectChanges();
    expect(mockService.search).toHaveBeenCalledWith(term);
    expect(component.results.length).toEqual(1);
    expect(component.results[0].name).toEqual(ResultItemModel.dummyResultItem.name);
    expect(component.totalItems).toEqual(data.total_count);
    expect(component.currentPage).toEqual(1);
    expect(component.spinnerVisible).toEqual(false);
  });
});

@Directive({
  selector: 'app-search'
})
class MockSearch {
  @Input('searchDone')
  public searchDone;
  @Output('onSearch')
  public onSearch = new EventEmitter<void>();
}

@Directive({
  selector: 'app-result-list'
})
class MockResultList {
  @Input('results')
  public results;
  @Input('totalItems')
  public totalItems;
  @Input('currentPage')
  public currentPage;
  @Input('issues')
  public issues;
  @Input('isIssuesPanelOpen')
  public isIssuesPanelOpen;
  @Input('issuesCount')
  public issuesCount;
  @Input('issuesUrl')
  public issuesUrl;
  @Output('onGetPage')
  public onGetPage = new EventEmitter<void>();
  @Output('onShowCharts')
  public onShowCharts = new EventEmitter<void>();
  @Output('onGetIssues')
  public onGetIssues = new EventEmitter<void>();
  @Output('onCloseIssuesPanel')
  public onCloseIssuesPanel = new EventEmitter<void>();
}

@Directive({
  selector: 'app-spinner'
})
class MockSpinner {}
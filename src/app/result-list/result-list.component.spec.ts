import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { By } from "@angular/platform-browser";

import { ResultListComponent } from './result-list.component';
import { dummyResultItem } from '../../models/resultItem';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultListComponent, MockResultItem ],
      imports: [NgxPaginationModule]
    })
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    component.results = [];
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message if the search returned no results, and nothing else', () => {
    component.totalItems = 0;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.no-result')).nativeElement.textContent)
      .toContain('There were no repos found using the given keyword :(');
    expect(fixture.debugElement.query(By.css('app-result-item'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('pagination-controls'))).toBeFalsy();
  });

  it('should emit output upon clicking the X', () => {
    component.results.push(dummyResultItem);
    component.isIssuesPanelOpen = true;
    component.issues = [];
    component.onCloseIssuesPanel = new EventEmitter();
    spyOn(component.onCloseIssuesPanel, 'emit');
    fixture.detectChanges();
    fixture.debugElement.query(By.css('.close')).triggerEventHandler('click', null);
    expect(component.onCloseIssuesPanel.emit).toHaveBeenCalled();
  });

});

@Directive({
  selector: 'app-result-item'
})
class MockResultItem {
  @Input('result')
  public result;
  @Output('onGetIssues')
  public onGetIssues = new EventEmitter<void>();
  @Output('onShowCharts')
  public onShowCharts = new EventEmitter<void>();
}
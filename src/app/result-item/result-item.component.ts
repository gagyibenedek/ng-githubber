import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResultItem } from 'src/models/resultItem';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent implements OnInit {
  @Input() result: ResultItem;
  @Output() onShowCharts = new EventEmitter<string>();
  @Output() onGetIssues = new EventEmitter<string>();
  public detailsVisible: boolean = false;
  public chartColors = {domain: ['#ffa400', '#009ffd', '#ce5374', '#2a2a72', '#232528']};

  constructor() { }

  ngOnInit() {
  }

  showCharts() {
    this.onShowCharts.emit(this.result.fullName);
  }

  getIssues() {
    this.onGetIssues.emit(this.result.fullName);
  }

  toggleDetails() {
    this.detailsVisible = !this.detailsVisible;
    if(this.detailsVisible) {
      this.showCharts();
    }
  }
}

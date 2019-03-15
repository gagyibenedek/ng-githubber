import { Component, OnInit, Input } from '@angular/core';
import { ResultItem } from 'src/models/resultItem';

@Component({
  selector: 'app-result-item',
  templateUrl: './result-item.component.html',
  styleUrls: ['./result-item.component.scss']
})
export class ResultItemComponent implements OnInit {
  @Input() result: ResultItem;
  public detailsVisible: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleDetails() {
    this.detailsVisible = !this.detailsVisible;
  }
}

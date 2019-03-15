import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchDone: boolean = false;
  @Output() onSearch = new EventEmitter<string>();

  public searchTerm: string = '';
  constructor() { }

  ngOnInit() {
  }

  doSearch() {
    this.onSearch.emit(this.searchTerm);
  }

}
